import { normalizePlan, planMetrics, validatePlan } from "../geometry";
import type { ConsensusReport, Plan } from "../types";
import { EXTRACTION_PROMPT, PLAN_JSON_SCHEMA } from "./prompt";

export type ProviderId = "gemini" | "claude" | "consensus";

export interface ProviderKeys {
  gemini?: string;
  claude?: string;
}

export interface ExtractResult {
  plan: Plan;
  provider: string;
  model: string;
  durationMs: number;
  consensus?: ConsensusReport;
}

const GEMINI_MODEL = () => process.env.GEMINI_MODEL || "gemini-3.1-pro-preview";
const CLAUDE_MODEL = () => process.env.CLAUDE_MODEL || "claude-opus-5-5";

// ----------------------------------------------------------------------------
// Gemini — spatial reasoning & bounding box kuat
// ----------------------------------------------------------------------------
async function callGemini(imageB64: string, mime: string, key: string): Promise<unknown> {
  const model = GEMINI_MODEL();
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
  const body = (withSchema: boolean) => ({
    contents: [{ role: "user", parts: [{ inline_data: { mime_type: mime, data: imageB64 } }, { text: EXTRACTION_PROMPT }] }],
    generationConfig: {
      temperature: 0,
      responseMimeType: "application/json",
      ...(withSchema ? { responseJsonSchema: PLAN_JSON_SCHEMA } : {}),
      mediaResolution: "MEDIA_RESOLUTION_HIGH",
    },
  });
  const post = (withSchema: boolean) =>
    fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify(body(withSchema)),
    });
  let res = await post(true);
  if (res.status === 400) res = await post(false); // fallback bila endpoint menolak field skema
  if (!res.ok) throw new Error(`Gemini ${res.status}: ${(await res.text()).slice(0, 400)}`);
  const json = await res.json();
  const text: string = json?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text ?? "").join("") ?? "";
  return parseJsonLoose(text);
}

// ----------------------------------------------------------------------------
// Claude — OCR angka & kepatuhan instruksi sangat presisi (structured via tool use)
// ----------------------------------------------------------------------------
async function callClaude(imageB64: string, mime: string, key: string): Promise<unknown> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": key,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: CLAUDE_MODEL(),
      max_tokens: 16000,
      tools: [{ name: "submit_plan", description: "Kirim hasil ekstraksi denah", input_schema: PLAN_JSON_SCHEMA }],
      tool_choice: { type: "tool", name: "submit_plan" },
      messages: [
        {
          role: "user",
          content: [
            { type: "image", source: { type: "base64", media_type: mime, data: imageB64 } },
            { type: "text", text: EXTRACTION_PROMPT },
          ],
        },
      ],
    }),
  });
  if (!res.ok) throw new Error(`Claude ${res.status}: ${(await res.text()).slice(0, 400)}`);
  const json = await res.json();
  const tool = json?.content?.find((c: { type: string }) => c.type === "tool_use");
  if (tool?.input) return tool.input;
  const text = json?.content?.map((c: { text?: string }) => c.text ?? "").join("") ?? "";
  return parseJsonLoose(text);
}

function parseJsonLoose(text: string): unknown {
  const s = text.trim().replace(/^```(?:json)?/i, "").replace(/```$/, "");
  const start = s.indexOf("{");
  const end = s.lastIndexOf("}");
  if (start < 0 || end < 0) throw new Error("Respons AI bukan JSON");
  return JSON.parse(s.slice(start, end + 1));
}

// ----------------------------------------------------------------------------
// Sanitasi output AI → Plan yang valid secara tipe, lalu normalisasi deterministik
// ----------------------------------------------------------------------------
type Raw = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

const numOr = (v: unknown, d = 0) => (typeof v === "number" && Number.isFinite(v) ? v : typeof v === "string" ? Number(v.replace(",", ".")) || d : d);
const pt = (p: Raw | undefined) => ({ x: numOr(p?.x), y: numOr(p?.y) });

export function sanitizePlan(raw: Raw): Plan {
  const t = numOr(raw.wallThickness, 0.15) || 0.15;
  const plan: Plan = {
    outline: { width: numOr(raw.outline?.width), depth: numOr(raw.outline?.depth) },
    wallThickness: t,
    chains: (raw.chains ?? []).map((c: Raw) => ({
      side: c.side,
      segments: (c.segments ?? []).map((s: unknown) => numOr(s)),
      total: numOr(c.total),
    })),
    walls: (raw.walls ?? []).map((w: Raw, i: number) => ({
      id: String(w.id ?? `w${i + 1}`),
      a: pt(w.a),
      b: pt(w.b),
      thickness: t,
      exterior: Boolean(w.exterior),
    })),
    openings: (raw.openings ?? []).map((o: Raw, i: number) => ({
      id: String(o.id ?? `o${i + 1}`),
      type: ["door", "window", "passage"].includes(o.type) ? o.type : "door",
      wallId: o.wallId ? String(o.wallId) : null,
      at: pt(o.at),
      width: numOr(o.width, 0.8),
      height: o.type === "window" ? 1.2 : 2.1,
      leaves: Math.max(1, Math.round(numOr(o.leaves, 1))),
      material: o.type === "door" ? (o.material === "pvc" ? "pvc" : o.material ?? "kayu") : undefined,
      label: o.label,
    })),
    rooms: (raw.rooms ?? []).map((r: Raw, i: number) => ({
      id: String(r.id ?? `r${i + 1}`),
      name: String(r.name ?? `Ruang ${i + 1}`),
      type: r.type ?? "lainnya",
      polygon: (r.polygon ?? []).map(pt),
    })),
    columns: null,
    calibration:
      Array.isArray(raw.calibration?.outerBox) && raw.calibration.outerBox.length === 4
        ? { outerBox: raw.calibration.outerBox.map((v: unknown) => numOr(v)) as [number, number, number, number] }
        : null,
    notes: Array.isArray(raw.notes) ? raw.notes.map(String) : [],
  };
  // outline fallback dari rantai dimensi
  const top = plan.chains.find((c) => c.side === "top" || c.side === "bottom");
  const left = plan.chains.find((c) => c.side === "left" || c.side === "right");
  if (!plan.outline.width && top) plan.outline.width = top.total;
  if (!plan.outline.depth && left) plan.outline.depth = left.total;
  return normalizePlan(plan);
}

/** Skor kualitas deterministik: makin tinggi makin konsisten */
export function qualityScore(plan: Plan): number {
  const issues = validatePlan(plan);
  let s = 100;
  for (const i of issues) s -= i.level === "error" ? 15 : i.level === "warning" ? 5 : 1;
  if (!plan.chains.length) s -= 20;
  if (!plan.rooms.length) s -= 20;
  return s;
}

function compare(a: Plan, b: Plan): ConsensusReport["diffs"] {
  const ma = planMetrics(a);
  const mb = planMetrics(b);
  const metrics: [string, number, number][] = [
    ["Lebar bangunan (m)", a.outline.width, b.outline.width],
    ["Panjang bangunan (m)", a.outline.depth, b.outline.depth],
    ["Panjang dinding (m)", ma.wallLength, mb.wallLength],
    ["Luas lantai bersih (m²)", ma.netFloorArea, mb.netFloorArea],
    ["Jumlah pintu", ma.doors, mb.doors],
    ["Jumlah daun jendela", ma.windowLeaves, mb.windowLeaves],
    ["Jumlah ruang", ma.roomCount, mb.roomCount],
  ];
  return metrics.map(([metric, x, y]) => ({
    metric,
    a: x,
    b: y,
    deltaPct: Math.max(x, y) > 0 ? (Math.abs(x - y) / Math.max(x, y)) * 100 : 0,
  }));
}

export async function extractPlan(provider: ProviderId, imageB64: string, mime: string, keys: ProviderKeys): Promise<ExtractResult> {
  const t0 = Date.now();
  const gk = keys.gemini || process.env.GEMINI_API_KEY;
  const ck = keys.claude || process.env.ANTHROPIC_API_KEY;

  // Cek ketersediaan key
  if (provider === "gemini") {
    if (!gk) {
      throw new Error("GEMINI_API_KEY belum diset. Masukkan API Key di Pengaturan AI Vision atau .env.local");
    }
    const plan = sanitizePlan((await callGemini(imageB64, mime, gk)) as Raw);
    return { plan, provider: "Gemini", model: GEMINI_MODEL(), durationMs: Date.now() - t0 };
  }

  if (provider === "claude") {
    if (!ck) {
      throw new Error("ANTHROPIC_API_KEY belum diset. Masukkan API Key di Pengaturan AI Vision atau .env.local");
    }
    const plan = sanitizePlan((await callClaude(imageB64, mime, ck)) as Raw);
    return { plan, provider: "Claude", model: CLAUDE_MODEL(), durationMs: Date.now() - t0 };
  }

  // KONSENSUS: jika hanya satu key yang tersedia, fallback otomatis ke key yang ada
  if (gk && !ck) {
    const plan = sanitizePlan((await callGemini(imageB64, mime, gk)) as Raw);
    plan.notes.push("Mode konsensus beralih ke Gemini (ANTHROPIC_API_KEY belum diset)");
    return { plan, provider: "Gemini (Fallback Konsensus)", model: GEMINI_MODEL(), durationMs: Date.now() - t0 };
  }
  if (!gk && ck) {
    const plan = sanitizePlan((await callClaude(imageB64, mime, ck)) as Raw);
    plan.notes.push("Mode konsensus beralih ke Claude (GEMINI_API_KEY belum diset)");
    return { plan, provider: "Claude (Fallback Konsensus)", model: CLAUDE_MODEL(), durationMs: Date.now() - t0 };
  }
  if (!gk && !ck) {
    throw new Error(
      "Belum ada API Key yang dikonfigurasi! Masukkan GEMINI_API_KEY atau ANTHROPIC_API_KEY di panel 'Pengaturan AI Vision' di samping, atau tambahkan di file .env.local."
    );
  }
  const [g, c] = await Promise.allSettled([callGemini(imageB64, mime, gk!), callClaude(imageB64, mime, ck!)]);
  const pg = g.status === "fulfilled" ? sanitizePlan(g.value as Raw) : null;
  const pc = c.status === "fulfilled" ? sanitizePlan(c.value as Raw) : null;
  if (!pg && !pc) throw new Error(`Kedua model gagal: ${(g as PromiseRejectedResult).reason} | ${(c as PromiseRejectedResult).reason}`);
  if (!pg || !pc) {
    const plan = (pg ?? pc)!;
    plan.notes.push(`Konsensus parsial: ${pg ? "Claude" : "Gemini"} gagal merespons`);
    return { plan, provider: pg ? "Gemini" : "Claude", model: pg ? GEMINI_MODEL() : CLAUDE_MODEL(), durationMs: Date.now() - t0 };
  }
  const sg = qualityScore(pg);
  const sc = qualityScore(pc);
  const primaryIsG = sg >= sc;
  const primary = primaryIsG ? pg : pc;
  const diffs = compare(pg, pc);
  const agreement = diffs.reduce((acc, d) => acc + (d.deltaPct <= 3 ? 1 : d.deltaPct <= 10 ? 0.5 : 0), 0) / diffs.length;
  for (const d of diffs.filter((x) => x.deltaPct > 3))
    primary.notes.push(`⚠️ Model tidak sepakat soal ${d.metric}: Gemini ${d.a} vs Claude ${d.b} — cek manual`);
  return {
    plan: primary,
    provider: "Konsensus",
    model: `${GEMINI_MODEL()} + ${CLAUDE_MODEL()}`,
    durationMs: Date.now() - t0,
    consensus: { primary: primaryIsG ? "Gemini" : "Claude", agreementScore: agreement, diffs },
  };
}

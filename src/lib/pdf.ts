"use client";
import { roomLabelCount, roomLabels } from "./labels";
/**
 * Baca PDF denah di browser (pdf.js):
 *  - PDF hasil CAD punya lapisan teks → angka dimensi, nama ruang, skala & judul lantai dibaca PASTI
 *    lalu dikirim ke AI sebagai petunjuk, sehingga AI tidak menebak ukuran dari piksel.
 *  - PDF hasil scan (tanpa teks) diperlakukan seperti foto biasa.
 * Setiap halaman dirender jadi gambar JPEG (sisi terpanjang ±2400 px) untuk AI Vision.
 */

export interface PdfPageInfo {
  index: number; // 0-based
  title: string | null; // mis. "DENAH LT 2"
  suggestedName: string; // mis. "Lantai 2"
  level: number | null; // dari judul (0 = lantai 1)
  scale: string | null; // mis. "1 : 75"
  dims: { value: number; x: number; y: number }[]; // angka dimensi + posisi (% halaman)
  labels: { text: string; x: number; y: number }[];
  elevations: string[];
  unit: "mm" | "m" | "cm" | null;
  hasText: boolean;
  isPlan: boolean; // halaman berisi denah (bukan tampak/potongan/detail)
  hint: string | null;
  imageDataUrl: string;
  thumbDataUrl: string;
}

type TextItem = { str: string; transform: number[]; width: number; height: number };

let pdfjsPromise: Promise<typeof import("pdfjs-dist")> | null = null;
async function loadPdfjs() {
  if (!pdfjsPromise) {
    pdfjsPromise = import("pdfjs-dist").then((m) => {
      m.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();
      return m;
    });
  }
  return pdfjsPromise;
}

const ROMAN: Record<string, number> = { I: 1, II: 2, III: 3, IV: 4, V: 5 };

function levelFromTitle(t: string): number | null {
  const m = /(?:LT\.?|LANTAI|LEVEL|LV\.?)\s*([0-9]+|I{1,3}|IV|V)\b/i.exec(t);
  if (!m) return /DASAR|GROUND/i.test(t) ? 0 : null;
  const raw = m[1].toUpperCase();
  const n = /^\d+$/.test(raw) ? parseInt(raw, 10) : ROMAN[raw] ?? null;
  return n ? n - 1 : null;
}

/** Gabungkan potongan teks pada baris yang sama dan berdekatan (koordinat viewport: y ke bawah) */
export function joinLines(items: { str: string; x: number; y: number; w: number; h: number; rot?: number }[]) {
  const sorted = [...items].sort((a, b) => a.y - b.y || a.x - b.x);
  const out: { str: string; x: number; y: number; w: number; h: number; rot?: number }[] = [];
  for (const it of sorted) {
    const prev = out[out.length - 1];
    const sameRot = Math.abs((prev?.rot ?? 0) - (it.rot ?? 0)) < 0.05 && Math.abs(it.rot ?? 0) < 0.05; // hanya gabung teks horizontal
    if (prev && sameRot && Math.abs(prev.y - it.y) < Math.max(2, it.h * 0.4) && it.x - (prev.x + prev.w) < it.h * 1.2 && it.x >= prev.x) {
      prev.str = `${prev.str}${it.x - (prev.x + prev.w) > it.h * 0.15 ? " " : ""}${it.str}`;
      prev.w = it.x + it.w - prev.x;
    } else out.push({ ...it });
  }
  return out;
}

export async function readPdf(file: File, onProgress?: (done: number, total: number) => void): Promise<PdfPageInfo[]> {
  const pdfjs = await loadPdfjs();
  const data = new Uint8Array(await file.arrayBuffer());
  const doc = await pdfjs.getDocument({ data }).promise;
  const pages: PdfPageInfo[] = [];
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const vp1 = page.getViewport({ scale: 1 });
    const W = vp1.width;
    const H = vp1.height;

    // ---- teks ----
    const tc = await page.getTextContent();
    // transform teks → koordinat viewport (CAD sering memakai origin di tengah halaman)
    const raw = (tc.items as TextItem[])
      .filter((it) => typeof it.str === "string" && it.str.trim())
      .map((it) => {
        const t = pdfjs.Util.transform(vp1.transform, it.transform);
        const h = Math.hypot(it.transform[2], it.transform[3]) || it.height || 8;
        const rot = Math.atan2(t[1], t[0]);
        return { str: it.str.trim(), x: t[4], y: t[5], w: it.width, h, rot };
      });
    const lines = joinLines(raw);
    const pct = (x: number, y: number) => ({ x: Math.round((x / W) * 1000) / 10, y: Math.round((y / H) * 1000) / 10 });

    const allText = lines.map((l) => l.str).join("\n");
    const titleLine = lines.find((l) => /\bDENAH\b/i.test(l.str)) ?? lines.find((l) => /\b(LT\.?|LANTAI)\s*\d/i.test(l.str));
    const title = titleLine?.str ?? null;
    const scaleM = /1\s*:\s*(\d{2,4})/.exec(allText);
    const dims: PdfPageInfo["dims"] = [];
    const labels: PdfPageInfo["labels"] = [];
    const elevations = new Set<string>();
    for (const l of lines) {
      const s = l.str.replace(/\s+/g, " ").trim();
      if (/^(FFL|±|\+|-)?\s*[±+-]?\s*\d+[.,]\d+$/.test(s) && /FFL|±|\+/.test(s)) {
        elevations.add(s);
        continue;
      }
      // dimensi: ≥3 digit (mm/cm) atau desimal (m). Nomor anak tangga & as grid (1–2 digit) diabaikan.
      if (/^\d{3,6}$/.test(s) || /^\d{1,3}[.,]\d{1,3}$/.test(s)) {
        const v = parseFloat(s.replace(",", "."));
        if (v > 0) dims.push({ value: v, ...pct(l.x + l.w / 2, l.y) });
        continue;
      }
      if (/^FFL/i.test(s)) {
        elevations.add(s);
        continue;
      }
      if (/^[A-Z]'?$/.test(s) || /^\d+'?$/.test(s)) continue; // as grid & nomor anak tangga
      if (/1\s*:\s*\d+/.test(s) || /\bDENAH\b/i.test(s)) continue;
      if ((/[A-Za-z]{2,}/.test(s) || /^K\s?\d{1,3}$/i.test(s)) && s.length <= 40) labels.push({ text: s, ...pct(l.x + l.w / 2, l.y) });
    }
    const big = dims.filter((d) => d.value >= 500).length;
    const unit: PdfPageInfo["unit"] = dims.length < 3 ? null : big >= dims.length * 0.6 ? "mm" : dims.some((d) => !Number.isInteger(d.value)) ? "m" : "cm";
    const hasText = lines.length > 5;
    const isPlan = !title || /DENAH|PLAN/i.test(title) ? !/TAMPAK|POTONGAN|DETAIL|ELEVATION|SECTION/i.test(title ?? "") : false;
    const level = title ? levelFromTitle(title) : null;

    // ---- render gambar ----
    const target = 2400;
    const scale = target / Math.max(W, H);
    const vp = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(vp.width);
    canvas.height = Math.round(vp.height);
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    await page.render({ canvas, canvasContext: ctx, viewport: vp }).promise;
    const imageDataUrl = canvas.toDataURL("image/jpeg", 0.85);
    const tw = 220;
    const thumb = document.createElement("canvas");
    thumb.width = tw;
    thumb.height = Math.round((canvas.height / canvas.width) * tw);
    thumb.getContext("2d")!.drawImage(canvas, 0, 0, thumb.width, thumb.height);

    const info: PdfPageInfo = {
      index: i - 1,
      title,
      suggestedName: level != null ? `Lantai ${level + 1}` : title ? title.replace(/^DENAH\s*/i, "").trim() || `Halaman ${i}` : `Halaman ${i}`,
      level,
      scale: scaleM ? `1 : ${scaleM[1]}` : null,
      dims,
      labels,
      elevations: [...elevations],
      unit,
      hasText,
      isPlan,
      hint: null,
      imageDataUrl,
      thumbDataUrl: thumb.toDataURL("image/jpeg", 0.8),
    };
    info.hint = buildHint(info);
    pages.push(info);
    onProgress?.(i, doc.numPages);
    page.cleanup();
  }
  await doc.destroy();
  return pages;
}

/** Petunjuk teks untuk AI dari lapisan teks PDF CAD */
export function buildHint(p: PdfPageInfo): string | null {
  if (!p.hasText || p.dims.length < 3) return null;
  const unitText =
    p.unit === "mm"
      ? "Angka dimensi di gambar dalam MILIMETER (mis. 7250 = 7,25 m). Konversikan ke meter (÷ 1000) di JSON."
      : p.unit === "cm"
        ? "Angka dimensi tampaknya dalam CENTIMETER. Konversikan ke meter (÷ 100)."
        : "Angka dimensi dalam meter.";
  const dimList = p.dims
    .slice(0, 160)
    .map((d) => `${d.value}@(${d.x}%,${d.y}%)`)
    .join(" ");
  const labelList = p.labels
    .slice(0, 120)
    .map((l) => `"${l.text}"@(${l.x}%,${l.y}%)`)
    .join(" ");
  return [
    `PETUNJUK DARI LAPISAN TEKS PDF CAD (data pasti, BUKAN tebakan):`,
    p.title ? `- Judul halaman: ${p.title}${p.scale ? `, skala ${p.scale}` : ""}. Hanya gambarkan denah ini (abaikan kop/legenda/denah lain bila ada).` : "",
    `- ${unitText}`,
    `- Posisi ditulis sebagai (x%, y%) dari lebar & tinggi HALAMAN (0,0 = kiri-atas). Pakai untuk mencocokkan angka ke rantai dimensi sisi atas/bawah/kiri/kanan dan ke ruang.`,
    `- Angka dimensi terbaca: ${dimList}`,
    labelList ? `- Label ruang/teks terbaca: ${labelList}` : "",
    p.elevations.length ? `- Elevasi lantai: ${p.elevations.slice(0, 12).join(", ")}` : "",
    roomLabelCount(p.labels.map((l) => l.text)) ? `- Label kamar terbaca: ${roomLabels(p.labels.map((l) => l.text)).join(", ")} → hasil WAJIB berisi tepat ${roomLabelCount(p.labels.map((l) => l.text))} ruang type "kamar".` : "",
    `- Satu label "KM/WC" bisa mewakili blok berisi 2 bilik KM (2 kloset, 2 pintu) — pisahkan menjadi 2 ruang kamar_mandi bila ada 2 kloset.`,
    `- Ruang berlabel K1, K2, … / KAMAR = type "kamar"; KM/WC = "kamar_mandi"; VOID tetap dimasukkan sebagai ruang bernama "VOID" (type "lainnya"); BALCONY/BALKON, AREA JEMUR, TANGGA = "lainnya"; lorong/selasar = "selasar"; CARPORT = "carport".`,
    `- Utamakan angka di atas. Jangan mengarang ukuran dari piksel bila angkanya tersedia.`,
  ]
    .filter(Boolean)
    .join("\n");
}


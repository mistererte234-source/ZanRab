import { NextResponse } from "next/server";
import { extractPlan, type ProviderId } from "@/lib/ai/providers";
import { validatePlan } from "@/lib/geometry";

export const runtime = "nodejs";
export const maxDuration = 300;

export async function GET() {
  return NextResponse.json({
    gemini: Boolean(process.env.GEMINI_API_KEY),
    claude: Boolean(process.env.ANTHROPIC_API_KEY),
    geminiModel: process.env.GEMINI_MODEL || "gemini-3.1-pro-preview",
    claudeModel: process.env.CLAUDE_MODEL || "claude-opus-5-5",
  });
}

export async function POST(req: Request) {
  try {
    const { image, provider } = (await req.json()) as { image: string; provider: ProviderId };
    const m = /^data:(image\/(?:png|jpeg|webp|gif));base64,(.+)$/.exec(image ?? "");
    if (!m) return NextResponse.json({ error: "Format gambar tidak didukung (PNG/JPG/WEBP)" }, { status: 400 });
    // Key milik user (opsional) dikirim via header, tidak pernah disimpan di server
    const keys = {
      gemini: req.headers.get("x-gemini-key") || undefined,
      claude: req.headers.get("x-anthropic-key") || undefined,
    };
    const result = await extractPlan(provider ?? "gemini", m[2], m[1], keys);
    return NextResponse.json({
      plan: result.plan,
      meta: { provider: result.provider, model: result.model, durationMs: result.durationMs, consensus: result.consensus },
      issues: validatePlan(result.plan),
    });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : String(e) }, { status: 500 });
  }
}

import { describe, expect, it } from "vitest";
import { DEFAULT_PARAMS, samplePlan } from "../src/lib/defaults";
import { newProject } from "../src/lib/store";
import { computeStructure, maxSpanOf, tributaryAreas, DEFAULT_STRUCTURE, LOADS } from "../src/lib/structure";
import type { Floor } from "../src/lib/types";

const fl = (level: number): Floor => ({ id: `f${level}`, name: `Lantai ${level + 1}`, level, plan: samplePlan(), imageDataUrl: null, analyzeMeta: null, height: 3.6 });

describe("pra-desain struktur", () => {
  it("tributary & bentang pada grid sederhana 2×2 bentang 4 m", () => {
    const pts = [0, 4, 8].flatMap((x) => [0, 4, 8].map((y) => ({ x, y })));
    const t = tributaryAreas(pts);
    expect(Math.max(...t)).toBeCloseTo(16, 5); // kolom tengah 4 × 4
    expect(Math.min(...t)).toBeCloseTo(4, 5); // kolom sudut 2 × 2
    expect(maxSpanOf(pts)).toBeCloseTo(4, 5);
  });

  it("3 lantai: ukuran memenuhi minimum SNI & bertambah dengan jumlah lantai", () => {
    const p1 = newProject({ plan: samplePlan(), params: { ...DEFAULT_PARAMS, wallHeight: 3.6 } });
    const p3 = newProject({ floors: [fl(0), fl(1), fl(2)], params: { ...DEFAULT_PARAMS, wallHeight: 3.6 } });
    const r1 = computeStructure(p1)!;
    const r3 = computeStructure(p3)!;
    expect(r3.column.b).toBeGreaterThanOrEqual(300); // SRPMK ps. 18.7.2.1
    expect(r3.beam.b).toBeGreaterThanOrEqual(250); // ps. 18.6.2.1
    expect(r3.beam.b).toBeGreaterThanOrEqual(0.3 * r3.beam.h);
    expect(r3.slab!.t).toBeGreaterThanOrEqual(120);
    expect(r3.column.Pu).toBeGreaterThan(r1.column.Pu);
    expect(r3.column.perStorey.length).toBe(3);
    expect(r3.column.perStorey[0].Pu).toBeGreaterThan(r3.column.perStorey[2].Pu);
    expect(r3.warnings.some((w) => /SNI 1726/.test(w))).toBe(true);
    console.log("3LT", JSON.stringify({ span: r3.maxSpan, trib: r3.maxTributary, slab: r3.slab?.t, beam: [r3.beam.b, r3.beam.h], col: r3.column.perStorey, util: r3.column.util, foot: [r3.footing.B, r3.footing.t, r3.footing.Ps], loads: r3.loads }));
  });

  it("hitung tangan: tinggi balok bentang 4 m, fy 420 → 4000/18,5 = 216 → min 300", () => {
    const pts = [0, 4].flatMap((x) => [0, 4].map((y) => ({ x, y })));
    expect(maxSpanOf(pts)).toBe(4);
    const p = newProject({ floors: [fl(0), fl(1)], params: { ...DEFAULT_PARAMS }, structure: { ...DEFAULT_STRUCTURE, maxSpanOverride: 6 } });
    const r = computeStructure(p)!;
    // 6000/18,5 = 324 → dibulatkan ke 350
    expect(r.beam.h).toBe(350);
    // pelat dua arah: ℓn = 5,75 m → 5750 × (0,8+0,3)/45 = 140,6 → 150 mm
    expect(r.slab!.t).toBe(150);
  });

  it("kolom: Pu & Ag konsisten dengan rumus Ag ≥ Pu/(0,35 f'c)", () => {
    const p = newProject({ floors: [fl(0), fl(1), fl(2)], params: { ...DEFAULT_PARAMS }, structure: { ...DEFAULT_STRUCTURE, tributaryOverride: 16 } });
    const r = computeStructure(p)!;
    expect(r.column.AgReq).toBe(Math.round((r.column.Pu * 1000) / (0.35 * 25)));
    expect(r.column.b * r.column.h).toBeGreaterThanOrEqual(r.column.AgReq);
    expect(LOADS.liveHunian).toBe(1.92);
  });
});

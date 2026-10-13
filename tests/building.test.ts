import { describe, expect, it } from "vitest";
import { DEFAULT_PARAMS, samplePlan } from "../src/lib/defaults";
import { defaultPriceDb } from "../src/lib/pricing";
import { computeRab } from "../src/lib/rab";
import { newProject } from "../src/lib/store";
import { slabArea, takeoffBuilding } from "../src/lib/building";
import type { Floor } from "../src/lib/types";

const db = defaultPriceDb();
const P = { ...DEFAULT_PARAMS, wallHeight: 3.5 };
const fl = (level: number): Floor => ({ id: `f${level}`, name: `Lantai ${level + 1}`, level, plan: samplePlan(), imageDataUrl: null, analyzeMeta: null });

describe("bangunan bertingkat", () => {
  it("satu lantai lewat floors = identik dengan jalur lama", () => {
    const a = computeRab(newProject({ plan: samplePlan(), params: P }), db)!.rab.grandTotalRounded;
    const b = computeRab(newProject({ floors: [fl(0)], params: P }), db)!.rab.grandTotalRounded;
    expect(b).toBe(a);
  });

  it("3 lantai: pondasi & persiapan sekali, atap sekali, pelat 2 lantai, balok & tangga 2×", () => {
    const b = takeoffBuilding([fl(0), fl(1), fl(2)], P)!;
    const one = takeoffBuilding([fl(0)], P)!;
    const v = (items: typeof b.items, code: string) => items.find((i) => i.code === code)?.volume ?? 0;
    // sekali per gedung
    for (const code of ["PRS.BERSIH", "STR.STRAUSS", "STR.SLOOF", "STR.RABAT", "ATP.RANGKA", "AIR.SEPTIC"]) expect(v(b.items, code), code).toBeCloseTo(v(one.items, code), 3);
    // per lantai
    expect(v(b.items, "PAS.BATARINGAN")).toBeCloseTo(3 * v(one.items, "PAS.BATARINGAN"), 2);
    expect(v(b.items, "STR.KOLOM")).toBeCloseTo(3 * v(one.items, "STR.KOLOM"), 2);
    expect(v(b.items, "STR.PELAT")).toBeCloseTo(2 * slabArea(samplePlan()) * 0.12, 2);
    expect(b.items.find((i) => i.code === "STR.BALOK")!.formula.split("|").length).toBe(2);
    expect(b.items.find((i) => i.code === "STR.TANGGA")!.formula.split("|").length).toBe(2);
    // ring balok hanya lantai teratas
    expect(v(b.items, "STR.RINGBALOK")).toBeCloseTo(v(one.items, "STR.RINGBALOK"), 3);
    // tidak ada kode ganda
    expect(new Set(b.items.map((i) => i.code)).size).toBe(b.items.length);
  });

  it("RAB 3 lantai lebih mahal & luas bruto bertambah", () => {
    const one = computeRab(newProject({ floors: [fl(0)], params: P }), db)!.rab;
    const three = computeRab(newProject({ floors: [fl(0), fl(1), fl(2)], params: P }), db)!.rab;
    expect(three.grandTotalRounded).toBeGreaterThan(2 * one.grandTotalRounded);
    expect(three.grossArea).toBeCloseTo(72 + 2 * slabArea(samplePlan()), 1);
    for (const l of three.sections.flatMap((s) => s.lines)) expect(l.unitPrice, l.code).toBeGreaterThan(0);
  });
});

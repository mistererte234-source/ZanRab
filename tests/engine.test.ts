import { describe, expect, it } from "vitest";
import { DEFAULT_PARAMS, samplePlan } from "../src/lib/defaults";
import { detectColumns, normalizePlan, planMetrics, validatePlan } from "../src/lib/geometry";
import { ahspUnitPrice, defaultPriceDb } from "../src/lib/pricing";
import { computeRab, terbilang } from "../src/lib/rab";
import { takeoff } from "../src/lib/takeoff";
import type { Project } from "../src/lib/types";

const vol = (items: { code: string; volume: number }[], code: string) => items.find((i) => i.code === code)?.volume ?? 0;

describe("geometry — denah KAMAL", () => {
  const plan = samplePlan();
  it("rantai dimensi valid & tanpa error", () => {
    const issues = validatePlan(plan);
    expect(issues.filter((i) => i.level === "error")).toEqual([]);
  });
  it("metrik sesuai take-off manual", () => {
    const m = planMetrics(plan);
    expect(m.grossArea).toBe(72);
    expect(m.wallLength).toBeCloseTo(61.15, 2);
    expect(m.netFloorArea).toBeCloseTo(62.94, 1); // 61,31 ruang dalam + teras 2,4 × 0,68
    expect(m.doors).toBe(7);
    expect(m.windowLeaves).toBe(7);
  });
  it("normalisasi idempoten pada plan bersih", () => {
    const n = normalizePlan(plan);
    expect(planMetrics(n).wallLength).toBeCloseTo(61.15, 2);
    expect(n.openings.every((o) => o.wallId)).toBe(true);
  });
  it("normalisasi memperbaiki koordinat AI yang meleset", () => {
    const noisy = samplePlan();
    noisy.walls[6].a.x += 0.06; // K.Anak1 kanan meleset 6 cm
    noisy.walls[6].b.x -= 0.05;
    const n = normalizePlan(noisy);
    expect(n.walls[6].a.x).toBeCloseTo(3.225, 3);
    expect(n.walls[6].b.x).toBeCloseTo(3.225, 3);
  });
  it("deteksi kolom", () => {
    const cols = detectColumns(plan.walls, 4);
    expect(cols.length).toBeGreaterThanOrEqual(17);
    expect(cols.length).toBeLessThanOrEqual(24);
  });
});

describe("takeoff", () => {
  const { items, ctx } = takeoff(samplePlan(), { ...DEFAULT_PARAMS, wallHeight: 3.51, fillHeight: 0.7 });
  it("dinding dikurangi bukaan", () => {
    expect(vol(items, "PAS.BATARINGAN")).toBeCloseTo(61.15 * 3.51 - 21.77, 0);
  });
  it("urugan hanya sekali", () => {
    expect(items.filter((i) => i.code === "TNH.URUG").length).toBe(1);
  });
  it("keramik dinding KM wajar (8-12 m2)", () => {
    const v = vol(items, "LNT.DINDINGKM");
    expect(v).toBeGreaterThan(8);
    expect(v).toBeLessThan(12);
  });
  it("cat interior < plester", () => {
    expect(vol(items, "CAT.INT")).toBeLessThan(vol(items, "PAS.PLESTER"));
  });
  it("atap pelana 30° dengan overstek 0.6", () => {
    expect(ctx.roofArea).toBeCloseTo((10.2 * 9.2) / Math.cos(Math.PI / 6), 1);
    expect(vol(items, "ATP.WUWUNG")).toBeCloseTo(10.2, 2);
  });
  it("MEP rule-of-thumb mendekati RAB referensi", () => {
    expect(vol(items, "LST.LAMPU")).toBe(10);
    expect(vol(items, "AIR.PVC4")).toBe(6);
    expect(vol(items, "AIR.CLOSET")).toBe(1);
  });
  it("cetak ringkasan", () => {
    for (const i of items) console.log(i.code.padEnd(18), String(i.volume).padStart(9), i.unit.padEnd(5), i.formula);
    expect(items.length).toBeGreaterThan(30);
  });
});

describe("pricing & rab", () => {
  const db = defaultPriceDb();
  it("AHSP beton K-225 dalam rentang wajar", () => {
    const p = ahspUnitPrice(db, "A.K225");
    expect(p).toBeGreaterThan(900_000);
    expect(p).toBeLessThan(1_600_000);
  });
  it("AHSP sloof komposit > beton polos", () => {
    expect(ahspUnitPrice(db, "A.SLOOF")).toBeGreaterThan(ahspUnitPrice(db, "A.K225"));
  });
  const project: Project = {
    id: "t",
    title: "Test",
    location: "",
    createdAt: 0,
    updatedAt: 0,
    client: { name: "", address: "", phone: "" },
    imageDataUrl: null,
    plan: samplePlan(),
    analyzeMeta: null,
    params: { ...DEFAULT_PARAMS, wallHeight: 3.51, fillHeight: 0.7 },
    priceMode: "borongan",
    priceOverrides: {},
    volumeOverrides: {},
    customLines: [],
    customPrices: {},
    excluded: [],
    offerNumber: "",
    offerValidityDays: 14,
    paymentTerms: "",
    status: "draft",
  };
  it("RAB borongan & AHSP terhitung", () => {
    const b = computeRab(project, db)!;
    const a = computeRab({ ...project, priceMode: "ahsp" }, db)!;
    console.log("Borongan direct:", b.rab.directCost, "per m2:", Math.round(b.rab.directCost / 72));
    console.log("AHSP direct    :", a.rab.directCost, "per m2:", Math.round(a.rab.directCost / 72));
    for (const s of b.rab.sections) console.log(s.code.padEnd(5), s.title.padEnd(40), s.subtotal);
    expect(b.rab.directCost).toBeGreaterThan(200_000_000);
    expect(b.rab.directCost).toBeLessThan(400_000_000);
    expect(a.rab.directCost).toBeGreaterThan(0);
  });
  it("terbilang", () => {
    expect(terbilang(309246050)).toBe("tiga ratus sembilan juta dua ratus empat puluh enam ribu lima puluh");
    expect(terbilang(1115)).toBe("seribu seratus lima belas");
  });
});

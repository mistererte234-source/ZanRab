import { describe, expect, it } from "vitest";
import { DEFAULT_PARAMS, DEFAULT_MEP, samplePlan } from "../src/lib/defaults";
import { defaultPriceDb } from "../src/lib/pricing";
import { computeRab } from "../src/lib/rab";
import { newProject } from "../src/lib/store";
import { takeoffBuilding } from "../src/lib/building";
import { takeoff, septicByCapacity } from "../src/lib/takeoff";
import { ASSUMED_LABOR } from "../src/lib/schedule";
import type { Floor } from "../src/lib/types";

const P = { ...DEFAULT_PARAMS, wallHeight: 3.5 };
const fl = (level: number, height = 3.5): Floor => ({ id: `f${level}`, name: `Lantai ${level + 1}`, level, plan: samplePlan(), imageDataUrl: null, analyzeMeta: null, height });
const v = (items: { code: string; volume: number }[], code: string) => items.find((i) => i.code === code)?.volume ?? 0;

describe("MEP kos / gedung bertingkat", () => {
  it("default tidak mengubah RAB rumah 1 lantai (Kamal tetap)", () => {
    const demo = { ...DEFAULT_PARAMS, wallHeight: 3.51, fillHeight: 0.7, demolitionLumpSum: 5_000_000, kitchenCounterLength: 2.5 };
    const r = computeRab(newProject({ plan: samplePlan(), params: demo }), defaultPriceDb())!;
    expect(r.rab.grandTotalRounded).toBe(332306000);
  });

  it("septic sesuai penghuni: 21 kamar × 1 orang ÷ 10 = 3 unit", () => {
    expect(septicByCapacity(21, { occupantsPerRoom: 1, septicUnitCapacity: 10 }).units).toBe(3);
    expect(septicByCapacity(21, { occupantsPerRoom: 2, septicUnitCapacity: 10 }).units).toBe(5);
  });

  it("gedung 3 lantai: septic kapasitas dihitung dari kamar seluruh lantai, sekali", () => {
    const kamar1 = samplePlan().rooms.filter((r) => r.type === "kamar").length;
    const mep = { ...DEFAULT_MEP, septicMode: "kapasitas" as const, occupantsPerRoom: 2, septicUnitCapacity: 10 };
    const b = takeoffBuilding([fl(0), fl(1), fl(2)], { ...P, mep })!;
    expect(v(b.items, "AIR.SEPTIC")).toBe(0);
    expect(v(b.items, "AIR.SEPTICKAP")).toBe(Math.ceil((3 * kamar1 * 2) / 10));
  });

  it("pipa tegak & feeder: lantai 3 turun 2 lantai, lantai 2 turun 1 lantai", () => {
    const km = v(takeoff(samplePlan(), P).items, "AIR.CLOSET");
    const stacks = Math.max(1, Math.ceil(km / 2));
    const b = takeoffBuilding([fl(0), fl(1), fl(2)], P)!;
    expect(v(b.items, "AIR.RISER4")).toBe(Math.ceil(stacks * 3.5 + stacks * 7));
    expect(v(b.items, "AIR.RISER1")).toBe(Math.ceil(10.5 + 3));
    expect(v(b.items, "LST.FEEDER")).toBe(Math.ceil(3.5 + 10 + 7 + 10));
    expect(v(b.items, "LST.PANELUTAMA")).toBe(1);
    // 1 lantai: tidak ada pipa tegak
    expect(v(takeoffBuilding([fl(0)], P)!.items, "AIR.RISER4")).toBe(0);
  });

  it("meter per kamar, detektor asap, APAR, jumlah toren", () => {
    const kamar1 = samplePlan().rooms.filter((r) => r.type === "kamar").length;
    const mep = { ...DEFAULT_MEP, roomMeter: "submeter" as const, smokeDetector: true, apar: true, tankLiters: 2000 as const, tankCount: 3 };
    const b = takeoffBuilding([fl(0), fl(1), fl(2)], { ...P, mep })!;
    expect(v(b.items, "LST.KWHSUB")).toBe(3 * kamar1);
    expect(v(b.items, "LST.SMOKE")).toBe(3 * (kamar1 + 1));
    expect(v(b.items, "LST.APAR")).toBeGreaterThanOrEqual(3);
    expect(v(b.items, "AIR.TOREN2000")).toBe(3);
  });

  it("semua kode baru punya harga & data tenaga", () => {
    const db = defaultPriceDb();
    for (const c of ["LST.KWHSUB", "LST.KWHPLN", "LST.PANELUTAMA", "LST.FEEDER", "LST.SMOKE", "LST.APAR", "AIR.RISER4", "AIR.RISER1", "AIR.TALANGTEGAK", "AIR.SEPTICKAP"]) {
      expect(JSON.stringify(db).includes(`"${c}"`), c).toBe(true);
      expect(ASSUMED_LABOR[c], c).toBeDefined();
    }
  });
});

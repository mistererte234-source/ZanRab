import { describe, expect, it } from "vitest";
import { DEFAULT_MEP, DEFAULT_PARAMS, samplePlan } from "../src/lib/defaults";
import { defaultPriceDb, mergePriceDb } from "../src/lib/pricing";
import { computeRab } from "../src/lib/rab";
import { newProject } from "../src/lib/store";
import { takeoff } from "../src/lib/takeoff";
import { computeSchedule } from "../src/lib/schedule";
import type { MepParams } from "../src/lib/types";

const db = defaultPriceDb();
const baseParams = { ...DEFAULT_PARAMS, wallHeight: 3.51, fillHeight: 0.7 };

describe("MEP lanjutan", () => {
  it("default MEP tidak mengubah RAB lama (total RAB Kamal sebelum fitur MEP)", () => {
    const demo = { ...baseParams, demolitionLumpSum: 5_000_000, kitchenCounterLength: 2.5 };
    const a = computeRab(newProject({ plan: samplePlan(), params: demo }), db)!.rab.grandTotalRounded;
    const b = computeRab(newProject({ plan: samplePlan(), params: { ...demo, mep: DEFAULT_MEP } }), db)!.rab.grandTotalRounded;
    // angka acuan dihitung dari kode sebelum fitur MEP ditambahkan
    expect(a).toBe(332_306_000);
    expect(b).toBe(332_306_000);
  });

  it("menghitung item MEP dari denah & parameter", () => {
    const mep: MepParams = {
      ...DEFAULT_MEP,
      ac: "semua_kamar",
      exhaustFan: true,
      waterHeater: true,
      waterSource: "sumur_bor",
      wellDepth: 30,
      tankLiters: 1050,
      tankTower: true,
      plnVa: 2200,
      grounding: true,
      tvPoints: 2,
      lanPoints: 3,
      cctvCameras: 4,
      doorbell: true,
      drainage: true,
    };
    const { items } = takeoff(samplePlan(), { ...baseParams, mep });
    const v = (code: string) => items.find((i) => i.code === code)?.volume;
    const plan = samplePlan();
    const kamar = plan.rooms.filter((r) => r.type === "kamar").length;
    const km = plan.rooms.filter((r) => r.type === "kamar_mandi").length;
    const dapur = plan.rooms.filter((r) => r.type === "dapur").length;
    expect(v("MEK.ACUNIT")).toBe(kamar);
    expect(v("MEK.ACINSTAL")).toBe(kamar);
    expect(v("MEK.EXHAUST")).toBe(km + dapur);
    expect(v("MEK.WATERHEATER")).toBe(km);
    expect(v("AIR.SUMURBOR")).toBe(30);
    expect(v("AIR.POMPAJET")).toBe(1);
    expect(v("AIR.POMPA")).toBeUndefined();
    expect(v("AIR.PDAM")).toBeUndefined();
    expect(v("AIR.TOREN1050")).toBe(1);
    expect(v("AIR.MENARA")).toBe(1);
    expect(v("LST.PLN")).toBe(2200);
    expect(v("LST.CCTV")).toBe(4);
    expect(v("LST.DVR")).toBe(1);
    expect(v("AIR.DRAINASE")).toBe(Math.ceil(2 * (9 + 8) + 4));
    expect(v("AIR.BAKKONTROL")).toBe(4 + km);

    const p = newProject({ plan: samplePlan(), params: { ...baseParams, mep } });
    const rab = computeRab(p, db)!.rab;
    const mepLines = rab.sections.flatMap((s) => s.lines).filter((l) => /^(MEK|AIR\.(PDAM|SUMUR|POMPA|TOREN|MENARA|DRAIN|BAKK)|LST\.(PLN|GROUND|PETIR|TV|LAN|CCTV|DVR|BEL))/.test(l.code));
    expect(mepLines.length).toBeGreaterThan(10);
    for (const l of mepLines) expect(l.unitPrice, l.code).toBeGreaterThan(0);
    // jadwal tetap terhitung & butuh instalatir
    const s = computeSchedule(p, rab, db);
    expect(s.ohByTrade.instalatir).toBeGreaterThan(20);
    console.log("MEP lengkap:", rab.grandTotalRounded, "instalatir OH", Math.round(s.ohByTrade.instalatir), "hari", s.calendarDays);
  });

  it("PDAM + toren → pompa pendorong", () => {
    const { items } = takeoff(samplePlan(), { ...baseParams, mep: { ...DEFAULT_MEP, waterSource: "pdam", tankLiters: 520 } });
    expect(items.find((i) => i.code === "AIR.POMPADORONG")?.volume).toBe(1);
    expect(items.find((i) => i.code === "AIR.PDAM")?.volume).toBe(1);
  });

  it("database lama pengguna mendapat item baru tanpa menimpa harga yang diedit", () => {
    const old = defaultPriceDb();
    old.catalog = old.catalog.filter((c) => !c.code.startsWith("MEK.") && c.code !== "AIR.TOREN520");
    old.catalog.find((c) => c.code === "LST.LAMPU")!.borongan = 999;
    const merged = mergePriceDb(old);
    expect(merged.catalog.find((c) => c.code === "MEK.ACUNIT")?.borongan).toBeGreaterThan(0);
    expect(merged.catalog.find((c) => c.code === "AIR.TOREN520")).toBeTruthy();
    expect(merged.catalog.find((c) => c.code === "LST.LAMPU")?.borongan).toBe(999);
  });
});

describe("item RAB yang tidak dicentang", () => {
  it("tetap tersedia untuk dicentang lagi & tidak dihitung", () => {
    const params = { ...baseParams, demolitionLumpSum: 5_000_000, kitchenCounterLength: 2.5 };
    const full = computeRab(newProject({ plan: samplePlan(), params }), db)!.rab;
    const p = newProject({ plan: samplePlan(), params, excluded: ["STR.KOLOM"] });
    const r = computeRab(p, db)!.rab;
    const kolom = full.sections.flatMap((s) => s.lines).find((l) => l.code === "STR.KOLOM")!;
    expect(r.excludedLines.map((l) => l.code)).toEqual(["STR.KOLOM"]);
    expect(r.sections.flatMap((s) => s.lines).some((l) => l.code === "STR.KOLOM")).toBe(false);
    expect(r.directCost).toBe(full.directCost - kolom.total);
  });
});

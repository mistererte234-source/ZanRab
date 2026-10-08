import { describe, expect, it } from "vitest";
import { DEFAULT_PARAMS, samplePlan } from "../src/lib/defaults";
import { defaultPriceDb } from "../src/lib/pricing";
import { computeRab } from "../src/lib/rab";
import { newProject } from "../src/lib/store";
import { bottleneck, computeSchedule, DEFAULT_SCHEDULE, recommendCrew, weekReaching, workDayToDate } from "../src/lib/schedule";
import type { Project } from "../src/lib/types";

const db = defaultPriceDb();
function demo(patch: Partial<Project> = {}): Project {
  return newProject({
    plan: samplePlan(),
    params: { ...DEFAULT_PARAMS, wallHeight: 3.51, fillHeight: 0.7, demolitionLumpSum: 5_000_000, kitchenCounterLength: 2.5 },
    ...patch,
  });
}
const rabOf = (p: Project) => computeRab(p, db)!.rab;

describe("estimasi jadwal & tenaga kerja", () => {
  it("menghasilkan durasi positif dan memecah kenek/kuli", () => {
    const p = demo();
    const s = computeSchedule(p, rabOf(p), db);
    expect(s.workDays).toBeGreaterThan(10);
    expect(s.calendarDays).toBeGreaterThanOrEqual(s.workDays);
    expect(s.ohByTrade.kenek).toBeGreaterThan(0);
    expect(s.ohByTrade.kuli).toBeGreaterThan(0);
    expect(s.weeklyProgress[s.weeklyProgress.length - 1]).toBe(1);
    // progres kumulatif tidak pernah turun
    for (let i = 1; i < s.weeklyProgress.length; i++) expect(s.weeklyProgress[i]).toBeGreaterThanOrEqual(s.weeklyProgress[i - 1]);
    console.log(
      "DEMO:",
      JSON.stringify({
        workDays: s.workDays,
        calendarDays: s.calendarDays,
        weeks: s.weeks,
        oh: Object.fromEntries(Object.entries(s.ohByTrade).map(([k, v]) => [k, Math.round(v)])),
        assumedShare: Math.round(s.ohAssumedShare * 100) + "%",
        noLabor: s.itemsWithoutLabor,
        wages: s.wages,
        week50: weekReaching(s, 0.5),
        week90: weekReaching(s, 0.9),
        sections: s.sections.map((x) => `${x.code}:${Math.round(x.start)}+${Math.round(x.days)}`).join(" "),
      }),
    );
  });

  it("tenaga kurang → lebih lama, tenaga lebih → lebih cepat", () => {
    const base = demo();
    const few = demo({ schedule: { ...DEFAULT_SCHEDULE, crew: { ...DEFAULT_SCHEDULE.crew, batu: 1, kenek: 1 } } });
    const many = demo({ schedule: { ...DEFAULT_SCHEDULE, crew: { ...DEFAULT_SCHEDULE.crew, batu: 4, kenek: 6, kuli: 4 } } });
    const d = (p: Project) => computeSchedule(p, rabOf(p), db).calendarDays;
    expect(d(few)).toBeGreaterThan(d(base));
    expect(d(many)).toBeLessThan(d(base));
    console.log("CREW:", d(few), d(base), d(many), JSON.stringify(bottleneck(base, rabOf(base), db)));
  });

  it("rekomendasi tim memenuhi target yang realistis", () => {
    const p = demo();
    const target = 100;
    const r = recommendCrew(p, rabOf(p), db, target);
    expect(r.reachable).toBe(true);
    expect(r.calendarDays).toBeLessThanOrEqual(target);
    const check = computeSchedule(p, rabOf(p), db, { crew: r.crew }).calendarDays;
    expect(check).toBe(r.calendarDays);
    console.log("REKOMENDASI 100 hari:", JSON.stringify(r));
  });

  it("faktor produktivitas mempercepat", () => {
    const a = demo();
    const b = demo({ schedule: { ...DEFAULT_SCHEDULE, productivity: 1.3 } });
    const d = (p: Project) => computeSchedule(p, rabOf(p), db).calendarDays;
    expect(d(b)).toBeLessThan(d(a));
    console.log("PROD 1.3:", d(b));
  });

  it("override durasi manual dipakai", () => {
    const p = demo({ schedule: { ...DEFAULT_SCHEDULE, overrideCalendarDays: 150 } });
    const s = computeSchedule(p, rabOf(p), db);
    expect(s.calendarDays).toBe(150);
    expect(s.overridden).toBe(true);
  });

  it("tanggal kerja melewati hari Minggu", () => {
    // 2026-10-05 = Senin
    expect(workDayToDate("2026-10-05", 6, 6).toDateString()).toBe(new Date("2026-10-12T00:00:00").toDateString());
  });
});

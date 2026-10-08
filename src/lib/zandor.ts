/**
 * Kontrak data ZanRab → ZanDor ("Rencana Kerja").
 *
 * Satu file JSON berisi semua yang dibutuhkan ZanDor untuk memulai proyek:
 * data proyek & owner, anggaran, tahapan jadwal (dengan tanggal bila tanggal mulai diisi),
 * rencana tenaga kerja per peran + upah harian, termin, dan item RAB.
 *
 * Skema diberi versi (`schema`) agar ZanDor bisa menolak / memigrasi versi yang tidak dikenal.
 */
import type { Company, Project, RabResult, TradeId } from "./types";
import { SUPERVISORS, TRADES, workDayToDate, weekReaching, type ScheduleResult } from "./schedule";

export const ZANDOR_SCHEMA = "zanrab.rencana-kerja/v1";

/** Kode peran yang dipakai di ZanDor */
export const ZANDOR_ROLE: Record<TradeId | "mandor" | "kepalaTukang", string> = {
  mandor: "mandor",
  kepalaTukang: "kepala_tukang",
  batu: "tukang_batu",
  kayu: "tukang_kayu",
  besi: "tukang_besi",
  cat: "tukang_cat",
  kenek: "kenek",
  kuli: "kuli",
  instalatir: "instalatir",
};

export interface ZandorPlanV1 {
  schema: typeof ZANDOR_SCHEMA;
  exportedAt: string;
  source: { app: "ZanRab"; projectId: string };
  project: {
    title: string;
    location: string;
    client: { name: string; phone: string; address: string };
    contractor: { name: string; phone: string; director: string };
    offerNumber: string;
    status: Project["status"];
  };
  budget: {
    directCost: number;
    overheadProfit: number;
    ppn: number;
    total: number;
    grossAreaM2: number;
    costPerM2: number;
    priceMode: Project["priceMode"];
  };
  schedule: {
    startDate: string | null;
    endDate: string | null;
    workDaysPerWeek: number;
    workDays: number;
    calendarDays: number;
    weeks: number;
    productivityFactor: number;
    manualOverride: boolean;
    phases: {
      code: string;
      title: string;
      budget: number;
      startWorkDay: number;
      endWorkDay: number;
      startDate: string | null;
      endDate: string | null;
      /** orang-hari per peran untuk tahap ini */
      laborDays: Record<string, number>;
    }[];
  };
  workforce: {
    role: string;
    label: string;
    count: number;
    dailyWage: number;
    /** total orang-hari yang dibutuhkan selama proyek (null untuk pengawas) */
    laborDaysNeeded: number | null;
  }[];
  wages: { total: number; weeklyAverage: number; weeklyPeak: number };
  payment: {
    terms: string;
    /** perkiraan minggu (dan tanggal) saat progres biaya mencapai persentase yang disebut di termin */
    milestones: { progressPct: number; week: number; date: string | null }[];
  };
  /** progres biaya kumulatif rencana di akhir tiap minggu (0–100) — kurva S */
  plannedProgressByWeek: number[];
  rabItems: { section: string; code: string; name: string; unit: string; volume: number; unitPrice: number; total: number }[];
}

const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

/** Persentase progres yang disebut di teks termin, mis. "progres 50%" → 50 */
export function progressMilestonesFromTerms(terms: string): number[] {
  const out = new Set<number>();
  for (const m of terms.matchAll(/progres\w*\s*(\d{1,3})\s*%/gi)) {
    const v = parseInt(m[1], 10);
    if (v > 0 && v <= 100) out.add(v);
  }
  return [...out].sort((a, b) => a - b);
}

export function buildZandorPlan(project: Project, rab: RabResult, company: Company, s: ScheduleResult, productivity: number): ZandorPlanV1 {
  const start = s.startDate;
  const dateAt = (wd: number) => (start ? iso(workDayToDate(start, wd, s.workDaysPerWeek)) : null);
  const r1 = (v: number) => Math.round(v * 10) / 10;

  const workforce: ZandorPlanV1["workforce"] = [
    ...SUPERVISORS.filter((x) => s.supervisors[x.id] > 0).map((x) => ({
      role: ZANDOR_ROLE[x.id],
      label: x.label,
      count: s.supervisors[x.id],
      dailyWage: s.wages.dailyRate[x.id],
      laborDaysNeeded: null,
    })),
    ...TRADES.filter((t) => s.ohByTrade[t.id] > 0 || s.crew[t.id] > 0).map((t) => ({
      role: ZANDOR_ROLE[t.id],
      label: t.label,
      count: s.crew[t.id],
      dailyWage: s.wages.dailyRate[t.id],
      laborDaysNeeded: r1(s.ohByTrade[t.id] / Math.max(0.3, productivity || 1)),
    })),
  ];

  return {
    schema: ZANDOR_SCHEMA,
    exportedAt: new Date().toISOString(),
    source: { app: "ZanRab", projectId: project.id },
    project: {
      title: project.title,
      location: project.location,
      client: { name: project.client.name, phone: project.client.phone, address: project.client.address },
      contractor: { name: company.name, phone: company.phone, director: company.director },
      offerNumber: project.offerNumber,
      status: project.status,
    },
    budget: {
      directCost: rab.directCost,
      overheadProfit: rab.overheadProfit,
      ppn: rab.ppn,
      total: rab.grandTotalRounded,
      grossAreaM2: rab.grossArea,
      costPerM2: Math.round(rab.costPerM2),
      priceMode: project.priceMode,
    },
    schedule: {
      startDate: start,
      endDate: dateAt(Math.max(0, s.workDays - 1)),
      workDaysPerWeek: s.workDaysPerWeek,
      workDays: s.workDays,
      calendarDays: s.calendarDays,
      weeks: s.weeks,
      productivityFactor: productivity,
      manualOverride: s.overridden,
      phases: s.sections.map((p) => ({
        code: p.code,
        title: p.title,
        budget: p.subtotal,
        startWorkDay: Math.round(p.start),
        endWorkDay: Math.round(p.start + p.days),
        startDate: dateAt(Math.round(p.start)),
        endDate: dateAt(Math.max(Math.round(p.start), Math.round(p.start + p.days) - 1)),
        laborDays: Object.fromEntries(
          Object.entries(p.oh)
            .filter(([, v]) => (v ?? 0) > 0)
            .map(([k, v]) => [ZANDOR_ROLE[k as TradeId], r1((v ?? 0) / Math.max(0.3, productivity || 1))]),
        ),
      })),
    },
    workforce,
    wages: { total: s.wages.total, weeklyAverage: s.wages.weeklyAverage, weeklyPeak: s.wages.weeklyPeak },
    payment: {
      terms: project.paymentTerms,
      milestones: progressMilestonesFromTerms(project.paymentTerms).map((pct) => {
        const week = weekReaching(s, pct / 100);
        const wd = Math.min(s.workDays - 1, Math.round((week * s.workDays) / s.weeks) - 1);
        return { progressPct: pct, week, date: dateAt(Math.max(0, wd)) };
      }),
    },
    plannedProgressByWeek: s.weeklyProgress.map((v) => Math.round(v * 1000) / 10),
    rabItems: rab.sections.flatMap((sec) =>
      sec.lines.map((l) => ({
        section: sec.code,
        code: l.code,
        name: l.name,
        unit: l.unit,
        volume: Math.round(l.volume * 1000) / 1000,
        unitPrice: l.unitPrice,
        total: l.total,
      })),
    ),
  };
}

export function downloadJson(filename: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export const zandorFileName = (p: Project) =>
  `rencana-kerja-${p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "proyek"}.zandor.json`;

/**
 * Estimasi waktu pelaksanaan & kebutuhan tenaga kerja.
 *
 * Cara hitung:
 *  1. Orang-hari (OH) per jenis tenaga untuk setiap item RAB:
 *     - item dengan analisa AHSP → koefisien upah AHSP × volume (rekursif untuk analisa komposit);
 *       kepala tukang & mandor tidak dihitung sebagai pembatas karena mengawasi, bukan mengerjakan.
 *     - item tanpa AHSP → tabel produktivitas ASUMSI di bawah (ditandai "asumsi" di tampilan).
 *  2. Durasi tiap bagian = OH jenis tenaga paling berat ÷ jumlah orang jenis itu
 *     (jenis tenaga yang paling kurang menentukan), minimal sekian hari (mis. waktu curing beton).
 *  3. Bagian disusun berurutan dengan tumpang tindih yang wajar untuk rumah tinggal.
 *  4. Batas bawah: total OH tiap jenis tenaga ÷ jumlah orangnya (satu tim tidak bisa di dua tempat).
 *
 * ⚠️ Hasilnya estimasi kasar: cuaca, keterlambatan material, dan hari libur tidak dihitung.
 */
import type { CrewCounts, Project, RabResult, ScheduleSettings, SupervisorCounts, TradeId } from "./types";
import { SECTIONS, type PriceDb } from "./pricing";

/**
 * Jenis tenaga. `rateRef` = kode upah di database harga (dipakai untuk estimasi upah).
 * Kenek & kuli sama-sama "Pekerja" di AHSP: pekerja yang membantu tukang dihitung kenek,
 * pekerja yang bekerja tanpa tukang (gali, urug, bersih) dihitung kuli.
 */
export const TRADES: { id: TradeId; label: string; group: "tukang" | "pembantu" | "spesialis"; rateRef: string }[] = [
  { id: "batu", label: "Tukang batu", group: "tukang", rateRef: "L.02" },
  { id: "kayu", label: "Tukang kayu / baja ringan", group: "tukang", rateRef: "L.03" },
  { id: "besi", label: "Tukang besi", group: "tukang", rateRef: "L.04" },
  { id: "cat", label: "Tukang cat", group: "tukang", rateRef: "L.05" },
  { id: "kenek", label: "Kenek (pembantu tukang)", group: "pembantu", rateRef: "L.01" },
  { id: "kuli", label: "Kuli (gali, angkut, bersih)", group: "pembantu", rateRef: "L.01" },
  { id: "instalatir", label: "Instalatir listrik & air", group: "spesialis", rateRef: "L.02" },
];

export const SUPERVISORS: { id: keyof SupervisorCounts; label: string; rateRef: string }[] = [
  { id: "mandor", label: "Mandor", rateRef: "L.07" },
  { id: "kepalaTukang", label: "Kepala tukang", rateRef: "L.06" },
];

type RawKey = "pekerja" | Exclude<TradeId, "kuli" | "kenek">;
const RESOURCE_TO_RAW: Record<string, RawKey> = { "L.01": "pekerja", "L.02": "batu", "L.03": "kayu", "L.04": "besi", "L.05": "cat" };

export const DEFAULT_SCHEDULE: ScheduleSettings = {
  crew: { batu: 2, kayu: 1, besi: 1, cat: 1, kenek: 4, kuli: 2, instalatir: 1 },
  supervisors: { mandor: 1, kepalaTukang: 0 },
  startDate: null,
  productivity: 1,
  workDaysPerWeek: 6,
  targetCalendarDays: null,
  overrideCalendarDays: null,
};

export function scheduleSettingsOf(p: Project): ScheduleSettings {
  const s = p.schedule;
  return {
    ...DEFAULT_SCHEDULE,
    ...(s ?? {}),
    crew: { ...DEFAULT_SCHEDULE.crew, ...(s?.crew ?? {}) },
    supervisors: { ...DEFAULT_SCHEDULE.supervisors, ...(s?.supervisors ?? {}) },
  };
}

type Labor = Partial<Record<TradeId, number>>;
type RawLabor = Partial<Record<RawKey, number>>;

/**
 * Produktivitas ASUMSI (OH per satuan) untuk item tanpa analisa AHSP di database.
 * Angka perkiraan umum untuk rumah tinggal — bukan dari standar resmi. Sesuaikan dengan tim sendiri.
 */
export const ASSUMED_LABOR: Record<string, RawLabor> = {
  "PRS.BONGKAR": { pekerja: 12 }, // per lump sum
  "PRS.BERSIH": { pekerja: 0.05 },
  "PRS.BOUWPLANK": { pekerja: 0.1, kayu: 0.1 },
  "TNH.GALSTRAUSS": { pekerja: 0.3 },
  "TNH.GALPILECAP": { pekerja: 0.5 },
  "PAS.KUMBUNG": { pekerja: 0.6, batu: 0.3 },
  "PAS.BATAKO": { pekerja: 0.3, batu: 0.1 },
  "ATP.RANGKA": { kayu: 0.08, pekerja: 0.04 },
  "ATP.GENTENGBETON": { kayu: 0.06, pekerja: 0.1 },
  "ATP.GENTENGMETAL": { kayu: 0.04, pekerja: 0.04 },
  "ATP.SPANDEK": { kayu: 0.03, pekerja: 0.03 },
  "ATP.WUWUNG": { batu: 0.1, pekerja: 0.1 },
  "ATP.LISPLANG": { kayu: 0.1 },
  "ATP.TALANG": { kayu: 0.08 },
  "ATP.WATERPROOF": { batu: 0.05, pekerja: 0.05 },
  "KSN.ALU": { kayu: 0.12 },
  "KSN.JENDELA": { kayu: 0.4 },
  "KSN.PINTUKAYU": { kayu: 0.6 },
  "KSN.PINTUPVC": { kayu: 0.3 },
  "LNT.PLINT": { batu: 0.06, pekerja: 0.03 },
  "LST.SAKLAR1": { instalatir: 0.3 },
  "LST.SAKLAR2": { instalatir: 0.3 },
  "LST.LAMPU": { instalatir: 0.3 },
  "LST.STOPKONTAK": { instalatir: 0.3 },
  "LST.MCB": { instalatir: 0.5 },
  "AIR.PVC4": { instalatir: 0.1 },
  "AIR.PVC3": { instalatir: 0.1 },
  "AIR.PVC34": { instalatir: 0.1 },
  "AIR.BAKMANDI": { instalatir: 0.5 },
  "AIR.FLOORDRAIN": { instalatir: 0.2 },
  "AIR.KRAN": { instalatir: 0.1 },
  "AIR.CLOSET": { instalatir: 1 },
  "AIR.SINK": { instalatir: 0.8 },
  "AIR.SEPTIC": { instalatir: 2, pekerja: 4 },
  "LL.MEJADAPUR": { batu: 1, pekerja: 0.5 },
  // MEP lanjutan (asumsi)
  "MEK.ACUNIT": {},
  "MEK.ACINSTAL": { instalatir: 0.5, pekerja: 0.25 },
  "MEK.ACPIPA": { instalatir: 0.1 },
  "MEK.EXHAUST": { instalatir: 0.4 },
  "MEK.WATERHEATER": { instalatir: 1 },
  "LST.PLN": {},
  "LST.GROUNDING": { instalatir: 1, pekerja: 1 },
  "LST.PETIR": { instalatir: 3, pekerja: 2 },
  "LST.TV": { instalatir: 0.3 },
  "LST.LAN": { instalatir: 0.35 },
  "LST.CCTV": { instalatir: 0.5 },
  "LST.DVR": { instalatir: 0.5 },
  "LST.BEL": { instalatir: 0.25 },
  "AIR.PDAM": { instalatir: 1, pekerja: 1 },
  "AIR.SUMURBOR": { pekerja: 0.15, instalatir: 0.05 },
  "AIR.POMPA": { instalatir: 1 },
  "AIR.POMPAJET": { instalatir: 1.5 },
  "AIR.POMPADORONG": { instalatir: 1 },
  "AIR.TOREN520": { instalatir: 0.5, pekerja: 0.5 },
  "AIR.TOREN1050": { instalatir: 0.5, pekerja: 0.5 },
  "AIR.TOREN1550": { instalatir: 0.75, pekerja: 0.75 },
  "AIR.TOREN2000": { instalatir: 1, pekerja: 1 },
  "AIR.MENARA": { besi: 2, pekerja: 2 },
  "AIR.DRAINASE": { batu: 0.15, pekerja: 0.3 },
  "AIR.BAKKONTROL": { batu: 0.5, pekerja: 0.5 },
  "LL.BERSIHAKHIR": { pekerja: 4 },
};

/** Durasi minimum per bagian (hari kerja), mis. curing beton & pengeringan plester */
const MIN_DAYS: Record<string, number> = { I: 2, II: 2, III: 10, IV: 7, V: 5, VI: 3, VII: 4, VIII: 4, IX: 3, X: 3, XI: 2, XII: 1 };

/** Urutan & tumpang tindih: bagian mulai setelah [bagian, fraksi selesai] */
const DEPS: Record<string, [string, number][]> = {
  I: [],
  II: [["I", 1]],
  III: [["II", 0.5]],
  IV: [["III", 0.45]],
  V: [["III", 1], ["IV", 0.6]],
  VI: [["IV", 0.6]],
  IX: [["IV", 0.5]],
  X: [["IV", 0.4]],
  VII: [["IV", 1], ["V", 0.6]],
  VIII: [["VII", 0.5], ["V", 1]],
  XI: [["VIII", 0.7]],
  XII: [["IV", 1]],
};

function addLabor<K extends string>(into: Partial<Record<K, number>>, add: Partial<Record<K, number>>, k = 1) {
  for (const [t, v] of Object.entries(add) as [K, number][]) into[t] = (into[t] ?? 0) + v * k;
}

/** OH per satuan dari analisa AHSP (rekursif). Kepala tukang & mandor tidak dihitung (pengawas). */
export function laborOfAnalysis(db: PriceDb, code: string, depth = 0): RawLabor {
  const out: RawLabor = {};
  if (depth > 6) return out;
  const a = db.analyses.find((x) => x.code === code);
  if (!a) return out;
  for (const c of a.components) {
    const key = RESOURCE_TO_RAW[c.ref];
    if (key) out[key] = (out[key] ?? 0) + c.coef;
    else if (db.analyses.some((x) => x.code === c.ref)) addLabor(out, laborOfAnalysis(db, c.ref, depth + 1), c.coef);
  }
  return out;
}

/** "Pekerja" AHSP → kenek bila item juga dikerjakan tukang, kuli bila tidak */
function splitHelpers(raw: RawLabor): Labor {
  const { pekerja, ...rest } = raw;
  const out: Labor = { ...rest };
  if (pekerja) {
    const withTukang = Object.values(rest).some((v) => (v ?? 0) > 0);
    out[withTukang ? "kenek" : "kuli"] = pekerja;
  }
  return out;
}

export function laborPerUnit(db: PriceDb, code: string): { labor: Labor; source: "ahsp" | "asumsi" | "kosong" } {
  const cat = db.catalog.find((c) => c.code === code);
  if (cat?.ahsp) {
    const l = laborOfAnalysis(db, cat.ahsp);
    if (Object.keys(l).length) return { labor: splitHelpers(l), source: "ahsp" };
  }
  if (ASSUMED_LABOR[code]) return { labor: splitHelpers(ASSUMED_LABOR[code]), source: "asumsi" };
  return { labor: {}, source: "kosong" };
}

export interface SectionPlan {
  code: string;
  title: string;
  oh: Labor;
  ohTotal: number;
  ohAssumed: number;
  /** hari kerja (setelah penskalaan ke total) */
  start: number;
  days: number;
  subtotal: number;
  missingTrades: TradeId[];
}

export interface ScheduleResult {
  sections: SectionPlan[];
  ohByTrade: Record<TradeId, number>;
  ohTotal: number;
  ohAssumedShare: number;
  itemsWithoutLabor: string[];
  workDays: number;
  calendarDays: number;
  weeks: number;
  /** total sebelum override (hari kalender) */
  computedCalendarDays: number;
  overridden: boolean;
  crew: CrewCounts;
  supervisors: SupervisorCounts;
  crewTotal: number;
  workDaysPerWeek: number;
  startDate: string | null;
  /** Estimasi upah */
  wages: {
    /** upah harian per orang menurut database harga */
    dailyRate: Record<TradeId | keyof SupervisorCounts, number>;
    /** biaya upah menurut volume pekerjaan (koefisien AHSP/asumsi) + pengawas selama proyek */
    total: number;
    /** rata-rata upah per minggu = total ÷ jumlah minggu */
    weeklyAverage: number;
    /** upah per minggu bila seluruh tim hadir penuh (puncak) */
    weeklyPeak: number;
  };
  missingTrades: TradeId[];
  /** progres biaya kumulatif (0..1) di akhir tiap minggu kalender */
  weeklyProgress: number[];
}

interface Prepared {
  sections: { code: string; title: string; oh: Labor; ohTotal: number; ohAssumed: number; subtotal: number }[];
  ohByTrade: Record<TradeId, number>;
  ohTotal: number;
  ohAssumed: number;
  itemsWithoutLabor: string[];
}

function prepare(rab: RabResult, db: PriceDb): Prepared {
  const ohByTrade = Object.fromEntries(TRADES.map((t) => [t.id, 0])) as Record<TradeId, number>;
  let ohTotal = 0;
  let ohAssumed = 0;
  const itemsWithoutLabor: string[] = [];
  const sections = rab.sections.map((s) => {
    const oh: Labor = {};
    let secAssumed = 0;
    for (const l of s.lines) {
      const { labor, source } = laborPerUnit(db, l.code);
      if (source === "kosong") {
        if (l.volume > 0) itemsWithoutLabor.push(l.name);
        continue;
      }
      const before = Object.values(oh).reduce((a, b) => a + (b ?? 0), 0);
      addLabor(oh, labor, l.volume);
      const added = Object.values(oh).reduce((a, b) => a + (b ?? 0), 0) - before;
      if (source === "asumsi") secAssumed += added;
    }
    const total = Object.values(oh).reduce((a, b) => a + (b ?? 0), 0);
    for (const [t, v] of Object.entries(oh) as [TradeId, number][]) ohByTrade[t] += v;
    ohTotal += total;
    ohAssumed += secAssumed;
    return { code: s.code, title: SECTIONS[s.code] ?? s.title, oh, ohTotal: total, ohAssumed: secAssumed, subtotal: s.subtotal };
  });
  return { sections, ohByTrade, ohTotal, ohAssumed, itemsWithoutLabor };
}

/** Inti perhitungan: hari kerja total untuk komposisi tim tertentu */
function layout(prep: Prepared, crew: CrewCounts, productivity = 1) {
  const prod = Math.min(3, Math.max(0.3, productivity || 1));
  const placed: { code: string; start: number; days: number; missing: TradeId[] }[] = [];
  const byCode: Record<string, { start: number; days: number }> = {};
  for (const s of prep.sections) {
    let raw = 0;
    const missing: TradeId[] = [];
    for (const [t, v] of Object.entries(s.oh) as [TradeId, number][]) {
      if (!v) continue;
      const n = crew[t] ?? 0;
      if (n <= 0) missing.push(t);
      raw = Math.max(raw, v / prod / Math.max(1, n));
    }
    const days = Math.max(MIN_DAYS[s.code] ?? 1, Math.ceil(raw));
    const deps = (DEPS[s.code] ?? []).filter(([d]) => byCode[d]);
    let start = 0;
    if (deps.length) start = Math.max(...deps.map(([d, f]) => byCode[d].start + f * byCode[d].days));
    else if (placed.length) start = placed[placed.length - 1].start;
    byCode[s.code] = { start, days };
    placed.push({ code: s.code, start, days, missing });
  }
  const pathEnd = placed.reduce((m, p) => Math.max(m, p.start + p.days), 0);
  let tradeBound = 0;
  for (const t of TRADES) {
    const v = prep.ohByTrade[t.id];
    if (v > 0) tradeBound = Math.max(tradeBound, Math.ceil(v / prod / Math.max(1, crew[t.id] ?? 0)));
  }
  const workDays = Math.max(1, Math.ceil(Math.max(pathEnd, tradeBound)));
  return { placed, pathEnd: Math.max(1, pathEnd), workDays };
}

const toCalendar = (workDays: number, wdpw: number) => Math.ceil((workDays * 7) / Math.min(7, Math.max(1, wdpw)));

export function computeSchedule(project: Project, rab: RabResult, db: PriceDb, override?: Partial<ScheduleSettings>): ScheduleResult {
  const settings = { ...scheduleSettingsOf(project), ...(override ?? {}) };
  const crew = settings.crew;
  const prep = prepare(rab, db);
  const { placed, pathEnd, workDays: computedWork } = layout(prep, crew, settings.productivity);
  const computedCalendarDays = toCalendar(computedWork, settings.workDaysPerWeek);

  const overridden = !!settings.overrideCalendarDays && settings.overrideCalendarDays > 0;
  const calendarDays = overridden ? Math.round(settings.overrideCalendarDays!) : computedCalendarDays;
  const workDays = overridden ? Math.max(1, Math.round((calendarDays * settings.workDaysPerWeek) / 7)) : computedWork;
  const scale = workDays / pathEnd;

  const sections: SectionPlan[] = prep.sections.map((s, i) => ({
    ...s,
    start: placed[i].start * scale,
    days: placed[i].days * scale,
    missingTrades: placed[i].missing,
  }));

  // Kurva S: biaya tiap bagian disebar rata sepanjang durasinya
  const totalCost = sections.reduce((a, s) => a + s.subtotal, 0) || 1;
  const weeks = Math.max(1, Math.ceil(calendarDays / 7));
  const workPerWeek = workDays / weeks;
  const weeklyProgress: number[] = [];
  for (let w = 1; w <= weeks; w++) {
    const t = Math.min(workDays, w * workPerWeek);
    let done = 0;
    for (const s of sections) {
      const k = s.days > 0 ? Math.min(1, Math.max(0, (t - s.start) / s.days)) : t >= s.start ? 1 : 0;
      done += k * s.subtotal;
    }
    weeklyProgress.push(Math.min(1, done / totalCost));
  }
  weeklyProgress[weeklyProgress.length - 1] = 1;

  const missingTrades = Array.from(new Set(sections.flatMap((s) => s.missingTrades)));
  return {
    sections,
    ohByTrade: prep.ohByTrade,
    ohTotal: prep.ohTotal,
    ohAssumedShare: prep.ohTotal > 0 ? prep.ohAssumed / prep.ohTotal : 0,
    itemsWithoutLabor: prep.itemsWithoutLabor,
    workDays,
    calendarDays,
    weeks,
    computedCalendarDays,
    overridden,
    crew,
    supervisors: settings.supervisors,
    crewTotal: TRADES.reduce((a, t) => a + (crew[t.id] ?? 0), 0) + settings.supervisors.mandor + settings.supervisors.kepalaTukang,
    workDaysPerWeek: settings.workDaysPerWeek,
    startDate: settings.startDate,
    wages: computeWages(db, crew, settings.supervisors, workDays, weeks, settings.workDaysPerWeek, prep.ohByTrade, settings.productivity),
    missingTrades,
    weeklyProgress,
  };
}

function computeWages(
  db: PriceDb,
  crew: CrewCounts,
  sup: SupervisorCounts,
  workDays: number,
  weeks: number,
  wdpw: number,
  ohByTrade: Record<TradeId, number>,
  productivity: number,
): ScheduleResult["wages"] {
  const rate = (ref: string) => db.resources.find((r) => r.code === ref)?.price ?? 0;
  const dailyRate = {
    ...Object.fromEntries(TRADES.map((t) => [t.id, rate(t.rateRef)])),
    ...Object.fromEntries(SUPERVISORS.map((s) => [s.id, rate(s.rateRef)])),
  } as ScheduleResult["wages"]["dailyRate"];
  const prod = Math.min(3, Math.max(0.3, productivity || 1));
  let total = 0;
  let weeklyPeak = 0;
  for (const t of TRADES) {
    total += (ohByTrade[t.id] / prod) * dailyRate[t.id];
    if (ohByTrade[t.id] > 0) weeklyPeak += (crew[t.id] ?? 0) * dailyRate[t.id] * wdpw;
  }
  for (const s of SUPERVISORS) {
    total += sup[s.id] * dailyRate[s.id] * workDays;
    weeklyPeak += sup[s.id] * dailyRate[s.id] * wdpw;
  }
  return { dailyRate, total: Math.round(total), weeklyAverage: Math.round(total / Math.max(1, weeks)), weeklyPeak: Math.round(weeklyPeak) };
}

/** Tanggal kalender dari hari kerja ke-n (melewati hari libur mingguan: Minggu, lalu Sabtu bila 5 hari kerja) */
export function workDayToDate(startDate: string, workDayIndex: number, wdpw: number): Date {
  const d = new Date(startDate + "T00:00:00");
  const isOff = (x: Date) => {
    const dow = x.getDay(); // 0 Minggu, 6 Sabtu
    if (wdpw >= 7) return false;
    if (wdpw === 6) return dow === 0;
    return dow === 0 || dow === 6;
  };
  while (isOff(d)) d.setDate(d.getDate() + 1);
  let n = Math.max(0, Math.floor(workDayIndex));
  while (n > 0) {
    d.setDate(d.getDate() + 1);
    if (!isOff(d)) n--;
  }
  return d;
}

/** Minggu ke berapa progres biaya mencapai p (0..1) */
export function weekReaching(result: ScheduleResult, p: number): number {
  const i = result.weeklyProgress.findIndex((v) => v >= p - 1e-9);
  return i < 0 ? result.weeks : i + 1;
}

/** Jenis tenaga yang paling menahan jadwal + berapa hari kalender lebih cepat bila ditambah 1 orang */
export function bottleneck(project: Project, rab: RabResult, db: PriceDb): { trade: TradeId | null; savedDays: number } {
  const s = scheduleSettingsOf(project);
  const prep = prepare(rab, db);
  const base = toCalendar(layout(prep, s.crew, s.productivity).workDays, s.workDaysPerWeek);
  let best: { trade: TradeId | null; savedDays: number } = { trade: null, savedDays: 0 };
  for (const t of TRADES) {
    if (!(prep.ohByTrade[t.id] > 0)) continue;
    const crew = { ...s.crew, [t.id]: (s.crew[t.id] ?? 0) + 1 };
    const d = toCalendar(layout(prep, crew, s.productivity).workDays, s.workDaysPerWeek);
    if (base - d > best.savedDays) best = { trade: t.id, savedDays: base - d };
  }
  return best;
}

/**
 * Rekomendasi komposisi tim agar selesai ≤ target (hari kalender).
 * Greedy: mulai 1 orang per jenis tenaga yang dibutuhkan, tambah orang di jenis yang paling memangkas durasi.
 */
export function recommendCrew(
  project: Project,
  rab: RabResult,
  db: PriceDb,
  targetCalendarDays: number,
): { crew: CrewCounts; calendarDays: number; reachable: boolean } {
  const s = scheduleSettingsOf(project);
  const prep = prepare(rab, db);
  const crew = Object.fromEntries(TRADES.map((t) => [t.id, prep.ohByTrade[t.id] > 0 ? 1 : 0])) as CrewCounts;
  const cal = (c: CrewCounts) => toCalendar(layout(prep, c, s.productivity).workDays, s.workDaysPerWeek);
  let current = cal(crew);
  for (let i = 0; i < 120 && current > targetCalendarDays; i++) {
    let bestTrade: TradeId | null = null;
    let bestDays = current;
    for (const t of TRADES) {
      if (!(prep.ohByTrade[t.id] > 0) || crew[t.id] >= 20) continue;
      const d = cal({ ...crew, [t.id]: crew[t.id] + 1 });
      if (d < bestDays) {
        bestDays = d;
        bestTrade = t.id;
      }
    }
    if (!bestTrade) break;
    crew[bestTrade] += 1;
    current = bestDays;
  }
  return { crew, calendarDays: current, reachable: current <= targetCalendarDays };
}

export const tradeLabel = (t: TradeId) => TRADES.find((x) => x.id === t)?.label ?? t;

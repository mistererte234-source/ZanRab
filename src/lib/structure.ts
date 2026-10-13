/**
 * PRA-DESAIN STRUKTUR (preliminary sizing) — untuk diverifikasi ahli struktur.
 *
 * Acuan:
 *  - SNI 2847:2019 (beton struktural):
 *      ps. 9.3.1.1  tinggi minimum balok nonprategang: ℓ/16 (dua tumpuan), ℓ/18,5 (satu ujung menerus), ℓ/21 (dua ujung menerus), ℓ/8 (kantilever)
 *      ps. 8.3.1    tebal minimum pelat dua arah dengan balok (αfm > 2): h = ℓn(0,8 + fy/1400) / (36 + 9β) ≥ 90 mm
 *      ps. 18.6.2.1 balok SRPMK: lebar ≥ 250 mm dan ≥ 0,3h
 *      ps. 18.7.2.1 kolom SRPMK: sisi terkecil ≥ 300 mm, rasio sisi ≥ 0,4
 *      ps. 22.4.2   kuat tekan aksial maksimum: φPn,max = 0,80 φ [0,85 f'c (Ag − Ast) + fy Ast], φ = 0,65 (sengkang)
 *  - SNI 1727:2020 Tabel 4.3-1 (beban hidup): hunian 1,92 kN/m²; ruang publik/koridor & tangga 4,79; atap datar 0,96
 *  - Kombinasi beban: 1,4D dan 1,2D + 1,6L
 *  - Pra-dimensi kolom: Ag ≥ Pu / (0,35 f'c) — praktik pra-desain yang umum dipakai (bukan pasal SNI).
 *
 * ⚠️ TIDAK menghitung gaya gempa (SNI 1726:2019), lendutan, geser pons, maupun detail tulangan.
 *    Hasil hanya titik awal untuk ahli struktur — wajib diverifikasi sebelum dipakai membangun.
 */
import { detectColumns, round } from "./geometry";
import { floorsOf, slabArea } from "./building";
import type { Plan, Point, Project, StructureSettings } from "./types";
export type { StructureSettings };


export const DEFAULT_STRUCTURE: StructureSettings = {
  fc: 25,
  fy: 420,
  system: "SRPMK",
  occupancy: "hunian",
  qa: 100,
  maxSpanOverride: null,
  tributaryOverride: null,
  roofType: "rangka_ringan",
};

export const structureSettingsOf = (p: Project): StructureSettings => ({ ...DEFAULT_STRUCTURE, ...(p.structure ?? {}) });

/** Beban (kN/m²) — nilai umum pra-desain; tercantum di laporan agar bisa dikoreksi */
export const LOADS = {
  concrete: 24, // kN/m³ beton bertulang
  sdlFloor: 1.3, // keramik + spesi + plafon + ME
  liveHunian: 1.92, // SNI 1727:2020 Tabel 4.3-1
  livePublik: 4.79, // SNI 1727:2020 Tabel 4.3-1
  liveRoof: 0.96, // SNI 1727:2020 Tabel 4.3-1 (atap datar)
  roofLight: 1.0, // rangka baja ringan + genteng + plafon (perkiraan)
  wall: { bata_ringan: 1.3, bata_merah: 2.5, batako: 2.0 } as Record<string, number>, // kN/m² bidang dinding (termasuk plester, perkiraan)
};

export interface StructRow {
  element: string;
  size: string;
  basis: string; // rumus & acuan
  value: number; // ukuran utama (mm) untuk perbandingan
}

export interface StructureResult {
  settings: StructureSettings;
  floors: number;
  storeyHeights: number[];
  maxSpan: number; // m
  maxTributary: number; // m²
  columnCount: number;
  slab: { t: number; formula: string; ln: number; beta: number } | null;
  beam: { b: number; h: number; formula: string };
  sloof: { b: number; h: number; formula: string };
  ringBeam: { b: number; h: number; formula: string };
  column: { b: number; h: number; Pu: number; AgReq: number; phiPn: number; util: number; formula: string; perStorey: { name: string; Pu: number; side: number }[] };
  footing: { B: number; t: number; Ps: number; formula: string };
  loads: { qD: number; qL: number; qu: number; wallEq: number; roofD: number };
  steelKgM3: { kolom: number; balok: number; pelat: number; pondasi: number };
  warnings: string[];
}

const ceilTo = (v: number, step: number) => Math.ceil(v / step - 1e-9) * step;
const fyFactor = (fy: number) => 0.4 + fy / 700; // koreksi tabel tinggi minimum untuk fy ≠ 420 MPa

/** Tributary sederhana: setengah jarak ke kolom tetangga di arah X dan Y */
export function tributaryAreas(cols: Point[], tol = 0.3): number[] {
  return cols.map((c) => {
    const row = cols.filter((o) => Math.abs(o.y - c.y) < tol && o !== c).map((o) => o.x - c.x);
    const col = cols.filter((o) => Math.abs(o.x - c.x) < tol && o !== c).map((o) => o.y - c.y);
    const nearL = row.filter((d) => d < 0).reduce((m, d) => Math.max(m, d), -Infinity);
    const nearR = row.filter((d) => d > 0).reduce((m, d) => Math.min(m, d), Infinity);
    const nearU = col.filter((d) => d < 0).reduce((m, d) => Math.max(m, d), -Infinity);
    const nearD = col.filter((d) => d > 0).reduce((m, d) => Math.min(m, d), Infinity);
    const wx = (Number.isFinite(nearL) ? -nearL / 2 : 0) + (Number.isFinite(nearR) ? nearR / 2 : 0);
    const wy = (Number.isFinite(nearU) ? -nearU / 2 : 0) + (Number.isFinite(nearD) ? nearD / 2 : 0);
    return wx * wy;
  });
}

/** Bentang terbesar antar kolom berurutan di satu garis */
export function maxSpanOf(cols: Point[], tol = 0.3): number {
  let best = 0;
  for (const c of cols) {
    const nearR = cols.filter((o) => Math.abs(o.y - c.y) < tol && o.x > c.x + 0.05).reduce((m, o) => Math.min(m, o.x - c.x), Infinity);
    const nearD = cols.filter((o) => Math.abs(o.x - c.x) < tol && o.y > c.y + 0.05).reduce((m, o) => Math.min(m, o.y - c.y), Infinity);
    if (Number.isFinite(nearR)) best = Math.max(best, nearR);
    if (Number.isFinite(nearD)) best = Math.max(best, nearD);
  }
  return best;
}

export function computeStructure(project: Project): StructureResult | null {
  const S = structureSettingsOf(project);
  const P = project.params;
  const fl = floorsOf(project).filter((f) => f.plan);
  if (!fl.length) return null;
  const multi = fl.length > 1;
  const nFloors = multi ? fl.length : Math.max(1, P.floorCount || 1);
  const ground: Plan = fl[0].plan!;
  const heights = multi ? fl.map((f) => f.height ?? P.wallHeight) : Array.from({ length: nFloors }, () => P.wallHeight);
  const warnings: string[] = [];

  // --- geometri ---
  const cols = ground.columns ?? detectColumns(ground.walls, P.maxColumnSpan);
  const tribs = tributaryAreas(cols);
  const maxSpan = S.maxSpanOverride ?? Math.max(2.5, round(maxSpanOf(cols), 2));
  const maxTrib = S.tributaryOverride ?? Math.max(4, round(Math.max(...tribs, 0), 2));

  // --- beban per lantai (kN/m²) ---
  const wallW = LOADS.wall[P.wallType || "bata_ringan"] ?? 1.3;
  const floorPlans = multi ? fl.map((f) => f.plan!) : Array.from({ length: nFloors }, () => ground);
  const areaOf = (pl: Plan) => Math.max(1, slabArea(pl));
  const wallLen = (pl: Plan) => pl.walls.reduce((a, w) => a + Math.hypot(w.b.x - w.a.x, w.b.y - w.a.y), 0);
  // beban dinding diratakan ke luas lantai (pendekatan pra-desain)
  const wallEq = Math.max(...floorPlans.map((pl, i) => (wallLen(pl) * heights[i] * wallW) / areaOf(pl)));
  const qL = S.occupancy === "publik" ? LOADS.livePublik : LOADS.liveHunian;

  // --- pelat (lantai atas) ---
  let slab: StructureResult["slab"] = null;
  const lnLong = Math.max(0.5, maxSpan - 0.25);
  if (nFloors > 1 || S.roofType === "dak_beton") {
    // panel terburuk dianggap persegi (β = 1) dengan bentang = bentang balok terbesar
    const beta = 1;
    const hTwo = (lnLong * 1000 * (0.8 + S.fy / 1400)) / (36 + 9 * beta);
    const t = Math.max(120, ceilTo(Math.max(hTwo, 90), 10));
    slab = {
      t,
      ln: lnLong,
      beta,
      formula: `SNI 2847:2019 ps. 8.3.1 (αfm > 2): ℓn(0,8 + fy/1400)/(36 + 9β) = ${Math.round(lnLong * 1000)}×(0,8 + ${S.fy}/1400)/(36 + 9×${beta}) = ${round(hTwo, 0)} mm; batas bawah SNI 90 mm, minimum praktis 120 mm → dipakai ${t} mm`,
    };
  }
  const slabT = (slab?.t ?? 120) / 1000;

  // --- balok ---
  const ff = fyFactor(S.fy);
  const hBeam = Math.max(300, ceilTo(((maxSpan * 1000) / 18.5) * ff, 50));
  let bBeam = Math.max(S.system === "SRPMK" ? 250 : 200, ceilTo(hBeam * 0.5, 50));
  if (bBeam < 0.3 * hBeam) bBeam = ceilTo(0.3 * hBeam, 50);
  const beam = {
    b: bBeam,
    h: hBeam,
    formula: `SNI 2847:2019 ps. 9.3.1.1, satu ujung menerus: ℓ/18,5 × (0,4 + fy/700) = ${Math.round(maxSpan * 1000)}/18,5 × ${round(ff, 2)} = ${round(((maxSpan * 1000) / 18.5) * ff, 0)} mm → h ${hBeam} mm (min. 300); b ≈ h/2${S.system === "SRPMK" ? ", ≥ 250 mm & ≥ 0,3h (ps. 18.6.2.1)" : ""} → ${bBeam} mm`,
  };
  const hSloof = Math.max(300, ceilTo(((maxSpan * 1000) / 18.5) * ff, 50));
  const sloof = { b: Math.max(200, ceilTo(hSloof * 0.5, 50)), h: hSloof, formula: `Sama dengan balok (ℓ/18,5 × ${round(ff, 2)}), min. 200×300 mm` };
  const hRing = S.roofType === "dak_beton" ? hBeam : Math.max(250, ceilTo(((maxSpan * 1000) / 21) * ff, 50));
  const ringBeam = {
    b: S.roofType === "dak_beton" ? bBeam : Math.max(150, ceilTo(hRing * 0.5, 50)),
    h: hRing,
    formula:
      S.roofType === "dak_beton"
        ? "Atap dak beton: sama dengan balok lantai"
        : `Atap rangka ringan: ℓ/21 × ${round(ff, 2)} = ${round(((maxSpan * 1000) / 21) * ff, 0)} mm → ${hRing} mm (min. 250)`,
  };

  // --- beban gravitasi ---
  const beamSelfEq = (wallLen(ground) * (beam.b / 1000) * ((beam.h - slabT * 1000) / 1000) * LOADS.concrete) / areaOf(ground);
  const qD = slabT * LOADS.concrete + LOADS.sdlFloor + wallEq + beamSelfEq;
  const qu = Math.max(1.4 * qD, 1.2 * qD + 1.6 * qL);
  const roofD = S.roofType === "dak_beton" ? slabT * LOADS.concrete + 1.0 + beamSelfEq : LOADS.roofLight;
  const quRoof = Math.max(1.4 * roofD, 1.2 * roofD + 1.6 * LOADS.liveRoof);

  // --- kolom: beban kumulatif dari atap ke lantai dasar ---
  const minSide = S.system === "SRPMK" ? 300 : 250;
  const perStorey: { name: string; Pu: number; side: number }[] = [];
  let Pu = quRoof * maxTrib; // kN
  for (let i = nFloors - 1; i >= 0; i--) {
    // lantai di atas kolom lantai i (kecuali lantai dasar memikul pelat lantai 2.. dst)
    if (i < nFloors - 1) Pu += qu * maxTrib;
    // berat sendiri kolom (pakai sisi minimum dulu)
    Pu += 1.2 * (minSide / 1000) ** 2 * heights[i] * LOADS.concrete;
    const Ag = (Pu * 1000) / (0.35 * S.fc);
    const side = Math.max(minSide, ceilTo(Math.sqrt(Ag), 50));
    perStorey.unshift({ name: multi ? fl[i].name : `Lantai ${i + 1}`, Pu: round(Pu, 1), side });
  }
  const groundPu = perStorey[0].Pu;
  const AgReq = (groundPu * 1000) / (0.35 * S.fc);
  const side = perStorey[0].side;
  const Ag = side * side;
  const Ast = 0.01 * Ag;
  const phiPn = (0.8 * 0.65 * (0.85 * S.fc * (Ag - Ast) + S.fy * Ast)) / 1000;
  const column = {
    b: side,
    h: side,
    Pu: groundPu,
    AgReq: Math.round(AgReq),
    phiPn: round(phiPn, 0),
    util: round(groundPu / phiPn, 2),
    formula: `Pu = Σ qu × At (At = ${round(maxTrib, 2)} m²) = ${round(groundPu, 0)} kN; Ag ≥ Pu/(0,35 f'c) = ${Math.round(AgReq)} mm² → ${side}×${side} mm (min. ${minSide} mm${S.system === "SRPMK" ? ", SNI 2847:2019 ps. 18.7.2.1" : ""}); cek φPn,max (ps. 22.4.2, ρ = 1%) = ${round(phiPn, 0)} kN`,
    perStorey,
  };
  if (column.util > 0.6) warnings.push(`Kolom terberat memakai ${Math.round(column.util * 100)}% kapasitas aksial murni — momen akibat gempa belum dihitung; ahli struktur kemungkinan memperbesar kolom.`);

  // --- pondasi telapak (beban layan) ---
  const qServ = qD + qL;
  let Ps = (roofD + LOADS.liveRoof) * maxTrib;
  for (let i = 0; i < nFloors - 1; i++) Ps += qServ * maxTrib;
  Ps += nFloors * (side / 1000) ** 2 * 3.5 * LOADS.concrete;
  const B = Math.max(1.0, ceilTo(Math.sqrt(Ps / S.qa), 0.1));
  const tF = Math.max(300, ceilTo(B * 1000 * 0.25, 50));
  const footing = {
    B: round(B, 2),
    t: tF,
    Ps: round(Ps, 0),
    formula: `Beban layan Ps = ${round(Ps, 0)} kN; B = √(Ps/qa) = √(${round(Ps, 0)}/${S.qa}) = ${round(Math.sqrt(Ps / S.qa), 2)} m → ${round(B, 2)} × ${round(B, 2)} m; tebal ≈ B/4 → ${tF} mm (min. 300). qa = ${S.qa} kPa WAJIB dari uji tanah.`,
  };
  if (S.qa === DEFAULT_STRUCTURE.qa) warnings.push(`Daya dukung tanah memakai asumsi ${S.qa} kPa — ganti dengan hasil sondir / uji tanah lokasi.`);
  if (B > 2.2) warnings.push("Telapak lebih dari 2,2 m — pertimbangkan pondasi dalam (bore pile / tiang) sesuai saran ahli geoteknik.");
  if (nFloors >= 3) warnings.push("Bangunan 3 lantai atau lebih: analisis gempa SNI 1726:2019 & desain detail tulangan WAJIB oleh ahli struktur.");
  warnings.push("Pra-desain ini belum memperhitungkan gempa, lendutan, geser pons, dan detail tulangan.");

  // --- perkiraan tulangan (kg/m³) dari rasio asumsi ---
  const steel = (rho: number, stirrup: number) => Math.round(7850 * rho * (1 + stirrup));
  const steelKgM3 = { kolom: steel(0.015, 0.25), balok: steel(0.015, 0.25), pelat: steel(0.006, 0), pondasi: steel(0.005, 0) };

  return {
    settings: S,
    floors: nFloors,
    storeyHeights: heights,
    maxSpan,
    maxTributary: maxTrib,
    columnCount: cols.length,
    slab,
    beam,
    sloof,
    ringBeam,
    column,
    footing,
    loads: { qD: round(qD, 2), qL, qu: round(qu, 2), wallEq: round(wallEq, 2), roofD: round(roofD, 2) },
    steelKgM3,
    warnings,
  };
}

/** Terapkan hasil pra-desain ke parameter RAB */
/**
 * Ukuran pra-desain → parameter RAB. Jenis pondasi TIDAK diganti: pondasi dalam (strauss/bore pile) vs telapak
 * ditentukan data tanah. Ukuran telapak hanya diterapkan bila proyek memang memakai footplat.
 */
export function structureToParams(r: StructureResult, currentFoundation?: string) {
  const m = (mm: number) => round(mm / 1000, 3);
  return {
    column: { b: m(r.column.b), h: m(r.column.h) },
    sloof: { b: m(r.sloof.b), h: m(r.sloof.h) },
    ringBeam: { b: m(r.ringBeam.b), h: m(r.ringBeam.h) },
    floorBeam: { b: m(r.beam.b), h: m(r.beam.h) },
    upperSlabThickness: r.slab ? m(r.slab.t) : undefined,
    ...(currentFoundation === undefined || currentFoundation === "footplat_batu_kali"
      ? { foundation: "footplat_batu_kali" as const, pileCap: { w: r.footing.B, l: r.footing.B, t: m(r.footing.t) } }
      : {}),
  };
}

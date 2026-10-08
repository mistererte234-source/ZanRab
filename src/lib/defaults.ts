import type { MepParams, Plan, ProjectParams } from "./types";
import { rect } from "./geometry";

/** Default MEP: semua item tambahan mati agar RAB lama tidak berubah; nyalakan di Parameter → MEP */
export const DEFAULT_MEP: MepParams = {
  ac: "tidak",
  acIncludeUnit: true,
  exhaustFan: false,
  waterHeater: false,
  waterSource: "tidak_termasuk",
  wellDepth: 30,
  tankLiters: 0,
  tankTower: false,
  plnVa: 0,
  grounding: false,
  lightningRod: false,
  tvPoints: 0,
  lanPoints: 0,
  cctvCameras: 0,
  doorbell: false,
  drainage: false,
};

export const mepOf = (p: ProjectParams): MepParams => ({ ...DEFAULT_MEP, ...(p.mep ?? {}) });

/** Parameter default — mengikuti spesifikasi RAB referensi (RAB KAMAL) */
export const DEFAULT_PARAMS: ProjectParams = {
  floorCount: 1,
  wallType: "bata_ringan",
  tier: "medium",
  wallHeight: 3.5,
  grossAreaOverride: null,
  demolitionLumpSum: 0,
  fillHeight: 0,
  foundation: "strauss_kumbung",
  straussDepth: 3,
  straussDiameter: 0.3,
  pileCap: { w: 0.6, l: 0.6, t: 0.2 },
  stoneFoundationHeight: 0.7,
  stoneFoundationTop: 0.3,
  stoneFoundationBottom: 0.6,
  sloof: { b: 0.15, h: 0.25 },
  column: { b: 0.15, h: 0.2 },
  ringBeam: { b: 0.15, h: 0.2 },
  maxColumnSpan: 4,
  floorSlabThickness: 0.1,
  roofType: "pelana",
  roofCover: "genteng_beton",
  roofSlopeDeg: 30,
  roofOverhang: 0.6,
  concreteDeckArea: 0,
  concreteDeckThickness: 0.12,
  gutter: true,
  doorHeight: 2.1,
  windowHeight: 1.2,
  transomHeight: 0,
  floorWaste: 0.05,
  wetWallTileHeight: 1.8,
  skirting: true,
  exteriorPaintSeparate: true,
  autoMep: true,
  septicTank: true,
  kitchenCounterLength: 0,
  overheadProfitPct: 0.1,
  ppnPct: 0.11,
  includePpn: false,
  roundTo: 1000,
};

/**
 * Hasil ekstraksi referensi dari docs/denah.jpeg (rumah 9 x 8 m, 3 kamar).
 * Dipakai sebagai demo tanpa API key & sebagai fixture test.
 */
export function samplePlan(): Plan {
  const yFront = 0.755; // dinding depan R.Tamu mundur (teras)
  return {
    outline: { width: 9, depth: 8 },
    wallThickness: 0.15,
    chains: [
      { side: "top", segments: [0.15, 3, 0.15, 2.4, 0.15, 3, 0.15], total: 9 },
      { side: "bottom", segments: [0.15, 5.55, 0.15, 3, 0.15], total: 9 },
      { side: "left", segments: [0.15, 2.5, 0.15, 1.3, 0.15, 1.95, 0.15, 1.5, 0.15], total: 8 },
      { side: "right", segments: [0.15, 3, 0.15, 1.9, 0.15, 2.5, 0.15], total: 8 },
    ],
    walls: [
      w("w1", 0.075, 0.075, 3.225, 0.075, true),
      w("w2", 5.775, 0.075, 8.925, 0.075, true),
      w("w3", 3.225, yFront, 5.775, yFront, true),
      w("w4", 0.075, 0.075, 0.075, 7.925, true),
      w("w5", 8.925, 0.075, 8.925, 7.925, true),
      w("w6", 0.075, 7.925, 8.925, 7.925, true),
      w("w7", 3.225, 0.075, 3.225, 2.725, false),
      w("w8", 0.075, 2.725, 3.225, 2.725, false),
      w("w9", 1.725, 2.725, 1.725, 4.175, false),
      w("w10", 0.075, 4.175, 3.225, 4.175, false),
      w("w11", 3.225, 4.175, 3.225, 6.275, false),
      w("w12", 0.075, 6.275, 3.225, 6.275, false),
      w("w13", 5.775, 0.075, 5.775, 3.225, false),
      w("w14", 5.775, 3.225, 8.925, 3.225, false),
      w("w15", 5.775, 5.275, 8.925, 5.275, false),
      w("w16", 5.775, 5.275, 5.775, 7.925, false),
    ],
    openings: [
      o("d1", "door", "w8", 2.75, 2.725, 0.9, 1, "P1 K.Anak"),
      o("d2", "door", "w3", 5.3, yFront, 0.9, 1, "P2 Utama"),
      o("d3", "door", "w14", 6.3, 3.225, 0.9, 1, "P3 K.Utama"),
      o("d4", "door", "w9", 1.725, 3.75, 0.7, 1, "P4 KM", "pvc"),
      o("d5", "door", "w5", 8.925, 3.85, 0.7, 1, "P5 Samping"),
      o("d6", "door", "w15", 6.3, 5.275, 0.9, 1, "P6 K.Anak 2"),
      o("d7", "door", "w6", 5.3, 7.925, 0.9, 1, "P7 Belakang"),
      o("j1", "window", "w1", 1.6, 0.075, 1.32, 2, "J1 K.Anak"),
      o("j2", "window", "w3", 4.25, yFront, 0.65, 1, "J2 R.Tamu"),
      o("j3", "window", "w2", 7.3, 0.075, 1.37, 2, "J3 K.Utama"),
      o("j4", "window", "w5", 8.925, 6.65, 1.29, 1, "J4 K.Anak 2"),
      o("j5", "window", "w6", 4.25, 7.925, 0.65, 1, "J5 Dapur"),
      o("b1", "passage", "w11", 3.225, 5.2, 1.45, 1, "Bukaan Musholla"),
    ],
    rooms: [
      { id: "r1", name: "Kamar Anak 1", type: "kamar", polygon: rect(0.15, 0.15, 3, 2.5) },
      { id: "r2", name: "Kamar Mandi", type: "kamar_mandi", polygon: rect(0.15, 2.8, 1.5, 1.3) },
      { id: "r3", name: "Lorong", type: "selasar", polygon: rect(1.8, 2.8, 1.5, 1.3) },
      { id: "r4", name: "Musholla", type: "musholla", polygon: rect(0.15, 4.25, 3, 1.95) },
      { id: "r5", name: "Dapur", type: "dapur", polygon: rect(0.15, 6.35, 5.55, 1.5) },
      { id: "r6", name: "Ruang Tamu & Keluarga", type: "ruang_keluarga", polygon: rect(3.3, yFront + 0.075, 2.4, 6.35 - yFront - 0.075) },
      { id: "r7", name: "Kamar Utama", type: "kamar", polygon: rect(5.85, 0.15, 3, 3) },
      { id: "r8", name: "Selasar", type: "selasar", polygon: rect(5.7, 3.3, 3.15, 1.9) },
      { id: "r9", name: "Kamar Anak 2", type: "kamar", polygon: rect(5.85, 5.35, 3, 2.5) },
      { id: "r10", name: "Teras", type: "teras", polygon: rect(3.3, 0, 2.4, yFront - 0.075) },
    ],
    columns: null,
    calibration: { outerBox: [206, 257, 852, 822] },
    notes: ["Fixture referensi dari docs/denah.jpeg"],
  };
}

function w(id: string, x1: number, y1: number, x2: number, y2: number, exterior: boolean) {
  return { id, a: { x: x1, y: y1 }, b: { x: x2, y: y2 }, thickness: 0.15, exterior };
}

function o(
  id: string,
  type: "door" | "window" | "passage",
  wallId: string,
  x: number,
  y: number,
  width: number,
  leaves: number,
  label: string,
  material: "kayu" | "pvc" = "kayu",
) {
  const height = type === "window" ? 1.2 : 2.1;
  return { id, type, wallId, at: { x, y }, width, height, leaves, label, material: type === "door" ? material : undefined };
}

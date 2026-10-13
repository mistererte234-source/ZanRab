import { describe, expect, it } from "vitest";
import { DEFAULT_PARAMS, samplePlan } from "../src/lib/defaults";
import { rect } from "../src/lib/geometry";
import { scalePlan, splitRoom, suspectDoubleWetRooms } from "../src/lib/planEdit";
import { auditProject, hintRoomLabels, outlineFromChains } from "../src/lib/audit";
import { roomLabels } from "../src/lib/labels";
import { takeoff } from "../src/lib/takeoff";
import { newProject } from "../src/lib/store";
import type { Floor, Plan } from "../src/lib/types";

/** Potongan lantai kos: K11 (atas), blok KM 3,0×1,4 (2 bilik terbaca 1), K10 (bawah), sisi kiri saja */
function kosStrip(): Plan {
  const t = 0.1;
  return {
    outline: { width: 3.2, depth: 6.7 },
    wallThickness: t,
    chains: [],
    walls: [
      { id: "w1", a: { x: 0.05, y: 0.05 }, b: { x: 3.15, y: 0.05 }, thickness: t, exterior: true },
      { id: "w2", a: { x: 0.05, y: 6.65 }, b: { x: 3.15, y: 6.65 }, thickness: t, exterior: true },
      { id: "w3", a: { x: 0.05, y: 0.05 }, b: { x: 0.05, y: 6.65 }, thickness: t, exterior: true },
      { id: "w4", a: { x: 3.15, y: 0.05 }, b: { x: 3.15, y: 6.65 }, thickness: t, exterior: true },
      { id: "w5", a: { x: 0.05, y: 2.65 }, b: { x: 3.15, y: 2.65 }, thickness: t, exterior: false },
      { id: "w6", a: { x: 0.05, y: 4.15 }, b: { x: 3.15, y: 4.15 }, thickness: t, exterior: false },
    ],
    openings: [{ id: "d1", type: "door", wallId: "w6", at: { x: 2.4, y: 4.15 }, width: 0.7, height: 2.1, leaves: 1, material: "pvc" }],
    rooms: [
      { id: "r1", name: "K11", type: "kamar", polygon: rect(0.1, 0.1, 3.0, 2.5) },
      { id: "r2", name: "KM/WC", type: "kamar_mandi", polygon: rect(0.1, 2.7, 3.0, 1.4) },
      { id: "r3", name: "K10", type: "kamar", polygon: rect(0.1, 4.2, 3.0, 2.4) },
    ],
    columns: null,
    calibration: null,
    notes: [],
  };
}
const floor = (plan: Plan, hint?: string): Floor => ({ id: "lt2", name: "Lantai 2", level: 1, plan, imageDataUrl: null, analyzeMeta: null, hint });

describe("edit denah & audit", () => {
  it("blok KM 3,0×1,4 terdeteksi sebagai 2 bilik dan dibagi: +1 dinding, +1 pintu, 2 KM, luas berkurang tebal partisi", () => {
    const p = kosStrip();
    expect(suspectDoubleWetRooms(p).map((r) => r.id)).toEqual(["r2"]);
    const s = splitRoom(p, "r2", 2);
    const km = s.rooms.filter((r) => r.type === "kamar_mandi");
    expect(km.length).toBe(2);
    expect(s.walls.length).toBe(p.walls.length + 1);
    expect(s.openings.filter((o) => o.type === "door").length).toBe(2);
    const area = (r: { polygon: { x: number; y: number }[] }) => {
      const xs = r.polygon.map((q) => q.x);
      const ys = r.polygon.map((q) => q.y);
      return (Math.max(...xs) - Math.min(...xs)) * (Math.max(...ys) - Math.min(...ys));
    };
    expect(km.reduce((a, r) => a + area(r), 0)).toBeCloseTo((3.0 - 0.1) * 1.4, 4);
    // takeoff: kloset ikut 2
    const v = (pl: Plan, c: string) => takeoff(pl, DEFAULT_PARAMS).items.find((i) => i.code === c)?.volume ?? 0;
    expect(v(p, "AIR.CLOSET")).toBe(1);
    expect(v(s, "AIR.CLOSET")).toBe(2);
    expect(v(s, "PAS.BATARINGAN")).toBeGreaterThan(v(p, "PAS.BATARINGAN"));
  });

  it("audit: kloset AI > KM → error dengan perbaikan; label kamar PDF ≠ kamar terbaca → error", () => {
    const p = { ...kosStrip(), closets: 2 };
    const hint = `- Label ruang/teks terbaca: "K11"@(40%,20%) "KM/WC"@(40%,30%) "K10"@(40%,40%) "K9"@(40%,50%)`;
    const issues = auditProject(newProject({ floors: [floor(p, hint)], params: DEFAULT_PARAMS }));
    const kl = issues.find((i) => i.id.endsWith("kloset"))!;
    expect(kl.fix?.action).toEqual({ kind: "split_rooms", floorId: "lt2", roomIds: ["r2"] });
    expect(issues.find((i) => i.id.endsWith("kamar-label"))!.message).toMatch(/3 kamar.*membaca 2/);
  });

  it("label kamar: K1..K11 unik, KAMAR MANDI & KM/WC diabaikan", () => {
    expect(roomLabels(["K1", "K 2", "K1", "KM/WC", "KAMAR MANDI", "K.TIDUR 1", "K.TIDUR 2", "PANTRY"])).toEqual(["K1", "K 2", "K.TIDUR 1", "K.TIDUR 2"]);
    expect(hintRoomLabels(`"K11"@(1%,2%) "K10"@(1%,2%) "BALCONY"@(1%,1%)`)).toEqual(["K11", "K10"]);
  });

  it("ukuran luar dari rantai dimensi: 7,4×20,95 → 7,25×20,8 dan seluruh geometri diskala", () => {
    const p: Plan = { ...kosStrip(), outline: { width: 7.4, depth: 20.95 }, chains: [
      { side: "top", segments: [7.25], total: 7.25 }, { side: "bottom", segments: [7.25], total: 7.25 },
      { side: "left", segments: [20.8], total: 20.8 }, { side: "right", segments: [20.8], total: 20.8 } ] };
    expect(outlineFromChains(p)).toEqual({ width: 7.25, depth: 20.8 });
    const s = scalePlan(p, 7.25, 20.8);
    expect(s.walls[0].b.x).toBeCloseTo(3.15 * (7.25 / 7.4), 3);
    expect(outlineFromChains(s)).toBeNull();
    // rantai tambahan (parsial / sama dengan outline) tidak boleh membatalkan saran
    const extra: Plan = { ...p, chains: [...p.chains, { side: "left", segments: [8, 12.95], total: 20.95 }, { side: "top", segments: [3, 1.25, 3], total: 7.25 }] };
    expect(outlineFromChains(extra)).toEqual({ width: 7.25, depth: 20.8 });
    // hanya rantai yang beda > 10% (salah baca) → tidak disarankan
    const wild: Plan = { ...p, chains: [{ side: "top", segments: [3], total: 3 }] };
    expect(outlineFromChains(wild)).toBeNull();
  });

  it("struktur rumah 1 lantai pada gedung 3 lantai → error + perbaikan; septic standar untuk ≥6 kamar → warning", () => {
    const f = (l: number): Floor => ({ id: `f${l}`, name: `Lantai ${l + 1}`, level: l, plan: samplePlan(), imageDataUrl: null, analyzeMeta: null });
    const issues = auditProject(newProject({ floors: [f(0), f(1), f(2)], params: DEFAULT_PARAMS }));
    expect(issues.find((i) => i.id === "struktur")?.fix?.action.kind).toBe("apply_structure");
    expect(issues.find((i) => i.id === "septic")?.fix?.action.kind).toBe("septic_capacity");
  });

  it("VOID tidak dilantai/diplafon; carport default keramik kasar; balkon dapat railing", () => {
    const p = kosStrip();
    const withExtra: Plan = { ...p, rooms: [...p.rooms, { id: "v", name: "VOID", type: "lainnya", polygon: rect(0.1, 0.1, 1, 1) }, { id: "b", name: "BALCONY", type: "lainnya", polygon: rect(1.2, 0.1, 1.7, 0.8) }, { id: "c", name: "CARPORT", type: "carport", polygon: rect(0.1, 4.2, 3, 2) }] };
    const items = takeoff(withExtra, DEFAULT_PARAMS).items;
    const v = (c: string) => items.find((i) => i.code === c)?.volume ?? 0;
    const base = takeoff(p, DEFAULT_PARAMS).items.find((i) => i.code === "ATP.PLAFON")!.volume;
    expect(v("ATP.PLAFON")).toBeCloseTo(base + 1.7 * 0.8 + 6, 2); // VOID tidak ikut
    expect(v("LNT.CARPORT")).toBeCloseTo(6 * 1.05, 2);
    expect(v("LL.RAILING")).toBeCloseTo(1.7, 2);
    const granit = takeoff({ ...withExtra }, { ...DEFAULT_PARAMS, carportFloor: "granit" }).items.find((i) => i.code === "LNT.GRANIT")!.volume;
    expect(granit - v("LNT.GRANIT")).toBeCloseTo(6 * 1.05, 2);
  });
});

describe("audit: VOID salah label", () => {
  it("VOID seukuran bilik KM → saran jadikan KM; VOID besar (void tangga/taman) tidak", () => {
    const p = kosStrip();
    const km = { id: "k", name: "KM/WC", type: "kamar_mandi" as const, polygon: rect(1.62, 2.7, 1.32, 1.24) };
    const v1 = { id: "v1", name: "VOID", type: "lainnya" as const, polygon: rect(0.15, 2.7, 1.32, 1.24) };
    const v2 = { id: "v2", name: "VOID", type: "lainnya" as const, polygon: rect(0.15, 0.1, 1.08, 2.33) };
    const plan: Plan = { ...p, rooms: [p.rooms[0], p.rooms[2], km, v1, v2] };
    const issues = auditProject(newProject({ floors: [floor(plan)], params: DEFAULT_PARAMS }));
    const it = issues.find((i) => i.id.endsWith("void-km"))!;
    expect(it.fix?.action).toMatchObject({ kind: "retype_rooms", roomIds: ["v1"] });
  });
});

import { addMissingWetDoors, wetRoomsWithoutDoor } from "../src/lib/planEdit";
import { structureToParams, computeStructure } from "../src/lib/structure";
import { roomWallContact } from "../src/lib/takeoff";

describe("perbaikan RAB kos", () => {
  it("keramik dinding KM tetap terhitung bila polygon ruang digambar di as dinding", () => {
    const p = kosStrip();
    const km = p.rooms[1];
    const atAxis = { ...km, polygon: rect(0.05, 2.65, 3.1, 1.5) }; // tepat di as dinding
    expect(roomWallContact(atAxis, p.walls)).toBeGreaterThan(8);
    expect(roomWallContact(km, p.walls)).toBeGreaterThan(8);
  });

  it("KM tanpa pintu → pintu PVC 0,7 m di sisi yang berbatasan dengan kamar", () => {
    const p = { ...kosStrip(), openings: [] };
    expect(wetRoomsWithoutDoor(p).length).toBe(1);
    const f = addMissingWetDoors(p);
    const d = f.openings.filter((o) => o.type === "door");
    expect(d.length).toBe(1);
    expect(d[0].material).toBe("pvc");
    expect(wetRoomsWithoutDoor(f).length).toBe(0);
  });

  it("terapkan pra-desain tidak mengganti pondasi strauss jadi telapak", () => {
    const f = (l: number): Floor => ({ id: `f${l}`, name: `Lantai ${l + 1}`, level: l, plan: samplePlan(), imageDataUrl: null, analyzeMeta: null });
    const r = computeStructure(newProject({ floors: [f(0), f(1)], params: DEFAULT_PARAMS }))!;
    expect(structureToParams(r, "strauss_kumbung").foundation).toBeUndefined();
    expect(structureToParams(r, "footplat_batu_kali").foundation).toBe("footplat_batu_kali");
  });
});

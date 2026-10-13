/**
 * Operasi edit denah yang deterministik (dipakai tombol "perbaiki" di langkah Cek).
 */
import { attachOpening, pointToSegment, polygonArea, round, uid } from "./geometry";
import type { Opening, Plan, Point, Room } from "./types";

const bbox = (poly: Point[]) => {
  const xs = poly.map((p) => p.x);
  const ys = poly.map((p) => p.y);
  return { x0: Math.min(...xs), y0: Math.min(...ys), x1: Math.max(...xs), y1: Math.max(...ys) };
};

/** Bukaan yang berada di tepi ruang (pintu/jendela milik ruang ini) */
export function openingsOnRoom(room: Room, openings: Opening[], tol = 0.35): Opening[] {
  const b = bbox(room.polygon);
  return openings.filter(
    (o) => o.at.x >= b.x0 - tol && o.at.x <= b.x1 + tol && o.at.y >= b.y0 - tol && o.at.y <= b.y1 + tol &&
      (Math.abs(o.at.x - b.x0) < tol || Math.abs(o.at.x - b.x1) < tol || Math.abs(o.at.y - b.y0) < tol || Math.abs(o.at.y - b.y1) < tol),
  );
}

/**
 * Bagi satu ruang (persegi panjang) menjadi `n` bilik sama besar di sepanjang sisi terpanjang.
 * - Menambah dinding partisi di garis bagi.
 * - Setiap bilik tanpa pintu mendapat salinan pintu ruang asal yang dicerminkan terhadap garis bagi
 *   (pola KM bertolak-belakang di kos).
 */
export function splitRoom(plan: Plan, roomId: string, n = 2): Plan {
  const room = plan.rooms.find((r) => r.id === roomId);
  if (!room || n < 2) return plan;
  const b = bbox(room.polygon);
  const w = b.x1 - b.x0;
  const h = b.y1 - b.y0;
  const alongX = w >= h;
  const t = plan.wallThickness || 0.1;
  const len = alongX ? w : h;
  const part = (len - (n - 1) * t) / n;
  if (part < 0.6) return plan;

  const newRooms: Room[] = [];
  const newWalls = [...plan.walls];
  const splitLines: number[] = [];
  for (let i = 0; i < n; i++) {
    const s = (alongX ? b.x0 : b.y0) + i * (part + t);
    const poly = alongX
      ? [{ x: s, y: b.y0 }, { x: s + part, y: b.y0 }, { x: s + part, y: b.y1 }, { x: s, y: b.y1 }]
      : [{ x: b.x0, y: s }, { x: b.x1, y: s }, { x: b.x1, y: s + part }, { x: b.x0, y: s + part }];
    newRooms.push({ id: i === 0 ? room.id : uid("r"), name: `${room.name} ${String.fromCharCode(97 + i)}`, type: room.type, polygon: poly.map((p) => ({ x: round(p.x, 4), y: round(p.y, 4) })) });
    if (i < n - 1) {
      const c = s + part + t / 2;
      splitLines.push(c);
      newWalls.push({
        id: uid("w"),
        a: alongX ? { x: round(c, 4), y: round(b.y0 - t / 2, 4) } : { x: round(b.x0 - t / 2, 4), y: round(c, 4) },
        b: alongX ? { x: round(c, 4), y: round(b.y1 + t / 2, 4) } : { x: round(b.x1 + t / 2, 4), y: round(c, 4) },
        thickness: t,
        exterior: false,
      });
    }
  }

  // pintu: bilik yang belum punya pintu → cerminkan pintu terdekat terhadap garis bagi
  const own = openingsOnRoom(room, plan.openings).filter((o) => o.type === "door");
  const added: Opening[] = [];
  const coordOf = (p: Point) => (alongX ? p.x : p.y);
  for (let i = 0; i < newRooms.length; i++) {
    const nb = bbox(newRooms[i].polygon);
    const lo = alongX ? nb.x0 : nb.y0;
    const hi = alongX ? nb.x1 : nb.y1;
    const has = own.some((o) => coordOf(o.at) >= lo - 0.05 && coordOf(o.at) <= hi + 0.05);
    if (has || !own.length) continue;
    // pintu sumber: yang terdekat ke bilik ini
    const src = [...own].sort((p, q) => Math.abs(coordOf(p.at) - (lo + hi) / 2) - Math.abs(coordOf(q.at) - (lo + hi) / 2))[0];
    // garis bagi di antara bilik sumber & bilik ini
    const line = splitLines.find((c) => (coordOf(src.at) - c) * ((lo + hi) / 2 - c) < 0) ?? splitLines[0];
    let v = 2 * line - coordOf(src.at);
    v = Math.min(hi - src.width / 2, Math.max(lo + src.width / 2, v));
    const at = alongX ? { x: v, y: src.at.y } : { x: src.at.x, y: v };
    added.push(attachOpening({ ...src, id: uid("d"), at, wallId: null, label: undefined }, plan.walls));
  }

  return {
    ...plan,
    walls: newWalls,
    openings: [...plan.openings, ...added],
    rooms: plan.rooms.flatMap((r) => (r.id === roomId ? newRooms : [r])),
    notes: [...plan.notes.filter((x) => !x.startsWith("Dibagi:")), `Dibagi: ${room.name} → ${n} bilik`].slice(-30),
  };
}

/** Skala seluruh geometri denah agar ukuran luar = width × depth (mis. sesuai angka dimensi PDF) */
export function scalePlan(plan: Plan, width: number, depth: number): Plan {
  const sx = plan.outline.width > 0 ? width / plan.outline.width : 1;
  const sy = plan.outline.depth > 0 ? depth / plan.outline.depth : 1;
  const P = (p: Point) => ({ x: round(p.x * sx, 4), y: round(p.y * sy, 4) });
  return {
    ...plan,
    outline: { width, depth },
    walls: plan.walls.map((w) => ({ ...w, a: P(w.a), b: P(w.b) })),
    openings: plan.openings.map((o) => ({ ...o, at: P(o.at) })),
    rooms: plan.rooms.map((r) => ({ ...r, polygon: r.polygon.map(P) })),
    columns: plan.columns ? plan.columns.map(P) : null,
  };
}

export function removeRoom(plan: Plan, roomId: string): Plan {
  return { ...plan, rooms: plan.rooms.filter((r) => r.id !== roomId) };
}

/** Ruang KM yang kemungkinan besar berisi 2 bilik (blok KM bertolak-belakang di kos) */
export function suspectDoubleWetRooms(plan: Plan): Room[] {
  return plan.rooms.filter((r) => {
    if (r.type !== "kamar_mandi") return false;
    const b = bbox(r.polygon);
    const long = Math.max(b.x1 - b.x0, b.y1 - b.y0);
    const short = Math.min(b.x1 - b.x0, b.y1 - b.y0);
    const a = polygonArea(r.polygon);
    // bilik KM kos umumnya ±1,2–1,6 m; blok 2 bilik ±2,6–3,2 m × 1,2–1,6 m
    return long >= 2.4 && short <= 1.8 && long / Math.max(short, 0.1) >= 1.7 && a >= 3;
  });
}

export const nearestWall = (plan: Plan, p: Point) =>
  plan.walls.reduce<{ id: string; d: number } | null>((best, w) => {
    const d = pointToSegment(p, w.a, w.b).d;
    return !best || d < best.d ? { id: w.id, d } : best;
  }, null);

/** KM tanpa pintu (AI melewatkan simbol pintu) */
export function wetRoomsWithoutDoor(plan: Plan): Room[] {
  const doors = plan.openings.filter((o) => o.type === "door" || o.type === "passage");
  return plan.rooms.filter((r) => r.type === "kamar_mandi" && openingsOnRoom(r, doors, 0.2).length === 0);
}

/**
 * Tambah pintu PVC 0,7 m pada KM tanpa pintu: di tengah sisi yang berbatasan dengan ruang tetangga terdekat
 * (kamar/selasar/dapur), bukan sisi dinding luar.
 */
export function addMissingWetDoors(plan: Plan): Plan {
  const missing = wetRoomsWithoutDoor(plan);
  if (!missing.length) return plan;
  const added: Opening[] = [];
  for (const r of missing) {
    const b = bbox(r.polygon);
    const edges = [
      { mid: { x: (b.x0 + b.x1) / 2, y: b.y0 }, out: { x: 0, y: -1 }, len: b.x1 - b.x0 },
      { mid: { x: (b.x0 + b.x1) / 2, y: b.y1 }, out: { x: 0, y: 1 }, len: b.x1 - b.x0 },
      { mid: { x: b.x0, y: (b.y0 + b.y1) / 2 }, out: { x: -1, y: 0 }, len: b.y1 - b.y0 },
      { mid: { x: b.x1, y: (b.y0 + b.y1) / 2 }, out: { x: 1, y: 0 }, len: b.y1 - b.y0 },
    ];
    const neighbourOf = (e: (typeof edges)[number]) => {
      const probe = { x: e.mid.x + e.out.x * 0.4, y: e.mid.y + e.out.y * 0.4 };
      return plan.rooms.find((o) => {
        if (o.id === r.id) return false;
        const ob = bbox(o.polygon);
        return probe.x >= ob.x0 && probe.x <= ob.x1 && probe.y >= ob.y0 && probe.y <= ob.y1;
      });
    };
    const rank = (e: (typeof edges)[number]) => {
      const n = neighbourOf(e);
      if (!n || e.len < 0.8) return 0;
      return n.type === "kamar" ? 3 : n.type === "selasar" || n.type === "dapur" ? 2 : n.type === "kamar_mandi" ? 0 : 1;
    };
    const best = [...edges].sort((p, q) => rank(q) - rank(p))[0];
    if (rank(best) === 0) continue;
    added.push(attachOpening({ id: uid("d"), type: "door", wallId: null, at: { x: round(best.mid.x, 4), y: round(best.mid.y, 4) }, width: 0.7, height: 2.1, leaves: 1, material: "pvc", label: `Pintu ${r.name}` }, plan.walls));
  }
  return { ...plan, openings: [...plan.openings, ...added] };
}

import type { DimensionChain, Opening, Plan, Point, Room, ValidationIssue, Wall } from "./types";

export const EPS = 0.02; // toleransi 2 cm

export const round = (v: number, d = 2) => Math.round(v * 10 ** d) / 10 ** d;
export const dist = (p: Point, q: Point) => Math.hypot(p.x - q.x, p.y - q.y);
export const wallLength = (w: Wall) => dist(w.a, w.b);

export function uid(prefix = "id"): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

/** Luas polygon (shoelace) */
export function polygonArea(poly: Point[]): number {
  let s = 0;
  for (let i = 0; i < poly.length; i++) {
    const p = poly[i];
    const q = poly[(i + 1) % poly.length];
    s += p.x * q.y - q.x * p.y;
  }
  return Math.abs(s) / 2;
}

export function polygonPerimeter(poly: Point[]): number {
  let s = 0;
  for (let i = 0; i < poly.length; i++) s += dist(poly[i], poly[(i + 1) % poly.length]);
  return s;
}

export function polygonCentroid(poly: Point[]): Point {
  const n = poly.length || 1;
  return {
    x: poly.reduce((a, p) => a + p.x, 0) / n,
    y: poly.reduce((a, p) => a + p.y, 0) / n,
  };
}

export const rect = (x: number, y: number, w: number, h: number): Point[] => [
  { x, y },
  { x: x + w, y },
  { x: x + w, y: y + h },
  { x, y: y + h },
];

/** Jarak titik ke segmen + parameter t proyeksi (0..1) */
export function pointToSegment(p: Point, a: Point, b: Point): { d: number; t: number; proj: Point } {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len2 = dx * dx + dy * dy;
  let t = len2 === 0 ? 0 : ((p.x - a.x) * dx + (p.y - a.y) * dy) / len2;
  t = Math.max(0, Math.min(1, t));
  const proj = { x: a.x + t * dx, y: a.y + t * dy };
  return { d: dist(p, proj), t, proj };
}

/** Garis grid (sumbu dinding) dari rantai dimensi: segmen ganjil-genap = tebal dinding / bentang */
export function gridFromChain(chain: DimensionChain, wallThickness: number): number[] {
  const lines: number[] = [];
  let cur = 0;
  for (const seg of chain.segments) {
    if (Math.abs(seg - wallThickness) <= EPS) lines.push(round(cur + seg / 2, 4));
    cur += seg;
  }
  return lines;
}

/**
 * Normalisasi hasil ekstraksi AI: snap ujung dinding ke grid rantai dimensi & ke ujung dinding lain,
 * tempelkan bukaan ke dinding terdekat. Deterministik → hasil bisa diaudit.
 */
export function normalizePlan(plan: Plan, snapTol = 0.12): Plan {
  const t = plan.wallThickness;
  const gx = new Set<number>();
  const gy = new Set<number>();
  for (const c of plan.chains) {
    const lines = gridFromChain(c, t);
    for (const l of lines) (c.side === "top" || c.side === "bottom" ? gx : gy).add(l);
  }
  const snap1 = (v: number, grid: Set<number>) => {
    let best = v;
    let bd = snapTol;
    for (const g of grid) {
      const d = Math.abs(g - v);
      if (d < bd) {
        bd = d;
        best = g;
      }
    }
    return round(best, 4);
  };

  let walls: Wall[] = plan.walls.map((w) => {
    const a = { x: snap1(w.a.x, gx), y: snap1(w.a.y, gy) };
    const b = { x: snap1(w.b.x, gx), y: snap1(w.b.y, gy) };
    // luruskan dinding yang hampir ortogonal
    if (Math.abs(a.x - b.x) < snapTol) b.x = a.x;
    if (Math.abs(a.y - b.y) < snapTol) b.y = a.y;
    return { ...w, a, b, thickness: w.thickness || t };
  });

  // snap ujung ke ujung dinding lain / ke badan dinding (T-junction)
  const endpoints = walls.flatMap((w) => [w.a, w.b]);
  walls = walls.map((w) => {
    const fix = (p: Point, other: Point): Point => {
      for (const q of endpoints) {
        if (q !== p && dist(p, q) < snapTol && dist(p, q) > 0) return { ...q };
      }
      for (const ow of walls) {
        if (ow.id === w.id) continue;
        const r = pointToSegment(p, ow.a, ow.b);
        if (r.d < snapTol && r.d > 0) {
          // proyeksikan sepanjang arah dinding sendiri agar tetap ortogonal
          if (Math.abs(p.x - other.x) < EPS) return { x: p.x, y: round(r.proj.y, 4) };
          if (Math.abs(p.y - other.y) < EPS) return { x: round(r.proj.x, 4), y: p.y };
          return { x: round(r.proj.x, 4), y: round(r.proj.y, 4) };
        }
      }
      return p;
    };
    return { ...w, a: fix(w.a, w.b), b: fix(w.b, w.a) };
  });

  walls = walls.filter((w) => wallLength(w) > EPS);

  const openings = plan.openings.map((o) => attachOpening(o, walls));
  return { ...plan, walls, openings };
}

export function attachOpening(o: Opening, walls: Wall[]): Opening {
  let best: { id: string; d: number; proj: Point } | null = null;
  for (const w of walls) {
    const r = pointToSegment(o.at, w.a, w.b);
    if (!best || r.d < best.d) best = { id: w.id, d: r.d, proj: r.proj };
  }
  if (!best || best.d > 0.6) return { ...o, wallId: o.wallId && walls.some((w) => w.id === o.wallId) ? o.wallId : null };
  return { ...o, wallId: best.id, at: { x: round(best.proj.x, 4), y: round(best.proj.y, 4) } };
}

/** Deteksi titik kolom: ujung dinding & T-junction, + kolom antara bila bentang > maxSpan */
export function detectColumns(walls: Wall[], maxSpan: number): Point[] {
  const pts: Point[] = [];
  const add = (p: Point) => {
    if (!pts.some((q) => dist(p, q) < 0.1)) pts.push({ x: round(p.x, 3), y: round(p.y, 3) });
  };
  for (const w of walls) {
    add(w.a);
    add(w.b);
  }
  // kolom antara pada bentang panjang
  for (const w of walls) {
    const onWall = pts
      .map((p) => ({ p, r: pointToSegment(p, w.a, w.b) }))
      .filter((o) => o.r.d < 0.1)
      .map((o) => o.r.t)
      .sort((a, b) => a - b);
    const L = wallLength(w);
    for (let i = 0; i < onWall.length - 1; i++) {
      const span = (onWall[i + 1] - onWall[i]) * L;
      if (span > maxSpan + EPS) {
        const n = Math.ceil(span / maxSpan);
        for (let k = 1; k < n; k++) {
          const tt = onWall[i] + ((onWall[i + 1] - onWall[i]) * k) / n;
          add({ x: w.a.x + (w.b.x - w.a.x) * tt, y: w.a.y + (w.b.y - w.a.y) * tt });
        }
      }
    }
  }
  return pts;
}

export interface PlanMetrics {
  wallLength: number;
  exteriorWallLength: number;
  interiorWallLength: number;
  grossArea: number;
  netFloorArea: number;
  wallFootprint: number;
  doors: number;
  windows: number;
  windowLeaves: number;
  passages: number;
  openingArea: number;
  roomCount: number;
}

export function openingArea(o: Opening, doorH: number, winH: number): number {
  const h = o.height || (o.type === "window" ? winH : doorH);
  return o.width * h;
}

export function planMetrics(plan: Plan, doorH = 2.1, winH = 1.2): PlanMetrics {
  const ext = plan.walls.filter((w) => w.exterior).reduce((a, w) => a + wallLength(w), 0);
  const all = plan.walls.reduce((a, w) => a + wallLength(w), 0);
  const net = plan.rooms.reduce((a, r) => a + polygonArea(r.polygon), 0);
  return {
    wallLength: round(all, 3),
    exteriorWallLength: round(ext, 3),
    interiorWallLength: round(all - ext, 3),
    grossArea: round(plan.outline.width * plan.outline.depth, 3),
    netFloorArea: round(net, 3),
    wallFootprint: round(plan.walls.reduce((a, w) => a + wallLength(w) * w.thickness, 0), 3),
    doors: plan.openings.filter((o) => o.type === "door").length,
    windows: plan.openings.filter((o) => o.type === "window").length,
    windowLeaves: plan.openings.filter((o) => o.type === "window").reduce((a, o) => a + (o.leaves || 1), 0),
    passages: plan.openings.filter((o) => o.type === "passage").length,
    openingArea: round(plan.openings.reduce((a, o) => a + openingArea(o, doorH, winH), 0), 3),
    roomCount: plan.rooms.length,
  };
}

/** Validasi deterministik — tangkap halusinasi AI sebelum masuk hitungan */
export function validatePlan(plan: Plan): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const { width, depth } = plan.outline;

  for (const c of plan.chains) {
    const sum = c.segments.reduce((a, b) => a + b, 0);
    if (Math.abs(sum - c.total) > EPS)
      issues.push({
        level: "error",
        message: `Rantai dimensi ${c.side}: jumlah segmen ${round(sum, 3)} m ≠ total ${c.total} m`,
      });
    const expect = c.side === "top" || c.side === "bottom" ? width : depth;
    if (Math.abs(c.total - expect) > EPS)
      issues.push({
        level: "warning",
        message: `Total rantai ${c.side} (${c.total} m) beda dengan ukuran bangunan (${expect} m)`,
      });
  }
  if (plan.chains.length === 0) issues.push({ level: "warning", message: "Tidak ada rantai dimensi terbaca — skala belum terverifikasi" });

  for (const w of plan.walls) {
    for (const p of [w.a, w.b]) {
      if (p.x < -EPS || p.y < -EPS || p.x > width + EPS || p.y > depth + EPS)
        issues.push({ level: "error", message: `Dinding ${w.id} keluar dari batas bangunan` });
    }
  }

  // ujung dinding menggantung
  for (const w of plan.walls) {
    for (const p of [w.a, w.b]) {
      const connected = plan.walls.some((o) => o.id !== w.id && pointToSegment(p, o.a, o.b).d < 0.05);
      if (!connected) issues.push({ level: "info", message: `Ujung dinding ${w.id} tidak tersambung (bisa wajar untuk bukaan)` });
    }
  }

  for (const o of plan.openings) {
    const w = plan.walls.find((x) => x.id === o.wallId);
    if (!w) issues.push({ level: "warning", message: `${labelOpening(o)} tidak menempel di dinding manapun` });
    else if (o.width > wallLength(w) + EPS)
      issues.push({ level: "error", message: `${labelOpening(o)} lebih lebar dari dindingnya` });
  }

  const m = planMetrics(plan);
  if (m.grossArea > 0 && plan.rooms.length) {
    const approx = m.netFloorArea + m.wallFootprint;
    const dev = Math.abs(approx - m.grossArea) / m.grossArea;
    if (dev > 0.08)
      issues.push({
        level: "warning",
        message: `Luas ruang + tapak dinding (${round(approx)} m²) beda ${round(dev * 100, 1)}% dari luas bruto (${m.grossArea} m²) — cek ruang yang terlewat`,
      });
  }
  return dedupe(issues);
}

function labelOpening(o: Opening) {
  const t = o.type === "door" ? "Pintu" : o.type === "window" ? "Jendela" : "Bukaan";
  return `${t} ${o.label ?? o.id} (${o.width} m)`;
}

function dedupe(list: ValidationIssue[]) {
  const seen = new Set<string>();
  return list.filter((i) => (seen.has(i.message) ? false : (seen.add(i.message), true)));
}

export function roomIsWet(r: Room) {
  return r.type === "kamar_mandi";
}

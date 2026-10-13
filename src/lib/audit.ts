/**
 * Audit konsistensi denah & RAB — semua aturan deterministik, tiap temuan bisa punya tombol perbaikan.
 * Tujuan: kesalahan baca AI (kamar/KM tergabung, ukuran luar meleset) dan setelan yang tidak cocok
 * (struktur rumah 1 lantai untuk gedung bertingkat, septic rumah untuk kos) tertangkap sebelum penawaran dikirim.
 */
import { floorsOf } from "./building";
import { mepOf } from "./defaults";
import { suspectDoubleWetRooms } from "./planEdit";
import { roomLabels } from "./labels";
import { computeStructure } from "./structure";
import type { Floor, Plan, Project } from "./types";

export type AuditFix =
  | { kind: "split_rooms"; floorId: string; roomIds: string[] }
  | { kind: "scale_outline"; floorId: string; width: number; depth: number }
  | { kind: "apply_structure" }
  | { kind: "septic_capacity" }
  | { kind: "carport_floor"; value: "keramik_kasar" | "rabat" };

export interface AuditIssue {
  id: string;
  level: "error" | "warning" | "info";
  floorId: string | null;
  floorName: string | null;
  message: string;
  fix?: { label: string; action: AuditFix };
}

const EPS = 0.02;
const fmt = (v: number) => v.toLocaleString("id-ID", { maximumFractionDigits: 2 });

/** Label kamar dari petunjuk PDF yang tersimpan di lantai (format `"K11"@(x%,y%)`) */
export function hintRoomLabels(hint: string | undefined): string[] {
  if (!hint) return [];
  const texts = [...hint.matchAll(/"([^"]{1,40})"@\(/g)].map((m) => m[1]);
  return roomLabels(texts);
}

export function auditFloor(floor: Floor, multi: boolean): AuditIssue[] {
  const plan = floor.plan;
  if (!plan) return [];
  const out: AuditIssue[] = [];
  const tag = multi ? floor.name : null;
  const kamar = plan.rooms.filter((r) => r.type === "kamar");
  const km = plan.rooms.filter((r) => r.type === "kamar_mandi");

  // 1. Jumlah kamar vs label kamar di PDF
  const labels = hintRoomLabels(floor.hint);
  if (labels.length && labels.length !== kamar.length)
    out.push({
      id: `${floor.id}:kamar-label`,
      level: "error",
      floorId: floor.id,
      floorName: tag,
      message: `PDF mencantumkan ${labels.length} kamar (${labels.slice(0, 12).join(", ")}${labels.length > 12 ? ", …" : ""}), AI membaca ${kamar.length} ruang kamar. Periksa kamar yang tergabung/terlewat, atau analisa ulang.`,
    });

  // 2. Jumlah KM vs kloset yang dihitung AI / pola KM gabungan
  const doubles = suspectDoubleWetRooms(plan);
  if (plan.closets != null && plan.closets > km.length)
    out.push({
      id: `${floor.id}:kloset`,
      level: "error",
      floorId: floor.id,
      floorName: tag,
      message: `AI menghitung ${plan.closets} kloset tetapi hanya ${km.length} ruang KM — ada blok KM berisi lebih dari 1 bilik.`,
      fix: doubles.length ? { label: `Bagi ${doubles.length} blok KM jadi 2 bilik`, action: { kind: "split_rooms", floorId: floor.id, roomIds: doubles.map((r) => r.id) } } : undefined,
    });
  else if (doubles.length && kamar.length >= 3 && km.length < kamar.length)
    out.push({
      id: `${floor.id}:km-ganda`,
      level: "warning",
      floorId: floor.id,
      floorName: tag,
      message: `${kamar.length} kamar tapi ${km.length} KM. ${doubles.length} KM berukuran ±${doubles
        .map((r) => {
          const xs = r.polygon.map((p) => p.x);
          const ys = r.polygon.map((p) => p.y);
          return `${fmt(Math.max(...xs) - Math.min(...xs))}×${fmt(Math.max(...ys) - Math.min(...ys))}`;
        })
        .slice(0, 3)
        .join(", ")} m — pola blok 2 bilik KM bertolak-belakang (tiap kamar punya KM). Cocokkan dengan jumlah kloset di gambar.`,
      fix: { label: `Bagi ${doubles.length} blok KM jadi 2 bilik`, action: { kind: "split_rooms", floorId: floor.id, roomIds: doubles.map((r) => r.id) } },
    });

  // 3. Ukuran luar vs rantai dimensi
  const fix = outlineFromChains(plan);
  if (fix)
    out.push({
      id: `${floor.id}:outline`,
      level: "error",
      floorId: floor.id,
      floorName: tag,
      message: `Ukuran bangunan terbaca ${fmt(plan.outline.width)} × ${fmt(plan.outline.depth)} m, padahal angka dimensi total di gambar ${fmt(fix.width)} × ${fmt(fix.depth)} m. Volume dinding, lantai, dan atap ikut meleset.`,
      fix: { label: `Pakai ${fmt(fix.width)} × ${fmt(fix.depth)} m dari dimensi`, action: { kind: "scale_outline", floorId: floor.id, width: fix.width, depth: fix.depth } },
    });
  return out;
}

/**
 * Ukuran luar dari rantai dimensi: untuk tiap arah, ambil total rantai yang BERBEDA dari outline
 * (yang paling sering muncul; segmen konsisten diutamakan). Sama dengan peringatan "Total rantai … beda" di panel Perlu dicek.
 */
export function outlineFromChains(plan: Plan): { width: number; depth: number } | null {
  const pick = (sides: string[], cur: number) => {
    const cands = plan.chains
      .filter((c) => sides.includes(c.side) && c.total > 0 && Math.abs(c.total - cur) > EPS && Math.abs(c.total / cur - 1) <= 0.1)
      .map((c) => ({ total: Math.round(c.total * 1000) / 1000, ok: Math.abs(c.segments.reduce((a, x) => a + x, 0) - c.total) <= EPS }));
    if (!cands.length) return cur;
    const score = new Map<number, number>();
    for (const c of cands) score.set(c.total, (score.get(c.total) ?? 0) + (c.ok ? 2 : 1));
    // jangan ubah bila ada rantai lain yang justru sama dengan outline dan lebih banyak
    const same = plan.chains.filter((c) => sides.includes(c.side) && Math.abs(c.total - cur) <= EPS).length * 2;
    const [best, sc] = [...score.entries()].sort((x, y) => y[1] - x[1])[0];
    return sc >= same ? best : cur;
  };
  const width = pick(["top", "bottom"], plan.outline.width);
  const depth = pick(["left", "right"], plan.outline.depth);
  if (Math.abs(width - plan.outline.width) <= EPS && Math.abs(depth - plan.outline.depth) <= EPS) return null;
  return { width, depth };
}

export function auditProject(project: Project): AuditIssue[] {
  const floors = floorsOf(project);
  const multi = floors.length > 1;
  const out: AuditIssue[] = floors.flatMap((f) => auditFloor(f, multi));
  const P = project.params;
  const withPlan = floors.filter((f) => f.plan);
  if (!withPlan.length) return out;

  // 4. Struktur default rumah 1 lantai untuk gedung bertingkat
  const s = withPlan.length > 1 ? computeStructure(project) : null;
  if (s) {
    const mm = (m: number) => Math.round(m * 1000);
    const small = mm(P.column.b) < s.column.b || mm(P.column.h) < s.column.h || mm(P.sloof.h) < s.sloof.h;
    if (small)
      out.push({
        id: "struktur",
        level: "error",
        floorId: null,
        floorName: null,
        message: `Gedung ${withPlan.length} lantai masih memakai kolom ${mm(P.column.b) / 10}×${mm(P.column.h) / 10} cm & sloof ${mm(P.sloof.b) / 10}×${mm(P.sloof.h) / 10} cm. Pra-desain SNI: kolom ${s.column.b / 10}×${s.column.h / 10} cm, sloof ${s.sloof.b / 10}×${s.sloof.h / 10} cm (wajib diverifikasi ahli struktur).`,
        fix: { label: "Terapkan pra-desain SNI ke RAB", action: { kind: "apply_structure" } },
      });
  }

  // 5. Septic standar untuk banyak kamar
  const kamar = withPlan.reduce((a, f) => a + f.plan!.rooms.filter((r) => r.type === "kamar").length, 0);
  const M = mepOf(P);
  if (P.septicTank && (M.septicMode ?? "standar") === "standar" && kamar >= 6)
    out.push({
      id: "septic",
      level: "warning",
      floorId: null,
      floorName: null,
      message: `${kamar} kamar dilayani 1 septic tank standar rumah. Kapasitas kemungkinan kurang.`,
      fix: { label: "Hitung septic dari jumlah penghuni", action: { kind: "septic_capacity" } },
    });

  // 6. Lantai carport
  const hasCarport = withPlan.some((f) => f.plan!.rooms.some((r) => r.type === "carport"));
  if (hasCarport && P.carportFloor === "granit")
    out.push({
      id: "carport",
      level: "info",
      floorId: null,
      floorName: null,
      message: "Lantai carport dihitung granit 60×60 seperti ruang dalam.",
      fix: { label: "Ganti keramik kasar", action: { kind: "carport_floor", value: "keramik_kasar" } },
    });
  return out;
}

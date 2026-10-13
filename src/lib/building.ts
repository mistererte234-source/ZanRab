/**
 * Bangunan bertingkat: satu denah per lantai.
 *
 * Setiap lantai dihitung dengan take-off yang sama seperti rumah satu lantai, lalu disaring sesuai perannya:
 *  - Lantai dasar  : persiapan, pekerjaan tanah, pondasi, sloof, rabat, dan utilitas gedung (septic, air, PLN, dll.).
 *  - Lantai atas   : pelat lantai beton (luas denah − void).
 *  - Bukan teratas : ring balok diganti BALOK LANTAI (menopang lantai di atasnya) + satu tangga ke lantai berikutnya.
 *  - Teratas       : atap & ring balok.
 * Item dengan kode yang sama dari semua lantai digabung menjadi satu baris RAB (rumus per lantai tetap ditampilkan).
 */
import { polygonArea, round } from "./geometry";
import { takeoff, type TakeoffContext } from "./takeoff";
import type { Floor, Plan, Project, ProjectParams, QuantityItem } from "./types";

export function floorsOf(p: Project): Floor[] {
  if (p.floors && p.floors.length) return [...p.floors].sort((a, b) => a.level - b.level);
  return [{ id: "lt1", name: "Lantai 1", level: 0, plan: p.plan, imageDataUrl: p.imageDataUrl, analyzeMeta: p.analyzeMeta }];
}

export const isMultiFloor = (p: Project) => (p.floors?.length ?? 0) > 1;
export const anyPlan = (p: Project) => floorsOf(p).some((f) => !!f.plan);

const f = (v: number, d = 2) => round(v, d).toLocaleString("id-ID", { maximumFractionDigits: d });

/** Item yang hanya ada sekali per gedung (dihitung dari denah lantai dasar) */
const GROUND_ONLY = new Set([
  "STR.STRAUSS", "STR.PILECAP", "STR.SLOOF", "STR.RABAT", "PAS.KUMBUNG", "PAS.BATUKALI",
  "AIR.SEPTIC", "AIR.PDAM", "AIR.SUMURBOR", "AIR.POMPA", "AIR.POMPAJET", "AIR.POMPADORONG",
  "AIR.TOREN520", "AIR.TOREN1050", "AIR.TOREN1550", "AIR.TOREN2000", "AIR.MENARA", "AIR.DRAINASE", "AIR.BAKKONTROL",
  "LST.PLN", "LST.GROUNDING", "LST.PETIR", "LST.TV", "LST.LAN", "LST.CCTV", "LST.DVR", "LST.BEL",
  "LL.BERSIHAKHIR", "LL.MEJADAPUR",
]);
const isGroundOnly = (code: string) => code.startsWith("PRS.") || code.startsWith("TNH.") || GROUND_ONLY.has(code);

/** Item atap: hanya lantai teratas */
const TOP_ONLY = new Set([
  "ATP.RANGKA", "ATP.GENTENGBETON", "ATP.GENTENGMETAL", "ATP.SPANDEK", "ATP.WUWUNG", "ATP.LISPLANG", "ATP.TALANG", "ATP.WATERPROOF",
  "STR.DAK", // dak atap (pelat lantai atas ditambahkan terpisah di bawah)
]);

const isVoid = (name: string) => /void|vide|bukaan lantai/i.test(name);

/** Luas pelat lantai = luas luar denah − area void */
export function slabArea(plan: Plan): number {
  const voids = plan.rooms.filter((r) => isVoid(r.name)).reduce((a, r) => a + polygonArea(r.polygon), 0);
  return Math.max(0, plan.outline.width * plan.outline.depth - voids);
}

export function stairVolume(height: number, width: number) {
  const riser = 0.18;
  const tread = 0.28;
  const steps = Math.ceil(height / riser);
  const run = steps * tread;
  const incline = Math.hypot(height, run);
  const waist = 0.15;
  const volume = width * (incline * waist + steps * 0.5 * riser * tread);
  return { volume, formula: `lebar ${f(width)} × (miring ${f(incline)} m × ${f(waist)} + ${steps} anak tangga ${cm(riser)}/${cm(tread)} cm)` };
}
const cm = (m: number) => Math.round(m * 100);

export interface BuildingTakeoff {
  items: QuantityItem[];
  ctx: TakeoffContext;
  perFloor: { id: string; name: string; level: number; items: QuantityItem[] }[];
  grossArea: number;
}

export function takeoffBuilding(floors: Floor[], P: ProjectParams): BuildingTakeoff | null {
  const withPlan = floors.filter((x) => x.plan).sort((a, b) => a.level - b.level);
  if (!withPlan.length) return null;
  const top = withPlan[withPlan.length - 1];
  const ground = withPlan[0];
  const slabT = P.upperSlabThickness ?? 0.12;
  const beam = P.floorBeam ?? { b: 0.2, h: 0.35 };
  const stairW = P.stairWidth ?? 1.0;

  const perFloor: BuildingTakeoff["perFloor"] = [];
  let groundCtx: TakeoffContext | null = null;
  let grossArea = 0;

  for (const fl of withPlan) {
    const plan = fl.plan!;
    const H = fl.height ?? P.wallHeight;
    const Pf: ProjectParams = { ...P, floorCount: 1, wallHeight: H, grossAreaOverride: null };
    const { items, ctx } = takeoff(plan, Pf);
    if (fl === ground) groundCtx = ctx;
    const isGround = fl === ground;
    const isTop = fl === top;
    for (const it of items) it.name = it.name.replace(/\s*\(1 lantai\)/i, "").replace(/× 1 lt$/, "").trim();
    for (const it of items) it.formula = it.formula.replace(/ × 1 lt\b/g, "");
    const kept = items.filter((it) => {
      if (isGroundOnly(it.code)) return isGround;
      if (TOP_ONLY.has(it.code)) return isTop;
      if (it.code === "STR.RINGBALOK" && !isTop && !/lintel|pinggang/i.test(it.name)) return false; // diganti balok lantai
      return true;
    });
    const L = ctx.metrics.wallLength;
    if (!isTop) {
      kept.push({
        code: "STR.BALOK",
        section: "III",
        name: `Balok lantai ${cm(beam.b)}x${cm(beam.h)}`,
        unit: "m3",
        volume: round(L * beam.b * beam.h, 3),
        formula: `${f(L)} m × ${f(beam.b)} × ${f(beam.h)}`,
        source: "denah",
      });
      const st = stairVolume(H, stairW);
      kept.push({ code: "STR.TANGGA", section: "III", name: "Tangga beton bertulang", unit: "m3", volume: round(st.volume, 3), formula: st.formula, source: "asumsi" });
    }
    if (!isGround) {
      const a = slabArea(plan);
      kept.push({
        code: "STR.PELAT",
        section: "III",
        name: `Pelat lantai beton bertulang t=${cm(slabT)} cm`,
        unit: "m3",
        volume: round(a * slabT, 3),
        formula: `${f(a)} m² (luas denah − void) × ${f(slabT)}`,
        source: "denah",
      });
    }
    grossArea += isGround ? plan.outline.width * plan.outline.depth : slabArea(plan);
    perFloor.push({ id: fl.id, name: fl.name, level: fl.level, items: kept });
  }

  // gabung per kode
  const merged = new Map<string, QuantityItem & { _floors: number }>();
  const short = (n: string) => n.replace(/^Lantai\s*/i, "Lt ");
  for (const pf of perFloor) {
    for (const it of pf.items) {
      const tag = withPlan.length > 1 ? `${short(pf.name)}: ` : "";
      const cur = merged.get(it.code);
      if (!cur) merged.set(it.code, { ...it, formula: tag + it.formula, _floors: 1 });
      else {
        cur.volume = round(cur.volume + it.volume, 3);
        cur.formula = `${cur.formula} | ${tag}${it.formula}`;
        cur._floors += 1;
        if (cur.name !== it.name) cur.name = cur.name.split(" — ")[0].split(" (")[0];
        if (cur.source !== "denah" && it.source === "denah") cur.source = "denah";
      }
    }
  }
  const items = [...merged.values()].map(({ _floors, ...it }) => it);
  // pelat lantai memakai kode STR.PELAT agar terpisah dari dak atap; harga/AHSP sama dengan STR.DAK
  return { items, ctx: groundCtx!, perFloor, grossArea };
}

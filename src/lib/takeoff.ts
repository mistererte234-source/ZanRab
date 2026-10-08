import {
  detectColumns,
  dist,
  openingArea,
  planMetrics,
  pointToSegment,
  polygonArea,
  polygonCentroid,
  round,
  wallLength,
} from "./geometry";
import type { Opening, Plan, Point, ProjectParams, QuantityItem, Room, Wall } from "./types";
import { mepOf } from "./defaults";

const f = (v: number, d = 2) => round(v, d).toLocaleString("id-ID", { maximumFractionDigits: d });

/** Panjang sisi ruang yang berimpit dengan muka dinding (bukan sisi terbuka / open-plan) */
export function roomWallContact(room: Room, walls: Wall[]): number {
  let total = 0;
  const poly = room.polygon;
  for (let i = 0; i < poly.length; i++) {
    const p = poly[i];
    const q = poly[(i + 1) % poly.length];
    const elen = dist(p, q);
    if (elen < 1e-6) continue;
    const ux = (q.x - p.x) / elen;
    const uy = (q.y - p.y) / elen;
    // gabungkan interval kontak sepanjang sisi
    const intervals: [number, number][] = [];
    for (const w of walls) {
      const wl = wallLength(w);
      if (wl < 1e-6) continue;
      const wx = (w.b.x - w.a.x) / wl;
      const wy = (w.b.y - w.a.y) / wl;
      if (Math.abs(ux * wy - uy * wx) > 0.02) continue; // tidak sejajar
      const off = Math.abs((w.a.x - p.x) * -uy + (w.a.y - p.y) * ux);
      if (Math.abs(off - w.thickness / 2) > 0.05) continue; // bukan muka dinding ini
      const s1 = (w.a.x - p.x) * ux + (w.a.y - p.y) * uy;
      const s2 = (w.b.x - p.x) * ux + (w.b.y - p.y) * uy;
      const lo = Math.max(0, Math.min(s1, s2) - w.thickness / 2);
      const hi = Math.min(elen, Math.max(s1, s2) + w.thickness / 2);
      if (hi > lo) intervals.push([lo, hi]);
    }
    intervals.sort((a, b) => a[0] - b[0]);
    let cur: [number, number] | null = null;
    for (const iv of intervals) {
      if (!cur) cur = [...iv];
      else if (iv[0] <= cur[1]) cur[1] = Math.max(cur[1], iv[1]);
      else {
        total += cur[1] - cur[0];
        cur = [...iv];
      }
    }
    if (cur) total += cur[1] - cur[0];
  }
  return total;
}

/** Bukaan yang berbatasan dengan ruang (titik tengah dekat tepi polygon ruang) */
export function openingsOfRoom(room: Room, openings: Opening[], tol = 0.15): Opening[] {
  return openings.filter((o) => {
    for (let i = 0; i < room.polygon.length; i++) {
      const r = pointToSegment(o.at, room.polygon[i], room.polygon[(i + 1) % room.polygon.length]);
      if (r.d <= tol) return true;
    }
    return false;
  });
}

function distanceToExterior(p: Point, walls: Wall[]): number {
  let best = Infinity;
  for (const w of walls.filter((x) => x.exterior)) best = Math.min(best, pointToSegment(p, w.a, w.b).d);
  return Number.isFinite(best) ? best : 3;
}

export interface TakeoffContext {
  columns: Point[];
  metrics: ReturnType<typeof planMetrics>;
  wallNetArea: number;
  roofArea: number;
}

export function takeoff(plan: Plan, P: ProjectParams): { items: QuantityItem[]; ctx: TakeoffContext } {
  const items: QuantityItem[] = [];
  const add = (it: QuantityItem) => {
    if (it.volume > 0) items.push({ ...it, volume: round(it.volume, 3) });
  };
  const m = planMetrics(plan, P.doorHeight, P.windowHeight);
  const L = m.wallLength;
  const Lext = m.exteriorWallLength;
  const H = P.wallHeight;
  const gross = P.grossAreaOverride ?? m.grossArea;
  const columns = plan.columns ?? detectColumns(plan.walls, P.maxColumnSpan);
  const n = columns.length;

  const wetRooms = plan.rooms.filter((r) => r.type === "kamar_mandi");
  const dryRooms = plan.rooms.filter((r) => r.type !== "kamar_mandi");
  const area = (rs: Room[]) => rs.reduce((a, r) => a + polygonArea(r.polygon), 0);
  const netFloor = area(plan.rooms);
  const indoorFloor = area(plan.rooms.filter((r) => r.type !== "teras" && r.type !== "carport"));

  // ---------- I. PERSIAPAN ----------
  if (P.demolitionLumpSum > 0)
    add({ code: "PRS.BONGKAR", section: "I", name: "Bongkar & buang bangunan lama", unit: "ls", volume: 1, formula: "Lump sum (parameter)", source: "parameter" });
  add({ code: "PRS.BERSIH", section: "I", name: "Pembersihan lahan", unit: "m2", volume: gross, formula: `Luas bruto ${f(gross)} m²`, source: "denah" });
  const bp = 2 * (plan.outline.width + 2 + plan.outline.depth + 2);
  add({ code: "PRS.BOUWPLANK", section: "I", name: "Pengukuran & bouwplank", unit: "m1", volume: bp, formula: `2 × ((${f(plan.outline.width)} + 2) + (${f(plan.outline.depth)} + 2))`, source: "denah" });

  // ---------- II. TANAH & III. STRUKTUR ----------
  const usesStrauss = P.foundation === "strauss_kumbung";
  const usesStone = P.foundation === "batu_kali" || P.foundation === "footplat_batu_kali";

  if (usesStrauss) {
    add({ code: "TNH.GALSTRAUSS", section: "II", name: `Galian / bor strauss @ ${f(P.straussDepth)} m`, unit: "m1", volume: n * P.straussDepth, formula: `${n} titik × ${f(P.straussDepth)} m`, source: "denah" });
    add({ code: "TNH.GALPILECAP", section: "II", name: `Galian pile cap ${cm(P.pileCap.w)}x${cm(P.pileCap.l)}x${cm(P.pileCap.t)}`, unit: "ttk", volume: n, formula: `${n} titik kolom`, source: "denah" });
  }
  if (usesStone) {
    const gw = P.stoneFoundationBottom + 0.2;
    const gd = P.stoneFoundationHeight + 0.15;
    let gal = L * gw * gd;
    let formula = `${f(L)} m × ${f(gw)} × ${f(gd)}`;
    if (P.foundation === "footplat_batu_kali") {
      const fp = n * (P.pileCap.w + 0.4) * (P.pileCap.l + 0.4) * 1.0;
      gal += fp;
      formula += ` + footplat ${n} × ${f(P.pileCap.w + 0.4)}² × 1,0`;
    }
    const stoneVol = L * ((P.stoneFoundationTop + P.stoneFoundationBottom) / 2) * P.stoneFoundationHeight;
    add({ code: "TNH.GALPONDASI", section: "II", name: "Galian tanah pondasi", unit: "m3", volume: gal, formula, source: "denah" });
    add({ code: "TNH.URUGKEMBALI", section: "II", name: "Urugan tanah kembali", unit: "m3", volume: Math.max(0, gal - stoneVol) / 3, formula: `(galian − pasangan) ÷ 3`, source: "asumsi" });
  }
  if (P.fillHeight > 0)
    add({ code: "TNH.URUG", section: "II", name: `Urugan peninggian t=${cm(P.fillHeight)} cm`, unit: "m3", volume: netFloor * P.fillHeight, formula: `Luas lantai ${f(netFloor)} m² × ${f(P.fillHeight)} m (dihitung SEKALI)`, source: "parameter" });

  if (usesStrauss) {
    const r = P.straussDiameter / 2;
    add({ code: "STR.STRAUSS", section: "III", name: `Pondasi strauss Ø${cm(P.straussDiameter)} @ ${f(P.straussDepth)} m — ${n} titik`, unit: "m3", volume: n * Math.PI * r * r * P.straussDepth, formula: `${n} × π × ${f(r, 3)}² × ${f(P.straussDepth)}`, source: "denah" });
  }
  if (usesStrauss || P.foundation === "footplat_batu_kali") {
    const nm = usesStrauss ? "Pile cap" : "Footplat";
    add({ code: "STR.PILECAP", section: "III", name: `${nm} ${cm(P.pileCap.w)}x${cm(P.pileCap.l)}x${cm(P.pileCap.t)} — ${n} titik`, unit: "m3", volume: n * P.pileCap.w * P.pileCap.l * P.pileCap.t, formula: `${n} × ${f(P.pileCap.w)} × ${f(P.pileCap.l)} × ${f(P.pileCap.t)}`, source: "denah" });
  }
  const floors = Math.max(1, P.floorCount || 1);
  add({ code: "STR.SLOOF", section: "III", name: `Sloof ${cm(P.sloof.b)}x${cm(P.sloof.h)}`, unit: "m3", volume: L * P.sloof.b * P.sloof.h, formula: `${f(L)} m × ${f(P.sloof.b)} × ${f(P.sloof.h)}`, source: "denah" });
  add({ code: "STR.KOLOM", section: "III", name: `Kolom ${cm(P.column.b)}x${cm(P.column.h)} — ${n} titik (${floors} lantai)`, unit: "m3", volume: n * P.column.b * P.column.h * H * floors, formula: `${n} × ${f(P.column.b)} × ${f(P.column.h)} × ${f(H)} m × ${floors} lt`, source: "denah" });
  add({ code: "STR.RINGBALOK", section: "III", name: `Ring balok ${cm(P.ringBeam.b)}x${cm(P.ringBeam.h)}`, unit: "m3", volume: L * P.ringBeam.b * P.ringBeam.h * floors, formula: `${f(L)} m × ${f(P.ringBeam.b)} × ${f(P.ringBeam.h)} × ${floors} lt`, source: "denah" });

  // Standar Teknik Sipil: Dinding > 3.8 m butuh Balok Lintel / Balok Pinggang Praktis di tengah bentang dinding
  if (H > 3.8) {
    const lintelB = 0.12;
    const lintelH = 0.15;
    add({
      code: "STR.RINGBALOK",
      section: "III",
      name: `Balok lintel / pinggang pengaku dinding ${cm(lintelB)}x${cm(lintelH)} (h=${f(H)} m > 3.8 m)`,
      unit: "m3",
      volume: L * lintelB * lintelH * floors,
      formula: `Pengaku dinding tinggi ${f(L)} m × ${f(lintelB)} × ${f(lintelH)} × ${floors} lt`,
      source: "parameter",
    });
  }

  add({ code: "STR.RABAT", section: "III", name: `Rabat beton lantai dasar t=${cm(P.floorSlabThickness)} cm`, unit: "m3", volume: netFloor * P.floorSlabThickness, formula: `${f(netFloor)} m² × ${f(P.floorSlabThickness)}`, source: "denah" });

  // Pelat lantai beton bertulang untuk lantai 2 ke atas (jika > 1 lantai)
  if (floors > 1) {
    const upperFloorSlabArea = indoorFloor * (floors - 1);
    add({
      code: "STR.DAK",
      section: "III",
      name: `Pelat lantai beton bertulang (Lantai 2..${floors}) t=12 cm`,
      unit: "m3",
      volume: upperFloorSlabArea * 0.12,
      formula: `Luas lantai atas ${f(upperFloorSlabArea)} m² × 0,12 m (${floors - 1} lantai)`,
      source: "parameter",
    });
  }

  const deckArea = P.roofType === "dak" ? P.concreteDeckArea || gross : P.concreteDeckArea;
  if (deckArea > 0)
    add({ code: "STR.DAK", section: "III", name: `Pelat dak atap t=${cm(P.concreteDeckThickness)} cm`, unit: "m3", volume: deckArea * P.concreteDeckThickness, formula: `${f(deckArea)} m² × ${f(P.concreteDeckThickness)}`, source: "parameter" });

  // ---------- IV. PASANGAN ----------
  if (usesStrauss)
    add({ code: "PAS.KUMBUNG", section: "IV", name: `Pondasi batu kumbung t=${cm(P.stoneFoundationHeight)} cm`, unit: "m2", volume: L * P.stoneFoundationHeight, formula: `${f(L)} m × ${f(P.stoneFoundationHeight)} m`, source: "denah" });
  if (usesStone)
    add({ code: "PAS.BATUKALI", section: "IV", name: "Pondasi batu kali 1:4", unit: "m3", volume: L * ((P.stoneFoundationTop + P.stoneFoundationBottom) / 2) * P.stoneFoundationHeight, formula: `${f(L)} × (${f(P.stoneFoundationTop)} + ${f(P.stoneFoundationBottom)})/2 × ${f(P.stoneFoundationHeight)}`, source: "denah" });

  const opArea = (o: Opening) => {
    const base = openingArea(o, P.doorHeight, P.windowHeight);
    return o.type === "door" && P.transomHeight > 0 ? base + o.width * P.transomHeight : base;
  };
  const totalOpening = plan.openings.reduce((a, o) => a + opArea(o), 0);
  const extIds = new Set(plan.walls.filter((w) => w.exterior).map((w) => w.id));
  const extOpening = plan.openings.filter((o) => o.wallId && extIds.has(o.wallId)).reduce((a, o) => a + opArea(o), 0);
  const wallGross = L * H;
  const wallNet = Math.max(0, wallGross - totalOpening);

  // Pemilihan material dinding & spesifikasi
  const wallType = P.wallType || "bata_ringan";
  if (wallType === "bata_merah") {
    add({
      code: "PAS.BATAMERAH",
      section: "IV",
      name: "Dinding bata merah 1/2 bata adukan 1:4",
      unit: "m2",
      volume: wallNet,
      formula: `${f(L)} m × ${f(H)} m − ${f(totalOpening)} m² bukaan (${plan.openings.length} bh)`,
      source: "denah",
    });
  } else if (wallType === "batako") {
    add({
      code: "PAS.BATAKO",
      section: "IV",
      name: "Dinding batako press adukan 1:4",
      unit: "m2",
      volume: wallNet,
      formula: `${f(L)} m × ${f(H)} m − ${f(totalOpening)} m² bukaan (${plan.openings.length} bh)`,
      source: "denah",
    });
  } else {
    add({
      code: "PAS.BATARINGAN",
      section: "IV",
      name: "Dinding bata ringan (Hebel) t=10 cm + thinbed",
      unit: "m2",
      volume: wallNet,
      formula: `${f(L)} m × ${f(H)} m − ${f(totalOpening)} m² bukaan (${plan.openings.length} bh)`,
      source: "denah",
    });
  }

  const plaster = wallNet * 2;
  add({ code: "PAS.PLESTER", section: "IV", name: "Plester + acian 2 sisi", unit: "m2", volume: plaster, formula: `${f(wallNet)} m² × 2 sisi`, source: "denah" });

  // ---------- V. ATAP & PLAFON ----------
  const ceiling = netFloor;
  add({ code: "ATP.PLAFON", section: "V", name: "Plafon gypsum + rangka hollow", unit: "m2", volume: ceiling, formula: `Σ luas ruang ${f(ceiling)} m² (${plan.rooms.length} ruang)`, source: "denah" });

  let roofArea = 0;
  if (P.roofType !== "dak") {
    const o = P.roofOverhang;
    const Wr = plan.outline.width + 2 * o;
    const Dr = plan.outline.depth + 2 * o;
    const long = Math.max(Wr, Dr);
    const short = Math.min(Wr, Dr);
    const th = (P.roofSlopeDeg * Math.PI) / 180;
    const k = 1 / Math.cos(th);
    const planRoof = Math.max(0, Wr * Dr - deckArea);
    roofArea = planRoof * k;
    const rf = `(${f(Wr)} × ${f(Dr)}${deckArea ? ` − dak ${f(deckArea)}` : ""}) ÷ cos ${P.roofSlopeDeg}°`;
    add({ code: "ATP.RANGKA", section: "V", name: "Rangka atap baja ringan", unit: "m2", volume: roofArea, formula: rf, source: "parameter" });
    const coverCode = P.roofCover === "genteng_beton" ? "ATP.GENTENGBETON" : P.roofCover === "genteng_metal" ? "ATP.GENTENGMETAL" : "ATP.SPANDEK";
    add({ code: coverCode, section: "V", name: coverName(P.roofCover), unit: "m2", volume: roofArea, formula: rf, source: "parameter" });
    const rise = (short / 2) * Math.tan(th);
    let ridge: number;
    let ridgeF: string;
    let fascia: number;
    let fasciaF: string;
    let gutter: number;
    if (P.roofType === "pelana") {
      ridge = long;
      ridgeF = `Nok sepanjang ${f(long)} m`;
      fascia = 2 * long + 4 * ((short / 2) * k);
      fasciaF = `2 × ${f(long)} + 4 × ${f((short / 2) * k)} (sisi miring)`;
      gutter = 2 * long;
    } else {
      const hip = Math.sqrt(2 * (short / 2) ** 2 + rise ** 2);
      ridge = long - short + 4 * hip;
      ridgeF = `Nok ${f(long - short)} + 4 jurai × ${f(hip)}`;
      fascia = 2 * (Wr + Dr);
      fasciaF = `Keliling 2 × (${f(Wr)} + ${f(Dr)})`;
      gutter = fascia;
    }
    add({ code: "ATP.WUWUNG", section: "V", name: "Genteng wuwung / nok", unit: "m1", volume: ridge, formula: ridgeF, source: "parameter" });
    add({ code: "ATP.LISPLANG", section: "V", name: "Lisplang kalsiboard", unit: "m1", volume: fascia, formula: fasciaF, source: "parameter" });
    if (P.gutter) add({ code: "ATP.TALANG", section: "V", name: "Talang PVC + pipa turun", unit: "m1", volume: gutter, formula: "Sepanjang tepi bawah atap", source: "parameter" });
  }
  if (deckArea > 0)
    add({ code: "ATP.WATERPROOF", section: "V", name: "Waterproofing dak", unit: "m2", volume: deckArea, formula: `Luas dak ${f(deckArea)} m²`, source: "parameter" });

  // ---------- VI. KUSEN ----------
  let frame = 0;
  for (const o of plan.openings) {
    const h = o.height || (o.type === "window" ? P.windowHeight : P.doorHeight);
    if (o.type === "door") {
      const tr = P.transomHeight;
      frame += 2 * (h + tr) + o.width + (tr > 0 ? o.width : 0);
    } else if (o.type === "window") frame += 2 * (o.width + h) + Math.max(0, (o.leaves || 1) - 1) * h;
  }
  const doors = plan.openings.filter((o) => o.type === "door");
  const windows = plan.openings.filter((o) => o.type === "window");
  add({ code: "KSN.ALU", section: "VI", name: 'Kusen aluminium 3"', unit: "m1", volume: frame, formula: `Keliling kusen ${doors.length} pintu + ${windows.length} jendela${P.transomHeight ? ` (+ boven ${cm(P.transomHeight)} cm)` : ""}`, source: "denah" });
  const leaves = windows.reduce((a, o) => a + (o.leaves || 1), 0);
  add({ code: "KSN.JENDELA", section: "VI", name: "Daun jendela + kaca 6 mm clear", unit: "bh", volume: leaves, formula: `${windows.length} jendela, total ${leaves} daun`, source: "denah" });
  const pvc = doors.filter((o) => o.material === "pvc").length;
  add({ code: "KSN.PINTUKAYU", section: "VI", name: "Daun pintu kayu + handle", unit: "bh", volume: doors.length - pvc, formula: `${doors.length - pvc} pintu`, source: "denah" });
  add({ code: "KSN.PINTUPVC", section: "VI", name: "Pintu PVC kamar mandi", unit: "bh", volume: pvc, formula: `${pvc} pintu KM`, source: "denah" });

  // ---------- VII. LANTAI ----------
  const dryArea = area(dryRooms);
  const wetArea = area(wetRooms);
  const waste = 1 + P.floorWaste;
  add({ code: "LNT.GRANIT", section: "VII", name: "Lantai granit 60x60", unit: "m2", volume: dryArea * waste, formula: `${f(dryArea)} m² × ${f(waste)} (waste ${Math.round(P.floorWaste * 100)}%)`, source: "denah" });
  add({ code: "LNT.KRMKKM", section: "VII", name: "Lantai keramik KM 30x30", unit: "m2", volume: wetArea * waste, formula: `${f(wetArea)} m² × ${f(waste)}`, source: "denah" });
  let wetTile = 0;
  for (const r of wetRooms) {
    const contact = roomWallContact(r, plan.walls);
    const doorW = openingsOfRoom(r, doors).reduce((a, o) => a + o.width, 0);
    wetTile += (contact - doorW) * P.wetWallTileHeight;
  }
  add({ code: "LNT.DINDINGKM", section: "VII", name: `Dinding keramik KM 30x60 t=${f(P.wetWallTileHeight)} m`, unit: "m2", volume: wetTile, formula: `(keliling dinding KM − lebar pintu) × ${f(P.wetWallTileHeight)} m`, source: "denah" });
  if (P.skirting) {
    let sk = 0;
    for (const r of dryRooms) {
      const contact = roomWallContact(r, plan.walls);
      const ow = openingsOfRoom(r, plan.openings.filter((o) => o.type !== "window")).reduce((a, o) => a + o.width, 0);
      sk += Math.max(0, contact - ow);
    }
    add({ code: "LNT.PLINT", section: "VII", name: "Plint granit", unit: "m1", volume: sk, formula: "Σ muka dinding ruang kering − lebar pintu/bukaan", source: "denah" });
  }

  // ---------- VIII. CAT ----------
  const extSide = Math.max(0, Lext * H - extOpening);
  const intPaint = Math.max(0, plaster - (P.exteriorPaintSeparate ? extSide : 0) - wetTile);
  add({ code: "CAT.INT", section: "VIII", name: "Cat dinding interior", unit: "m2", volume: intPaint, formula: `Plester ${f(plaster)}${P.exteriorPaintSeparate ? ` − sisi luar ${f(extSide)}` : ""} − keramik KM ${f(wetTile)}`, source: "denah" });
  if (P.exteriorPaintSeparate)
    add({ code: "CAT.EXT", section: "VIII", name: "Cat dinding eksterior", unit: "m2", volume: extSide, formula: `${f(Lext)} m × ${f(H)} − ${f(extOpening)} m² bukaan luar`, source: "denah" });
  add({ code: "CAT.PLAFON", section: "VIII", name: "Cat plafon", unit: "m2", volume: ceiling, formula: `= luas plafon`, source: "denah" });

  // ---------- IX & X. MEP (rule-of-thumb) ----------
  if (P.autoMep) {
    let lamps = 0;
    let s1 = 0;
    let s2 = 0;
    let sockets = 0;
    let circulation = 0;
    for (const r of plan.rooms) {
      const a = polygonArea(r.polygon);
      const nl = a > 16 ? 2 : 1;
      lamps += nl;
      if (r.type === "selasar" || r.type === "teras" || r.type === "carport") circulation++;
      else if (nl === 2) s2++;
      else s1++;
      if (r.type === "kamar") sockets += 2;
      else if (r.type === "ruang_keluarga" || r.type === "ruang_tamu" || r.type === "dapur") sockets += 2;
      else if (r.type === "musholla" || r.type === "gudang") sockets += 1;
    }
    s2 += Math.ceil(circulation / 2);
    add({ code: "LST.SAKLAR1", section: "IX", name: "Instalasi saklar single", unit: "bh", volume: s1, formula: "1 per ruang (1 lampu)", source: "asumsi" });
    add({ code: "LST.SAKLAR2", section: "IX", name: "Instalasi saklar double", unit: "bh", volume: s2, formula: "Ruang besar + area sirkulasi berpasangan", source: "asumsi" });
    add({ code: "LST.LAMPU", section: "IX", name: "Instalasi titik lampu", unit: "bh", volume: lamps, formula: "1 per ruang, 2 bila > 16 m²", source: "asumsi" });
    add({ code: "LST.STOPKONTAK", section: "IX", name: "Instalasi stop kontak", unit: "bh", volume: sockets, formula: "Kamar 2, R.keluarga/tamu 2, dapur 2, musholla 1", source: "asumsi" });
    add({ code: "LST.MCB", section: "IX", name: "Box MCB + MCB", unit: "bh", volume: 1 + Math.floor(indoorFloor / 90), formula: "1 box per ±90 m²", source: "asumsi" });

    const kitchens = plan.rooms.filter((r) => r.type === "dapur");
    const dExt = (r: Room) => distanceToExterior(polygonCentroid(r.polygon), plan.walls);
    const pvc4 = wetRooms.reduce((a, r) => a + dExt(r) + 3, 0);
    const pvc3 = [...wetRooms, ...kitchens].reduce((a, r) => a + dExt(r) + 2, 0);
    const pvc34 = [...wetRooms, ...kitchens].reduce((a, r) => a + dExt(r) + 3, 0) + 6;
    if (wetRooms.length) {
      add({ code: "AIR.PVC4", section: "X", name: 'Instalasi air kotor PVC 4"', unit: "m1", volume: Math.max(6, Math.ceil(pvc4)), formula: "Jarak KM → dinding luar + 3 m ke septic (min 6 m)", source: "asumsi" });
    }
    if (wetRooms.length + kitchens.length) {
      add({ code: "AIR.PVC3", section: "X", name: 'Instalasi air kotor PVC 3"', unit: "m1", volume: Math.max(6, Math.ceil(pvc3)), formula: "Jarak KM & dapur → luar + 2 m (min 6 m)", source: "asumsi" });
      add({ code: "AIR.PVC34", section: "X", name: 'Instalasi air bersih PVC 3/4"', unit: "m1", volume: Math.ceil(pvc34), formula: "Jarak titik air → luar + 3 m, + 6 m kran luar", source: "asumsi" });
    }
    add({ code: "AIR.BAKMANDI", section: "X", name: "Bak mandi PVC", unit: "unit", volume: wetRooms.length, formula: `${wetRooms.length} KM`, source: "denah" });
    add({ code: "AIR.FLOORDRAIN", section: "X", name: "Floor drain (avour)", unit: "bh", volume: wetRooms.length, formula: `${wetRooms.length} KM`, source: "denah" });
    add({ code: "AIR.KRAN", section: "X", name: "Kran air", unit: "bh", volume: wetRooms.length * 2 + 2, formula: "2 per KM + 2 kran luar", source: "asumsi" });
    add({ code: "AIR.CLOSET", section: "X", name: "Closet duduk", unit: "bh", volume: wetRooms.length, formula: `${wetRooms.length} KM`, source: "denah" });
    add({ code: "AIR.SINK", section: "X", name: "Kitchen sink + kran", unit: "unit", volume: kitchens.length, formula: `${kitchens.length} dapur`, source: "denah" });
  }
  // ---------- IX & X. MEP lanjutan (parameter MEP) ----------
  {
    const M = mepOf(P);
    const dExtR = (r: Room) => distanceToExterior(polygonCentroid(r.polygon), plan.walls);
    const kamar = plan.rooms.filter((r) => r.type === "kamar");
    const keluarga = plan.rooms.filter((r) => r.type === "ruang_keluarga");
    const dapur = plan.rooms.filter((r) => r.type === "dapur");
    let acRooms: Room[] = [];
    if (M.ac === "kamar_utama") {
      const utama = kamar.find((r) => /utama/i.test(r.name)) ?? [...kamar].sort((a, b) => polygonArea(b.polygon) - polygonArea(a.polygon))[0];
      acRooms = utama ? [utama] : [];
    } else if (M.ac === "semua_kamar") acRooms = kamar;
    else if (M.ac === "kamar_dan_keluarga") acRooms = [...kamar, ...keluarga];
    if (acRooms.length) {
      const names = acRooms.map((r) => r.name).join(", ");
      if (M.acIncludeUnit)
        add({ code: "MEK.ACUNIT", section: "IX", name: "Unit AC split 1 PK standar", unit: "unit", volume: acRooms.length, formula: names, source: "parameter" });
      add({ code: "MEK.ACINSTAL", section: "IX", name: "Instalasi AC (pipa ±3 m, kabel, bracket, vakum)", unit: "unit", volume: acRooms.length, formula: names, source: "parameter" });
      const extra = acRooms.reduce((a, r) => a + Math.max(0, dExtR(r) + 1 - 3), 0);
      if (extra > 0.5)
        add({ code: "MEK.ACPIPA", section: "IX", name: "Tambahan pipa & kabel AC > 3 m", unit: "m1", volume: Math.ceil(extra), formula: "Jarak ruang → dinding luar + 1 m, dikurangi 3 m standar", source: "denah" });
    }
    if (M.exhaustFan && wetRooms.length + dapur.length)
      add({ code: "MEK.EXHAUST", section: "IX", name: "Exhaust fan + instalasi", unit: "bh", volume: wetRooms.length + dapur.length, formula: `${wetRooms.length} KM + ${dapur.length} dapur`, source: "denah" });
    if (M.waterHeater && wetRooms.length)
      add({ code: "MEK.WATERHEATER", section: "IX", name: "Water heater listrik 30 L + pipa air panas", unit: "unit", volume: wetRooms.length, formula: `${wetRooms.length} KM`, source: "denah" });
    if (M.plnVa > 0)
      add({ code: "LST.PLN", section: "IX", name: "Penyambungan / tambah daya PLN", unit: "VA", volume: M.plnVa, formula: `Daya ${M.plnVa.toLocaleString("id-ID")} VA`, source: "parameter" });
    if (M.grounding) add({ code: "LST.GROUNDING", section: "IX", name: "Grounding / pembumian", unit: "titik", volume: 1, formula: "1 titik di panel", source: "parameter" });
    if (M.lightningRod) add({ code: "LST.PETIR", section: "IX", name: "Penangkal petir konvensional", unit: "ls", volume: 1, formula: "1 set", source: "parameter" });
    if (M.tvPoints > 0) add({ code: "LST.TV", section: "IX", name: "Titik TV + kabel antena", unit: "titik", volume: M.tvPoints, formula: "Parameter", source: "parameter" });
    if (M.lanPoints > 0) add({ code: "LST.LAN", section: "IX", name: "Titik data / LAN (UTP Cat6)", unit: "titik", volume: M.lanPoints, formula: "Parameter", source: "parameter" });
    if (M.cctvCameras > 0) {
      add({ code: "LST.CCTV", section: "IX", name: "Kamera CCTV + kabel + pemasangan", unit: "titik", volume: M.cctvCameras, formula: "Parameter", source: "parameter" });
      add({ code: "LST.DVR", section: "IX", name: "DVR/NVR + harddisk CCTV", unit: "unit", volume: 1, formula: "1 unit", source: "parameter" });
    }
    if (M.doorbell) add({ code: "LST.BEL", section: "IX", name: "Bel rumah + instalasi", unit: "unit", volume: 1, formula: "1 unit", source: "parameter" });

    const usePdam = M.waterSource === "pdam" || M.waterSource === "pdam_dan_sumur";
    const useWell = M.waterSource === "sumur_bor" || M.waterSource === "pdam_dan_sumur";
    if (usePdam) add({ code: "AIR.PDAM", section: "X", name: "Sambungan PDAM (meter + pipa ke rumah)", unit: "ls", volume: 1, formula: "Sumber air PDAM", source: "parameter" });
    if (useWell) {
      add({ code: "AIR.SUMURBOR", section: "X", name: 'Sumur bor Ø 3–4"', unit: "m1", volume: M.wellDepth, formula: `Kedalaman ${M.wellDepth} m`, source: "parameter" });
      if (M.wellDepth > 9)
        add({ code: "AIR.POMPAJET", section: "X", name: "Pompa jet pump sumur dalam + instalasi", unit: "unit", volume: 1, formula: `Sumur ${M.wellDepth} m (> 9 m → jet pump)`, source: "parameter" });
      else add({ code: "AIR.POMPA", section: "X", name: "Pompa air sumur dangkal + instalasi", unit: "unit", volume: 1, formula: `Sumur ${M.wellDepth} m`, source: "parameter" });
    }
    if (M.tankLiters > 0) {
      const sizeName = M.tankLiters.toLocaleString("id-ID");
      add({ code: `AIR.TOREN${M.tankLiters}`, section: "X", name: `Toren air ${sizeName} L + instalasi`, unit: "unit", volume: 1, formula: "Parameter", source: "parameter" });
      if (!useWell)
        add({ code: "AIR.POMPADORONG", section: "X", name: "Pompa pendorong ke toren + instalasi", unit: "unit", volume: 1, formula: "Air PDAM dinaikkan ke toren", source: "asumsi" });
      if (M.tankTower) add({ code: "AIR.MENARA", section: "X", name: "Menara toren baja ± 3 m", unit: "unit", volume: 1, formula: "Parameter", source: "parameter" });
    }
    if (M.drainage) {
      const keliling = 2 * (plan.outline.width + plan.outline.depth);
      add({ code: "AIR.DRAINASE", section: "X", name: "Saluran air hujan 30 cm (pas. bata / U-ditch)", unit: "m1", volume: Math.ceil(keliling + 4), formula: `Keliling bangunan ${f(keliling)} m + 4 m ke saluran kota`, source: "denah" });
      add({ code: "AIR.BAKKONTROL", section: "X", name: "Bak kontrol 40×40 cm", unit: "bh", volume: 4 + wetRooms.length, formula: `4 sudut + ${wetRooms.length} jalur KM`, source: "denah" });
    }
  }

  if (P.septicTank)
    add({ code: "AIR.SEPTIC", section: "X", name: "Septic tank biofilter + resapan", unit: "unit", volume: 1, formula: "1 unit", source: "parameter" });

  // ---------- XI. LAIN-LAIN ----------
  if (P.kitchenCounterLength > 0)
    add({ code: "LL.MEJADAPUR", section: "XI", name: "Meja dapur beton + top granit", unit: "m1", volume: P.kitchenCounterLength, formula: "Parameter", source: "parameter" });
  add({ code: "LL.BERSIHAKHIR", section: "XI", name: "Pembersihan akhir", unit: "ls", volume: 1, formula: "Lump sum", source: "asumsi" });

  return { items, ctx: { columns, metrics: m, wallNetArea: wallNet, roofArea } };
}

const cm = (m: number) => Math.round(m * 100);

function coverName(c: ProjectParams["roofCover"]) {
  return c === "genteng_beton" ? "Penutup atap genteng beton" : c === "genteng_metal" ? "Penutup atap genteng metal pasir" : "Penutup atap spandek";
}

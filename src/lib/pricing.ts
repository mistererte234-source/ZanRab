/**
 * Database harga ZanRab.
 *  - Mode BORONGAN: harga satuan all-in (material + upah) per item, default diambil dari RAB referensi.
 *  - Mode AHSP: harga dari analisa koefisien × harga dasar (bahan/upah).
 *
 * ⚠️ Koefisien AHSP di sini adalah nilai referensi umum (mengacu pola SNI / Permen PUPR).
 *    Wajib diverifikasi & disesuaikan dengan Permen PUPR terbaru + HSPK daerah sebelum dipakai resmi.
 *    Semua angka bisa diedit dari menu Database Harga.
 */

export interface Resource {
  code: string;
  name: string;
  unit: string;
  price: number;
  kind: "upah" | "bahan" | "alat";
}

export interface AhspComponent {
  ref: string; // kode Resource atau kode Analisa lain
  coef: number;
}

export interface AhspAnalysis {
  code: string;
  name: string;
  unit: string;
  components: AhspComponent[];
}

export interface CatalogItem {
  code: string;
  section: string;
  name: string;
  unit: string;
  borongan: number;
  ahsp?: string; // kode analisa
  note?: string;
}

export interface PriceDb {
  version: number;
  region: string;
  resources: Resource[];
  analyses: AhspAnalysis[];
  catalog: CatalogItem[];
}

export const SECTIONS: Record<string, string> = {
  I: "PEKERJAAN PERSIAPAN",
  II: "PEKERJAAN TANAH",
  III: "PEKERJAAN STRUKTUR BETON",
  IV: "PEKERJAAN PASANGAN & PLESTERAN",
  V: "PEKERJAAN ATAP & PLAFON",
  VI: "PEKERJAAN KUSEN, PINTU & JENDELA",
  VII: "PEKERJAAN LANTAI & KERAMIK",
  VIII: "PEKERJAAN PENGECATAN",
  IX: "PEKERJAAN LISTRIK, MEKANIKAL & ARUS LEMAH",
  X: "PEKERJAAN SANITASI, AIR BERSIH & DRAINASE",
  XI: "PEKERJAAN LAIN-LAIN",
  XII: "PEKERJAAN TAMBAHAN",
};

const R = (code: string, name: string, unit: string, price: number, kind: Resource["kind"]): Resource => ({
  code,
  name,
  unit,
  price,
  kind,
});

const RESOURCES: Resource[] = [
  R("L.01", "Pekerja", "OH", 120000, "upah"),
  R("L.02", "Tukang batu", "OH", 150000, "upah"),
  R("L.03", "Tukang kayu", "OH", 150000, "upah"),
  R("L.04", "Tukang besi", "OH", 150000, "upah"),
  R("L.05", "Tukang cat", "OH", 150000, "upah"),
  R("L.06", "Kepala tukang", "OH", 170000, "upah"),
  R("L.07", "Mandor", "OH", 180000, "upah"),
  R("M.PC", "Semen portland", "kg", 1450, "bahan"),
  R("M.PP", "Pasir pasang", "m3", 280000, "bahan"),
  R("M.PB", "Pasir beton", "kg", 215, "bahan"),
  R("M.KR", "Kerikil / split 1-2", "kg", 245, "bahan"),
  R("M.AIR", "Air kerja", "liter", 50, "bahan"),
  R("M.BK", "Batu kali", "m3", 260000, "bahan"),
  R("M.TANAH", "Tanah urug", "m3", 120000, "bahan"),
  R("M.BESI", "Besi beton polos/ulir", "kg", 13500, "bahan"),
  R("M.KAWAT", "Kawat beton", "kg", 25000, "bahan"),
  R("M.KAYU3", "Kayu kelas III (bekisting)", "m3", 3800000, "bahan"),
  R("M.PAKU", "Paku 5-12 cm", "kg", 22000, "bahan"),
  R("M.MINYAK", "Minyak bekisting", "liter", 15000, "bahan"),
  R("M.BATARINGAN", "Bata ringan 60x20x10", "bh", 8500, "bahan"),
  R("M.BATAMERAH", "Bata merah bakar standar", "bh", 950, "bahan"),
  R("M.BATAKO", "Batako press keliling", "bh", 3500, "bahan"),
  R("M.MORTAR", "Mortar instan perekat bata ringan", "kg", 2800, "bahan"),
  R("M.GRANIT60", "Granit 60x60", "bh", 52000, "bahan"),
  R("M.KRMK30", "Keramik lantai 30x30", "bh", 5500, "bahan"),
  R("M.KRMK3060", "Keramik dinding 30x60", "bh", 13500, "bahan"),
  R("M.SEMENWARNA", "Semen warna / nat", "kg", 12000, "bahan"),
  R("M.PLAMIR", "Plamir tembok", "kg", 18000, "bahan"),
  R("M.CATDASAR", "Cat dasar", "kg", 30000, "bahan"),
  R("M.CATINT", "Cat tembok interior", "kg", 32000, "bahan"),
  R("M.CATEXT", "Cat tembok eksterior", "kg", 55000, "bahan"),
  R("M.GYPSUM", "Gypsum board 9 mm 1200x2400", "lbr", 75000, "bahan"),
  R("M.HOLLOW44", "Hollow galvanis 40x40", "btg", 32000, "bahan"),
  R("M.HOLLOW24", "Hollow galvanis 20x40", "btg", 28000, "bahan"),
  R("M.SKRUP", "Sekrup gypsum", "bh", 150, "bahan"),
  R("M.COMPOUND", "Compound gypsum", "kg", 12000, "bahan"),
];

const A = (code: string, name: string, unit: string, components: [string, number][]): AhspAnalysis => ({
  code,
  name,
  unit,
  components: components.map(([ref, coef]) => ({ ref, coef })),
});

const LABOR_BETON: [string, number][] = [
  ["L.01", 1.65],
  ["L.02", 0.275],
  ["L.06", 0.028],
  ["L.07", 0.083],
];

const ANALYSES: AhspAnalysis[] = [
  A("A.GALIAN", "1 m3 Galian tanah biasa sedalam 1 m", "m3", [["L.01", 0.75], ["L.07", 0.025]]),
  A("A.URUG", "1 m3 Urugan tanah peninggian + pemadatan", "m3", [["M.TANAH", 1.2], ["L.01", 0.5], ["L.07", 0.05]]),
  A("A.URUGKEMBALI", "1 m3 Urugan tanah kembali", "m3", [["L.01", 0.192], ["L.07", 0.019]]),
  A("A.K225", "1 m3 Beton mutu fc' 19,3 MPa (K-225)", "m3", [["M.PC", 371], ["M.PB", 698], ["M.KR", 1047], ["M.AIR", 215], ...LABOR_BETON]),
  A("A.K175", "1 m3 Beton mutu fc' 14,5 MPa (K-175)", "m3", [["M.PC", 326], ["M.PB", 760], ["M.KR", 1029], ["M.AIR", 215], ...LABOR_BETON]),
  A("A.BESI", "1 kg Pembesian besi polos/ulir", "kg", [["M.BESI", 1.05], ["M.KAWAT", 0.015], ["L.01", 0.007], ["L.04", 0.007], ["L.06", 0.0007], ["L.07", 0.0004]]),
  A("A.BEKISTING", "1 m2 Bekisting kayu", "m2", [["M.KAYU3", 0.045], ["M.PAKU", 0.3], ["M.MINYAK", 0.1], ["L.01", 0.52], ["L.03", 0.26], ["L.06", 0.026], ["L.07", 0.026]]),
  // Beton bertulang komposit: beton + besi (kg/m3) + bekisting (m2/m3)
  A("A.STRAUSS", "1 m3 Strauss pile Ø30 bertulang", "m3", [["A.K225", 1], ["A.BESI", 56], ["L.01", 1.5], ["L.02", 0.5]]),
  A("A.PILECAP", "1 m3 Pile cap bertulang", "m3", [["A.K225", 1], ["A.BESI", 100], ["A.BEKISTING", 6.7]]),
  A("A.SLOOF", "1 m3 Sloof bertulang 15x25", "m3", [["A.K225", 1], ["A.BESI", 115], ["A.BEKISTING", 13.3]]),
  A("A.KOLOM", "1 m3 Kolom bertulang 15x20", "m3", [["A.K225", 1], ["A.BESI", 137], ["A.BEKISTING", 23.3]]),
  A("A.RINGBALOK", "1 m3 Ring balok bertulang 15x20", "m3", [["A.K225", 1], ["A.BESI", 137], ["A.BEKISTING", 18.3]]),
  A("A.DAK", "1 m3 Pelat dak bertulang t=12 cm", "m3", [["A.K225", 1], ["A.BESI", 137], ["A.BEKISTING", 8.3]]),
  A("A.RABAT", "1 m3 Rabat beton lantai kerja K-175", "m3", [["A.K175", 1]]),
  A("A.BATAKALI", "1 m3 Pasangan pondasi batu kali 1:4", "m3", [["M.BK", 1.2], ["M.PC", 163], ["M.PP", 0.52], ["L.01", 1.5], ["L.02", 0.75], ["L.06", 0.075], ["L.07", 0.075]]),
  A("A.BATARINGAN", "1 m2 Pasangan dinding bata ringan t=10 cm", "m2", [["M.BATARINGAN", 8.75], ["M.MORTAR", 4.5], ["L.01", 0.3], ["L.02", 0.1], ["L.06", 0.01], ["L.07", 0.015]]),
  A("A.BATAMERAH", "1 m2 Pasangan dinding bata merah 1:4", "m2", [["M.BATAMERAH", 70], ["M.PC", 11.5], ["M.PP", 0.043], ["L.01", 0.3], ["L.02", 0.1], ["L.06", 0.01], ["L.07", 0.015]]),
  A("A.BATAKO", "1 m2 Pasangan dinding batako press 1:4", "m2", [["M.BATAKO", 12.5], ["M.PC", 9.6], ["M.PP", 0.035], ["L.01", 0.3], ["L.02", 0.1], ["L.06", 0.01], ["L.07", 0.015]]),
  A("A.PLESTERACI", "1 m2 Plesteran 1:4 t=15 mm + acian", "m2", [["M.PC", 9.49], ["M.PP", 0.024], ["L.01", 0.5], ["L.02", 0.25], ["L.06", 0.025], ["L.07", 0.025]]),
  A("A.GRANIT", "1 m2 Pasang lantai granit 60x60", "m2", [["M.GRANIT60", 2.78], ["M.PC", 10], ["M.PP", 0.045], ["M.SEMENWARNA", 1.3], ["L.01", 0.7], ["L.02", 0.35], ["L.06", 0.035], ["L.07", 0.035]]),
  A("A.KRMKLANTAI", "1 m2 Pasang lantai keramik 30x30", "m2", [["M.KRMK30", 11.11], ["M.PC", 10], ["M.PP", 0.045], ["M.SEMENWARNA", 1.5], ["L.01", 0.7], ["L.02", 0.35], ["L.06", 0.035], ["L.07", 0.035]]),
  A("A.KRMKDINDING", "1 m2 Pasang dinding keramik 30x60", "m2", [["M.KRMK3060", 5.56], ["M.PC", 9.3], ["M.PP", 0.018], ["M.SEMENWARNA", 1.94], ["L.01", 0.9], ["L.02", 0.45], ["L.06", 0.045], ["L.07", 0.045]]),
  A("A.CATINT", "1 m2 Pengecatan tembok interior (plamir, dasar, 2 lapis)", "m2", [["M.PLAMIR", 0.1], ["M.CATDASAR", 0.1], ["M.CATINT", 0.26], ["L.01", 0.02], ["L.05", 0.063], ["L.06", 0.0063], ["L.07", 0.0025]]),
  A("A.CATEXT", "1 m2 Pengecatan tembok eksterior", "m2", [["M.PLAMIR", 0.1], ["M.CATDASAR", 0.1], ["M.CATEXT", 0.3], ["L.01", 0.02], ["L.05", 0.063], ["L.06", 0.0063], ["L.07", 0.0025]]),
  A("A.PLAFON", "1 m2 Plafon gypsum 9 mm rangka hollow", "m2", [["M.GYPSUM", 0.364], ["M.HOLLOW44", 0.45], ["M.HOLLOW24", 0.6], ["M.SKRUP", 25], ["M.COMPOUND", 0.3], ["L.01", 0.25], ["L.03", 0.25], ["L.06", 0.025], ["L.07", 0.013]]),
];

const C = (code: string, section: string, name: string, unit: string, borongan: number, ahsp?: string, note?: string): CatalogItem => ({
  code,
  section,
  name,
  unit,
  borongan,
  ahsp,
  note,
});

const CATALOG: CatalogItem[] = [
  C("PRS.BONGKAR", "I", "Bongkar & buang bangunan lama", "ls", 0),
  C("PRS.BERSIH", "I", "Pembersihan lahan", "m2", 10000, undefined, "estimasi"),
  C("PRS.BOUWPLANK", "I", "Pengukuran & bouwplank", "m1", 35000, undefined, "estimasi"),
  C("TNH.GALSTRAUSS", "II", "Galian / bor strauss", "m1", 60000),
  C("TNH.GALPILECAP", "II", "Galian pile cap", "ttk", 125000),
  C("TNH.GALPONDASI", "II", "Galian tanah pondasi menerus", "m3", 110000, "A.GALIAN"),
  C("TNH.URUGKEMBALI", "II", "Urugan tanah kembali", "m3", 50000, "A.URUGKEMBALI"),
  C("TNH.URUG", "II", "Urugan tanah peninggian + pemadatan", "m3", 145000, "A.URUG"),
  C("STR.STRAUSS", "III", "Pondasi strauss Ø30 bertulang", "m3", 4000000, "A.STRAUSS"),
  C("STR.PILECAP", "III", "Pile cap bertulang", "m3", 4000000, "A.PILECAP"),
  C("STR.SLOOF", "III", "Sloof beton bertulang", "m3", 4000000, "A.SLOOF"),
  C("STR.KOLOM", "III", "Kolom beton bertulang", "m3", 4000000, "A.KOLOM"),
  C("STR.RINGBALOK", "III", "Ring balok beton bertulang", "m3", 4000000, "A.RINGBALOK"),
  C("STR.RABAT", "III", "Rabat beton lantai kerja", "m3", 1250000, "A.RABAT"),
  C("STR.DAK", "III", "Pelat dak beton bertulang", "m3", 4000000, "A.DAK"),
  C("PAS.KUMBUNG", "IV", "Pondasi batu kumbung", "m2", 275000),
  C("PAS.BATUKALI", "IV", "Pasangan pondasi batu kali 1:4", "m3", 1150000, "A.BATUKALI"),
  C("PAS.BATARINGAN", "IV", "Dinding bata ringan t=10 cm", "m2", 190000, "A.BATARINGAN"),
  C("PAS.BATAMERAH", "IV", "Dinding bata merah 1/2 bata", "m2", 215000, "A.BATAMERAH"),
  C("PAS.BATAKO", "IV", "Dinding batako press", "m2", 175000),
  C("PAS.PLESTER", "IV", "Plester + acian", "m2", 45000, "A.PLESTERACI"),
  C("ATP.PLAFON", "V", "Plafon gypsum + rangka hollow", "m2", 180000, "A.PLAFON"),
  C("ATP.RANGKA", "V", "Rangka atap baja ringan", "m2", 95000),
  C("ATP.GENTENGBETON", "V", "Penutup atap genteng beton", "m2", 285000),
  C("ATP.GENTENGMETAL", "V", "Penutup atap genteng metal pasir", "m2", 120000, undefined, "estimasi"),
  C("ATP.SPANDEK", "V", "Penutup atap spandek", "m2", 110000, undefined, "estimasi"),
  C("ATP.WUWUNG", "V", "Genteng wuwung / nok", "m1", 45000),
  C("ATP.LISPLANG", "V", "Lisplang kalsiboard", "m1", 30000),
  C("ATP.TALANG", "V", "Talang PVC + pipa turun", "m1", 85000, undefined, "estimasi"),
  C("ATP.WATERPROOF", "V", "Waterproofing dak", "m2", 120000, undefined, "estimasi"),
  C("KSN.ALU", "VI", 'Kusen aluminium 3"', "m1", 180000),
  C("KSN.JENDELA", "VI", "Daun jendela + kaca 6 mm clear", "bh", 2250000),
  C("KSN.PINTUKAYU", "VI", "Daun pintu kayu + handle", "bh", 1350000),
  C("KSN.PINTUPVC", "VI", "Pintu PVC kamar mandi", "bh", 550000),
  C("LNT.GRANIT", "VII", "Lantai granit 60x60", "m2", 200000, "A.GRANIT"),
  C("LNT.KRMKKM", "VII", "Lantai keramik KM 30x30", "m2", 160000, "A.KRMKLANTAI"),
  C("LNT.DINDINGKM", "VII", "Dinding keramik KM 30x60", "m2", 200000, "A.KRMKDINDING"),
  C("LNT.PLINT", "VII", "Plint granit", "m1", 35000, undefined, "estimasi"),
  C("CAT.INT", "VIII", "Cat dinding interior", "m2", 60000, "A.CATINT"),
  C("CAT.EXT", "VIII", "Cat dinding eksterior", "m2", 70000, "A.CATEXT", "estimasi"),
  C("CAT.PLAFON", "VIII", "Cat plafon", "m2", 60000, "A.CATINT"),
  C("LST.SAKLAR1", "IX", "Instalasi saklar single", "bh", 225000),
  C("LST.SAKLAR2", "IX", "Instalasi saklar double", "bh", 225000),
  C("LST.LAMPU", "IX", "Instalasi titik lampu", "bh", 225000),
  C("LST.STOPKONTAK", "IX", "Instalasi stop kontak", "bh", 225000),
  C("LST.MCB", "IX", "Box MCB + MCB", "bh", 350000),
  // --- MEP lanjutan (harga ESTIMASI kasar — sesuaikan dengan harga setempat) ---
  C("MEK.ACUNIT", "IX", "Unit AC split 1 PK standar", "unit", 4000000, undefined, "estimasi"),
  C("MEK.ACINSTAL", "IX", "Instalasi AC (pipa ±3 m, kabel, bracket, vakum)", "unit", 750000, undefined, "estimasi"),
  C("MEK.ACPIPA", "IX", "Tambahan pipa & kabel AC > 3 m", "m1", 150000, undefined, "estimasi"),
  C("MEK.EXHAUST", "IX", "Exhaust fan + instalasi", "bh", 350000, undefined, "estimasi"),
  C("MEK.WATERHEATER", "IX", "Water heater listrik 30 L + pipa air panas", "unit", 2750000, undefined, "estimasi"),
  C("LST.PLN", "IX", "Penyambungan / tambah daya PLN", "VA", 1000, undefined, "estimasi — cek tarif PLN terbaru"),
  C("LST.GROUNDING", "IX", "Grounding / pembumian", "titik", 1250000, undefined, "estimasi"),
  C("LST.PETIR", "IX", "Penangkal petir konvensional", "ls", 6000000, undefined, "estimasi"),
  C("LST.TV", "IX", "Titik TV + kabel antena", "titik", 250000, undefined, "estimasi"),
  C("LST.LAN", "IX", "Titik data / LAN (UTP Cat6)", "titik", 300000, undefined, "estimasi"),
  C("LST.CCTV", "IX", "Kamera CCTV + kabel + pemasangan", "titik", 1250000, undefined, "estimasi"),
  C("LST.DVR", "IX", "DVR/NVR + harddisk CCTV", "unit", 2500000, undefined, "estimasi"),
  C("LST.BEL", "IX", "Bel rumah + instalasi", "unit", 300000, undefined, "estimasi"),
  C("AIR.PDAM", "X", "Sambungan PDAM (meter + pipa ke rumah)", "ls", 2000000, undefined, "estimasi — biaya PDAM tiap daerah beda"),
  C("AIR.SUMURBOR", "X", 'Sumur bor Ø 3–4"', "m1", 175000, undefined, "estimasi"),
  C("AIR.POMPA", "X", "Pompa air sumur dangkal + instalasi", "unit", 1750000, undefined, "estimasi"),
  C("AIR.POMPAJET", "X", "Pompa jet pump sumur dalam + instalasi", "unit", 3250000, undefined, "estimasi"),
  C("AIR.POMPADORONG", "X", "Pompa pendorong ke toren + instalasi", "unit", 1500000, undefined, "estimasi"),
  C("AIR.TOREN520", "X", "Toren air 520 L + instalasi", "unit", 1500000, undefined, "estimasi"),
  C("AIR.TOREN1050", "X", "Toren air 1.050 L + instalasi", "unit", 2300000, undefined, "estimasi"),
  C("AIR.TOREN1550", "X", "Toren air 1.550 L + instalasi", "unit", 3200000, undefined, "estimasi"),
  C("AIR.TOREN2000", "X", "Toren air 2.000 L + instalasi", "unit", 4000000, undefined, "estimasi"),
  C("AIR.MENARA", "X", "Menara toren baja ± 3 m", "unit", 4000000, undefined, "estimasi"),
  C("AIR.DRAINASE", "X", "Saluran air hujan 30 cm (pas. bata / U-ditch)", "m1", 275000, undefined, "estimasi"),
  C("AIR.BAKKONTROL", "X", "Bak kontrol 40×40 cm", "bh", 450000, undefined, "estimasi"),
  C("AIR.PVC4", "X", 'Instalasi air kotor PVC 4"', "m1", 125000),
  C("AIR.PVC3", "X", 'Instalasi air kotor PVC 3"', "m1", 120000),
  C("AIR.PVC34", "X", 'Instalasi air bersih PVC 3/4"', "m1", 50000),
  C("AIR.BAKMANDI", "X", "Bak mandi PVC", "unit", 550000),
  C("AIR.FLOORDRAIN", "X", "Floor drain (avour)", "bh", 60000),
  C("AIR.KRAN", "X", "Kran air", "bh", 45000),
  C("AIR.CLOSET", "X", "Closet duduk", "bh", 2100000),
  C("AIR.SINK", "X", "Kitchen sink + kran", "unit", 1250000, undefined, "estimasi"),
  C("AIR.SEPTIC", "X", "Septic tank biofilter + resapan", "unit", 3500000, undefined, "estimasi"),
  C("LL.MEJADAPUR", "XI", "Meja dapur beton + top granit", "m1", 1500000, undefined, "estimasi"),
  C("LL.BERSIHAKHIR", "XI", "Pembersihan akhir", "ls", 750000, undefined, "estimasi"),
];

/**
 * Gabungkan database tersimpan (milik pengguna) dengan default terbaru:
 * item/resource/analisa BARU ditambahkan, yang sudah ada (mungkin sudah diedit pengguna) tidak disentuh.
 */
export function mergePriceDb(saved: PriceDb | undefined | null): PriceDb {
  const def = defaultPriceDb();
  if (!saved) return def;
  const addMissing = <T extends { code: string }>(cur: T[] | undefined, base: T[]) => {
    const list = [...(cur ?? [])];
    const have = new Set(list.map((x) => x.code));
    for (const b of base) if (!have.has(b.code)) list.push(structuredClone(b));
    return list;
  };
  return {
    ...saved,
    resources: addMissing(saved.resources, def.resources),
    analyses: addMissing(saved.analyses, def.analyses),
    catalog: addMissing(saved.catalog, def.catalog),
  };
}

export function defaultPriceDb(): PriceDb {
  return {
    version: 1,
    region: "Jawa Timur (referensi RAB KAMAL)",
    resources: structuredClone(RESOURCES),
    analyses: structuredClone(ANALYSES),
    catalog: structuredClone(CATALOG),
  };
}

export interface AhspBreakdownRow {
  ref: string;
  name: string;
  unit: string;
  coef: number;
  price: number;
  total: number;
  kind: Resource["kind"] | "analisa";
}

/** Hitung harga satuan dari analisa AHSP (rekursif untuk komposit) */
export function ahspUnitPrice(db: PriceDb, code: string, depth = 0): number {
  if (depth > 5) throw new Error(`Analisa AHSP siklik: ${code}`);
  const an = db.analyses.find((a) => a.code === code);
  if (!an) return NaN;
  let total = 0;
  for (const c of an.components) {
    const r = db.resources.find((x) => x.code === c.ref);
    if (r) total += c.coef * r.price;
    else total += c.coef * ahspUnitPrice(db, c.ref, depth + 1);
  }
  return total;
}

export function ahspBreakdown(db: PriceDb, code: string): AhspBreakdownRow[] {
  const an = db.analyses.find((a) => a.code === code);
  if (!an) return [];
  return an.components.map((c) => {
    const r = db.resources.find((x) => x.code === c.ref);
    if (r) return { ref: r.code, name: r.name, unit: r.unit, coef: c.coef, price: r.price, total: c.coef * r.price, kind: r.kind };
    const sub = db.analyses.find((a) => a.code === c.ref);
    const price = ahspUnitPrice(db, c.ref);
    return { ref: c.ref, name: sub?.name ?? c.ref, unit: sub?.unit ?? "", coef: c.coef, price, total: c.coef * price, kind: "analisa" as const };
  });
}

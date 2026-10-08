/**
 * ZanRab core domain types.
 * Satuan panjang = meter. Origin (0,0) = pojok kiri-atas sisi LUAR bangunan, sumbu Y ke bawah.
 */

export interface Point {
  x: number;
  y: number;
}

export type Side = "top" | "bottom" | "left" | "right";

/** Rantai dimensi seperti tertulis di gambar, mis. top: [0.15, 3, 0.15, 2.4, 0.15, 3, 0.15] total 9 */
export interface DimensionChain {
  side: Side;
  segments: number[];
  total: number;
}

export interface Wall {
  id: string;
  /** Garis as (centerline) dinding */
  a: Point;
  b: Point;
  thickness: number;
  exterior: boolean;
}

export type OpeningType = "door" | "window" | "passage";
export type DoorMaterial = "kayu" | "pvc" | "aluminium" | "kaca";

export interface Opening {
  id: string;
  type: OpeningType;
  /** Dinding tempat bukaan menempel */
  wallId: string | null;
  /** Titik tengah bukaan (meter) */
  at: Point;
  width: number;
  height: number;
  /** Jumlah daun (jendela 2 daun = 2) */
  leaves: number;
  material?: DoorMaterial;
  label?: string;
}

export type RoomType =
  | "kamar"
  | "kamar_mandi"
  | "dapur"
  | "ruang_tamu"
  | "ruang_keluarga"
  | "musholla"
  | "teras"
  | "carport"
  | "gudang"
  | "selasar"
  | "lainnya";

export interface Room {
  id: string;
  name: string;
  type: RoomType;
  /** Polygon lantai bersih (sisi dalam dinding) */
  polygon: Point[];
}

/** Kalibrasi gambar: kotak luar bangunan dalam koordinat gambar ternormalisasi 0..1000 */
export interface ImageCalibration {
  /** [ymin, xmin, ymax, xmax] dalam skala 0..1000 */
  outerBox: [number, number, number, number];
}

export interface Plan {
  outline: { width: number; depth: number };
  wallThickness: number;
  chains: DimensionChain[];
  walls: Wall[];
  openings: Opening[];
  rooms: Room[];
  /** Override manual titik kolom; null = auto-deteksi dari pertemuan dinding */
  columns: Point[] | null;
  calibration: ImageCalibration | null;
  notes: string[];
}

// ---------------------------------------------------------------------------
// Parameter proyek (data yang TIDAK ada di denah)
// ---------------------------------------------------------------------------

export type FoundationType = "strauss_kumbung" | "batu_kali" | "footplat_batu_kali";
export type RoofType = "pelana" | "perisai" | "dak";
export type RoofCover = "genteng_beton" | "genteng_metal" | "spandek";
export type WallMaterial = "bata_ringan" | "bata_merah" | "batako";
export type MaterialTier = "standard" | "medium" | "luxury";

export interface ProjectParams {
  floorCount: number; // Jumlah lantai (1 = standar, 2 = 2 lantai, dst)
  wallType: WallMaterial; // Bata ringan Hebel, Bata merah konvensional, dll
  tier: MaterialTier; // Tier penawaran: standard, medium, luxury
  wallHeight: number;
  grossAreaOverride: number | null;
  // Persiapan & tanah
  demolitionLumpSum: number; // Rp, 0 = tidak ada bongkaran
  fillHeight: number; // tinggi urugan peninggian (m), 0 = tidak ada
  // Struktur
  foundation: FoundationType;
  straussDepth: number;
  straussDiameter: number;
  pileCap: { w: number; l: number; t: number };
  stoneFoundationHeight: number;
  stoneFoundationTop: number;
  stoneFoundationBottom: number;
  sloof: { b: number; h: number };
  column: { b: number; h: number };
  ringBeam: { b: number; h: number };
  maxColumnSpan: number;
  floorSlabThickness: number; // rabat beton
  // Atap
  roofType: RoofType;
  roofCover: RoofCover;
  roofSlopeDeg: number;
  roofOverhang: number;
  concreteDeckArea: number;
  concreteDeckThickness: number;
  gutter: boolean;
  // Kusen
  doorHeight: number;
  windowHeight: number;
  transomHeight: number; // boven/ventilasi di atas pintu, 0 = tanpa
  // Finishing
  floorWaste: number; // 0.05 = 5%
  wetWallTileHeight: number;
  skirting: boolean;
  exteriorPaintSeparate: boolean;
  // MEP
  autoMep: boolean;
  septicTank: boolean;
  kitchenCounterLength: number; // m1 meja dapur, 0 = tidak ada
  // Komersial
  overheadProfitPct: number; // 0.10 = 10%
  ppnPct: number; // 0.11
  includePpn: boolean;
  roundTo: number; // pembulatan total, mis. 1000
  /** MEP lanjutan; undefined = default */
  mep?: MepParams;
}

/** Parameter MEP (Mekanikal, Elektrikal, Plumbing). Opsional: proyek lama belum punya → pakai default. */
export interface MepParams {
  /** AC split: di ruang mana */
  ac: "tidak" | "kamar_utama" | "semua_kamar" | "kamar_dan_keluarga";
  /** Unit AC ikut ditawarkan (bukan hanya instalasi) */
  acIncludeUnit: boolean;
  exhaustFan: boolean;
  /** Water heater listrik per kamar mandi */
  waterHeater: boolean;
  /** "tidak_termasuk" = sambungan air sudah ada / tidak ditawarkan */
  waterSource: "tidak_termasuk" | "pdam" | "sumur_bor" | "pdam_dan_sumur";
  /** Kedalaman sumur bor (m) */
  wellDepth: number;
  /** Kapasitas toren (liter), 0 = tanpa toren */
  tankLiters: 0 | 520 | 1050 | 1550 | 2000;
  /** Menara / dudukan toren baja */
  tankTower: boolean;
  /** Daya PLN yang dipasang / ditambah (VA), 0 = tidak termasuk */
  plnVa: number;
  grounding: boolean;
  lightningRod: boolean;
  /** Titik arus lemah */
  tvPoints: number;
  lanPoints: number;
  cctvCameras: number;
  doorbell: boolean;
  /** Saluran air hujan keliling bangunan + bak kontrol */
  drainage: boolean;
}

export type PriceMode = "borongan" | "ahsp";

export type QtySource = "denah" | "parameter" | "asumsi";

export interface QuantityItem {
  code: string; // kunci ke database harga
  section: string; // kode bagian, mis. "I"
  name: string;
  unit: string;
  volume: number;
  formula: string; // penjelasan perhitungan untuk audit
  source: QtySource;
}

export interface RabLine extends QuantityItem {
  unitPrice: number;
  total: number;
  priceSource: PriceMode | "manual";
}

export interface RabSection {
  code: string;
  title: string;
  lines: RabLine[];
  subtotal: number;
}

export interface RabResult {
  sections: RabSection[];
  directCost: number;
  overheadProfit: number;
  beforeTax: number;
  ppn: number;
  grandTotal: number;
  grandTotalRounded: number;
  grossArea: number;
  costPerM2: number;
}

export interface Company {
  name: string;
  address: string;
  phone: string;
  email: string;
  director: string;
  logoDataUrl: string | null;
}

export interface Client {
  name: string;
  address: string;
  phone: string;
}

export interface ValidationIssue {
  level: "error" | "warning" | "info";
  message: string;
}

export interface AnalyzeMeta {
  provider: string;
  model: string;
  durationMs: number;
  consensus?: ConsensusReport;
}

export interface ConsensusReport {
  primary: string;
  agreementScore: number; // 0..1
  diffs: { metric: string; a: number; b: number; deltaPct: number }[];
}

// ---------------------------------------------------------------------------
// Jadwal & tenaga kerja
// ---------------------------------------------------------------------------

/** Jenis tenaga yang mengerjakan (membatasi kecepatan) */
export type TradeId = "kuli" | "kenek" | "batu" | "kayu" | "besi" | "cat" | "instalatir";

export type CrewCounts = Record<TradeId, number>;

/** Pengawas: hadir sepanjang proyek, tidak membatasi kecepatan */
export interface SupervisorCounts {
  mandor: number;
  kepalaTukang: number;
}

export interface ScheduleSettings {
  /** Jumlah orang per jenis tenaga di lapangan */
  crew: CrewCounts;
  supervisors: SupervisorCounts;
  /** Tanggal mulai pekerjaan (YYYY-MM-DD); null = belum ditentukan */
  startDate: string | null;
  /** Faktor produktivitas tim terhadap AHSP: 1 = sesuai AHSP, 1.3 = 30% lebih cepat */
  productivity: number;
  /** Hari kerja per minggu (5–7) */
  workDaysPerWeek: number;
  /** Target selesai (hari kalender) untuk menghitung rekomendasi tim; null = tidak ada target */
  targetCalendarDays: number | null;
  /** Override manual total durasi (hari kalender); null = pakai hitungan */
  overrideCalendarDays: number | null;
  /** Override produktivitas asumsi: kode item → OH per satuan */
  ohOverrides?: Record<string, number>;
}

export interface Project {
  id: string;
  title: string;
  location: string;
  createdAt: number;
  updatedAt: number;
  client: Client;
  imageDataUrl: string | null;
  plan: Plan | null;
  analyzeMeta: AnalyzeMeta | null;
  params: ProjectParams;
  priceMode: PriceMode;
  /** Override harga satuan per item (kode → Rp) khusus proyek ini */
  priceOverrides: Record<string, number>;
  /** Override volume per item (kode → volume) */
  volumeOverrides: Record<string, number>;
  /** Item tambahan manual */
  customLines: QuantityItem[];
  customPrices: Record<string, number>;
  /** Kode item yang dikeluarkan */
  excluded: string[];
  offerNumber: string;
  offerValidityDays: number;
  paymentTerms: string;
  status: "draft" | "dikirim" | "deal";
  /** Pengaturan jadwal & tim (opsional: proyek lama belum punya) */
  schedule?: ScheduleSettings;
}

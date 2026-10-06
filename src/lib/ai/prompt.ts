/**
 * Prompt & JSON schema untuk ekstraksi denah oleh AI Vision.
 * Prinsip: AI hanya MEMBACA gambar → JSON geometri. Semua hitungan volume dilakukan engine deterministik.
 */

export const EXTRACTION_PROMPT = `Kamu adalah quantity surveyor & drafter senior Indonesia. Tugasmu MEMBACA gambar denah rumah ini dan mengubahnya menjadi data geometri JSON yang presisi. JANGAN menghitung biaya.

SISTEM KOORDINAT
- Satuan METER. Origin (0,0) = pojok KIRI-ATAS sisi LUAR bangunan. Sumbu X ke kanan, sumbu Y ke BAWAH.
- outline.width = lebar total luar (arah X), outline.depth = panjang total luar (arah Y).

LANGKAH WAJIB (ikuti berurutan, teliti):
1. BACA SEMUA RANTAI DIMENSI di keempat sisi gambar (top/bottom/left/right). Tulis setiap segmen persis seperti angka di gambar, urut dari kiri→kanan (top/bottom) atau atas→bawah (left/right). Koma desimal Indonesia "0,15" = 0.15. Total = angka dimensi keseluruhan di sisi itu.
   Pastikan jumlah segmen = total. Jika ada sisi tanpa dimensi, lewati sisi itu.
2. Tentukan tebal dinding (wallThickness), biasanya segmen kecil berulang seperti 0.15 atau 0.1.
3. Bangun GRID: posisi as dinding = kumulatif segmen + setengah tebal dinding. Contoh rantai [0.15, 3, 0.15] → as dinding di x=0.075 dan x=3.225.
4. DINDING: tulis setiap dinding sebagai garis AS (centerline) lurus a→b dalam meter. Gunakan koordinat grid dari langkah 3 sebisa mungkin. Pecah dinding hanya di pertemuan/ujung. exterior=true untuk dinding keliling luar (termasuk dinding depan yang mundur membentuk teras). Dinding yang tidak ada di rantai dimensi (mis. partisi KM) estimasikan dari dimensi ruang yang tertulis (mis. label "1,5m").
   Jangan buat dinding di area terbuka (open plan) tanpa garis dinding di gambar.
5. BUKAAN: setiap pintu (busur ayun / simbol pintu), jendela (garis ganda tipis / simbol kaca pada dinding), dan bukaan tanpa daun (passage). Isi:
   - at = titik tengah bukaan di as dinding, width = lebar (pakai label seperti "0,9m" bila ada), leaves = jumlah daun (jendela dengan pembagi tengah = 2),
   - wallId = id dinding tempatnya, material "pvc" untuk pintu kamar mandi, selain itu "kayu".
6. RUANG: setiap ruang/area beserta nama label di gambar, polygon LANTAI BERSIH (sisi dalam dinding) dalam meter, dan type (kamar|kamar_mandi|dapur|ruang_tamu|ruang_keluarga|musholla|teras|carport|gudang|selasar|lainnya). Area sirkulasi tanpa label (lorong/selasar) juga dimasukkan sebagai "selasar". Teras di dalam outline juga dimasukkan. Ruang open-plan boleh digabung menjadi satu polygon.
7. KALIBRASI: calibration.outerBox = [ymin, xmin, ymax, xmax] kotak sisi LUAR bangunan pada gambar, ternormalisasi 0-1000 terhadap tinggi & lebar gambar.
8. notes: catat ketidakpastian (angka buram, dimensi yang diasumsikan, simbol ambigu).

ATURAN KETELITIAN
- Prioritaskan angka dimensi tertulis di atas ukuran piksel.
- Semua dinding harus berada di dalam outline. Ruang tidak boleh tumpang tindih.
- Gunakan id unik pendek: w1, w2, ... untuk dinding; d1.. pintu, j1.. jendela, b1.. passage; r1.. ruang.
- Jawab HANYA dengan JSON sesuai skema.`;

const point = {
  type: "object",
  properties: { x: { type: "number" }, y: { type: "number" } },
  required: ["x", "y"],
};

export const PLAN_JSON_SCHEMA = {
  type: "object",
  properties: {
    outline: {
      type: "object",
      properties: { width: { type: "number" }, depth: { type: "number" } },
      required: ["width", "depth"],
    },
    wallThickness: { type: "number" },
    chains: {
      type: "array",
      items: {
        type: "object",
        properties: {
          side: { type: "string", enum: ["top", "bottom", "left", "right"] },
          segments: { type: "array", items: { type: "number" } },
          total: { type: "number" },
        },
        required: ["side", "segments", "total"],
      },
    },
    walls: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          a: point,
          b: point,
          exterior: { type: "boolean" },
        },
        required: ["id", "a", "b", "exterior"],
      },
    },
    openings: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          type: { type: "string", enum: ["door", "window", "passage"] },
          wallId: { type: "string" },
          at: point,
          width: { type: "number" },
          leaves: { type: "integer" },
          material: { type: "string", enum: ["kayu", "pvc", "aluminium", "kaca"] },
          label: { type: "string" },
        },
        required: ["id", "type", "wallId", "at", "width", "leaves"],
      },
    },
    rooms: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          type: {
            type: "string",
            enum: ["kamar", "kamar_mandi", "dapur", "ruang_tamu", "ruang_keluarga", "musholla", "teras", "carport", "gudang", "selasar", "lainnya"],
          },
          polygon: { type: "array", items: point },
        },
        required: ["id", "name", "type", "polygon"],
      },
    },
    calibration: {
      type: "object",
      properties: { outerBox: { type: "array", items: { type: "number" } } },
      required: ["outerBox"],
    },
    notes: { type: "array", items: { type: "string" } },
  },
  required: ["outline", "wallThickness", "chains", "walls", "openings", "rooms", "calibration", "notes"],
} as const;

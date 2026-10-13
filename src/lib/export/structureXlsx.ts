/**
 * Laporan PRA-DESAIN STRUKTUR (Excel) untuk diverifikasi ahli struktur.
 * Lembar "Asumsi" berisi input; lembar "Hitungan" memakai RUMUS HIDUP yang merujuk ke "Asumsi",
 * sehingga ahli bisa mengubah f'c, beban, bentang, tributary, daya dukung tanah, dsb. dan hasil ikut berubah.
 */
import type ExcelJSType from "exceljs";
import type { Company, Project } from "../types";
import { LOADS, type StructureResult } from "../structure";

const REFS: [string, string][] = [
  ["SNI 2847:2019 ps. 9.3.1.1", "Tinggi minimum balok nonprategang: ℓ/16 (dua tumpuan), ℓ/18,5 (satu ujung menerus), ℓ/21 (dua ujung menerus), ℓ/8 (kantilever); untuk fy ≠ 420 MPa dikali (0,4 + fy/700)."],
  ["SNI 2847:2019 ps. 8.3.1", "Tebal minimum pelat dua arah dengan balok (αfm > 2): ℓn(0,8 + fy/1400)/(36 + 9β), tidak kurang dari 90 mm."],
  ["SNI 2847:2019 ps. 18.6.2.1", "Balok SRPMK: lebar ≥ 250 mm dan ≥ 0,3h."],
  ["SNI 2847:2019 ps. 18.7.2.1", "Kolom SRPMK: dimensi penampang terkecil ≥ 300 mm; rasio dimensi terkecil/tegak lurus ≥ 0,4."],
  ["SNI 2847:2019 ps. 22.4.2", "Kuat aksial maksimum kolom bersengkang: φPn,max = 0,80 φ [0,85 f'c (Ag − Ast) + fy Ast], φ = 0,65."],
  ["SNI 1727:2020 Tabel 4.3-1", "Beban hidup: hunian (ruang pribadi & koridornya) 1,92 kN/m²; ruang publik & koridornya 4,79; tangga & jalan keluar 4,79; atap datar 0,96."],
  ["Kombinasi beban", "U = 1,4D dan U = 1,2D + 1,6L (beban gravitasi saja)."],
  ["Pra-dimensi kolom", "Ag ≥ Pu / (0,35 f'c) — praktik pra-desain yang umum dipakai (bukan pasal SNI)."],
  ["SNI 1726:2019", "Ketahanan gempa — BELUM dianalisis dalam pra-desain ini. Wajib oleh ahli struktur."],
];

export async function buildStructureWorkbook(ExcelJS: typeof ExcelJSType, project: Project, r: StructureResult, company?: Company) {
  const wb = new ExcelJS.Workbook();
  wb.creator = "ZanRab — zandev.id";
  const thin = { style: "thin" } as const;
  const border = { top: thin, left: thin, bottom: thin, right: thin };
  const head = (ws: ExcelJSType.Worksheet, row: number, values: string[]) => {
    const rw = ws.getRow(row);
    rw.values = values;
    rw.font = { bold: true };
    rw.eachCell((c) => {
      c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFE8F0FE" } };
      c.border = border;
    });
  };

  // Ringkasan dibuat pertama (tab paling depan); isinya diisi setelah Hitungan selesai
  const Sum = wb.addWorksheet("Ringkasan", { properties: { tabColor: { argb: "FF0A84FF" } } });

  // ---------------- Asumsi ----------------
  const A = wb.addWorksheet("Asumsi");
  A.columns = [{ width: 44 }, { width: 14 }, { width: 10 }, { width: 70 }];
  A.getCell("A1").value = "ASUMSI & INPUT PRA-DESAIN — ubah nilai di kolom B, lembar Hitungan ikut berubah";
  A.getCell("A1").font = { bold: true, size: 13 };
  head(A, 3, ["Parameter", "Nilai", "Satuan", "Sumber / keterangan"]);
  const S = r.settings;
  const minSide = S.system === "SRPMK" ? 300 : 250;
  const minBeamB = S.system === "SRPMK" ? 250 : 200;
  const beamSelfEq = round2(r.loads.qD - ((r.slab?.t ?? 120) / 1000) * LOADS.concrete - LOADS.sdlFloor - r.loads.wallEq);
  const rows: [string, string, number | string, string, string][] = [
    // key, label, value, unit, note
    ["fc", "Mutu beton f'c", S.fc, "MPa", "Pilihan pengguna ZanRab"],
    ["fy", "Mutu baja tulangan fy", S.fy, "MPa", "Pilihan pengguna ZanRab"],
    ["sys", "Sistem rangka", S.system, "-", "SRPMK/SRPMM ditentukan Kategori Desain Seismik (SNI 1726:2019) — cek oleh ahli"],
    ["minSide", "Sisi kolom minimum", minSide, "mm", S.system === "SRPMK" ? "SNI 2847:2019 ps. 18.7.2.1" : "Praktis"],
    ["minB", "Lebar balok minimum", minBeamB, "mm", S.system === "SRPMK" ? "SNI 2847:2019 ps. 18.6.2.1" : "Praktis"],
    ["n", "Jumlah lantai", r.floors, "lantai", "Dari denah ZanRab"],
    ["span", "Bentang balok terbesar", r.maxSpan, "m", S.maxSpanOverride != null ? "Diisi manual" : "Jarak kolom berurutan terbesar pada denah lantai dasar"],
    ["beta", "Rasio bentang panjang/pendek panel pelat β", 1, "-", "Panel terburuk dianggap persegi"],
    ["At", "Luas tributary kolom terberat", r.maxTributary, "m²", S.tributaryOverride != null ? "Diisi manual" : `Setengah jarak ke kolom tetangga (${r.columnCount} titik kolom dari denah) — cek dengan denah struktur`],
    ["gamma", "Berat jenis beton bertulang", LOADS.concrete, "kN/m³", "Nilai umum"],
    ["sdl", "Beban mati tambahan lantai (keramik, spesi, plafon, ME)", LOADS.sdlFloor, "kN/m²", "Perkiraan umum pra-desain"],
    ["wall", "Beban dinding diratakan ke luas lantai", r.loads.wallEq, "kN/m²", "Panjang dinding × tinggi × berat dinding ÷ luas lantai (dari denah)"],
    ["beamSelf", "Berat balok diratakan ke luas lantai", beamSelfEq, "kN/m²", "Dari ukuran balok usulan"],
    ["qL", "Beban hidup lantai", r.loads.qL, "kN/m²", "SNI 1727:2020 Tabel 4.3-1"],
    ["roofD", "Beban mati atap", r.loads.roofD, "kN/m²", S.roofType === "dak_beton" ? "Pelat dak + finishing + balok" : "Rangka baja ringan + genteng + plafon (perkiraan)"],
    ["roofL", "Beban hidup atap", LOADS.liveRoof, "kN/m²", "SNI 1727:2020 Tabel 4.3-1 (atap datar)"],
    ["qa", "Daya dukung tanah izin qa", S.qa, "kPa", "WAJIB diganti hasil sondir / uji tanah"],
  ];
  const ref: Record<string, string> = {};
  rows.forEach(([key, label, val, unit, note], i) => {
    const rr = 4 + i;
    A.getRow(rr).values = [label, val, unit, note];
    A.getCell(`B${rr}`).fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFFFF7D6" } };
    A.getRow(rr).eachCell((c) => (c.border = border));
    ref[key] = `Asumsi!$B$${rr}`;
  });
  let hr = 4 + rows.length + 1;
  A.getCell(`A${hr}`).value = "Tinggi lantai (atas → bawah)";
  A.getCell(`A${hr}`).font = { bold: true };
  hr++;
  const heightRef: string[] = [];
  for (let i = r.floors - 1; i >= 0; i--) {
    A.getRow(hr).values = [r.column.perStorey[i]?.name ?? `Lantai ${i + 1}`, r.storeyHeights[i], "m", "Dari denah / parameter tinggi dinding"];
    A.getCell(`B${hr}`).fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFFFF7D6" } };
    A.getRow(hr).eachCell((c) => (c.border = border));
    heightRef.unshift(`Asumsi!$B$${hr}`); // heightRef[i] = lantai i
    hr++;
  }

  // ---------------- Hitungan ----------------
  const H = wb.addWorksheet("Hitungan");
  H.columns = [{ width: 46 }, { width: 16 }, { width: 10 }, { width: 80 }];
  H.getCell("A1").value = "HITUNGAN PRA-DESAIN (rumus hidup)";
  H.getCell("A1").font = { bold: true, size: 13 };
  head(H, 3, ["Besaran", "Nilai", "Satuan", "Rumus / acuan"]);
  let row = 4;
  const cell: Record<string, string> = {};
  const put = (key: string, label: string, formula: string, result: number, unit: string, note: string, fmt = "0.00") => {
    H.getRow(row).values = [label, { formula, result }, unit, note];
    H.getCell(`B${row}`).numFmt = fmt;
    H.getRow(row).eachCell((c) => (c.border = border));
    cell[key] = `Hitungan!$B$${row}`;
    row++;
  };
  const section = (t: string) => {
    H.getCell(`A${row}`).value = t;
    H.getCell(`A${row}`).font = { bold: true };
    row++;
  };
  const ff = `(0.4+${ref.fy}/700)`;
  section("Balok");
  put("hBeamCalc", "Tinggi minimum balok (ℓ/18,5 × koreksi fy)", `${ref.span}*1000/18.5*${ff}`, (r.maxSpan * 1000) / 18.5 * (0.4 + S.fy / 700), "mm", "SNI 2847:2019 ps. 9.3.1.1 (satu ujung menerus)", "0");
  put("hBeam", "Tinggi balok usulan h", `MAX(300,CEILING(${cell.hBeamCalc},50))`, r.beam.h, "mm", "Dibulatkan ke atas 50 mm, min. 300 mm", "0");
  put("bBeam", "Lebar balok usulan b", `MAX(${ref.minB},CEILING(${cell.hBeam}*0.5,50),CEILING(0.3*${cell.hBeam},50))`, r.beam.b, "mm", "≈ h/2; ≥ lebar minimum; ≥ 0,3h", "0");
  section("Pelat lantai");
  put("ln", "Bentang bersih ℓn", `${ref.span}-0.25`, r.slab?.ln ?? r.maxSpan - 0.25, "m", "Bentang balok − lebar balok (±0,25 m)");
  put("hSlabCalc", "Tebal minimum pelat dua arah", `${cell.ln}*1000*(0.8+${ref.fy}/1400)/(36+9*${ref.beta})`, ((r.slab?.ln ?? r.maxSpan - 0.25) * 1000 * (0.8 + S.fy / 1400)) / 45, "mm", "SNI 2847:2019 ps. 8.3.1 (αfm > 2)", "0");
  put("tSlab", "Tebal pelat usulan", `MAX(120,CEILING(MAX(${cell.hSlabCalc},90),10))`, r.slab?.t ?? 120, "mm", "≥ 90 mm (SNI); minimum praktis 120 mm", "0");
  section("Beban gravitasi per m² lantai");
  put("qD", "Beban mati qD", `${cell.tSlab}/1000*${ref.gamma}+${ref.sdl}+${ref.wall}+${ref.beamSelf}`, r.loads.qD, "kN/m²", "Pelat + beban mati tambahan + dinding + balok");
  put("qu", "Beban terfaktor qu", `MAX(1.4*${cell.qD},1.2*${cell.qD}+1.6*${ref.qL})`, r.loads.qu, "kN/m²", "Maks(1,4D ; 1,2D + 1,6L)");
  put("quRoof", "Beban terfaktor atap", `MAX(1.4*${ref.roofD},1.2*${ref.roofD}+1.6*${ref.roofL})`, Math.max(1.4 * r.loads.roofD, 1.2 * r.loads.roofD + 1.6 * LOADS.liveRoof), "kN/m²", "Maks(1,4D ; 1,2D + 1,6Lr)");
  section("Kolom (beban aksial kumulatif dari atap)");
  let prev = "";
  for (let i = r.floors - 1; i >= 0; i--) {
    const name = r.column.perStorey[i]?.name ?? `Lantai ${i + 1}`;
    const self = `1.2*(${ref.minSide}/1000)^2*${heightRef[i]}*${ref.gamma}`;
    const f = i === r.floors - 1 ? `${cell.quRoof}*${ref.At}+${self}` : `${prev}+${cell.qu}*${ref.At}+${self}`;
    put(`Pu${i}`, `Pu kolom ${name}`, f, r.column.perStorey[i]?.Pu ?? 0, "kN", i === r.floors - 1 ? "Atap × At + berat kolom" : "Lantai di atasnya × At + kolom di atasnya + berat kolom");
    prev = cell[`Pu${i}`];
    put(`Ag${i}`, `Ag perlu ${name}`, `${cell[`Pu${i}`]}*1000/(0.35*${ref.fc})`, ((r.column.perStorey[i]?.Pu ?? 0) * 1000) / (0.35 * S.fc), "mm²", "Ag ≥ Pu/(0,35 f'c)", "0");
    put(`side${i}`, `Sisi kolom usulan ${name}`, `MAX(${ref.minSide},CEILING(SQRT(${cell[`Ag${i}`]}),50))`, r.column.perStorey[i]?.side ?? minSide, "mm", "Bujur sangkar, dibulatkan 50 mm, ≥ sisi minimum", "0");
  }
  put("phiPn", "φPn,max kolom lantai dasar (ρ = 1%)", `0.8*0.65*(0.85*${ref.fc}*(${cell.side0}^2*0.99)+${ref.fy}*${cell.side0}^2*0.01)/1000`, r.column.phiPn, "kN", "SNI 2847:2019 ps. 22.4.2", "0");
  put("util", "Rasio Pu / φPn,max", `${cell.Pu0}/${cell.phiPn}`, r.column.util, "-", "Aksial murni; sisakan cadangan untuk momen gempa");
  section("Pondasi telapak (beban layan)");
  put("Ps", "Beban layan kolom terberat Ps", `(${ref.roofD}+${ref.roofL})*${ref.At}+(${ref.n}-1)*(${cell.qD}+${ref.qL})*${ref.At}+${ref.n}*(${cell.side0}/1000)^2*3.5*${ref.gamma}`, r.footing.Ps, "kN", "Atap + lantai atas (D + L) + berat kolom", "0");
  put("B", "Lebar telapak B (bujur sangkar)", `MAX(1,CEILING(SQRT(${cell.Ps}/${ref.qa}),0.1))`, r.footing.B, "m", "B = √(Ps/qa), dibulatkan 0,1 m, min. 1,0 m");
  put("tF", "Tebal telapak", `MAX(300,CEILING(${cell.B}*1000*0.25,50))`, r.footing.t, "mm", "≈ B/4, min. 300 mm (cek geser pons oleh ahli)", "0");

  // ---------------- Ringkasan ----------------
  Sum.columns = [{ width: 30 }, { width: 22 }, { width: 70 }, { width: 18 }, { width: 18 }, { width: 30 }];
  Sum.getCell("A1").value = "PRA-DESAIN STRUKTUR — UNTUK DIVERIFIKASI AHLI STRUKTUR";
  Sum.getCell("A1").font = { bold: true, size: 14 };
  Sum.getCell("A2").value = `${project.title}${project.location ? ` · ${project.location}` : ""} · ${r.floors} lantai · dibuat ${new Date().toLocaleDateString("id-ID", { dateStyle: "long" })}${company ? ` · ${company.name}` : ""}`;
  Sum.getCell("A3").value =
    "Ukuran di bawah adalah titik awal dari aturan tinggi/tebal minimum SNI dan beban gravitasi. Gempa, lendutan, geser pons, dan detail tulangan BELUM dihitung. Jangan dipakai membangun sebelum diperiksa dan disetujui ahli struktur.";
  Sum.getCell("A3").font = { color: { argb: "FFB45309" }, bold: true };
  Sum.mergeCells("A3:F3");
  Sum.getRow(3).height = 34;
  Sum.getCell("A3").alignment = { wrapText: true, vertical: "top" };
  head(Sum, 5, ["Elemen", "Usulan ZanRab", "Dasar", "Verifikasi ahli (Setuju / Ubah)", "Ukuran final", "Catatan ahli"]);
  const lines: [string, { formula: string; result: string }, string][] = [
    ["Pelat lantai (tebal)", { formula: `TEXT(${cell.tSlab},"0")&" mm"`, result: `${r.slab?.t ?? 120} mm` }, r.slab?.formula ?? "Satu lantai — tidak ada pelat lantai"],
    ["Balok lantai (b × h)", { formula: `TEXT(${cell.bBeam},"0")&" × "&TEXT(${cell.hBeam},"0")&" mm"`, result: `${r.beam.b} × ${r.beam.h} mm` }, r.beam.formula],
    ["Sloof (b × h)", { formula: `"${r.sloof.b} × ${r.sloof.h} mm"`, result: `${r.sloof.b} × ${r.sloof.h} mm` }, r.sloof.formula],
    ["Ring balok atap (b × h)", { formula: `"${r.ringBeam.b} × ${r.ringBeam.h} mm"`, result: `${r.ringBeam.b} × ${r.ringBeam.h} mm` }, r.ringBeam.formula],
    ...r.column.perStorey.map((c, i) => [
      `Kolom ${c.name}`,
      { formula: `TEXT(${cell[`side${i}`]},"0")&" × "&TEXT(${cell[`side${i}`]},"0")&" mm"`, result: `${c.side} × ${c.side} mm` },
      `Pu ≈ ${Math.round(c.Pu)} kN; Ag ≥ Pu/(0,35 f'c)`,
    ] as [string, { formula: string; result: string }, string]),
    ["Pondasi telapak (B × B × t)", { formula: `TEXT(${cell.B},"0.0")&" × "&TEXT(${cell.B},"0.0")&" m, t "&TEXT(${cell.tF},"0")&" mm"`, result: `${r.footing.B} × ${r.footing.B} m, t ${r.footing.t} mm` }, r.footing.formula],
  ];
  lines.forEach(([el, v, basis], i) => {
    const rr = 6 + i;
    Sum.getRow(rr).values = [el, v, basis, "", "", ""];
    Sum.getRow(rr).eachCell({ includeEmpty: true }, (c) => {
      c.border = border;
      c.alignment = { wrapText: true, vertical: "top" };
    });
    for (const col of ["D", "E", "F"]) Sum.getCell(`${col}${rr}`).fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFFFF7D6" } };
  });
  let sr = 6 + lines.length + 1;
  Sum.getCell(`A${sr}`).value = "Perkiraan tulangan (untuk RAB, kg/m³ beton)";
  Sum.getCell(`A${sr}`).font = { bold: true };
  sr++;
  for (const [k, v] of Object.entries(r.steelKgM3)) {
    Sum.getRow(sr).values = [k, `${v} kg/m³`, k === "pelat" ? "ρ total ≈ 0,6%" : k === "pondasi" ? "ρ ≈ 0,5%" : "ρ ≈ 1,5% + sengkang 25%"];
    sr++;
  }
  sr++;
  Sum.getCell(`A${sr}`).value = "Catatan & peringatan";
  Sum.getCell(`A${sr}`).font = { bold: true };
  sr++;
  for (const w of r.warnings) {
    Sum.getCell(`A${sr}`).value = `• ${w}`;
    Sum.mergeCells(`A${sr}:F${sr}`);
    sr++;
  }
  sr++;
  Sum.getCell(`A${sr}`).value = "Diperiksa oleh (nama, nomor SKK/SKA, tanda tangan, tanggal):";
  Sum.getCell(`A${sr}`).font = { bold: true };
  Sum.mergeCells(`B${sr + 1}:D${sr + 3}`);
  Sum.getCell(`B${sr + 1}`).border = border;

  // ---------------- Acuan ----------------
  const Ref = wb.addWorksheet("Acuan");
  Ref.columns = [{ width: 30 }, { width: 110 }];
  head(Ref, 1, ["Acuan", "Isi yang dipakai"]);
  REFS.forEach(([a, b], i) => {
    Ref.getRow(2 + i).values = [a, b];
    Ref.getRow(2 + i).eachCell((c) => {
      c.border = border;
      c.alignment = { wrapText: true, vertical: "top" };
    });
  });
  Ref.getCell(`A${3 + REFS.length}`).value =
    "Nilai pasal/tabel dikutip dari bahan ajar & tugas akhir yang merujuk SNI terkait; cocokkan dengan dokumen SNI resmi sebelum dipakai.";
  Ref.getCell(`A${3 + REFS.length}`).font = { italic: true, color: { argb: "FF6B7280" } };
  return wb;
}

function round2(v: number) {
  return Math.round(v * 100) / 100;
}

export async function exportStructureXlsx(project: Project, r: StructureResult, company?: Company) {
  const ExcelJS = (await import("exceljs")).default;
  const wb = await buildStructureWorkbook(ExcelJS, project, r, company);
  const buf = await wb.xlsx.writeBuffer();
  const blob = new Blob([buf], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `Pra-desain struktur ${project.title}.xlsx`.replace(/[\\/:*?"<>|]/g, "-");
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}

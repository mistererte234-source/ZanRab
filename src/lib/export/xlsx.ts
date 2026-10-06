import type { Company, Project, RabResult } from "../types";

/** Export RAB ke Excel dengan RUMUS HIDUP (VOL × HRG, SUM per bagian) agar bisa diedit kontraktor */
export async function exportRabXlsx(project: Project, rab: RabResult, company: Company) {
  const ExcelJS = (await import("exceljs")).default;
  const wb = new ExcelJS.Workbook();
  wb.creator = "ZanRab — zandev.id";
  const ws = wb.addWorksheet("RAB", { pageSetup: { paperSize: 9, orientation: "portrait", fitToPage: true, fitToWidth: 1, fitToHeight: 0 } });
  ws.columns = [
    { key: "no", width: 6 },
    { key: "item", width: 46 },
    { key: "vol", width: 11 },
    { key: "sat", width: 7 },
    { key: "hrg", width: 15 },
    { key: "jml", width: 17 },
    { key: "ket", width: 42 },
  ];
  const money = '#,##0;[Red]-#,##0';
  const border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } } as const;

  ws.mergeCells("A1:G1");
  ws.getCell("A1").value = "RENCANA ANGGARAN BIAYA (RAB)";
  ws.getCell("A1").font = { bold: true, size: 14 };
  ws.getCell("A1").alignment = { horizontal: "center" };
  const meta: [string, string][] = [
    ["Pekerjaan", project.title],
    ["Lokasi", project.location],
    ["Pemilik", project.client.name],
    ["Kontraktor", company.name],
    ["Luas bangunan", `${rab.grossArea} m²`],
    ["Mode harga", project.priceMode === "ahsp" ? "AHSP (analisa)" : "Borongan"],
  ];
  meta.forEach(([k, v], i) => {
    ws.getCell(`A${i + 3}`).value = k;
    ws.getCell(`C${i + 3}`).value = `: ${v}`;
  });

  let r = meta.length + 4;
  const header = ws.getRow(r);
  header.values = ["NO", "URAIAN PEKERJAAN", "VOLUME", "SAT", "HARGA SATUAN", "JUMLAH HARGA", "DASAR PERHITUNGAN"];
  header.font = { bold: true, color: { argb: "FFFFFFFF" } };
  header.eachCell((c) => {
    c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF1C1C1E" } };
    c.border = border;
    c.alignment = { horizontal: "center", vertical: "middle" };
  });
  r++;

  const subtotalCells: string[] = [];
  for (const s of rab.sections) {
    const sr = ws.getRow(r);
    sr.values = [s.code, s.title];
    sr.font = { bold: true };
    sr.eachCell({ includeEmpty: true }, (c) => {
      c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFE8F0FE" } };
      c.border = border;
    });
    r++;
    const first = r;
    s.lines.forEach((l, i) => {
      const row = ws.getRow(r);
      row.getCell(1).value = i + 1;
      row.getCell(2).value = l.name;
      row.getCell(3).value = Math.round(l.volume * 1000) / 1000;
      row.getCell(3).numFmt = "#,##0.00";
      row.getCell(4).value = l.unit;
      row.getCell(5).value = l.unitPrice;
      row.getCell(5).numFmt = money;
      row.getCell(6).value = { formula: `C${r}*E${r}`, result: l.total };
      row.getCell(6).numFmt = money;
      row.getCell(7).value = l.formula;
      row.getCell(7).font = { size: 9, color: { argb: "FF6B7280" } };
      row.eachCell({ includeEmpty: true }, (c) => (c.border = border));
      r++;
    });
    const st = ws.getRow(r);
    st.getCell(5).value = `Subtotal ${s.code}`;
    st.getCell(6).value = { formula: `SUM(F${first}:F${r - 1})`, result: s.subtotal };
    st.getCell(6).numFmt = money;
    st.font = { bold: true };
    subtotalCells.push(`F${r}`);
    r += 2;
  }

  const P = project.params;
  const totals: [string, string, number][] = [
    ["JUMLAH BIAYA LANGSUNG", subtotalCells.join("+"), rab.directCost],
    [`Overhead & Profit ${(P.overheadProfitPct * 100).toFixed(1)}%`, `F${r}*${P.overheadProfitPct}`, rab.overheadProfit],
    ["JUMLAH SEBELUM PAJAK", `F${r}+F${r + 1}`, rab.beforeTax],
    [`PPN ${(P.ppnPct * 100).toFixed(0)}%`, P.includePpn ? `F${r + 2}*${P.ppnPct}` : "0", rab.ppn],
    ["TOTAL", `F${r + 2}+F${r + 3}`, rab.grandTotal],
    [`DIBULATKAN`, `CEILING(F${r + 4},${P.roundTo || 1})`, rab.grandTotalRounded],
    ["Harga per m²", `F${r + 5}/${rab.grossArea}`, rab.costPerM2],
  ];
  totals.forEach(([label, formula, result], i) => {
    const row = ws.getRow(r + i);
    row.getCell(5).value = label;
    row.getCell(6).value = { formula, result };
    row.getCell(6).numFmt = money;
    row.font = { bold: i === 4 || i === 5 };
  });
  r += totals.length + 2;
  ws.getCell(`A${r}`).value = "Dibuat dengan ZanRab — zandev.id";
  ws.getCell(`A${r}`).font = { italic: true, size: 9, color: { argb: "FF9CA3AF" } };
  ws.getCell(`A${r}`).value = { text: "Dibuat dengan ZanRab — zandev.id", hyperlink: "https://zandev.id" };

  const buf = await wb.xlsx.writeBuffer();
  const blob = new Blob([buf], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `RAB ${project.title}.xlsx`.replace(/[\\/:*?"<>|]/g, "-");
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}

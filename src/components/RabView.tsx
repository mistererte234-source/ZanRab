"use client";

import React, { useState, useMemo } from "react";
import type { Company, Project, RabResult } from "@/lib/types";
import { num, rupiah, terbilangRupiah } from "@/lib/rab";
import { exportRabXlsx } from "@/lib/export/xlsx";
import { calculateBom } from "@/lib/bom";
import {
  Table,
  FileText,
  Download,
  Loader2,
  PieChart,
  Boxes,
  Truck,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

interface RabViewProps {
  project: Project;
  rab: RabResult;
  company: Company;
  onUpdateProject: (patch: Partial<Project>) => void;
}

export function RabView({ project, rab, company, onUpdateProject }: RabViewProps) {
  const [activeTab, setActiveTab] = useState<"tabel" | "surat" | "bom" | "analisa">("tabel");
  const [isExporting, setIsExporting] = useState(false);

  const bom = useMemo(() => calculateBom(rab), [rab]);

  // Section Color Palette for Visual Breakdown
  const SECTION_COLORS: Record<string, string> = {
    I: "#64748b", // Persiapan (slate)
    II: "#d97706", // Tanah (amber)
    III: "#3b82f6", // Struktur (blue)
    IV: "#ef4444", // Pasangan (red)
    V: "#8b5cf6", // Atap (purple)
    VI: "#10b981", // Kusen (emerald)
    VII: "#f59e0b", // Lantai (yellow)
    VIII: "#ec4899", // Cat (pink)
    IX: "#06b6d4", // Listrik (cyan)
    X: "#0284c7", // Sanitasi (sky)
    XI: "#84cc16", // Lain-lain (lime)
  };

  const costDistribution = useMemo(() => {
    const total = rab.directCost || 1;
    return rab.sections
      .map((s) => ({
        code: s.code,
        title: s.title,
        subtotal: s.subtotal,
        percentage: (s.subtotal / total) * 100,
        color: SECTION_COLORS[s.code] || "#6366f1",
      }))
      .filter((s) => s.subtotal > 0);
  }, [rab]);

  const toggleExclude = (code: string) => {
    const isEx = project.excluded.includes(code);
    const updated = isEx
      ? project.excluded.filter((c) => c !== code)
      : [...project.excluded, code];
    onUpdateProject({ excluded: updated });
  };

  const handlePriceChange = (code: string, newPriceStr: string) => {
    const val = parseFloat(newPriceStr.replace(/\D/g, "")) || 0;
    onUpdateProject({
      priceOverrides: { ...project.priceOverrides, [code]: val },
    });
  };

  const handleExport = async () => {
    try {
      setIsExporting(true);
      await exportRabXlsx(project, rab, company);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="col" style={{ gap: 16 }}>
      {/* Action Header & Tabs */}
      <div className="row wrap justify-between items-center">
        <div className="segmented">
          <button
            type="button"
            data-active={activeTab === "tabel"}
            onClick={() => setActiveTab("tabel")}
            className="row items-center"
            style={{ gap: 6 }}
          >
            <Table size={14} />
            <span>Tabel Rincian RAB</span>
          </button>
          <button
            type="button"
            data-active={activeTab === "bom"}
            onClick={() => setActiveTab("bom")}
            className="row items-center"
            style={{ gap: 6 }}
          >
            <Boxes size={14} />
            <span>Logistik Belanja (BOM)</span>
          </button>
          <button
            type="button"
            data-active={activeTab === "analisa"}
            onClick={() => setActiveTab("analisa")}
            className="row items-center"
            style={{ gap: 6 }}
          >
            <PieChart size={14} />
            <span>Proporsi Biaya</span>
          </button>
          <button
            type="button"
            data-active={activeTab === "surat"}
            onClick={() => setActiveTab("surat")}
            className="row items-center"
            style={{ gap: 6 }}
          >
            <FileText size={14} />
            <span>Surat Penawaran</span>
          </button>
        </div>

        <div className="row" style={{ gap: 8 }}>
          <div className="segmented">
            <button
              type="button"
              data-active={project.priceMode === "borongan"}
              onClick={() => onUpdateProject({ priceMode: "borongan" })}
            >
              Borongan
            </button>
            <button
              type="button"
              data-active={project.priceMode === "ahsp"}
              onClick={() => onUpdateProject({ priceMode: "ahsp" })}
            >
              AHSP SNI
            </button>
          </div>

          <button
            type="button"
            className="btn btn-primary row items-center"
            style={{ gap: 6 }}
            onClick={handleExport}
            disabled={isExporting}
          >
            {isExporting ? <Loader2 size={15} className="pulse-dot" /> : <Download size={15} />}
            <span>{isExporting ? "Menyiapkan File..." : "Export Excel (.xlsx)"}</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-3 stagger">
        <div className="card glass stat">
          <div className="label">Total Biaya Langsung</div>
          <div className="value mono">{rupiah(rab.directCost)}</div>
          <div className="faint">{rab.sections.length} Bagian Pekerjaan</div>
        </div>
        <div className="card glass stat">
          <div className="label">Total Penawaran Final</div>
          <div className="value mono" style={{ color: "var(--accent)" }}>
            {rupiah(rab.grandTotalRounded)}
          </div>
          <div className="faint">
            Termasuk O&P {project.params.overheadProfitPct * 100}%{" "}
            {project.params.includePpn ? "+ PPN 11%" : "(Non-PPN)"}
          </div>
        </div>
        <div className="card glass stat">
          <div className="label">Estimasi Harga / m²</div>
          <div className="value mono">{rupiah(rab.costPerM2)} / m²</div>
          <div className="faint">Luas Bangunan: {rab.grossArea} m²</div>
        </div>
      </div>

      {/* Main Tab 1: Detailed Table */}
      {activeTab === "tabel" && (
        <div className="card glass" style={{ padding: 0, overflow: "hidden" }}>
          <div className="scroll-x">
            <table className="table">
              <thead>
                <tr>
                  <th style={{ width: 40, textAlign: "center" }}>Act</th>
                  <th>Uraian Pekerjaan & Dasar Perhitungan</th>
                  <th className="num">Volume</th>
                  <th style={{ width: 60, textAlign: "center" }}>Sat</th>
                  <th className="num">Harga Satuan (Rp)</th>
                  <th className="num">Jumlah (Rp)</th>
                </tr>
              </thead>
              <tbody>
                {rab.sections.map((sec) => (
                  <React.Fragment key={sec.code}>
                    <tr className="section">
                      <td colSpan={6}>
                        {sec.code}. {sec.title}
                      </td>
                    </tr>
                    {sec.lines.map((l) => {
                      const isExcluded = project.excluded.includes(l.code);
                      const isCustomPrice = project.priceOverrides[l.code] != null;
                      return (
                        <tr
                          key={l.code}
                          className={`line ${isExcluded ? "excluded" : ""}`}
                        >
                          <td style={{ textAlign: "center" }}>
                            <input
                              type="checkbox"
                              checked={!isExcluded}
                              onChange={() => toggleExclude(l.code)}
                            />
                          </td>
                          <td>
                            <div style={{ fontWeight: 550 }}>{l.name}</div>
                            <div className="faint mono" style={{ fontSize: 11.5, display: "flex", alignItems: "center", gap: 4 }}>
                              <span style={{ color: "var(--accent)" }}>▪</span> {l.formula}
                            </div>
                          </td>
                          <td className="num mono">{num(l.volume)}</td>
                          <td style={{ textAlign: "center" }} className="muted">
                            {l.unit}
                          </td>
                          <td className="num">
                            <input
                              type="text"
                              className={`cell-input ${isCustomPrice ? "changed" : ""}`}
                              defaultValue={l.unitPrice.toLocaleString("id-ID")}
                              onBlur={(e) => handlePriceChange(l.code, e.target.value)}
                            />
                          </td>
                          <td className="num mono font-semibold">
                            {rupiah(l.total)}
                          </td>
                        </tr>
                      );
                    })}
                    <tr style={{ background: "rgba(0,0,0,0.02)" }}>
                      <td colSpan={5} style={{ textAlign: "right", fontWeight: 650 }}>
                        Subtotal {sec.code}
                      </td>
                      <td className="num mono" style={{ fontWeight: 700 }}>
                        {rupiah(sec.subtotal)}
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Main Tab 2: Bill of Materials (BOM) Logistics */}
      {activeTab === "bom" && (
        <div className="col" style={{ gap: 16 }}>
          {/* Logistics Quick Highlights */}
          <div className="grid grid-3">
            <div className="card glass col" style={{ gap: 6, borderLeft: "4px solid #3b82f6" }}>
              <div className="row items-center justify-between">
                <span className="muted" style={{ fontSize: 12 }}>Semen Portland</span>
                <Boxes size={16} color="#3b82f6" />
              </div>
              <div className="mono font-bold" style={{ fontSize: 20 }}>
                {bom.highlightPackages.semenBags50kg.toLocaleString("id-ID")} Sak
              </div>
              <div className="faint" style={{ fontSize: 11 }}>Kemasan @ 50 kg (Pondasi, Struktur, Plesteran)</div>
            </div>

            <div className="card glass col" style={{ gap: 6, borderLeft: "4px solid #10b981" }}>
              <div className="row items-center justify-between">
                <span className="muted" style={{ fontSize: 12 }}>Pasir & Kerikil</span>
                <Truck size={16} color="#10b981" />
              </div>
              <div className="mono font-bold" style={{ fontSize: 20 }}>
                ± {bom.highlightPackages.pasirTrucks} Truk Pasir
              </div>
              <div className="faint" style={{ fontSize: 11 }}>+ {bom.highlightPackages.splitTrucks} Truk Split Cor (Dump Truck @ 6 m³)</div>
            </div>

            <div className="card glass col" style={{ gap: 6, borderLeft: "4px solid #f59e0b" }}>
              <div className="row items-center justify-between">
                <span className="muted" style={{ fontSize: 12 }}>Besi & Material Dinding</span>
                <Boxes size={16} color="#f59e0b" />
              </div>
              <div className="mono font-bold" style={{ fontSize: 20 }}>
                ± {bom.highlightPackages.besiRods.toLocaleString("id-ID")} Btg Besi
              </div>
              <div className="faint" style={{ fontSize: 11 }}>
                {bom.highlightPackages.bataCount.toLocaleString("id-ID")} {bom.highlightPackages.bataType}
              </div>
            </div>
          </div>

          {/* BOM Material Table */}
          <div className="card glass" style={{ padding: 0, overflow: "hidden" }}>
            <div className="scroll-x">
              <table className="table">
                <thead>
                  <tr>
                    <th>Bahan Konstruksi</th>
                    <th style={{ width: 120 }}>Kategori</th>
                    <th className="num">Total Kebutuhan</th>
                    <th style={{ width: 60, textAlign: "center" }}>Satuan</th>
                    <th>Estimasi Kemasan Logistik Belanja</th>
                    <th className="num">Estimasi Budget (Rp)</th>
                  </tr>
                </thead>
                <tbody>
                  {bom.items.map((item) => (
                    <tr key={item.code} className="line">
                      <td>
                        <div style={{ fontWeight: 600 }}>{item.name}</div>
                        <div className="faint mono" style={{ fontSize: 11 }}>{item.code}</div>
                      </td>
                      <td>
                        <span
                          className="badge"
                          style={{
                            textTransform: "capitalize",
                            fontSize: 11,
                            padding: "3px 8px",
                            background: "rgba(255,255,255,0.06)",
                          }}
                        >
                          {item.category.replace("_", " ")}
                        </span>
                      </td>
                      <td className="num mono font-semibold">{num(item.quantity)}</td>
                      <td style={{ textAlign: "center" }} className="muted">{item.unit}</td>
                      <td>
                        {item.commercialPackage ? (
                          <span
                            className="badge"
                            style={{
                              background: "rgba(16, 185, 129, 0.12)",
                              color: "#10b981",
                              fontWeight: 600,
                              fontSize: 12,
                            }}
                          >
                            {item.commercialPackage}
                          </span>
                        ) : (
                          <span className="faint">-</span>
                        )}
                      </td>
                      <td className="num mono font-semibold">{rupiah(item.estimatedCost)}</td>
                    </tr>
                  ))}
                  <tr style={{ background: "rgba(0,0,0,0.02)" }}>
                    <td colSpan={5} style={{ textAlign: "right", fontWeight: 700 }}>
                      Total Anggaran Pembelian Material Terhitung:
                    </td>
                    <td className="num mono" style={{ fontWeight: 800, color: "var(--accent)" }}>
                      {rupiah(bom.totalMaterialCost)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Main Tab 3: Visual Cost Proportion Breakdown */}
      {activeTab === "analisa" && (
        <div className="col" style={{ gap: 20 }}>
          {/* Stacked Progress Bar */}
          <div className="card glass col" style={{ gap: 14 }}>
            <div className="row justify-between items-center">
              <h4 style={{ margin: 0 }}>Distribusi Proporsi Anggaran Biaya</h4>
              <span className="faint mono" style={{ fontSize: 12 }}>Total: {rupiah(rab.directCost)}</span>
            </div>

            {/* Stacked Bar Container */}
            <div
              style={{
                display: "flex",
                height: 22,
                borderRadius: 8,
                overflow: "hidden",
                background: "rgba(255,255,255,0.05)",
                boxShadow: "inset 0 1px 3px rgba(0,0,0,0.2)",
              }}
            >
              {costDistribution.map((item) => (
                <div
                  key={item.code}
                  style={{
                    width: `${item.percentage}%`,
                    backgroundColor: item.color,
                    transition: "width 0.4s ease",
                  }}
                  title={`${item.title}: ${item.percentage.toFixed(1)}%`}
                />
              ))}
            </div>

            {/* Interactive Grid of Section Cards */}
            <div className="grid grid-3" style={{ gap: 12, marginTop: 8 }}>
              {costDistribution.map((item) => (
                <div
                  key={item.code}
                  className="card"
                  style={{
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: 10,
                    padding: "12px 14px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                  }}
                >
                  <div className="row items-center justify-between">
                    <div className="row items-center" style={{ gap: 8 }}>
                      <span
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          backgroundColor: item.color,
                          display: "inline-block",
                        }}
                      />
                      <span style={{ fontSize: 12, fontWeight: 650, color: "var(--text-main)" }}>
                        {item.code}. {item.title}
                      </span>
                    </div>
                    <span
                      className="mono font-bold"
                      style={{ fontSize: 13, color: item.color }}
                    >
                      {item.percentage.toFixed(1)}%
                    </span>
                  </div>
                  <div className="mono font-bold" style={{ fontSize: 16 }}>
                    {rupiah(item.subtotal)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Tab 2: Client Formal Proposal Document */}
      {activeTab === "surat" && (
        <div
          className="card glass col"
          style={{
            padding: 36,
            background: "#fff",
            color: "#111",
            boxShadow: "var(--shadow-lg)",
            borderRadius: "var(--radius)",
            gap: 20,
          }}
        >
          {/* Header Surat */}
          <div className="row justify-between items-start" style={{ borderBottom: "2px solid #111", paddingBottom: 16 }}>
            <div>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>{company.name}</h2>
              <div style={{ fontSize: 13, color: "#555" }}>{company.address}</div>
              <div style={{ fontSize: 13, color: "#555" }}>Kontak: {company.phone} | {company.email}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div className="badge blue" style={{ fontSize: 13, padding: "6px 12px" }}>
                SURAT PENAWARAN HARGA
              </div>
              <div className="faint" style={{ marginTop: 4 }}>No: {project.offerNumber}</div>
            </div>
          </div>

          {/* Kepada & Perihal */}
          <div className="grid grid-2" style={{ fontSize: 14 }}>
            <div>
              <strong>Kepada Yth:</strong>
              <div>{project.client.name || "Bapak/Ibu Pemilik Rumah"}</div>
              <div style={{ color: "#666" }}>{project.client.address || "Di Tempat"}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div><strong>Tanggal:</strong> {new Date().toLocaleDateString("id-ID", { dateStyle: "long" })}</div>
              <div><strong>Masa Berlaku:</strong> {project.offerValidityDays} Hari Kalender</div>
            </div>
          </div>

          <p style={{ fontSize: 14, lineHeight: 1.6, margin: "8px 0" }}>
            Sehubungan dengan rencana pembangunan <strong>{project.title}</strong> yang berlokasi di{" "}
            <strong>{project.location || "lokasi proyek"}</strong> dengan luas bangunan{" "}
            <strong>{rab.grossArea} m²</strong>, bersama ini kami sampaikan rincian penawaran biaya konstruksi sebagai berikut:
          </p>

          {/* Ringkasan Biaya */}
          <div style={{ border: "1px solid #ddd", borderRadius: 12, padding: 18, background: "#fafafa" }}>
            <div className="row justify-between items-center" style={{ marginBottom: 12 }}>
              <span style={{ fontSize: 16 }}>Nilai Total Penawaran:</span>
              <span style={{ fontSize: 24, fontWeight: 800, color: "var(--accent)" }}>
                {rupiah(rab.grandTotalRounded)}
              </span>
            </div>
            <div style={{ fontSize: 13, color: "#555", fontStyle: "italic" }}>
              Terbilang: &quot;{terbilangRupiah(rab.grandTotalRounded)}&quot;
            </div>
          </div>

          {/* Ketentuan Pembayaran */}
          <div style={{ fontSize: 13.5 }}>
            <strong>Ketentuan & Termin Pembayaran:</strong>
            <p style={{ margin: "4px 0", color: "#444" }}>{project.paymentTerms}</p>
          </div>

          {/* Tanda Tangan */}
          <div className="row justify-between" style={{ marginTop: 30, paddingTop: 20 }}>
            <div style={{ textAlign: "center", width: 200 }}>
              <div style={{ fontSize: 13 }}>Menyetujui,</div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>Pemilik Rumah</div>
              <div style={{ height: 60 }} />
              <div style={{ borderTop: "1px solid #777", paddingTop: 4 }}>
                {project.client.name || "( .................................... )"}
              </div>
            </div>
            <div style={{ textAlign: "center", width: 200 }}>
              <div style={{ fontSize: 13 }}>Hormat Kami,</div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{company.name}</div>
              <div style={{ height: 60 }} />
              <div style={{ borderTop: "1px solid #777", paddingTop: 4 }}>
                {company.director}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

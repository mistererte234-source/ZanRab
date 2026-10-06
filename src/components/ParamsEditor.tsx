"use client";

import React, { useState } from "react";
import type { Project, ProjectParams } from "@/lib/types";
import { Sliders, Building2, Home, Paintbrush, DollarSign, Settings2 } from "lucide-react";

interface ParamsEditorProps {
  params: ProjectParams;
  onChange: (updated: ProjectParams) => void;
}

export function ParamsEditor({ params, onChange }: ParamsEditorProps) {
  const [activeTab, setActiveTab] = useState<"umum" | "struktur" | "atap" | "finishing" | "komersial">("umum");

  const setVal = <K extends keyof ProjectParams>(key: K, val: ProjectParams[K]) => {
    onChange({ ...params, [key]: val });
  };

  const tabIcons = {
    umum: <Sliders size={14} />,
    struktur: <Building2 size={14} />,
    atap: <Home size={14} />,
    finishing: <Paintbrush size={14} />,
    komersial: <DollarSign size={14} />,
  };

  return (
    <div className="card glass col" style={{ gap: 16 }}>
      <div className="row wrap justify-between items-center">
        <div className="row items-center" style={{ gap: 8 }}>
          <Settings2 size={18} color="var(--accent)" />
          <h3 style={{ margin: 0 }}>Parameter Spesifikasi Teknis</h3>
        </div>
        <div className="segmented">
          {(["umum", "struktur", "atap", "finishing", "komersial"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              data-active={activeTab === tab}
              onClick={() => setActiveTab(tab)}
              className="row items-center"
              style={{ gap: 6, textTransform: "capitalize" }}
            >
              {tabIcons[tab]}
              <span>{tab}</span>
            </button>
          ))}
        </div>
      </div>

      {activeTab === "umum" && (
        <div className="grid grid-2">
          <div className="field">
            <label>Jumlah Lantai Bangunan</label>
            <select
              className="input"
              value={params.floorCount || 1}
              onChange={(e) => setVal("floorCount", parseInt(e.target.value, 10) || 1)}
            >
              <option value="1">1 Lantai (Standar Rumah Tinggal)</option>
              <option value="2">2 Lantai (+ Pelat Lantai Dak Beton Lantai 2)</option>
              <option value="3">3 Lantai (+ Pelat Lantai Dak Beton Lantai 2 & 3)</option>
              <option value="4">4 Lantai (+ Pelat Lantai Multi-Level)</option>
            </select>
          </div>
          <div className="field">
            <label>Tinggi Dinding per Lantai (m)</label>
            <input
              type="number"
              step="0.05"
              className="input"
              value={params.wallHeight}
              onChange={(e) => setVal("wallHeight", parseFloat(e.target.value) || 3.5)}
            />
          </div>
        </div>
      )}

      {activeTab === "umum" && (
        <div className="grid grid-2">
          <div className="field">
            <label>Peninggian Urug Tanah (m)</label>
            <input
              type="number"
              step="0.05"
              className="input"
              value={params.fillHeight}
              onChange={(e) => setVal("fillHeight", parseFloat(e.target.value) || 0)}
            />
          </div>
          <div className="field">
            <label>Bongkaran Gedung Lama (Rp)</label>
            <input
              type="number"
              step="500000"
              className="input"
              value={params.demolitionLumpSum}
              onChange={(e) => setVal("demolitionLumpSum", parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>
      )}

      {activeTab === "umum" && (
        <div className="grid grid-2">
          <div className="field">
            <label>Pilihan Material Dinding</label>
            <select
              className="input"
              value={params.wallType || "bata_ringan"}
              onChange={(e) => setVal("wallType", e.target.value as any)}
            >
              <option value="bata_ringan">Bata Ringan / Hebel AAC (Ringan ~750 kg/m³, Cepat & Rapi)</option>
              <option value="bata_merah">Bata Merah Bakar Konvensional (Kuat, Berat ~1.750 kg/m³)</option>
              <option value="batako">Batako Press Semen (Ekonomis, Padat)</option>
            </select>
          </div>
          <div className="field">
            <label>Tier Finishing & Kelengkapan</label>
            <select
              className="input"
              value={params.tier || "medium"}
              onChange={(e) => setVal("tier", e.target.value as any)}
            >
              <option value="standard">Standard (Ekonomis, Keramik 40x40, Cat Standar)</option>
              <option value="medium">Medium / Optimal (Granit 60x60, Kusen Alumunium 3", Cat Dulux/Catylac)</option>
              <option value="luxury">Luxury / Premium (Granit 80x80/Slab, Sanitari Kohler/Toto, Cat Jotun Top)</option>
            </select>
          </div>
        </div>
      )}

      {/* Structural Advisory Alert */}
      {((params.floorCount || 1) > 1 || params.wallHeight > 3.8 || params.wallType === "bata_merah") && (
        <div
          className="card"
          style={{
            background: "rgba(234, 179, 8, 0.08)",
            border: "1px solid rgba(234, 179, 8, 0.25)",
            padding: "10px 14px",
            borderRadius: 12,
            fontSize: "0.82rem",
            color: "var(--text-sub)",
            display: "flex",
            alignItems: "flex-start",
            gap: 10,
          }}
        >
          <Building2 size={16} color="var(--warning)" style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <strong style={{ color: "var(--text-main)", display: "block", marginBottom: 2 }}>
              Analisa Struktur Rekayasa Sipil Otomatis Aktif:
            </strong>
            <ul style={{ margin: 0, paddingLeft: 16 }}>
              {(params.floorCount || 1) > 1 && (
                <li>Bangunan {params.floorCount} lantai: Otomatis menghitung pelat dak beton lantai atas (t=12cm) & kapasitas beban vertikal kolom-balok bertingkat.</li>
              )}
              {params.wallHeight > 3.8 && (
                <li>Tinggi dinding {params.wallHeight}m (&gt;3.8m): Otomatis menambahkan balok pinggang / balok lintel praktis pengaku tekuk lentur.</li>
              )}
              {params.wallType === "bata_merah" && (
                <li>Bata Merah (beban mati 2.5x bata ringan): Direkomendasikan dimensi kolom min. 15x25 atau pembesian K-225 D13 ulir.</li>
              )}
            </ul>
          </div>
        </div>
      )}

      {activeTab === "struktur" && (
        <div className="col" style={{ gap: 14 }}>
          <div className="grid grid-2">
            <div className="field">
              <label>Tipe Pondasi</label>
              <select
                className="input"
                value={params.foundation}
                onChange={(e) => setVal("foundation", e.target.value as any)}
              >
                <option value="strauss_kumbung">Strauss Pile + Batu Kumbung (Standar)</option>
                <option value="batu_kali">Pondasi Menerus Batu Kali 1:4</option>
                <option value="footplat_batu_kali">Footplat Beton + Batu Kali</option>
              </select>
            </div>
            <div className="field">
              <label>Kedalaman Strauss (m)</label>
              <input
                type="number"
                step="0.5"
                className="input"
                value={params.straussDepth}
                onChange={(e) => setVal("straussDepth", parseFloat(e.target.value) || 3)}
              />
            </div>
          </div>
          <div className="grid grid-3">
            <div className="field">
              <label>Dimensi Sloof (Lebar x Tinggi)</label>
              <div className="row">
                <input
                  type="number"
                  step="0.01"
                  className="input"
                  value={params.sloof.b}
                  onChange={(e) =>
                    setVal("sloof", { ...params.sloof, b: parseFloat(e.target.value) || 0.15 })
                  }
                />
                <span>x</span>
                <input
                  type="number"
                  step="0.01"
                  className="input"
                  value={params.sloof.h}
                  onChange={(e) =>
                    setVal("sloof", { ...params.sloof, h: parseFloat(e.target.value) || 0.25 })
                  }
                />
              </div>
            </div>
            <div className="field">
              <label>Dimensi Kolom Praktis</label>
              <div className="row">
                <input
                  type="number"
                  step="0.01"
                  className="input"
                  value={params.column.b}
                  onChange={(e) =>
                    setVal("column", { ...params.column, b: parseFloat(e.target.value) || 0.15 })
                  }
                />
                <span>x</span>
                <input
                  type="number"
                  step="0.01"
                  className="input"
                  value={params.column.h}
                  onChange={(e) =>
                    setVal("column", { ...params.column, h: parseFloat(e.target.value) || 0.2 })
                  }
                />
              </div>
            </div>
            <div className="field">
              <label>Tebal Rabat Lantai (m)</label>
              <input
                type="number"
                step="0.01"
                className="input"
                value={params.floorSlabThickness}
                onChange={(e) => setVal("floorSlabThickness", parseFloat(e.target.value) || 0.1)}
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === "atap" && (
        <div className="grid grid-3">
          <div className="field">
            <label>Bentuk Atap</label>
            <select
              className="input"
              value={params.roofType}
              onChange={(e) => setVal("roofType", e.target.value as any)}
            >
              <option value="pelana">Pelana (Gable)</option>
              <option value="perisai">Perisai / Limasan (Hip)</option>
              <option value="dak">Full Dak Beton</option>
            </select>
          </div>
          <div className="field">
            <label>Penutup Atap</label>
            <select
              className="input"
              value={params.roofCover}
              onChange={(e) => setVal("roofCover", e.target.value as any)}
            >
              <option value="genteng_beton">Genteng Beton Flat</option>
              <option value="genteng_metal">Genteng Metal Pasir</option>
              <option value="spandek">Spandek / Zincalume</option>
            </select>
          </div>
          <div className="field">
            <label>Kemiringan Sudut Atap (°)</label>
            <input
              type="number"
              className="input"
              value={params.roofSlopeDeg}
              onChange={(e) => setVal("roofSlopeDeg", parseFloat(e.target.value) || 30)}
            />
          </div>
        </div>
      )}

      {activeTab === "finishing" && (
        <div className="grid grid-3">
          <div className="field">
            <label>Waste Keramik / Granit (%)</label>
            <input
              type="number"
              step="1"
              className="input"
              value={Math.round(params.floorWaste * 100)}
              onChange={(e) => setVal("floorWaste", (parseFloat(e.target.value) || 5) / 100)}
            />
          </div>
          <div className="field">
            <label>Tinggi Keramik Dinding KM (m)</label>
            <input
              type="number"
              step="0.1"
              className="input"
              value={params.wetWallTileHeight}
              onChange={(e) => setVal("wetWallTileHeight", parseFloat(e.target.value) || 1.8)}
            />
          </div>
          <div className="field">
            <label>Meja Dapur Beton (m1)</label>
            <input
              type="number"
              step="0.5"
              className="input"
              value={params.kitchenCounterLength}
              onChange={(e) => setVal("kitchenCounterLength", parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>
      )}

      {activeTab === "komersial" && (
        <div className="grid grid-3">
          <div className="field">
            <label>Profit & Overhead (%)</label>
            <input
              type="number"
              step="1"
              className="input"
              value={Math.round(params.overheadProfitPct * 100)}
              onChange={(e) =>
                setVal("overheadProfitPct", (parseFloat(e.target.value) || 10) / 100)
              }
            />
          </div>
          <div className="field">
            <label>Sertakan PPN 11%?</label>
            <div className="row items-center" style={{ height: 40 }}>
              <button
                type="button"
                className="switch"
                data-on={params.includePpn}
                onClick={() => setVal("includePpn", !params.includePpn)}
              />
              <span className="muted">{params.includePpn ? "PPN Aktif (+11%)" : "Non-PPN"}</span>
            </div>
          </div>
          <div className="field">
            <label>Pembulatan Akhir (Rp)</label>
            <select
              className="input"
              value={params.roundTo}
              onChange={(e) => setVal("roundTo", parseInt(e.target.value, 10) || 1000)}
            >
              <option value="1">Tanpa Pembulatan</option>
              <option value="1000">Ribuan Terdekat (1.000)</option>
              <option value="100000">Ratusan Ribu (100.000)</option>
              <option value="1000000">Juta Terdekat (1.000.000)</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

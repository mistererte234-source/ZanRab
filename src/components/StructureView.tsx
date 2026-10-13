"use client";

import { useMemo, useState } from "react";
import { Building2, Download, TriangleAlert, Wand2, ChevronDown, Check } from "lucide-react";
import type { Company, Project, StructureSettings } from "@/lib/types";
import { computeStructure, structureSettingsOf, structureToParams } from "@/lib/structure";
import { exportStructureXlsx } from "@/lib/export/structureXlsx";

const mm = (m: number) => Math.round(m * 1000);

export function StructureView({
  project,
  company,
  onUpdateProject,
}: {
  project: Project;
  company: Company;
  onUpdateProject: (patch: Partial<Project> | ((p: Project) => Partial<Project>)) => void;
}) {
  const S = structureSettingsOf(project);
  const r = useMemo(() => computeStructure(project), [project]);
  const [showBasis, setShowBasis] = useState(false);
  const [exporting, setExporting] = useState(false);
  if (!r) return null;

  const save = (patch: Partial<StructureSettings>) => onUpdateProject({ structure: { ...S, ...patch } });
  const P = project.params;
  const beamNow = P.floorBeam ?? { b: 0.2, h: 0.35 };
  const rows: { el: string; prop: string; now: string; basis: string; differs: boolean }[] = [
    ...(r.slab
      ? [{ el: "Pelat lantai", prop: `${r.slab.t} mm`, now: `${mm(P.upperSlabThickness ?? 0.12)} mm`, basis: r.slab.formula, differs: mm(P.upperSlabThickness ?? 0.12) !== r.slab.t }]
      : []),
    ...(r.floors > 1
      ? [{ el: "Balok lantai", prop: `${r.beam.b}×${r.beam.h}`, now: `${mm(beamNow.b)}×${mm(beamNow.h)}`, basis: r.beam.formula, differs: mm(beamNow.b) !== r.beam.b || mm(beamNow.h) !== r.beam.h }]
      : []),
    { el: "Kolom", prop: `${r.column.b}×${r.column.h}`, now: `${mm(P.column.b)}×${mm(P.column.h)}`, basis: r.column.formula, differs: mm(P.column.b) !== r.column.b || mm(P.column.h) !== r.column.h },
    { el: "Sloof", prop: `${r.sloof.b}×${r.sloof.h}`, now: `${mm(P.sloof.b)}×${mm(P.sloof.h)}`, basis: r.sloof.formula, differs: mm(P.sloof.b) !== r.sloof.b || mm(P.sloof.h) !== r.sloof.h },
    { el: "Ring balok", prop: `${r.ringBeam.b}×${r.ringBeam.h}`, now: `${mm(P.ringBeam.b)}×${mm(P.ringBeam.h)}`, basis: r.ringBeam.formula, differs: mm(P.ringBeam.b) !== r.ringBeam.b || mm(P.ringBeam.h) !== r.ringBeam.h },
    {
      el: "Pondasi telapak",
      prop: `${r.footing.B}×${r.footing.B} m, t ${r.footing.t}`,
      now: P.foundation === "strauss_kumbung" ? "strauss + pile cap" : `${P.pileCap.w}×${P.pileCap.l} m, t ${mm(P.pileCap.t)}`,
      basis: r.footing.formula,
      // pondasi dalam (strauss) tidak diganti otomatis — jenis pondasi ditentukan data tanah
      differs: P.foundation === "footplat_batu_kali" && (P.pileCap.w !== r.footing.B || mm(P.pileCap.t) !== r.footing.t),
    },
  ];
  const anyDiff = rows.some((x) => x.differs);

  const apply = () => {
    const sp = structureToParams(r, project.params.foundation);
    onUpdateProject((p) => ({
      params: {
        ...p.params,
        column: sp.column,
        sloof: sp.sloof,
        ringBeam: sp.ringBeam,
        floorBeam: sp.floorBeam,
        ...(sp.upperSlabThickness ? { upperSlabThickness: sp.upperSlabThickness } : {}),
        ...(sp.foundation ? { foundation: sp.foundation, pileCap: sp.pileCap } : {}),
      },
    }));
  };

  const download = async () => {
    try {
      setExporting(true);
      await exportStructureXlsx(project, r, company);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="card glass col struct" style={{ gap: 14 }}>
      <div className="row justify-between items-center wrap" style={{ gap: 8 }}>
        <div className="row items-center" style={{ gap: 8 }}>
          <Building2 size={18} color="var(--accent)" />
          <h3 style={{ margin: 0 }}>Pra-desain struktur (SNI)</h3>
        </div>
        <span className="badge orange">Untuk diverifikasi ahli struktur</span>
      </div>
      <p className="faint" style={{ margin: 0, fontSize: 13, lineHeight: 1.5 }}>
        Ukuran awal dari aturan SNI 2847:2019 (tinggi/tebal minimum, syarat SRPMK) dan beban gravitasi SNI 1727:2020, dihitung dari
        denah {r.floors > 1 ? `${r.floors} lantai` : "proyek"}. Unduh laporannya untuk diperiksa ahli — rumus di Excel bisa diubah.
      </p>

      <div className="struct-inputs">
        <div className="field">
          <label htmlFor="st-fc">Mutu beton f&apos;c</label>
          <select id="st-fc" className="input" value={S.fc} onChange={(e) => save({ fc: parseFloat(e.target.value) })}>
            {[20, 25, 30, 35].map((v) => (
              <option key={v} value={v}>
                {v} MPa
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="st-fy">Mutu baja fy</label>
          <select id="st-fy" className="input" value={S.fy} onChange={(e) => save({ fy: parseFloat(e.target.value) })}>
            <option value={280}>280 MPa</option>
            <option value={420}>420 MPa</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="st-sys">Sistem rangka</label>
          <select id="st-sys" className="input" value={S.system} onChange={(e) => save({ system: e.target.value as StructureSettings["system"] })}>
            <option value="SRPMK">SRPMK (khusus)</option>
            <option value="SRPMM">SRPMM (menengah)</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="st-occ">Fungsi lantai</label>
          <select id="st-occ" className="input" value={S.occupancy} onChange={(e) => save({ occupancy: e.target.value as StructureSettings["occupancy"] })}>
            <option value="hunian">Hunian / kos (1,92 kN/m²)</option>
            <option value="publik">Ruang publik (4,79 kN/m²)</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="st-roof">Atap</label>
          <select id="st-roof" className="input" value={S.roofType} onChange={(e) => save({ roofType: e.target.value as StructureSettings["roofType"] })}>
            <option value="rangka_ringan">Rangka baja ringan</option>
            <option value="dak_beton">Dak beton</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="st-qa">Daya dukung tanah qa (kPa)</label>
          <input id="st-qa" className="input" type="number" min={20} value={S.qa} onChange={(e) => save({ qa: Math.max(20, parseFloat(e.target.value) || 100) })} />
        </div>
        <div className="field">
          <label htmlFor="st-span">Bentang balok terbesar (m)</label>
          <input
            id="st-span"
            className="input"
            type="number"
            step="0.05"
            placeholder={`dari denah: ${r.maxSpan}`}
            value={S.maxSpanOverride ?? ""}
            onChange={(e) => save({ maxSpanOverride: e.target.value ? Math.max(1, parseFloat(e.target.value)) : null })}
          />
        </div>
        <div className="field">
          <label htmlFor="st-at">Tributary kolom terberat (m²)</label>
          <input
            id="st-at"
            className="input"
            type="number"
            step="0.5"
            placeholder={`dari denah: ${r.maxTributary}`}
            value={S.tributaryOverride ?? ""}
            onChange={(e) => save({ tributaryOverride: e.target.value ? Math.max(1, parseFloat(e.target.value)) : null })}
          />
        </div>
      </div>

      <div className="struct-table" role="table" aria-label="Hasil pra-desain">
        <div className="struct-row struct-head" role="row">
          <span role="columnheader">Elemen</span>
          <span role="columnheader">Usulan (mm)</span>
          <span role="columnheader">Di RAB sekarang</span>
        </div>
        {rows.map((x) => (
          <div key={x.el} className="struct-row" role="row" data-diff={x.differs}>
            <span role="cell" className="struct-el">
              {x.el}
            </span>
            <span role="cell" className="mono struct-prop">
              {x.prop}
            </span>
            <span role="cell" className="mono faint">
              {x.differs ? x.now : <><Check size={13} /> sama</>}
            </span>
            {showBasis && (
              <span className="struct-basis faint" role="cell">
                {x.basis}
              </span>
            )}
          </div>
        ))}
        {r.floors > 1 && (
          <div className="faint" style={{ fontSize: 12.5, padding: "8px 2px 0" }}>
            Pu kolom per lantai: {r.column.perStorey.map((c) => `${c.name} ${Math.round(c.Pu)} kN (${c.side} mm)`).join(" · ")}
          </div>
        )}
      </div>

      <button type="button" className="minor-toggle" onClick={() => setShowBasis((v) => !v)} aria-expanded={showBasis}>
        <ChevronDown size={14} style={{ transform: showBasis ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
        {showBasis ? "Sembunyikan rumus & acuan" : "Lihat rumus & acuan tiap elemen"}
      </button>

      <div className="col" style={{ gap: 6 }}>
        {r.warnings.map((w) => (
          <div key={w} className="issue warning">
            <TriangleAlert size={15} style={{ flexShrink: 0, marginTop: 1 }} />
            <span>{w}</span>
          </div>
        ))}
      </div>

      <div className="row wrap" style={{ gap: 8 }}>
        <button type="button" className="btn btn-primary" onClick={apply} disabled={!anyDiff}>
          <Wand2 size={16} /> {anyDiff ? "Terapkan ukuran ke RAB" : "Sudah dipakai di RAB"}
        </button>
        <button type="button" className="btn" onClick={() => void download()} disabled={exporting}>
          <Download size={16} /> {exporting ? "Menyiapkan…" : "Unduh laporan untuk ahli struktur (Excel)"}
        </button>
      </div>
      <div className="faint" style={{ fontSize: 12, lineHeight: 1.45 }}>
        Setelah ahli struktur memeriksa, isi ukuran final di Parameter → Struktur. Kebutuhan besi di RAB masih memakai koefisien AHSP
        (perkiraan pra-desain: kolom/balok ±{r.steelKgM3.kolom} kg/m³, pelat ±{r.steelKgM3.pelat} kg/m³).
      </div>
    </div>
  );
}

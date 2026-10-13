"use client";

import { useState } from "react";
import { FileText, X, ScanLine, Check } from "lucide-react";
import type { PdfPageInfo } from "@/lib/pdf";

export interface PdfSelection {
  page: PdfPageInfo;
  name: string;
  level: number;
}

export function PdfImportDialog({
  fileName,
  pages,
  onConfirm,
  onCancel,
}: {
  fileName: string;
  pages: PdfPageInfo[];
  onConfirm: (sel: PdfSelection[]) => void;
  onCancel: () => void;
}) {
  const [picked, setPicked] = useState<Record<number, boolean>>(() =>
    Object.fromEntries(pages.map((p) => [p.index, p.isPlan])),
  );
  const [names, setNames] = useState<Record<number, string>>(() =>
    Object.fromEntries(pages.map((p) => [p.index, p.suggestedName])),
  );
  const chosen = pages.filter((p) => picked[p.index]);

  const confirm = () => {
    // urutkan berdasarkan level dari judul bila ada, selain itu urutan halaman
    const sorted = [...chosen].sort((a, b) => (a.level ?? a.index) - (b.level ?? b.index));
    onConfirm(sorted.map((p, i) => ({ page: p, name: names[p.index]?.trim() || `Lantai ${i + 1}`, level: i })));
  };

  return (
    <div className="backdrop" onClick={onCancel}>
      <div className="sheet card glass col pdf-dialog" style={{ maxWidth: 820, gap: 16 }} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Pilih halaman denah">
        <div className="row justify-between items-center">
          <div className="row items-center" style={{ gap: 8, minWidth: 0 }}>
            <FileText size={20} color="var(--accent)" />
            <h2 className="h2" style={{ fontSize: 20 }}>Pilih halaman denah</h2>
          </div>
          <button type="button" className="btn btn-sm btn-ghost btn-icon" aria-label="Tutup" onClick={onCancel}>
            <X size={16} />
          </button>
        </div>
        <p className="muted" style={{ margin: 0, fontSize: 13.5, lineHeight: 1.5 }}>
          <strong>{fileName}</strong> · {pages.length} halaman. Satu halaman = satu lantai. Halaman tampak, potongan, atau detail
          sebaiknya tidak dipilih.
        </p>

        <div className="pdf-pages">
          {pages.map((p) => {
            const on = !!picked[p.index];
            return (
              <div key={p.index} className="pdf-page" data-on={on}>
                <button
                  type="button"
                  className="pdf-thumb"
                  aria-pressed={on}
                  aria-label={`${on ? "Batalkan" : "Pilih"} halaman ${p.index + 1}`}
                  onClick={() => setPicked((s) => ({ ...s, [p.index]: !on }))}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.thumbDataUrl} alt={`Halaman ${p.index + 1}`} />
                  <span className="pdf-check" aria-hidden="true">
                    {on && <Check size={14} strokeWidth={3} />}
                  </span>
                </button>
                <div className="col" style={{ gap: 6, minWidth: 0 }}>
                  <span className="faint" style={{ fontSize: 12 }}>
                    Hal. {p.index + 1}
                    {p.title ? ` · ${p.title}` : ""}
                  </span>
                  <input
                    className="input input-sm"
                    aria-label={`Nama lantai halaman ${p.index + 1}`}
                    value={names[p.index] ?? ""}
                    disabled={!on}
                    onChange={(e) => setNames((s) => ({ ...s, [p.index]: e.target.value }))}
                  />
                  {p.hint ? (
                    <span className="badge green" style={{ alignSelf: "flex-start" }}>
                      <Check size={11} /> Teks CAD: {p.dims.length} dimensi{p.unit ? ` (${p.unit})` : ""}
                    </span>
                  ) : (
                    <span className="badge orange" style={{ alignSelf: "flex-start" }}>
                      <ScanLine size={11} /> Dibaca seperti foto
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="faint" style={{ fontSize: 12, lineHeight: 1.45 }}>
          PDF hasil CAD: angka dimensi & nama ruang dibaca langsung dari teks PDF lalu diberikan ke AI sebagai acuan pasti. Tiap
          lantai dianalisa satu per satu.
        </div>
        <div className="row justify-end wrap" style={{ gap: 8 }}>
          <button type="button" className="btn btn-ghost" onClick={onCancel}>
            Batal
          </button>
          <button type="button" className="btn btn-primary" disabled={!chosen.length} onClick={confirm}>
            Analisa {chosen.length} lantai
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useRef, useState } from "react";
import { MessageCircle, Printer, FileSpreadsheet, Loader2, ImagePlus, X, CheckCircle2, Download } from "lucide-react";
import type { Company, Project, RabResult } from "@/lib/types";
import { rupiah, terbilangRupiah } from "@/lib/rab";
import { exportRabXlsx } from "@/lib/export/xlsx";
import { fileToDownscaledDataUrl } from "@/lib/image";

/** 08xx / +62xx / 62xx → 62xx (format wa.me). Kosong bila tidak valid. */
export function toWaNumber(phone: string): string {
  const d = phone.replace(/\D/g, "");
  if (!d) return "";
  if (d.startsWith("62")) return d;
  if (d.startsWith("0")) return "62" + d.slice(1);
  if (d.startsWith("8")) return "62" + d;
  return d;
}

export function buildWhatsAppUrl(project: Project, rab: RabResult, company: Company, duration?: { calendarDays: number; weeks: number } | null): string {
  const lines = [
    `*Penawaran Harga — ${project.title}*`,
    project.client.name ? `Kepada Yth. ${project.client.name}` : "",
    "",
    `Luas bangunan: ${rab.grossArea} m²`,
    `Nilai penawaran: *${rupiah(rab.grandTotalRounded)}*`,
    `(${terbilangRupiah(rab.grandTotalRounded)})`,
    `Termasuk O&P ${Math.round(project.params.overheadProfitPct * 100)}%${project.params.includePpn ? " dan PPN" : ", belum termasuk PPN"}.`,
    duration ? `Waktu pelaksanaan: ± ${duration.calendarDays} hari kalender (± ${duration.weeks} minggu).` : "",
    "",
    `No. penawaran: ${project.offerNumber}`,
    `Berlaku ${project.offerValidityDays} hari.`,
    "",
    `Rincian lengkap (PDF) kami lampirkan.`,
    `— ${company.name}${company.phone ? ` · ${company.phone}` : ""}`,
  ].filter((l, i, a) => !(l === "" && a[i - 1] === ""));
  const text = encodeURIComponent(lines.join("\n"));
  const to = toWaNumber(project.client.phone);
  return `https://wa.me/${to}?text=${text}`;
}

export function OfferPanel({
  project,
  rab,
  company,
  onUpdateProject,
  onUpdateCompany,
  duration,
  onExportZandor,
}: {
  project: Project;
  rab: RabResult;
  company: Company;
  onUpdateProject: (patch: Partial<Project>) => void;
  onUpdateCompany: (c: Company) => void;
  duration?: { calendarDays: number; weeks: number } | null;
  onExportZandor?: () => void;
}) {
  const [exporting, setExporting] = useState(false);
  const logoRef = useRef<HTMLInputElement>(null);

  const sendWa = () => {
    window.open(buildWhatsAppUrl(project, rab, company, duration), "_blank", "noopener,noreferrer");
    if (project.status === "draft") onUpdateProject({ status: "dikirim" });
  };

  const exportXlsx = async () => {
    try {
      setExporting(true);
      await exportRabXlsx(project, rab, company);
    } finally {
      setExporting(false);
    }
  };

  const onLogo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    const url = await fileToDownscaledDataUrl(f, 400, 0.92);
    onUpdateCompany({ ...company, logoDataUrl: url });
  };

  return (
    <div className="offer-panel col no-print" style={{ gap: 14 }}>
      <div className="card glass col" style={{ gap: 12 }}>
        <div className="row justify-between items-center wrap" style={{ gap: 8 }}>
          <h3 style={{ margin: 0 }}>Kirim ke owner</h3>
          {project.status !== "draft" && (
            <span className="badge green">
              <CheckCircle2 size={12} />
              {project.status === "deal" ? "Deal" : "Sudah dikirim"}
            </span>
          )}
        </div>
        <button type="button" className="btn btn-primary btn-lg btn-wa" onClick={sendWa}>
          <MessageCircle size={18} />
          Kirim lewat WhatsApp
        </button>
        <div className="btn-pair">
          <button type="button" className="btn btn-lg" onClick={() => window.print()}>
            <Printer size={17} />
            Simpan PDF
          </button>
          <button type="button" className="btn btn-lg" onClick={exportXlsx} disabled={exporting}>
            {exporting ? <Loader2 size={17} className="spin" /> : <FileSpreadsheet size={17} />}
            Excel
          </button>
        </div>
        {onExportZandor && (
          <button type="button" className="btn" onClick={onExportZandor}>
            <Download size={16} />
            Ekspor rencana kerja ke ZanDor
          </button>
        )}
        <div className="faint" style={{ fontSize: 12, lineHeight: 1.45 }}>
          WhatsApp membawa ringkasan nilai penawaran. Lampirkan PDF dari tombol “Simpan PDF” (pilih “Save as PDF” di jendela cetak).
        </div>
      </div>

      <div className="card glass col" style={{ gap: 12 }}>
        <h3 style={{ margin: 0 }}>Data penawaran</h3>
        <div className="grid grid-2" style={{ gap: 10 }}>
          <div className="field">
            <label htmlFor="of-client">Nama owner</label>
            <input
              id="of-client"
              className="input"
              value={project.client.name}
              placeholder="Bp. / Ibu …"
              onChange={(e) => onUpdateProject({ client: { ...project.client, name: e.target.value } })}
            />
          </div>
          <div className="field">
            <label htmlFor="of-phone">No. WhatsApp owner</label>
            <input
              id="of-phone"
              className="input"
              inputMode="tel"
              value={project.client.phone}
              placeholder="08xx-xxxx-xxxx"
              onChange={(e) => onUpdateProject({ client: { ...project.client, phone: e.target.value } })}
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="of-loc">Lokasi proyek</label>
          <input
            id="of-loc"
            className="input"
            value={project.location}
            placeholder="Kota / alamat"
            onChange={(e) => onUpdateProject({ location: e.target.value, client: { ...project.client, address: e.target.value } })}
          />
        </div>
        <div className="field">
          <label htmlFor="of-terms">Termin pembayaran</label>
          <textarea
            id="of-terms"
            className="input"
            rows={3}
            value={project.paymentTerms}
            onChange={(e) => onUpdateProject({ paymentTerms: e.target.value })}
          />
        </div>
        <div className="field" style={{ maxWidth: 200 }}>
          <label htmlFor="of-valid">Masa berlaku (hari)</label>
          <input
            id="of-valid"
            className="input"
            type="number"
            min={1}
            value={project.offerValidityDays}
            onChange={(e) => onUpdateProject({ offerValidityDays: Math.max(1, parseInt(e.target.value, 10) || 1) })}
          />
        </div>
      </div>

      <div className="card glass col" style={{ gap: 12 }}>
        <h3 style={{ margin: 0 }}>Kop perusahaan</h3>
        <div className="row" style={{ gap: 12 }}>
          <button type="button" className="logo-slot" onClick={() => logoRef.current?.click()} aria-label="Pilih logo perusahaan">
            {company.logoDataUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={company.logoDataUrl} alt="Logo perusahaan" />
            ) : (
              <ImagePlus size={20} />
            )}
          </button>
          <div className="col" style={{ gap: 4, minWidth: 0 }}>
            <span style={{ fontWeight: 600, fontSize: 14 }}>Logo</span>
            <span className="faint" style={{ fontSize: 12.5 }}>Tampil di kop surat penawaran.</span>
            {company.logoDataUrl && (
              <button type="button" className="link-btn" onClick={() => onUpdateCompany({ ...company, logoDataUrl: null })}>
                <X size={12} /> Hapus logo
              </button>
            )}
          </div>
          <input ref={logoRef} type="file" accept="image/png,image/jpeg,image/webp" hidden onChange={onLogo} />
        </div>
        <div className="grid grid-2" style={{ gap: 10 }}>
          <div className="field">
            <label htmlFor="co-name">Nama perusahaan</label>
            <input id="co-name" className="input" value={company.name} onChange={(e) => onUpdateCompany({ ...company, name: e.target.value })} />
          </div>
          <div className="field">
            <label htmlFor="co-dir">Penandatangan</label>
            <input id="co-dir" className="input" value={company.director} onChange={(e) => onUpdateCompany({ ...company, director: e.target.value })} />
          </div>
          <div className="field">
            <label htmlFor="co-phone">No. HP kantor</label>
            <input id="co-phone" className="input" inputMode="tel" value={company.phone} onChange={(e) => onUpdateCompany({ ...company, phone: e.target.value })} />
          </div>
          <div className="field">
            <label htmlFor="co-email">Email</label>
            <input id="co-email" className="input" type="email" value={company.email} onChange={(e) => onUpdateCompany({ ...company, email: e.target.value })} />
          </div>
        </div>
        <div className="field">
          <label htmlFor="co-addr">Alamat kantor</label>
          <input id="co-addr" className="input" value={company.address} onChange={(e) => onUpdateCompany({ ...company, address: e.target.value })} />
        </div>
      </div>
    </div>
  );
}

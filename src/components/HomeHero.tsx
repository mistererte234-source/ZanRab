"use client";

import { ChevronRight, Home as HomeIcon, Sparkles, Trash2 } from "lucide-react";
import { UploadPanel } from "./UploadPanel";
import type { Project } from "@/lib/types";

const STEP_NAMES = ["Upload", "Cek", "Parameter", "RAB", "Penawaran"];

function projectStage(p: Project): number {
  if (p.status === "dikirim" || p.status === "deal") return 5;
  if (p.plan) return 3;
  if (p.imageDataUrl) return 2;
  return 1;
}

function timeAgo(ts: number) {
  const m = Math.round((Date.now() - ts) / 60000);
  if (m < 1) return "baru saja";
  if (m < 60) return `${m} menit lalu`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h} jam lalu`;
  const d = Math.round(h / 24);
  return `${d} hari lalu`;
}

export function HomeHero({
  projects,
  totals,
  onFile,
  onDemo,
  onOpen,
  onDelete,
  busy,
}: {
  projects: Project[];
  totals: Record<string, string>;
  onFile: (file: File) => void;
  onDemo: () => void;
  onOpen: (id: string) => void;
  onDelete: (id: string) => void;
  busy: boolean;
}) {
  return (
    <div className="home col fade-up" style={{ gap: 18 }}>
      <section className="home-hero">
        <div className="col" style={{ gap: 10 }}>
          <span className="eyebrow">Proyek baru</span>
          <h1 className="home-title">Hitung RAB dari denah, dalam 5 langkah</h1>
          <p className="muted home-sub">
            Foto denah kertas atau pilih file. AI membaca dinding, pintu, jendela, dan ruang — kamu tinggal cek, atur
            spesifikasi, lalu kirim penawaran ke owner.
          </p>
          <ol className="home-steps" aria-label="Lima langkah">
            {STEP_NAMES.map((s, i) => (
              <li key={s}>
                <span>{i + 1}</span>
                {s}
              </li>
            ))}
          </ol>
        </div>

        <UploadPanel onFile={onFile} busy={busy} />
      </section>

      <button type="button" className="demo-card" onClick={onDemo} disabled={busy}>
        <span className="demo-icon" aria-hidden="true">
          <Sparkles size={18} />
        </span>
        <span className="col" style={{ gap: 2, flex: 1, minWidth: 0, textAlign: "left" }}>
          <span className="eyebrow">Belum punya denah? Coba contoh</span>
          <span style={{ fontWeight: 650, fontSize: 15 }}>Rumah Tinggal Bp. Kamal</span>
          <span className="faint">9 × 8 m · 72 m² · 10 ruang</span>
        </span>
        <ChevronRight size={18} className="muted" />
      </button>

      {projects.length > 0 && (
        <section className="col" style={{ gap: 10 }}>
          <div className="section-label">Proyek terakhir</div>
          <div className="project-list">
            {projects.slice(0, 8).map((p) => {
              const stage = projectStage(p);
              return (
                <div key={p.id} className="project-row">
                  <button type="button" className="project-open" onClick={() => onOpen(p.id)}>
                    <span className="project-icon" aria-hidden="true">
                      <HomeIcon size={18} />
                    </span>
                    <span className="col" style={{ gap: 2, flex: 1, minWidth: 0, textAlign: "left" }}>
                      <span className="project-title">{p.title}</span>
                      <span className="faint">
                        {p.status === "dikirim" ? "Penawaran terkirim" : `Langkah ${stage} dari 5 · ${STEP_NAMES[stage - 1]}`} ·{" "}
                        {timeAgo(p.updatedAt)}
                      </span>
                    </span>
                    {totals[p.id] && <span className="project-total mono">{totals[p.id]}</span>}
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-ghost btn-icon"
                    aria-label={`Hapus ${p.title}`}
                    title="Hapus proyek"
                    onClick={() => {
                      if (window.confirm(`Hapus proyek "${p.title}"? Data di perangkat ini akan hilang.`)) onDelete(p.id);
                    }}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}

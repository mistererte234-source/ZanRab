"use client";

import { useEffect, useState } from "react";
import { Check, Loader2, TriangleAlert, RefreshCw, KeyRound } from "lucide-react";

/**
 * Tahap-tahap ini bersifat indikatif: server memproses gambar dalam satu permintaan,
 * jadi tahap maju berdasarkan waktu, dan tahap terakhir menunggu sampai hasil benar-benar datang.
 */
const STAGES = [
  { label: "Membaca angka dimensi", at: 0 },
  { label: "Mendeteksi dinding", at: 7 },
  { label: "Mencari pintu & jendela", at: 16 },
  { label: "Menghitung luas tiap ruang", at: 28 },
];

export function AnalyzingCard({
  imageUrl,
  startedAt,
  error,
  onRetry,
  onOpenSettings,
}: {
  imageUrl: string | null;
  startedAt: number | null;
  error: string | null;
  onRetry: () => void;
  onOpenSettings: () => void;
}) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (error || !startedAt) return;
    const t = setInterval(() => setNow(Date.now()), 500);
    return () => clearInterval(t);
  }, [error, startedAt]);

  const elapsed = startedAt ? Math.max(0, Math.floor((now - startedAt) / 1000)) : 0;
  let current = 0;
  STAGES.forEach((s, i) => {
    if (elapsed >= s.at) current = i;
  });
  const keyProblem = !!error && /api[_ ]?key|belum diset|401|403/i.test(error);

  return (
    <div className="analyze card glass fade-up">
      <div className={`analyze-preview ${error ? "" : "scan"}`}>
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageUrl} alt="Denah yang sedang dibaca" />
        ) : (
          <div className="analyze-placeholder" />
        )}
      </div>

      <div className="col" style={{ gap: 14, minWidth: 0 }}>
        {error ? (
          <>
            <div className="row" style={{ gap: 10, alignItems: "flex-start" }}>
              <span className="issue-icon tone-red" aria-hidden="true">
                <TriangleAlert size={16} />
              </span>
              <div className="col" style={{ gap: 4, minWidth: 0 }}>
                <strong style={{ fontSize: 17 }}>Denah belum berhasil dibaca</strong>
                <span className="faint" style={{ fontSize: 13.5, lineHeight: 1.45, wordBreak: "break-word" }}>
                  {error}
                </span>
              </div>
            </div>
            <div className="row wrap" style={{ gap: 8 }}>
              {keyProblem && (
                <button type="button" className="btn btn-primary" onClick={onOpenSettings}>
                  <KeyRound size={16} />
                  Atur API Key
                </button>
              )}
              <button type="button" className={keyProblem ? "btn" : "btn btn-primary"} onClick={onRetry}>
                <RefreshCw size={16} />
                Coba lagi
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="col" style={{ gap: 4 }}>
              <strong style={{ fontSize: 20, letterSpacing: "-0.02em" }}>AI sedang membaca denah</strong>
              <span className="faint" style={{ fontSize: 13.5 }}>
                Biarkan halaman ini terbuka. Hasilnya bisa kamu koreksi di langkah berikutnya.
              </span>
            </div>
            <ol className="stage-list">
              {STAGES.map((s, i) => {
                const state = i < current ? "done" : i === current ? "running" : "todo";
                return (
                  <li key={s.label} data-state={state}>
                    <span className="stage-icon" aria-hidden="true">
                      {state === "done" ? <Check size={14} strokeWidth={3} /> : state === "running" ? <Loader2 size={16} className="spin" /> : null}
                    </span>
                    <span className="stage-label">{s.label}</span>
                  </li>
                );
              })}
            </ol>
            <div className="faint mono" style={{ fontSize: 12 }}>
              Berjalan {elapsed} detik
            </div>
          </>
        )}
      </div>
    </div>
  );
}

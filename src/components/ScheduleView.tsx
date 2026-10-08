"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CalendarClock, Users, Wallet, TrendingUp, Zap, Minus, Plus, Download, TriangleAlert, Info, Wand2 } from "lucide-react";
import type { Company, Project, RabResult, ScheduleSettings, SupervisorCounts, TradeId } from "@/lib/types";
import type { PriceDb } from "@/lib/pricing";
import {
  SUPERVISORS,
  TRADES,
  bottleneck,
  computeSchedule,
  recommendCrew,
  scheduleSettingsOf,
  tradeLabel,
  weekReaching,
  workDayToDate,
} from "@/lib/schedule";
import { buildZandorPlan, downloadJson, progressMilestonesFromTerms, zandorFileName } from "@/lib/zandor";
import { rupiah, num } from "@/lib/rab";

const fmtDate = (d: Date) => d.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
const jtShort = (v: number) => (v >= 1_000_000 ? `Rp ${(v / 1_000_000).toLocaleString("id-ID", { maximumFractionDigits: 1 })} jt` : rupiah(v));

function Stepper({ value, onChange, label, min = 0 }: { value: number; onChange: (v: number) => void; label: string; min?: number }) {
  return (
    <div className="num-stepper" role="group" aria-label={label}>
      <button type="button" aria-label={`Kurangi ${label}`} disabled={value <= min} onClick={() => onChange(Math.max(min, value - 1))}>
        <Minus size={15} />
      </button>
      <span className="mono" aria-live="polite">
        {value}
      </span>
      <button type="button" aria-label={`Tambah ${label}`} onClick={() => onChange(Math.min(50, value + 1))}>
        <Plus size={15} />
      </button>
    </div>
  );
}

export function ScheduleView({
  project,
  rab,
  company,
  priceDb,
  onUpdateProject,
}: {
  project: Project;
  rab: RabResult;
  company: Company;
  priceDb: PriceDb;
  onUpdateProject: (patch: Partial<Project>) => void;
}) {
  const settings = scheduleSettingsOf(project);
  const s = useMemo(() => computeSchedule(project, rab, priceDb), [project, rab, priceDb]);
  const bn = useMemo(() => bottleneck(project, rab, priceDb), [project, rab, priceDb]);
  const rec = useMemo(
    () => (settings.targetCalendarDays ? recommendCrew(project, rab, priceDb, settings.targetCalendarDays) : null),
    [project, rab, priceDb, settings.targetCalendarDays],
  );

  const save = (patch: Partial<ScheduleSettings>) => onUpdateProject({ schedule: { ...settings, ...patch } });
  const setCrew = (t: TradeId, v: number) => save({ crew: { ...settings.crew, [t]: v } });
  const setSup = (k: keyof SupervisorCounts, v: number) => save({ supervisors: { ...settings.supervisors, [k]: v } });

  const endDate = s.startDate ? workDayToDate(s.startDate, Math.max(0, s.workDays - 1), s.workDaysPerWeek) : null;
  const termPcts = progressMilestonesFromTerms(project.paymentTerms);
  const milestones = (termPcts.length ? termPcts : [50, 90]).map((p) => ({ p, week: weekReaching(s, p / 100) }));

  const exportZandor = () => downloadJson(zandorFileName(project), buildZandorPlan(project, rab, company, s, settings.productivity));

  return (
    <div className="col schedule" style={{ gap: 16 }}>
      {/* Ringkasan */}
      <div className="sched-stats">
        <div className="card glass stat sched-hero">
          <div className="label row items-center" style={{ gap: 6 }}>
            <CalendarClock size={14} /> Estimasi selesai
          </div>
          <div className="value">± {s.calendarDays} hari</div>
          <div className="faint">
            ≈ {s.weeks} minggu · {s.workDays} hari kerja{s.overridden ? " · diatur manual" : ""}
          </div>
          {endDate && <div className="faint">Selesai ± {fmtDate(endDate)}</div>}
        </div>
        <div className="card glass stat">
          <div className="label row items-center" style={{ gap: 6 }}>
            <Users size={14} /> Tim lapangan
          </div>
          <div className="value">{s.crewTotal} orang</div>
          <div className="faint">termasuk {s.supervisors.mandor} mandor</div>
        </div>
        <div className="card glass stat">
          <div className="label row items-center" style={{ gap: 6 }}>
            <Wallet size={14} /> Upah per minggu
          </div>
          <div className="value">{jtShort(s.wages.weeklyAverage)}</div>
          <div className="faint">rata-rata · puncak {jtShort(s.wages.weeklyPeak)}</div>
        </div>
        <div className="card glass stat">
          <div className="label row items-center" style={{ gap: 6 }}>
            <TrendingUp size={14} /> Progres 50%
          </div>
          <div className="value">Minggu ke-{weekReaching(s, 0.5)}</div>
          <div className="faint">dari bobot biaya (kurva S)</div>
        </div>
      </div>

      {/* Penentu durasi */}
      {s.missingTrades.length > 0 ? (
        <div className="callout tone-warn">
          <TriangleAlert size={18} />
          <div className="col" style={{ gap: 2, flex: 1 }}>
            <strong>Ada pekerjaan tanpa tenaga</strong>
            <span>
              Butuh {s.missingTrades.map(tradeLabel).join(", ")} — sekarang 0 orang. Estimasi menganggap 1 orang.
            </span>
          </div>
        </div>
      ) : (
        !s.overridden &&
        bn.trade && (
          <div className="callout tone-accent">
            <Zap size={18} />
            <div className="col" style={{ gap: 2, flex: 1, minWidth: 0 }}>
              <strong>Penentu durasi: {tradeLabel(bn.trade)} ({s.crew[bn.trade]} orang)</strong>
              <span>Tambah 1 orang → selesai ± {bn.savedDays} hari lebih cepat.</span>
            </div>
            <button type="button" className="btn btn-sm btn-primary" onClick={() => setCrew(bn.trade!, s.crew[bn.trade!] + 1)}>
              <Plus size={14} /> 1 {tradeLabel(bn.trade).split(" ")[0].toLowerCase()}
            </button>
          </div>
        )
      )}

      <div className="sched-grid">
        {/* Tim */}
        <div className="card glass col" style={{ gap: 12 }}>
          <div className="row justify-between items-center">
            <h3 style={{ margin: 0 }}>Tenaga kerja</h3>
            <span className="faint">kebutuhan (orang-hari)</span>
          </div>
          <div className="crew-list">
            {SUPERVISORS.map((x) => (
              <div key={x.id} className="crew-row">
                <div className="col" style={{ gap: 1, minWidth: 0 }}>
                  <span className="crew-name">{x.label}</span>
                  <span className="faint">{rupiah(s.wages.dailyRate[x.id])}/hari · mengawasi</span>
                </div>
                <Stepper label={x.label} value={settings.supervisors[x.id]} onChange={(v) => setSup(x.id, v)} />
              </div>
            ))}
            {TRADES.map((t) => {
              const need = s.ohByTrade[t.id] / Math.max(0.3, settings.productivity || 1);
              const missing = s.missingTrades.includes(t.id);
              return (
                <div key={t.id} className="crew-row" data-missing={missing}>
                  <div className="col" style={{ gap: 1, minWidth: 0 }}>
                    <span className="crew-name">{t.label}</span>
                    <span className="faint">
                      {need > 0 ? `${num(need, 0)} OH` : "tidak dibutuhkan"} · {rupiah(s.wages.dailyRate[t.id])}/hari
                    </span>
                  </div>
                  <Stepper label={t.label} value={settings.crew[t.id]} onChange={(v) => setCrew(t.id, v)} />
                </div>
              );
            })}
          </div>
          <div className="faint" style={{ fontSize: 12, lineHeight: 1.45 }}>
            Upah harian diambil dari database harga. Total upah ± {jtShort(s.wages.total)} (volume pekerjaan × koefisien AHSP + mandor
            selama proyek).
          </div>
        </div>

        {/* Pengaturan */}
        <div className="card glass col" style={{ gap: 14 }}>
          <h3 style={{ margin: 0 }}>Pengaturan jadwal</h3>
          <div className="grid grid-2" style={{ gap: 10 }}>
            <div className="field">
              <label htmlFor="sc-start">Tanggal mulai</label>
              <input
                id="sc-start"
                type="date"
                className="input"
                value={settings.startDate ?? ""}
                onChange={(e) => save({ startDate: e.target.value || null })}
              />
            </div>
            <div className="field">
              <label htmlFor="sc-wd">Hari kerja / minggu</label>
              <select id="sc-wd" className="input" value={settings.workDaysPerWeek} onChange={(e) => save({ workDaysPerWeek: parseInt(e.target.value, 10) })}>
                <option value={5}>5 hari (Senin–Jumat)</option>
                <option value={6}>6 hari (libur Minggu)</option>
                <option value={7}>7 hari</option>
              </select>
            </div>
          </div>
          <div className="field">
            <label htmlFor="sc-prod">Kecepatan tim dibanding AHSP</label>
            <select id="sc-prod" className="input" value={settings.productivity} onChange={(e) => save({ productivity: parseFloat(e.target.value) })}>
              <option value={0.8}>Lebih lambat (×0,8)</option>
              <option value={1}>Sesuai AHSP (×1,0)</option>
              <option value={1.2}>Lebih cepat (×1,2)</option>
              <option value={1.3}>Tim berpengalaman (×1,3)</option>
              <option value={1.5}>Sangat cepat (×1,5)</option>
            </select>
            <span className="faint" style={{ fontSize: 12 }}>Koefisien AHSP cenderung konservatif. Sesuaikan dengan pengalaman tim sendiri.</span>
          </div>

          <div className="target-box">
            <div className="field">
              <label htmlFor="sc-target">Target selesai (hari kalender)</label>
              <input
                id="sc-target"
                type="number"
                min={14}
                className="input"
                placeholder="mis. 120"
                value={settings.targetCalendarDays ?? ""}
                onChange={(e) => save({ targetCalendarDays: e.target.value ? Math.max(1, parseInt(e.target.value, 10)) : null })}
              />
            </div>
            {rec && (
              <div className="col" style={{ gap: 8 }}>
                <div style={{ fontSize: 13.5, lineHeight: 1.45 }}>
                  {rec.reachable ? (
                    <>
                      Butuh <strong>{TRADES.reduce((a, t) => a + rec.crew[t.id], 0)} orang</strong> (+ pengawas) → ± {rec.calendarDays} hari:
                    </>
                  ) : (
                    <>
                      Target terlalu cepat untuk urutan & waktu curing. Paling cepat ± <strong>{rec.calendarDays} hari</strong> dengan:
                    </>
                  )}
                </div>
                <div className="row wrap" style={{ gap: 6 }}>
                  {TRADES.filter((t) => rec.crew[t.id] > 0).map((t) => (
                    <span key={t.id} className="chip">
                      {rec.crew[t.id]} {tradeLabel(t.id).split(" (")[0].toLowerCase()}
                    </span>
                  ))}
                </div>
                <button type="button" className="btn btn-sm btn-primary" style={{ alignSelf: "flex-start" }} onClick={() => save({ crew: rec.crew })}>
                  <Wand2 size={14} /> Pakai rekomendasi
                </button>
              </div>
            )}
          </div>

          <div className="field">
            <label htmlFor="sc-ovr">Ubah durasi manual (hari kalender)</label>
            <input
              id="sc-ovr"
              type="number"
              min={7}
              className="input"
              placeholder={`hitungan: ${s.computedCalendarDays} hari`}
              value={settings.overrideCalendarDays ?? ""}
              onChange={(e) => save({ overrideCalendarDays: e.target.value ? Math.max(1, parseInt(e.target.value, 10)) : null })}
            />
          </div>
        </div>
      </div>

      <Gantt s={s} />
      <SCurve s={s} milestones={milestones} />

      <div className="card glass row wrap items-center" style={{ gap: 12 }}>
        <Info size={18} className="muted" />
        <div className="faint" style={{ flex: "1 1 260px", fontSize: 12.5, lineHeight: 1.5 }}>
          Estimasi kasar: cuaca, keterlambatan material, dan hari libur nasional tidak dihitung. {Math.round(s.ohAssumedShare * 100)}% orang-hari
          memakai produktivitas asumsi (item tanpa analisa AHSP: atap, kusen, listrik, sanitasi, persiapan).
          {s.itemsWithoutLabor.length > 0 && ` Tanpa data tenaga: ${s.itemsWithoutLabor.join(", ")}.`}
        </div>
        <button type="button" className="btn" onClick={exportZandor}>
          <Download size={16} /> Ekspor ke ZanDor
        </button>
      </div>
    </div>
  );
}

function Gantt({ s }: { s: ReturnType<typeof computeSchedule> }) {
  const [hover, setHover] = useState<string | null>(null);
  const total = Math.max(1, s.workDays);
  const weekOf = (wd: number) => Math.max(1, Math.ceil(((wd / total) * s.weeks) || 1));
  const tickEvery = s.weeks > 26 ? 8 : s.weeks > 12 ? 4 : 2;
  const ticks = Array.from({ length: Math.floor(s.weeks / tickEvery) + 1 }, (_, i) => i * tickEvery).filter((w) => w <= s.weeks);
  const dateOf = (wd: number) => (s.startDate ? fmtDate(workDayToDate(s.startDate, wd, s.workDaysPerWeek)) : null);

  return (
    <div className="card glass col" style={{ gap: 12 }}>
      <div className="row justify-between items-center wrap" style={{ gap: 8 }}>
        <h3 style={{ margin: 0 }}>Jadwal pekerjaan</h3>
        <span className="faint">{s.weeks} minggu</span>
      </div>
      <div className="gantt">
        <div className="gantt-axis" aria-hidden="true">
          <span />
          <div className="gantt-track">
            {ticks.map((w) => (
              <span key={w} className="gantt-tick" style={{ left: `${(w / s.weeks) * 100}%` }}>
                {w === 0 ? "M1" : `M${w}`}
              </span>
            ))}
          </div>
        </div>
        {s.sections.map((p) => {
          const left = (p.start / total) * 100;
          const width = Math.max(1.5, (p.days / total) * 100);
          const wStart = weekOf(p.start + 0.01);
          const wEnd = weekOf(p.start + p.days);
          const tip = `${p.code}. ${p.title} — minggu ${wStart}–${wEnd} (${Math.round(p.days)} hari kerja)${
            dateOf(Math.round(p.start)) ? ` · ${dateOf(Math.round(p.start))} – ${dateOf(Math.round(p.start + p.days) - 1)}` : ""
          } · ${rupiah(p.subtotal)}`;
          return (
            <div key={p.code} className="gantt-row">
              <span className="gantt-label">
                <span className="mono faint">{p.code}</span> {p.title.replace(/^PEKERJAAN\s+/i, "").toLowerCase()}
              </span>
              <div className="gantt-track">
                {ticks.map((w) => (
                  <span key={w} className="gantt-grid" style={{ left: `${(w / s.weeks) * 100}%` }} aria-hidden="true" />
                ))}
                <button
                  type="button"
                  className="gantt-bar"
                  data-assumed={p.ohTotal > 0 && p.ohAssumed / p.ohTotal > 0.5}
                  style={{ left: `${left}%`, width: `${width}%` }}
                  aria-label={tip}
                  onMouseEnter={() => setHover(p.code)}
                  onMouseLeave={() => setHover(null)}
                  onFocus={() => setHover(p.code)}
                  onBlur={() => setHover(null)}
                />
                {hover === p.code && (
                  <div className="chart-tip" style={{ left: `${Math.min(70, left)}%` }} role="tooltip">
                    {tip}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="row wrap" style={{ gap: 14, fontSize: 12 }}>
        <span className="row items-center faint" style={{ gap: 6 }}>
          <span className="legend-swatch" /> dihitung dari AHSP
        </span>
        <span className="row items-center faint" style={{ gap: 6 }}>
          <span className="legend-swatch hatched" /> sebagian besar produktivitas asumsi
        </span>
      </div>
    </div>
  );
}

function SCurve({ s, milestones }: { s: ReturnType<typeof computeSchedule>; milestones: { p: number; week: number }[] }) {
  const [hi, setHi] = useState<number | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [W, setW] = useState(640);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(([e]) => setW(Math.max(280, Math.round(e.contentRect.width))));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const H = W < 480 ? 200 : 240;
  const pad = { l: 40, r: 14, t: 14, b: 26 };
  const pts = [0, ...s.weeklyProgress];
  const x = (i: number) => pad.l + (i / Math.max(1, pts.length - 1)) * (W - pad.l - pad.r);
  const y = (v: number) => pad.t + (1 - v) * (H - pad.t - pad.b);
  const line = pts.map((v, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
  const area = `${line} L ${x(pts.length - 1)} ${y(0)} L ${x(0)} ${y(0)} Z`;
  const tickEvery = s.weeks > 26 ? 8 : s.weeks > 12 ? (W < 480 ? 4 : 2) : W < 480 ? 2 : 1;

  const onMove = (e: React.MouseEvent<SVGRectElement>) => {
    const r = (e.currentTarget.ownerSVGElement as SVGSVGElement).getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width) * W;
    const i = Math.round(((px - pad.l) / (W - pad.l - pad.r)) * (pts.length - 1));
    setHi(Math.max(0, Math.min(pts.length - 1, i)));
  };

  return (
    <div className="card glass col" style={{ gap: 10 }}>
      <div className="row justify-between items-center wrap" style={{ gap: 8 }}>
        <h3 style={{ margin: 0 }}>Kurva S — progres rencana</h3>
        <span className="faint">bobot biaya kumulatif per minggu</span>
      </div>
      <div className="scurve-wrap" ref={wrapRef}>
        <svg viewBox={`0 0 ${W} ${H}`} className="scurve" role="img" aria-label={`Kurva S: progres 50% di minggu ${weekReaching(s, 0.5)}, selesai minggu ${s.weeks}`}>
          {[0, 0.25, 0.5, 0.75, 1].map((v) => (
            <g key={v}>
              <line x1={pad.l} x2={W - pad.r} y1={y(v)} y2={y(v)} className="sc-grid" />
              <text x={pad.l - 8} y={y(v) + 4} className="sc-axis" textAnchor="end">
                {v * 100}%
              </text>
            </g>
          ))}
          {pts.map((_, i) =>
            i % tickEvery === 0 ? (
              <text key={i} x={x(i)} y={H - 6} className="sc-axis" textAnchor="middle">
                {i === 0 ? "0" : `M${i}`}
              </text>
            ) : null,
          )}
          <path d={area} className="sc-area" />
          <path d={line} className="sc-line" />
          {milestones.map((m) => (
            <g key={m.p}>
              <line x1={x(m.week)} x2={x(m.week)} y1={y(0)} y2={y(pts[m.week] ?? 1)} className="sc-mile" />
              <circle cx={x(m.week)} cy={y(pts[m.week] ?? 1)} r={5} className="sc-dot" />
              <text
                x={x(m.week) + (x(m.week) > W - 90 ? -8 : 8)}
                y={y(pts[m.week] ?? 1) + 16}
                textAnchor={x(m.week) > W - 90 ? "end" : "start"}
                className="sc-label"
              >
                {m.p}% · M{m.week}
              </text>
            </g>
          ))}
          {hi !== null && (
            <g pointerEvents="none">
              <line x1={x(hi)} x2={x(hi)} y1={pad.t} y2={y(0)} className="sc-cross" />
              <circle cx={x(hi)} cy={y(pts[hi])} r={5} className="sc-dot" />
            </g>
          )}
          <rect x={pad.l} y={pad.t} width={W - pad.l - pad.r} height={H - pad.t - pad.b} fill="transparent" onMouseMove={onMove} onMouseLeave={() => setHi(null)} />
        </svg>
        {hi !== null && (
          <div className="chart-tip" style={{ left: `${(x(hi) / W) * 100}%`, top: 4, transform: "translateX(-50%)" }} role="tooltip">
            Minggu {hi}: {Math.round(pts[hi] * 100)}%
          </div>
        )}
      </div>
      <details className="sc-table">
        <summary>Lihat tabel per minggu</summary>
        <div className="sc-table-grid">
          {s.weeklyProgress.map((v, i) => (
            <span key={i}>
              M{i + 1}: <strong className="mono">{Math.round(v * 100)}%</strong>
            </span>
          ))}
        </div>
      </details>
    </div>
  );
}

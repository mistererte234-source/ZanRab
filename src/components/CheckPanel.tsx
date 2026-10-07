"use client";

import { useMemo, useState } from "react";
import { Check, TriangleAlert, CircleAlert, Info, ChevronDown, Eye } from "lucide-react";
import type { Plan } from "@/lib/types";
import { validatePlan } from "@/lib/geometry";

interface Item {
  key: string;
  level: "error" | "warning" | "info";
  message: string;
  wallId: string | null;
}

export function CheckPanel({
  plan,
  onFocusWall,
}: {
  plan: Plan;
  onFocusWall: (wallId: string) => void;
}) {
  const [reviewed, setReviewed] = useState<Record<string, boolean>>({});
  const [showInfo, setShowInfo] = useState(false);

  const items: Item[] = useMemo(() => {
    const list = validatePlan(plan).map((i, idx) => {
      const m = /Dinding (\S+)/i.exec(i.message) || /dinding (\S+) /i.exec(i.message);
      const wallId = m && plan.walls.some((w) => w.id === m[1]) ? m[1] : null;
      return { key: `${idx}:${i.message}`, level: i.level, message: i.message, wallId };
    });
    const notes = (plan.notes || []).map((n, idx) => ({
      key: `note:${idx}:${n}`,
      level: (/⚠️|tidak sepakat|gagal/i.test(n) ? "warning" : "info") as Item["level"],
      message: n.replace(/^⚠️\s*/, ""),
      wallId: null,
    }));
    return [...list, ...notes];
  }, [plan]);

  const important = items.filter((i) => i.level !== "info");
  const minor = items.filter((i) => i.level === "info");
  const left = important.filter((i) => !reviewed[i.key]).length;

  return (
    <div className="card glass col check-panel" style={{ gap: 12 }}>
      <div className="row justify-between items-center">
        <h3 style={{ margin: 0 }}>Perlu dicek</h3>
        <span className={`badge ${left ? "orange" : "green"}`}>{left ? `${left} tersisa` : "Semua beres"}</span>
      </div>

      {important.length === 0 && (
        <div className="check-ok">
          <Check size={16} />
          Dimensi, dinding, dan bukaan konsisten. Tetap cocokkan sekilas dengan denah asli.
        </div>
      )}

      <div className="col" style={{ gap: 8 }}>
        {important.map((it) => {
          const done = !!reviewed[it.key];
          return (
            <div key={it.key} className="check-item" data-level={it.level} data-done={done}>
              <span className={`issue-icon ${done ? "tone-green" : it.level === "error" ? "tone-red" : "tone-orange"}`} aria-hidden="true">
                {done ? <Check size={15} strokeWidth={3} /> : it.level === "error" ? <CircleAlert size={15} /> : <TriangleAlert size={15} />}
              </span>
              <span className="check-msg">{it.message}</span>
              <span className="row" style={{ gap: 6, flexShrink: 0 }}>
                {it.wallId && !done && (
                  <button type="button" className="btn btn-sm" onClick={() => onFocusWall(it.wallId!)}>
                    <Eye size={14} />
                    Lihat
                  </button>
                )}
                <button
                  type="button"
                  className={`btn btn-sm ${done ? "btn-ghost" : "btn-warn"}`}
                  onClick={() => setReviewed((r) => ({ ...r, [it.key]: !done }))}
                >
                  {done ? "Batal" : "Sudah dicek"}
                </button>
              </span>
            </div>
          );
        })}
      </div>

      {minor.length > 0 && (
        <div className="col" style={{ gap: 6 }}>
          <button type="button" className="minor-toggle" onClick={() => setShowInfo((v) => !v)} aria-expanded={showInfo}>
            <Info size={14} />
            {minor.length} catatan kecil
            <ChevronDown size={14} style={{ transform: showInfo ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
          </button>
          {showInfo && (
            <ul className="minor-list">
              {minor.map((it) => (
                <li key={it.key}>
                  {it.wallId ? (
                    <button type="button" className="link-btn" onClick={() => onFocusWall(it.wallId!)}>
                      {it.message}
                    </button>
                  ) : (
                    it.message
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

"use client";

import { CircleAlert, TriangleAlert, Info, Wand2, ShieldCheck } from "lucide-react";
import type { AuditFix, AuditIssue } from "@/lib/audit";

export function AuditPanel({
  issues,
  title,
  onFix,
  onOpenFloor,
  compact,
}: {
  issues: AuditIssue[];
  title: string;
  onFix: (fix: AuditFix) => void;
  onOpenFloor?: (floorId: string) => void;
  compact?: boolean;
}) {
  const serious = issues.filter((i) => i.level !== "info").length;
  if (!issues.length) {
    if (compact) return null;
    return (
      <div className="card glass audit audit-ok">
        <ShieldCheck size={18} />
        <span>Audit otomatis: jumlah kamar/KM, ukuran bangunan, struktur, dan septic konsisten.</span>
      </div>
    );
  }
  return (
    <div className="card glass col audit" style={{ gap: 10 }}>
      <div className="row justify-between items-center" style={{ gap: 8 }}>
        <h3 style={{ margin: 0 }}>{title}</h3>
        <span className={`badge ${serious ? "red" : "blue"}`}>{serious ? `${serious} perlu diperbaiki` : `${issues.length} catatan`}</span>
      </div>
      {issues.map((it) => (
        <div key={it.id} className="audit-item" data-level={it.level}>
          <span className={`issue-icon ${it.level === "error" ? "tone-red" : it.level === "warning" ? "tone-orange" : "tone-blue"}`} aria-hidden="true">
            {it.level === "error" ? <CircleAlert size={15} /> : it.level === "warning" ? <TriangleAlert size={15} /> : <Info size={15} />}
          </span>
          <div className="col" style={{ gap: 8, minWidth: 0 }}>
            <span className="check-msg">
              {it.floorName && <strong>{it.floorName}: </strong>}
              {it.message}
            </span>
            <div className="row wrap" style={{ gap: 6 }}>
              {it.fix && (
                <button type="button" className="btn btn-sm btn-primary" onClick={() => onFix(it.fix!.action)}>
                  <Wand2 size={14} /> {it.fix.label}
                </button>
              )}
              {it.floorId && onOpenFloor && (
                <button type="button" className="btn btn-sm" onClick={() => onOpenFloor(it.floorId!)}>
                  Buka denah{it.floorName ? ` ${it.floorName}` : ""}
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

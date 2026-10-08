"use client";

import { ChevronRight } from "lucide-react";
import { AnimatedNumber } from "./AnimatedNumber";
import { rupiah } from "@/lib/rab";

export function TotalDock({
  total,
  perM2,
  label,
  actionLabel,
  actionIcon,
  onAction,
  extra,
}: {
  total: number;
  perM2: number;
  label: string;
  actionLabel: string;
  actionIcon?: React.ReactNode;
  onAction: () => void;
  extra?: string | null;
}) {
  return (
    <div className="total-dock no-print" role="region" aria-label="Ringkasan total">
      <div className="col" style={{ gap: 1, minWidth: 0, flex: 1 }}>
        <span className="dock-label">{label}</span>
        <span className="dock-total">
          <AnimatedNumber value={total} format={rupiah} />
        </span>
        <span className="dock-sub mono">
          {rupiah(perM2)} / m²{extra ? ` · ${extra}` : ""}
        </span>
      </div>
      <button type="button" className="btn btn-primary btn-lg dock-action" onClick={onAction}>
        {actionIcon}
        <span>{actionLabel}</span>
        {!actionIcon && <ChevronRight size={18} />}
      </button>
    </div>
  );
}

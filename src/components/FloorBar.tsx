"use client";

import { Plus, Trash2, Loader2, CircleAlert, Check, Clock } from "lucide-react";
import type { Floor } from "@/lib/types";

export function FloorBar({
  floors,
  activeId,
  analyzingId,
  errorId,
  onSelect,
  onAdd,
  onRemove,
}: {
  floors: Floor[];
  activeId: string;
  analyzingId: string | null;
  errorId: string | null;
  onSelect: (id: string) => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
}) {
  const multi = floors.length > 1;
  return (
    <div className="floorbar no-print" role="tablist" aria-label="Lantai">
      {floors.map((f) => {
        const active = f.id === activeId;
        const state =
          analyzingId === f.id ? "busy" : errorId === f.id || (!f.plan && f.analyzeError) ? "error" : f.plan ? "ok" : f.imageDataUrl ? "pending" : "empty";
        return (
          <button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={active}
            className="floor-chip"
            data-active={active}
            onClick={() => onSelect(f.id)}
            title={state === "pending" ? "Gambar sudah ada, belum dianalisa" : state === "error" ? "Analisa gagal — buka untuk coba lagi" : undefined}
          >
            <span className="floor-dot" data-state={state} aria-hidden="true">
              {state === "busy" ? <Loader2 size={12} className="spin" /> : state === "error" ? <CircleAlert size={12} /> : state === "ok" ? <Check size={11} strokeWidth={3} /> : state === "pending" ? <Clock size={11} /> : null}
            </span>
            {f.name}
          </button>
        );
      })}
      <button type="button" className="floor-chip floor-add" onClick={onAdd}>
        <Plus size={14} /> Lantai
      </button>
      {multi && (
        <button
          type="button"
          className="btn btn-sm btn-ghost btn-icon"
          style={{ marginLeft: "auto" }}
          aria-label="Hapus lantai yang dipilih"
          title="Hapus lantai yang dipilih"
          onClick={() => onRemove(activeId)}
        >
          <Trash2 size={15} />
        </button>
      )}
    </div>
  );
}

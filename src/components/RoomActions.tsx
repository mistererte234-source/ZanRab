"use client";

import { Scissors, Trash2, X } from "lucide-react";
import type { Plan, RoomType } from "@/lib/types";
import { polygonArea } from "@/lib/geometry";
import { addCorridorWindow, removeRoom, splitRoom } from "@/lib/planEdit";

/** Nama bawaan per jenis — dipakai saat jenis diganti dan nama lama hanya label generik */
const DEFAULT_NAME: Partial<Record<RoomType, string>> = {
  kamar: "Kamar",
  kamar_mandi: "KM/WC",
  dapur: "Pantry",
  ruang_tamu: "R. Tamu",
  ruang_keluarga: "R. Keluarga",
  musholla: "Musholla",
  teras: "Teras",
  carport: "Carport",
  gudang: "Gudang",
  selasar: "Selasar",
};
const GENERIC = /^(km|wc|km\s*\/\s*wc|kamar mandi|void|vide|pantry|dapur|selasar|lorong|ruang|r\d+)\b[\w\s/.-]{0,6}$/i;

const TYPES: { v: RoomType; l: string }[] = [
  { v: "kamar", l: "Kamar tidur" },
  { v: "kamar_mandi", l: "Kamar mandi / WC" },
  { v: "dapur", l: "Dapur / pantry" },
  { v: "ruang_tamu", l: "Ruang tamu" },
  { v: "ruang_keluarga", l: "Ruang keluarga" },
  { v: "musholla", l: "Musholla" },
  { v: "teras", l: "Teras" },
  { v: "carport", l: "Carport" },
  { v: "gudang", l: "Gudang" },
  { v: "selasar", l: "Selasar / lorong" },
  { v: "lainnya", l: "Lainnya (void, balkon, jemur…)" },
];

export function RoomActions({ plan, roomId, onChange, onClose }: { plan: Plan; roomId: string; onChange: (p: Plan) => void; onClose: () => void }) {
  const room = plan.rooms.find((r) => r.id === roomId);
  if (!room) return null;
  const xs = room.polygon.map((p) => p.x);
  const ys = room.polygon.map((p) => p.y);
  const w = Math.max(...xs) - Math.min(...xs);
  const h = Math.max(...ys) - Math.min(...ys);
  const f = (v: number) => v.toLocaleString("id-ID", { maximumFractionDigits: 2 });
  const patch = (p: Partial<typeof room>) => onChange({ ...plan, rooms: plan.rooms.map((r) => (r.id === roomId ? { ...r, ...p } : r)) });
  return (
    <div className="card glass col room-actions" style={{ gap: 10 }}>
      <div className="row justify-between items-center">
        <h3 style={{ margin: 0 }}>Ruang terpilih</h3>
        <button type="button" className="btn btn-sm btn-ghost btn-icon" aria-label="Tutup" onClick={onClose}>
          <X size={15} />
        </button>
      </div>
      <div className="field">
        <label htmlFor="ra-name">Nama</label>
        <input id="ra-name" className="input" value={room.name} onChange={(e) => patch({ name: e.target.value })} />
      </div>
      <div className="field">
        <label htmlFor="ra-type">Jenis</label>
        <select
          id="ra-type"
          className="input"
          value={room.type}
          onChange={(e) => {
            const type = e.target.value as RoomType;
            const nm = GENERIC.test(room.name.trim()) && DEFAULT_NAME[type] ? DEFAULT_NAME[type]! : room.name;
            patch({ type, name: nm });
          }}
        >
          {TYPES.map((t) => (
            <option key={t.v} value={t.v}>
              {t.l}
            </option>
          ))}
        </select>
      </div>
      <div className="faint mono" style={{ fontSize: 13 }}>
        ±{f(w)} × {f(h)} m · {f(polygonArea(room.polygon))} m²
      </div>
      <div className="row wrap" style={{ gap: 6 }}>
        <button type="button" className="btn btn-sm" onClick={() => onChange(splitRoom(plan, roomId, 2))} title="Tambah dinding partisi di tengah sisi terpanjang">
          <Scissors size={14} /> Bagi jadi 2
        </button>
        <button type="button" className="btn btn-sm" onClick={() => onChange(splitRoom(plan, roomId, 3))}>
          Bagi jadi 3
        </button>
        {room.type === "kamar" && (
          <button type="button" className="btn btn-sm" onClick={() => onChange(addCorridorWindow(plan, roomId))} title="Jendela 60 cm 1 daun di dinding sisi koridor">
            + Jendela koridor
          </button>
        )}
        <button
          type="button"
          className="btn btn-sm btn-ghost"
          onClick={() => {
            onChange(removeRoom(plan, roomId));
            onClose();
          }}
        >
          <Trash2 size={14} /> Hapus ruang
        </button>
      </div>
      <div className="faint" style={{ fontSize: 12, lineHeight: 1.45 }}>
        &quot;Bagi&quot; menambah dinding partisi, memecah luas, dan menambah pintu bilik baru — dipakai untuk blok KM atau kamar yang terbaca
        tergabung.
      </div>
    </div>
  );
}

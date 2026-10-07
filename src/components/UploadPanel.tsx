"use client";

import { useRef, useState } from "react";
import { Camera, ImageUp, LayoutGrid } from "lucide-react";

/** Kartu upload denah: kamera (HP), pilih file, atau seret-lepas (desktop). */
export function UploadPanel({
  onFile,
  busy,
  title = "Upload denah rumah",
  hint = "Pastikan angka ukuran di denah terbaca jelas. JPG, PNG, atau WEBP.",
}: {
  onFile: (file: File) => void;
  busy: boolean;
  title?: string;
  hint?: string;
}) {
  const cameraRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);

  const pick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (f) onFile(f);
  };

  return (
    <div
      className="upload-card"
      data-over={over}
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        const f = e.dataTransfer.files?.[0];
        if (f && f.type.startsWith("image/")) onFile(f);
      }}
    >
      <div className="upload-icon" aria-hidden="true">
        <LayoutGrid size={26} />
      </div>
      <div>
        <div className="upload-title">{title}</div>
        <div className="faint" style={{ marginTop: 4, fontSize: 13.5, lineHeight: 1.45 }}>
          {hint}
        </div>
      </div>
      <div className="upload-actions">
        <button type="button" className="btn btn-primary btn-lg" disabled={busy} onClick={() => cameraRef.current?.click()}>
          <Camera size={18} />
          Foto Denah
        </button>
        <button type="button" className="btn btn-lg" disabled={busy} onClick={() => fileRef.current?.click()}>
          <ImageUp size={18} />
          Pilih File
        </button>
      </div>
      <div className="faint drop-hint">atau seret gambar denah ke sini</div>
      <input ref={cameraRef} type="file" accept="image/*" capture="environment" hidden onChange={pick} />
      <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/webp" hidden onChange={pick} />
    </div>
  );
}

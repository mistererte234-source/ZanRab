/**
 * Perkecil foto denah di browser sebelum dikirim ke AI.
 * Foto kamera HP bisa 4000px+ dan beberapa MB; dalam base64 ukurannya ~1,33x
 * dan bisa melewati batas upload server. 2400px masih cukup untuk membaca angka dimensi.
 */
export async function fileToDownscaledDataUrl(file: File, maxSide = 2400, quality = 0.9): Promise<string> {
  const original = await new Promise<string>((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(String(r.result));
    r.onerror = () => rej(new Error("Gagal membaca file gambar"));
    r.readAsDataURL(file);
  });

  const img = await new Promise<HTMLImageElement>((res, rej) => {
    const el = new Image();
    el.onload = () => res(el);
    el.onerror = () => rej(new Error("Format gambar tidak bisa dibuka. Gunakan JPG, PNG, atau WEBP."));
    el.src = original;
  });

  const scale = Math.min(1, maxSide / Math.max(img.naturalWidth, img.naturalHeight));
  const smallEnough = scale === 1 && file.size < 3_500_000 && /^image\/(png|jpeg|webp)$/.test(file.type);
  if (smallEnough) return original;

  const canvas = document.createElement("canvas");
  canvas.width = Math.round(img.naturalWidth * scale);
  canvas.height = Math.round(img.naturalHeight * scale);
  const ctx = canvas.getContext("2d");
  if (!ctx) return original;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", quality);
}

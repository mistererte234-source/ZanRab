/** Label kamar di teks PDF: K1, K12, KAMAR 1, K.TIDUR 2 … (label bernomor dihitung unik, label tanpa nomor dihitung per kemunculan) */
export function roomLabels(texts: string[]): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  for (const t of texts) {
    const s = t.trim().toUpperCase().replace(/\s+/g, " ");
    if (/MANDI|WC|\bKM\b/.test(s)) continue;
    if (!(/^K ?\d{1,3}$/.test(s) || /^K(AMAR|\.? ?TIDUR)\b/.test(s))) continue;
    const numbered = /\d/.test(s);
    if (numbered && seen.has(s)) continue;
    seen.add(s);
    out.push(s);
  }
  return out;
}
export const roomLabelCount = (texts: string[]) => roomLabels(texts).length;

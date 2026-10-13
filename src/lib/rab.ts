import { ahspUnitPrice, SECTIONS, type PriceDb } from "./pricing";
import { takeoff } from "./takeoff";
import { floorsOf, takeoffBuilding } from "./building";
import type { Project, QuantityItem, RabLine, RabResult, RabSection } from "./types";

export function unitPriceFor(db: PriceDb, project: Project, item: QuantityItem): { price: number; source: RabLine["priceSource"] } {
  if (project.priceOverrides[item.code] != null) return { price: project.priceOverrides[item.code], source: "manual" };
  if (project.customPrices[item.code] != null) return { price: project.customPrices[item.code], source: "manual" };
  if (item.code === "PRS.BONGKAR") return { price: project.params.demolitionLumpSum, source: "manual" };
  const cat = db.catalog.find((c) => c.code === item.code);
  if (!cat) return { price: 0, source: "manual" };
  if (project.priceMode === "ahsp" && cat.ahsp) {
    const p = ahspUnitPrice(db, cat.ahsp);
    if (Number.isFinite(p)) return { price: Math.round(p), source: "ahsp" };
  }
  return { price: cat.borongan, source: "borongan" };
}

export function computeRab(project: Project, db: PriceDb): { rab: RabResult; quantities: QuantityItem[]; ctx: ReturnType<typeof takeoff>["ctx"] } | null {
  const floors = floorsOf(project);
  let items: QuantityItem[];
  let ctx: ReturnType<typeof takeoff>["ctx"];
  let buildingGross: number | null = null;
  if (floors.length > 1) {
    const b = takeoffBuilding(floors, project.params);
    if (!b) return null;
    items = b.items;
    ctx = b.ctx;
    buildingGross = b.grossArea;
  } else {
    const plan = floors[0]?.plan;
    if (!plan) return null;
    ({ items, ctx } = takeoff(plan, project.params));
  }
  const groundPlan = floors.find((x) => x.plan)!.plan!;
  const all = [...items, ...project.customLines.map((c) => ({ ...c, section: c.section || "XII" }))];

  const allLines: RabLine[] = all
    .map((it, order) => {
      const volume = project.volumeOverrides[it.code] ?? it.volume;
      const { price, source } = unitPriceFor(db, project, it);
      return {
        ...it,
        volume,
        formula: project.volumeOverrides[it.code] != null ? `Diubah manual (asli: ${it.volume})` : it.formula,
        unitPrice: price,
        total: Math.round(volume * price),
        priceSource: source,
        order,
      };
    });
  const lines = allLines.filter((l) => !project.excluded.includes(l.code));
  const excludedLines = allLines.filter((l) => project.excluded.includes(l.code));

  const sections: RabSection[] = Object.entries(SECTIONS)
    .map(([code, title]) => {
      const ls = lines.filter((l) => l.section === code);
      return { code, title, lines: ls, subtotal: ls.reduce((a, l) => a + l.total, 0) };
    })
    .filter((s) => s.lines.length > 0);

  const P = project.params;
  const directCost = sections.reduce((a, s) => a + s.subtotal, 0);
  const overheadProfit = Math.round(directCost * P.overheadProfitPct);
  const beforeTax = directCost + overheadProfit;
  const ppn = P.includePpn ? Math.round(beforeTax * P.ppnPct) : 0;
  const grandTotal = beforeTax + ppn;
  const r = P.roundTo > 0 ? P.roundTo : 1;
  const grandTotalRounded = Math.ceil(grandTotal / r) * r;
  const floorCount = Math.max(1, P.floorCount || 1);
  const baseArea = groundPlan.outline.width * groundPlan.outline.depth;
  const grossArea = P.grossAreaOverride ?? buildingGross ?? baseArea * floorCount;

  return {
    rab: {
      sections,
      excludedLines,
      directCost,
      overheadProfit,
      beforeTax,
      ppn,
      grandTotal,
      grandTotalRounded,
      grossArea,
      costPerM2: grossArea > 0 ? grandTotalRounded / grossArea : 0,
    },
    quantities: items,
    ctx,
  };
}

export const rupiah = (v: number) =>
  "Rp " + Math.round(v).toLocaleString("id-ID", { maximumFractionDigits: 0 });

export const num = (v: number, d = 2) => v.toLocaleString("id-ID", { maximumFractionDigits: d, minimumFractionDigits: 0 });

const SATUAN = ["", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh", "sebelas"];

/** Terbilang Rupiah (untuk surat penawaran) */
export function terbilang(n: number): string {
  n = Math.floor(Math.abs(n));
  if (n < 12) return SATUAN[n];
  if (n < 20) return terbilang(n - 10) + " belas";
  if (n < 100) return terbilang(Math.floor(n / 10)) + " puluh" + sp(terbilang(n % 10));
  if (n < 200) return "seratus" + sp(terbilang(n - 100));
  if (n < 1000) return terbilang(Math.floor(n / 100)) + " ratus" + sp(terbilang(n % 100));
  if (n < 2000) return "seribu" + sp(terbilang(n - 1000));
  if (n < 1e6) return terbilang(Math.floor(n / 1000)) + " ribu" + sp(terbilang(n % 1000));
  if (n < 1e9) return terbilang(Math.floor(n / 1e6)) + " juta" + sp(terbilang(n % 1e6));
  if (n < 1e12) return terbilang(Math.floor(n / 1e9)) + " miliar" + sp(terbilang(n % 1e9));
  return terbilang(Math.floor(n / 1e12)) + " triliun" + sp(terbilang(n % 1e12));
}
const sp = (s: string) => (s ? " " + s : "");

export function terbilangRupiah(n: number) {
  const t = terbilang(n).trim();
  return t.charAt(0).toUpperCase() + t.slice(1) + " rupiah";
}

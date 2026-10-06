import type { RabResult } from "./types";
import { defaultPriceDb, type PriceDb, type AhspAnalysis, type Resource, type CatalogItem } from "./pricing";

export interface MaterialRequirement {
  code: string;
  name: string;
  category: "semen" | "pasir_agregat" | "besi_baja" | "bata" | "finishing" | "lainnya";
  unit: string;
  quantity: number;
  commercialPackage?: string; // misal: "125 Sak (50kg)" atau "3 Dump Truck" atau "85 Batang (12m)"
  estimatedCost: number;
}

export interface BomSummary {
  items: MaterialRequirement[];
  totalMaterialCost: number;
  highlightPackages: {
    semenBags50kg: number;
    pasirTrucks: number; // asumsi 1 truk = 6 m3
    splitTrucks: number; // asumsi 1 truk = 6 m3
    besiRods: number; // asumsi 1 batang = 12m, rata-rata ~10 kg/btg
    bataCount: number;
    bataType: string;
  };
}

/**
 * Ekstraksi rekursif komponen bahan (Resource) dari AHSP item
 */
function extractMaterialRequirements(
  db: PriceDb,
  analysisCode: string,
  multiplier: number,
  acc: Map<string, number>
) {
  const an = db.analyses.find((a: AhspAnalysis) => a.code === analysisCode);
  if (!an) return;

  for (const comp of an.components) {
    const res = db.resources.find((r: Resource) => r.code === comp.ref);
    if (res) {
      if (res.kind === "bahan") {
        const cur = acc.get(res.code) || 0;
        acc.set(res.code, cur + comp.coef * multiplier);
      }
    } else {
      // Sub-analisa rekursif (misal: A.K225, A.BESI, A.BEKISTING)
      extractMaterialRequirements(db, comp.ref, multiplier * comp.coef, acc);
    }
  }
}

/**
 * Menghitung Bill of Materials (BOM) logistik belanja proyek
 */
export function calculateBom(
  rab: RabResult,
  priceDb: PriceDb = defaultPriceDb()
): BomSummary {
  const resourceQuantities = new Map<string, number>();

  for (const section of rab.sections) {
    for (const line of section.lines) {
      // Cari analisa AHSP terkait item catalog
      const cat = priceDb.catalog.find((c: CatalogItem) => c.code === line.code);
      const ahspCode = cat?.ahsp;

      if (ahspCode) {
        extractMaterialRequirements(priceDb, ahspCode, line.volume, resourceQuantities);
      }
    }
  }

  const items: MaterialRequirement[] = [];
  let totalMaterialCost = 0;

  for (const [resCode, qty] of resourceQuantities.entries()) {
    if (qty <= 0) continue;
    const res = priceDb.resources.find((r: Resource) => r.code === resCode);
    if (!res) continue;

    let category: MaterialRequirement["category"] = "lainnya";
    let commercialPackage: string | undefined = undefined;

    if (resCode === "M.PC") {
      category = "semen";
      const sak = Math.ceil(qty / 50);
      commercialPackage = `${sak} Sak (@ 50 kg)`;
    } else if (resCode === "M.PP" || resCode === "M.PB") {
      category = "pasir_agregat";
      const volM3 = resCode === "M.PB" ? qty / 1400 : qty; // konversi kg ke m3 (~1.400 kg/m3)
      const truck = (volM3 / 6).toFixed(1);
      commercialPackage = `± ${truck} Dump Truck (6 m³) / ${Math.ceil(volM3)} m³`;
    } else if (resCode === "M.KR") {
      category = "pasir_agregat";
      const volM3 = qty / 1350; // konversi split kg ke m3 (~1.350 kg/m3)
      const truck = (volM3 / 6).toFixed(1);
      commercialPackage = `± ${truck} Dump Truck (6 m³) / ${Math.ceil(volM3)} m³`;
    } else if (resCode === "M.BESI") {
      category = "besi_baja";
      // Rata-rata campuran D10 / D12 / D13 berat ~8.5-12 kg per batang 12m (ambil rata-rata ~10 kg/btg)
      const rods = Math.ceil(qty / 10.5);
      commercialPackage = `± ${rods} Batang (12 meter)`;
    } else if (resCode.includes("BATA")) {
      category = "bata";
      commercialPackage = `${Math.ceil(qty).toLocaleString("id-ID")} ${res.unit}`;
    } else if (resCode.includes("GRANIT") || resCode.includes("KRMK")) {
      category = "finishing";
      // Dus keramik
      const dus = Math.ceil(qty / (resCode.includes("60") ? 4 : 11));
      commercialPackage = `± ${dus} Dus`;
    } else if (resCode.includes("CAT") || resCode.includes("PLAMIR")) {
      category = "finishing";
      const pail = Math.ceil(qty / 20);
      commercialPackage = `± ${pail} Pail (@ 20 kg)`;
    }

    const cost = qty * res.price;
    totalMaterialCost += cost;

    items.push({
      code: res.code,
      name: res.name,
      category,
      unit: res.unit,
      quantity: Math.round(qty * 100) / 100,
      commercialPackage,
      estimatedCost: cost,
    });
  }

  // Urutkan berdasarkan prioritas logistik: semen, bata, besi, pasir, finishing, lainnya
  const categoryOrder: Record<MaterialRequirement["category"], number> = {
    semen: 1,
    bata: 2,
    besi_baja: 3,
    pasir_agregat: 4,
    finishing: 5,
    lainnya: 6,
  };
  items.sort((a, b) => categoryOrder[a.category] - categoryOrder[b.category] || b.estimatedCost - a.estimatedCost);

  // Quick Logistics Highlights
  const totalPc = resourceQuantities.get("M.PC") || 0;
  const totalBesi = resourceQuantities.get("M.BESI") || 0;
  const totalPp = resourceQuantities.get("M.PP") || 0;
  const totalPb = (resourceQuantities.get("M.PB") || 0) / 1400;
  const totalKr = (resourceQuantities.get("M.KR") || 0) / 1350;

  const bataRingan = resourceQuantities.get("M.BATARINGAN") || 0;
  const bataMerah = resourceQuantities.get("M.BATAMERAH") || 0;
  const batako = resourceQuantities.get("M.BATAKO") || 0;

  let bataCount = Math.ceil(bataRingan);
  let bataType = "Bata Ringan Hebel (bh)";
  if (bataMerah > 0) {
    bataCount = Math.ceil(bataMerah);
    bataType = "Bata Merah (bh)";
  } else if (batako > 0) {
    bataCount = Math.ceil(batako);
    bataType = "Batako Press (bh)";
  }

  return {
    items,
    totalMaterialCost,
    highlightPackages: {
      semenBags50kg: Math.ceil(totalPc / 50),
      pasirTrucks: Math.round(((totalPp + totalPb) / 6) * 10) / 10,
      splitTrucks: Math.round((totalKr / 6) * 10) / 10,
      besiRods: Math.ceil(totalBesi / 10.5),
      bataCount,
      bataType,
    },
  };
}

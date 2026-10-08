"use client";

import { create } from "zustand";
import { get as idbGet, set as idbSet } from "idb-keyval";
import { DEFAULT_PARAMS, samplePlan } from "./defaults";
import { defaultPriceDb, mergePriceDb, type PriceDb } from "./pricing";
import type { Company, Project } from "./types";
import type { ProviderId } from "./ai/providers";
import { uid } from "./geometry";

export interface Settings {
  provider: ProviderId;
  geminiKey: string;
  claudeKey: string;
}

interface State {
  ready: boolean;
  projects: Record<string, Project>;
  priceDb: PriceDb;
  company: Company;
  settings: Settings;
  hydrate: () => Promise<void>;
  createProject: (partial?: Partial<Project>) => string;
  createDemoProject: () => Promise<string>;
  updateProject: (id: string, patch: Partial<Project> | ((p: Project) => Partial<Project>)) => void;
  deleteProject: (id: string) => void;
  duplicateProject: (id: string) => string;
  setPriceDb: (db: PriceDb) => void;
  setCompany: (c: Company) => void;
  setSettings: (s: Partial<Settings>) => void;
}

const DEFAULT_COMPANY: Company = {
  name: "CV. Nama Kontraktor",
  address: "Alamat kantor",
  phone: "08xx-xxxx-xxxx",
  email: "",
  director: "Nama Direktur",
  logoDataUrl: null,
};

const DEFAULT_SETTINGS: Settings = { provider: "gemini", geminiKey: "", claudeKey: "" };

export function newProject(partial: Partial<Project> = {}): Project {
  const now = Date.now();
  const d = new Date(now);
  return {
    id: uid("prj"),
    title: "Proyek Baru",
    location: "",
    createdAt: now,
    updatedAt: now,
    client: { name: "", address: "", phone: "" },
    imageDataUrl: null,
    plan: null,
    analyzeMeta: null,
    params: structuredClone(DEFAULT_PARAMS),
    priceMode: "borongan",
    priceOverrides: {},
    volumeOverrides: {},
    customLines: [],
    customPrices: {},
    excluded: [],
    offerNumber: `${String(now).slice(-4)}/PNW/${toRoman(d.getMonth() + 1)}/${d.getFullYear()}`,
    offerValidityDays: 14,
    paymentTerms: "DP 30% saat tanda tangan kontrak, termin 30% progres 50%, 30% progres 90%, 10% setelah serah terima.",
    status: "draft",
    ...partial,
  };
}

function toRoman(n: number) {
  return ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"][n - 1];
}

let persistTimer: ReturnType<typeof setTimeout> | null = null;
function persist(s: State) {
  if (persistTimer) clearTimeout(persistTimer);
  persistTimer = setTimeout(() => {
    void idbSet("zanrab:v1", { projects: s.projects, priceDb: s.priceDb, company: s.company, settings: s.settings });
  }, 300);
}

async function fileToDataUrl(url: string): Promise<string> {
  const blob = await (await fetch(url)).blob();
  return new Promise((res) => {
    const r = new FileReader();
    r.onload = () => res(String(r.result));
    r.readAsDataURL(blob);
  });
}

export const useStore = create<State>((set, get) => ({
  ready: false,
  projects: {},
  priceDb: defaultPriceDb(),
  company: DEFAULT_COMPANY,
  settings: DEFAULT_SETTINGS,

  hydrate: async () => {
    if (get().ready) return;
    const saved = (await idbGet("zanrab:v1")) as Partial<State> | undefined;
    set({
      ready: true,
      projects: saved?.projects ?? {},
      priceDb: mergePriceDb(saved?.priceDb),
      company: saved?.company ?? DEFAULT_COMPANY,
      settings: { ...DEFAULT_SETTINGS, ...(saved?.settings ?? {}) },
    });
  },

  createProject: (partial) => {
    const p = newProject(partial);
    set((s) => ({ projects: { ...s.projects, [p.id]: p } }));
    persist(get());
    return p.id;
  },

  createDemoProject: async () => {
    const img = await fileToDataUrl("/samples/denah-kamal.jpeg");
    const p = newProject({
      title: "Rumah Tinggal Bp. Kamal",
      location: "Talon",
      client: { name: "Bp. Kamal", address: "Talon", phone: "" },
      imageDataUrl: img,
      plan: samplePlan(),
      analyzeMeta: { provider: "Demo", model: "fixture terverifikasi", durationMs: 0 },
      params: { ...structuredClone(DEFAULT_PARAMS), wallHeight: 3.51, fillHeight: 0.7, demolitionLumpSum: 5_000_000, kitchenCounterLength: 2.5 },
    });
    set((s) => ({ projects: { ...s.projects, [p.id]: p } }));
    persist(get());
    return p.id;
  },

  updateProject: (id, patch) => {
    set((s) => {
      const cur = s.projects[id];
      if (!cur) return s;
      const delta = typeof patch === "function" ? patch(cur) : patch;
      return { projects: { ...s.projects, [id]: { ...cur, ...delta, updatedAt: Date.now() } } };
    });
    persist(get());
  },

  deleteProject: (id) => {
    set((s) => {
      const next = { ...s.projects };
      delete next[id];
      return { projects: next };
    });
    persist(get());
  },

  duplicateProject: (id) => {
    const src = get().projects[id];
    const p = newProject({ ...structuredClone(src), id: uid("prj"), title: `${src.title} (salinan)`, status: "draft" });
    set((s) => ({ projects: { ...s.projects, [p.id]: p } }));
    persist(get());
    return p.id;
  },

  setPriceDb: (db) => {
    set({ priceDb: db });
    persist(get());
  },
  setCompany: (c) => {
    set({ company: c });
    persist(get());
  },
  setSettings: (s) => {
    set((st) => ({ settings: { ...st.settings, ...s } }));
    persist(get());
  },
}));

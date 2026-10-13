"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useStore } from "@/lib/store";
import { PlanCanvas } from "@/components/PlanCanvas";
import { ParamsEditor } from "@/components/ParamsEditor";
import { RabView } from "@/components/RabView";
import { SplashScreen } from "@/components/SplashScreen";
import { Stepper, type StepDef, type StepId } from "@/components/Stepper";
import { HomeHero } from "@/components/HomeHero";
import { UploadPanel } from "@/components/UploadPanel";
import { AnalyzingCard } from "@/components/AnalyzingCard";
import { CheckPanel } from "@/components/CheckPanel";
import { TotalDock } from "@/components/TotalDock";
import { OfferPanel, buildWhatsAppUrl } from "@/components/OfferPanel";
import { ScheduleView } from "@/components/ScheduleView";
import { StructureView } from "@/components/StructureView";
import { computeSchedule, scheduleSettingsOf, workDayToDate } from "@/lib/schedule";
import { buildZandorPlan, downloadJson, zandorFileName } from "@/lib/zandor";
import { anyPlan, floorsOf } from "@/lib/building";
import { FloorBar } from "@/components/FloorBar";
import { AuditPanel } from "@/components/AuditPanel";
import { RoomActions } from "@/components/RoomActions";
import { auditProject, type AuditFix } from "@/lib/audit";
import { scalePlan, splitRoom } from "@/lib/planEdit";
import { computeStructure, structureToParams } from "@/lib/structure";
import { mepOf } from "@/lib/defaults";
import { PdfImportDialog, type PdfSelection } from "@/components/PdfImportDialog";
import type { PdfPageInfo } from "@/lib/pdf";
import { uid } from "@/lib/geometry";
import { sanitizePlan } from "@/lib/ai/providers";
import type { Floor, Plan, Project } from "@/lib/types";
import { computeRab, rupiah } from "@/lib/rab";
import { fileToDownscaledDataUrl } from "@/lib/image";
import { DEFAULT_PARAMS } from "@/lib/defaults";
import {
  Sparkles,
  Settings,
  Plus,
  RefreshCw,
  KeyRound,
  ExternalLink,
  X,
  Check,
  MessageCircle,
  ChevronLeft,
  FileJson,
  Loader2,
} from "lucide-react";

type Tab = "denah" | "params" | "rab" | "offer";

const jt = (v: number) => {
  if (v >= 1_000_000_000) return `Rp ${(v / 1_000_000_000).toLocaleString("id-ID", { maximumFractionDigits: 2 })} M`;
  if (v >= 1_000_000) return `Rp ${(v / 1_000_000).toLocaleString("id-ID", { maximumFractionDigits: 1 })} jt`;
  return rupiah(v);
};

export default function Home() {
  const {
    ready,
    hydrate,
    projects,
    priceDb,
    company,
    settings,
    createProject,
    createDemoProject,
    updateProject,
    deleteProject,
    setSettings,
    setCompany,
  } = useStore();

  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("denah");
  const [showHome, setShowHome] = useState(false);
  const [showUploader, setShowUploader] = useState(false);
  const [visited, setVisited] = useState<Record<string, boolean>>({});
  const [selectedEntityId, setSelectedEntityId] = useState<string | null>(null);
  const [selectedEntityType, setSelectedEntityType] = useState<"wall" | "opening" | "room" | null>(null);

  const [analyzing, setAnalyzing] = useState<{ projectId: string; floorId: string; label: string | null } | null>(null);
  const analyzingId = analyzing?.projectId ?? null;
  const [analyzeStartedAt, setAnalyzeStartedAt] = useState<number | null>(null);
  const [analyzeError, setAnalyzeError] = useState<{ projectId: string; floorId: string; message: string } | null>(null);
  const [activeFloorId, setActiveFloorId] = useState<string | null>(null);
  const [pdfDialog, setPdfDialog] = useState<{ fileName: string; pages: PdfPageInfo[]; targetId?: string } | null>(null);
  const [pdfLoading, setPdfLoading] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newClientName, setNewClientName] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newFloorCount, setNewFloorCount] = useState(1);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const projectList = useMemo(() => Object.values(projects).sort((a, b) => b.updatedAt - a.updatedAt), [projects]);
  const currentProject = activeProjectId ? projects[activeProjectId] ?? null : null;

  // Proyek terakhir dibuka otomatis saat aplikasi dimuat
  const didAutoOpen = useRef(false);
  useEffect(() => {
    if (!ready || didAutoOpen.current) return;
    didAutoOpen.current = true;
    if (projectList.length > 0) setActiveProjectId(projectList[0].id);
  }, [ready, projectList]);

  const rabData = useMemo(() => (currentProject ? computeRab(currentProject, priceDb) : null), [currentProject, priceDb]);
  const schedule = useMemo(
    () => (currentProject && rabData ? computeSchedule(currentProject, rabData.rab, priceDb) : null),
    [currentProject, rabData, priceDb],
  );
  const duration = useMemo(() => {
    if (!schedule) return null;
    const end = schedule.startDate ? workDayToDate(schedule.startDate, Math.max(0, schedule.workDays - 1), schedule.workDaysPerWeek) : null;
    return {
      calendarDays: schedule.calendarDays,
      weeks: schedule.weeks,
      endDateText: end ? end.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : null,
    };
  }, [schedule]);

  const totals = useMemo(() => {
    const out: Record<string, string> = {};
    for (const p of projectList) {
      if (!anyPlan(p)) continue;
      const r = computeRab(p, priceDb);
      if (r) out[p.id] = jt(r.rab.grandTotalRounded);
    }
    return out;
  }, [projectList, priceDb]);

  // Penanda "Tersimpan" setiap kali proyek berubah (disimpan otomatis ke perangkat ini)
  const lastUpdated = useRef<number | null>(null);
  useEffect(() => {
    const u = currentProject?.updatedAt ?? null;
    if (lastUpdated.current !== null && u !== null && u !== lastUpdated.current) {
      setSaved(true);
      const t = setTimeout(() => setSaved(false), 1600);
      lastUpdated.current = u;
      return () => clearTimeout(t);
    }
    lastUpdated.current = u;
  }, [currentProject?.updatedAt]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(t);
  }, [toast]);

  const goTab = (t: Tab) => {
    setActiveTab(t);
    setVisited((v) => ({ ...v, [t]: true }));
    if (t !== "denah") setShowUploader(false);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openProject = (id: string) => {
    setActiveProjectId(id);
    setActiveFloorId(null);
    setShowHome(false);
    setShowUploader(false);
    setSelectedEntityId(null);
    setVisited({});
    setActiveTab("denah");
  };

  // ---------------------------------------------------------------------------
  // AI analysis
  // ---------------------------------------------------------------------------
  /** Perbarui satu lantai (proyek lama tanpa `floors` = lantai tunggal di field plan/imageDataUrl) */
  const updateFloor = (projectId: string, floorId: string, patch: Partial<Floor>) =>
    updateProject(projectId, (p) => {
      if (p.floors?.length) return { floors: p.floors.map((f) => (f.id === floorId ? { ...f, ...patch } : f)) };
      const out: Partial<Project> = {};
      if ("plan" in patch) out.plan = patch.plan ?? null;
      if ("imageDataUrl" in patch) out.imageDataUrl = patch.imageDataUrl ?? null;
      if ("analyzeMeta" in patch) out.analyzeMeta = patch.analyzeMeta ?? null;
      return out;
    });

  /** Galat sementara (kuota/beban server AI) layak dicoba ulang otomatis sekali */
  const isTransient = (msg: string) => /\b(429|500|502|503|504)\b|overload|unavailable|rate|quota|RESOURCE_EXHAUSTED|timeout|timed out|Failed to fetch|NetworkError|coba lagi sebentar/i.test(msg);

  const requestPlan = async (dataUrl: string, hint?: string | null) => {
    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(settings.geminiKey ? { "x-gemini-key": settings.geminiKey } : {}),
        ...(settings.claudeKey ? { "x-anthropic-key": settings.claudeKey } : {}),
      },
      body: JSON.stringify({ image: dataUrl, provider: settings.provider, hint: hint ?? null }),
    });
    let data: { error?: string; plan?: unknown; meta?: unknown } = {};
    try {
      data = await res.json();
    } catch {
      throw new Error(res.status === 413 ? "Gambar terlalu besar untuk server." : `Server membalas ${res.status}. Coba lagi sebentar.`);
    }
    if (!res.ok || !data.plan) throw new Error(data.error || "Gagal memproses gambar dengan AI Vision");
    return data as { plan: Plan; meta: unknown };
  };

  const analyze = async (projectId: string, floorId: string, dataUrl: string, hint?: string | null, label?: string | null): Promise<boolean> => {
    setAnalyzing({ projectId, floorId, label: label ?? null });
    setAnalyzeStartedAt(Date.now());
    setAnalyzeError(null);
    try {
      let data: { plan: Plan; meta: unknown };
      try {
        data = await requestPlan(dataUrl, hint);
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        if (!isTransient(msg)) throw e;
        // tunggu sebentar lalu coba sekali lagi (mis. batas permintaan per menit API AI)
        setAnalyzing({ projectId, floorId, label: `${label ? `${label} — ` : ""}server AI sibuk, mencoba ulang…` });
        await new Promise((r) => setTimeout(r, 12000));
        setAnalyzeStartedAt(Date.now());
        data = await requestPlan(dataUrl, hint);
      }
      const plan = data.plan;
      updateFloor(projectId, floorId, { plan, analyzeMeta: data.meta as Floor["analyzeMeta"], analyzeError: undefined });
      setToast(`${label ? `${label} — ` : ""}denah terbaca: ${plan.walls.length} dinding, ${plan.openings.length} bukaan, ${plan.rooms.length} ruang`);
      setShowUploader(false);
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setAnalyzeError({ projectId, floorId, message });
      updateFloor(projectId, floorId, { analyzeError: message.slice(0, 600) });
      return false;
    } finally {
      setAnalyzing(null);
    }
  };

  /** Analisa berurutan; satu lantai gagal tidak menghentikan lantai lain */
  const analyzeFloors = async (projectId: string, list: Floor[], total: number) => {
    const failed: string[] = [];
    for (let i = 0; i < list.length; i++) {
      const f = list[i];
      if (!f.imageDataUrl) continue;
      setActiveFloorId(f.id);
      const ok = await analyze(projectId, f.id, f.imageDataUrl, f.hint, total > 1 ? `${f.name} (${i + 1}/${list.length})` : null);
      if (!ok) failed.push(f.name);
    }
    if (list.length > 1) {
      const done = list.length - failed.length;
      setToast(
        failed.length
          ? `${done} dari ${list.length} lantai terbaca. Gagal: ${failed.join(", ")} — buka lantainya lalu klik "Analisa lantai ini".`
          : `Semua ${list.length} lantai terbaca.`,
      );
      const firstFailed = list.find((f) => failed.includes(f.name));
      setActiveFloorId((firstFailed ?? list[0]).id);
    }
  };

  const newProjectTitle = (fileName?: string) =>
    fileName
      ? fileName.replace(/\.[a-z0-9]+$/i, "").replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim().slice(0, 80)
      : `Proyek ${new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}`;

  const handleFile = async (file: File, targetId?: string) => {
    const isPdf = file.type === "application/pdf" || /\.pdf$/i.test(file.name);
    if (isPdf) {
      try {
        setPdfLoading("Membaca PDF…");
        const { readPdf } = await import("@/lib/pdf");
        const pages = await readPdf(file, (d, t) => setPdfLoading(`Membaca halaman ${d} dari ${t}…`));
        if (!pages.length) throw new Error("PDF tidak berisi halaman");
        setPdfDialog({ fileName: file.name, pages, targetId });
      } catch (e) {
        setToast(e instanceof Error ? `PDF gagal dibaca: ${e.message}` : "PDF gagal dibaca");
      } finally {
        setPdfLoading(null);
      }
      return;
    }
    let dataUrl: string;
    try {
      dataUrl = await fileToDownscaledDataUrl(file);
    } catch (e) {
      setToast(e instanceof Error ? e.message : "Gagal membaca gambar");
      return;
    }
    const id = targetId ?? createProject({ title: newProjectTitle() });
    const proj = useStore.getState().projects[id];
    const floor = proj ? (floorsOf(proj).find((f) => f.id === activeFloorId) ?? floorsOf(proj)[0]) : null;
    const floorId = floor?.id ?? "lt1";
    setActiveProjectId(id);
    setShowHome(false);
    setActiveTab("denah");
    updateFloor(id, floorId, { imageDataUrl: dataUrl, hint: undefined });
    void analyze(id, floorId, dataUrl, null, (proj?.floors?.length ?? 0) > 1 ? floor?.name : null);
  };

  const confirmPdf = async (sel: PdfSelection[]) => {
    const dlg = pdfDialog;
    setPdfDialog(null);
    if (!dlg || !sel.length) return;
    const floors: Floor[] = sel.map((s, i) => ({
      id: uid("lt"),
      name: s.name,
      level: i,
      plan: null,
      imageDataUrl: s.page.imageDataUrl,
      analyzeMeta: null,
      hint: s.page.hint ?? undefined,
    }));
    let id = dlg.targetId;
    if (id) {
      if (anyPlan(useStore.getState().projects[id]) && !window.confirm("Denah proyek ini akan diganti dengan halaman PDF yang dipilih. Lanjutkan?")) return;
      updateProject(id, { floors, plan: null, imageDataUrl: floors[0].imageDataUrl });
    } else {
      id = createProject({ title: newProjectTitle(dlg.fileName), floors, imageDataUrl: floors[0].imageDataUrl });
    }
    setActiveProjectId(id);
    setActiveFloorId(floors[0].id);
    setShowHome(false);
    setActiveTab("denah");
    await analyzeFloors(id, floors, floors.length);
  };

  const analyzePending = () => {
    if (!currentProject || analyzing) return;
    const list = floorsOf(currentProject).filter((f) => f.imageDataUrl && !f.plan);
    if (list.length) void analyzeFloors(currentProject.id, list, floorsOf(currentProject).length);
  };

  const addFloor = () => {
    if (!currentProject) return;
    const id = uid("lt");
    updateProject(currentProject.id, (p) => {
      const fl = floorsOf(p);
      return { floors: [...fl, { id, name: `Lantai ${fl.length + 1}`, level: fl.length, plan: null, imageDataUrl: null, analyzeMeta: null }] };
    });
    setActiveFloorId(id);
    setActiveTab("denah");
    setShowUploader(true);
  };

  const removeFloor = (floorId: string) => {
    if (!currentProject) return;
    const fl = floorsOf(currentProject);
    const target = fl.find((f) => f.id === floorId);
    if (!target || fl.length < 2) return;
    if (!window.confirm(`Hapus ${target.name}? Denah lantai ini akan hilang.`)) return;
    const rest = fl.filter((f) => f.id !== floorId).map((f, i) => ({ ...f, level: i }));
    updateProject(currentProject.id, { floors: rest });
    setActiveFloorId(rest[0].id);
  };

  const exportPlanJson = () => {
    if (!currentProject) return;
    const fl = floorsOf(currentProject);
    downloadJson(`denah-${currentProject.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "proyek"}.json`, {
      schema: "zanrab.denah/v1",
      title: currentProject.title,
      floors: fl.map((f) => ({ name: f.name, level: f.level, height: f.height ?? null, plan: f.plan })),
    });
  };

  const importPlanJson = async (file: File) => {
    if (!currentProject) return;
    try {
      const data = JSON.parse(await file.text());
      const raw: { name?: string; level?: number; height?: number | null; plan: unknown }[] = Array.isArray(data?.floors)
        ? data.floors
        : data?.walls
          ? [{ name: activeFloor?.name, plan: data }]
          : [];
      if (!raw.length) throw new Error("Format tidak dikenali (butuh {floors:[...]} atau objek denah)");
      const parsed = raw.map((r, i) => ({ name: r.name || `Lantai ${i + 1}`, height: r.height ?? undefined, plan: sanitizePlan(r.plan as Record<string, unknown>) }));
      if (parsed.length === 1 && activeFloor) {
        updateFloor(currentProject.id, activeFloor.id, { plan: parsed[0].plan });
      } else {
        const floors: Floor[] = parsed.map((r, i) => ({ id: uid("lt"), name: r.name, level: i, plan: r.plan, imageDataUrl: null, analyzeMeta: null, height: r.height }));
        updateProject(currentProject.id, { floors });
        setActiveFloorId(floors[0].id);
      }
      setShowUploader(false);
      setToast(`Denah JSON diimpor (${parsed.length} lantai)`);
    } catch (e) {
      setToast(e instanceof Error ? `Impor gagal: ${e.message}` : "Impor gagal");
    }
  };

  const loadDemo = async () => {
    const id = await createDemoProject();
    openProject(id);
    setToast("Contoh denah Bp. Kamal dimuat");
  };

  if (!ready) {
    return (
      <div className="shell col items-center justify-center" style={{ minHeight: "80vh" }}>
        <div className="card glass row items-center" style={{ gap: 12 }}>
          <div className="pulse-dot" />
          <span>Memuat ZanRab…</span>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // Audit konsistensi + perbaikan satu klik
  // ---------------------------------------------------------------------------
  const audit = currentProject ? auditProject(currentProject) : [];
  const applyFix = (fix: AuditFix) => {
    if (!currentProject) return;
    const pid = currentProject.id;
    switch (fix.kind) {
      case "split_rooms": {
        const fl = floorsOf(currentProject).find((x) => x.id === fix.floorId);
        if (!fl?.plan) return;
        const plan = fix.roomIds.reduce((pl, id) => splitRoom(pl, id, 2), fl.plan);
        updateFloor(pid, fix.floorId, { plan });
        setToast(`${fix.roomIds.length} blok KM dibagi jadi 2 bilik — cek posisi pintunya di denah`);
        return;
      }
      case "retype_rooms": {
        const fl = floorsOf(currentProject).find((x) => x.id === fix.floorId);
        if (!fl?.plan) return;
        let n = 0;
        const rooms = fl.plan.rooms.map((r) => (fix.roomIds.includes(r.id) ? { ...r, type: fix.type, name: `${fix.name} ${String.fromCharCode(97 + n++)}` } : r));
        updateFloor(pid, fix.floorId, { plan: { ...fl.plan, rooms } });
        setToast(`${fix.roomIds.length} ruang dijadikan KM`);
        return;
      }
      case "scale_outline": {
        const fl = floorsOf(currentProject).find((x) => x.id === fix.floorId);
        if (!fl?.plan) return;
        updateFloor(pid, fix.floorId, { plan: scalePlan(fl.plan, fix.width, fix.depth) });
        setToast(`Ukuran bangunan disesuaikan ke ${fix.width} × ${fix.depth} m`);
        return;
      }
      case "apply_structure": {
        const r = computeStructure(currentProject);
        if (!r) return;
        const sp = structureToParams(r);
        updateProject(pid, (p) => ({
          params: {
            ...p.params,
            column: sp.column,
            sloof: sp.sloof,
            ringBeam: sp.ringBeam,
            floorBeam: sp.floorBeam,
            ...(sp.upperSlabThickness ? { upperSlabThickness: sp.upperSlabThickness } : {}),
            foundation: sp.foundation,
            pileCap: sp.pileCap,
          },
        }));
        setToast("Ukuran pra-desain SNI diterapkan — tetap verifikasi ke ahli struktur");
        return;
      }
      case "septic_capacity":
        updateProject(pid, (p) => ({ params: { ...p.params, mep: { ...mepOf(p.params), septicMode: "kapasitas" } } }));
        setToast("Septic dihitung dari jumlah penghuni — atur penghuni/kamar & kapasitas di Parameter → MEP");
        return;
      case "carport_floor":
        updateProject(pid, (p) => ({ params: { ...p.params, carportFloor: fix.value } }));
        return;
    }
  };
  const openFloor = (floorId: string) => {
    setActiveFloorId(floorId);
    setShowUploader(false);
    goTab("denah");
  };

  // ---------------------------------------------------------------------------
  // Step state
  // ---------------------------------------------------------------------------
  const floorsCur = currentProject ? floorsOf(currentProject) : [];
  const activeFloor = floorsCur.find((f) => f.id === activeFloorId) ?? floorsCur[0] ?? null;
  const activePlan = activeFloor?.plan ?? null;
  const multiFloor = floorsCur.length > 1;
  const hasPlan = !!currentProject && anyPlan(currentProject);
  const isAnalyzingCurrent = !!currentProject && !!activeFloor && analyzing?.projectId === currentProject.id && analyzing.floorId === activeFloor.id;
  const errorCurrent =
    currentProject && activeFloor && analyzeError?.projectId === currentProject.id && analyzeError.floorId === activeFloor.id
      ? analyzeError.message
      : activeFloor && !activeFloor.plan && !isAnalyzingCurrent && activeFloor.analyzeError && !showUploader
        ? activeFloor.analyzeError
        : null;
  /** Gambar lantai sudah ada (mis. dari PDF) tapi belum pernah dianalisa */
  const pendingCurrent = !!activeFloor && !activeFloor.plan && !!activeFloor.imageDataUrl && !isAnalyzingCurrent && !errorCurrent && !showUploader;
  const pendingCount = floorsCur.filter((f) => f.imageDataUrl && !f.plan).length;
  const inUpload = activeTab === "denah" && (!activePlan || showUploader || isAnalyzingCurrent || !!errorCurrent);
  const activeStep: StepId = activeTab === "denah" ? (inUpload ? "upload" : "cek") : activeTab;

  const steps: StepDef[] = [
    { id: "upload", label: "Upload", done: floorsCur.some((f) => !!f.imageDataUrl) || hasPlan, disabled: false },
    { id: "cek", label: "Cek", done: hasPlan && (visited.params || visited.rab || visited.offer || false), disabled: !hasPlan },
    { id: "params", label: "Parameter", done: !!visited.params && activeTab !== "params", disabled: !hasPlan },
    { id: "rab", label: "RAB", done: !!visited.rab && activeTab !== "rab", disabled: !hasPlan },
    { id: "offer", label: "Penawaran", done: currentProject?.status !== "draft" && !!currentProject, disabled: !hasPlan },
  ];

  const selectStep = (id: StepId) => {
    if (id === "upload") {
      setActiveTab("denah");
      setShowUploader(true);
      return;
    }
    if (id === "cek") {
      setShowUploader(false);
      goTab("denah");
      return;
    }
    goTab(id);
  };

  const sendWhatsApp = () => {
    if (!currentProject || !rabData) return;
    window.open(buildWhatsAppUrl(currentProject, rabData.rab, company, duration), "_blank", "noopener,noreferrer");
    if (currentProject.status === "draft") updateProject(currentProject.id, { status: "dikirim" });
  };

  const dock = (() => {
    if (!currentProject || !rabData || showHome || inUpload) return null;
    switch (activeStep) {
      case "cek":
        return { label: "Perkiraan sementara", action: "Lanjut ke Parameter", run: () => goTab("params") };
      case "params":
        return { label: "Total penawaran", action: "Lihat RAB", run: () => goTab("rab") };
      case "rab":
        return { label: "Total penawaran", action: "Buat Penawaran", run: () => goTab("offer") };
      case "offer":
        return { label: "Nilai penawaran", action: "Kirim WhatsApp", icon: <MessageCircle size={18} />, run: sendWhatsApp };
      default:
        return null;
    }
  })();

  const exportZandor = () => {
    if (!currentProject || !rabData || !schedule) return;
    const plan = buildZandorPlan(currentProject, rabData.rab, company, schedule, scheduleSettingsOf(currentProject).productivity);
    downloadJson(zandorFileName(currentProject), plan);
    setToast("Rencana kerja diekspor untuk ZanDor");
  };

  const focusWall = (wallId: string) => {
    setSelectedEntityId(wallId);
    setSelectedEntityType("wall");
    document.getElementById("plan-canvas")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const showHomeView = showHome || !currentProject;

  return (
    <>
      <SplashScreen />
      <div className={`shell col ${dock ? "has-dock" : ""}`} style={{ gap: 18 }}>
        {/* Top Bar */}
        <header className="topbar no-print">
          <button
            type="button"
            className="brand brand-btn"
            onClick={() => setShowHome(true)}
            title="Beranda ZanRab"
            aria-label="Beranda ZanRab"
          >
            <span className="brand-logo-pod">
              <Image src="/zanrab_icon.svg" alt="" width={26} height={26} priority />
            </span>
            <span style={{ fontSize: 19, letterSpacing: "-0.03em" }}>ZanRab</span>
          </button>
          <span className={`save-pill ${saved ? "on" : ""}`} aria-live="polite">
            <Check size={12} strokeWidth={3} />
            Tersimpan
          </span>

          <div className="spacer" />

          <div className="row" style={{ gap: 8 }}>
            {projectList.length > 1 && currentProject && !showHomeView && (
              <select
                className="input input-sm"
                value={currentProject.id}
                onChange={(e) => openProject(e.target.value)}
                style={{ maxWidth: 220 }}
                aria-label="Ganti proyek"
              >
                {projectList.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
              </select>
            )}

            <button
              type="button"
              className="btn btn-sm btn-primary row items-center"
              style={{ gap: 6 }}
              onClick={() => {
                setNewTitle("");
                setNewClientName("");
                setNewLocation("");
                setNewFloorCount(1);
                setShowNewProjectModal(true);
              }}
            >
              <Plus size={14} />
              <span>Proyek Baru</span>
            </button>

            <button
              type="button"
              className="btn btn-sm btn-icon"
              title="Pengaturan API Key & Model"
              aria-label="Pengaturan API Key & Model"
              onClick={() => setShowSettingsModal(true)}
              style={{ position: "relative" }}
            >
              <Settings size={15} />
              {!settings.geminiKey && !settings.claudeKey && <span className="dot-badge" aria-hidden="true" />}
            </button>
          </div>
        </header>

        {showHomeView || !currentProject ? (
          <HomeHero
            projects={projectList}
            totals={totals}
            busy={!!analyzingId}
            onFile={(f) => void handleFile(f)}
            onDemo={() => void loadDemo()}
            onOpen={openProject}
            onDelete={(id) => {
              deleteProject(id);
              if (id === activeProjectId) setActiveProjectId(null);
            }}
          />
        ) : (
          <div className="col" style={{ gap: 16 }}>
            {/* Project header */}
            <div className="project-head no-print">
              <button type="button" className="btn btn-sm btn-ghost btn-icon" aria-label="Kembali ke beranda" onClick={() => setShowHome(true)}>
                <ChevronLeft size={18} />
              </button>
              <div className="col" style={{ gap: 2, minWidth: 0, flex: 1 }}>
                <input
                  className="title-input"
                  value={currentProject.title}
                  aria-label="Nama proyek"
                  onChange={(e) => updateProject(currentProject.id, { title: e.target.value })}
                />
                <div className="row wrap" style={{ gap: 8 }}>
                  <span className="faint">{currentProject.client.name || "Owner belum diisi"}</span>
                  {currentProject.analyzeMeta && <span className="badge green">AI: {currentProject.analyzeMeta.provider}</span>}
                  {currentProject.status !== "draft" && <span className="badge blue">Penawaran terkirim</span>}
                </div>
              </div>
            </div>

            <Stepper steps={steps} active={activeStep} onSelect={selectStep} />

            {activeTab === "denah" && activeFloor && (multiFloor || hasPlan) && (
              <FloorBar
                floors={floorsCur}
                activeId={activeFloor.id}
                analyzingId={analyzing?.projectId === currentProject.id ? analyzing.floorId : null}
                errorId={analyzeError?.projectId === currentProject.id ? analyzeError.floorId : null}
                onSelect={(id) => {
                  setActiveFloorId(id);
                  setSelectedEntityId(null);
                  setShowUploader(false);
                }}
                onAdd={addFloor}
                onRemove={removeFloor}
              />
            )}

            {/* STEP 1: Upload / analisa */}
            {activeTab === "denah" && inUpload && activeFloor && (
              <div className="col" style={{ gap: 14 }}>
                {pendingCurrent ? (
                  <div className="card glass pending-floor">
                    <img src={activeFloor.imageDataUrl!} alt={`Gambar ${activeFloor.name}`} />
                    <div className="col" style={{ gap: 10 }}>
                      <h3 style={{ margin: 0 }}>{activeFloor.name} belum dianalisa</h3>
                      <p className="faint" style={{ margin: 0, fontSize: 13.5, lineHeight: 1.5 }}>
                        Gambar lantai ini sudah tersimpan{activeFloor.hint ? " beserta angka ukuran dari PDF" : ""}, tapi AI belum membacanya
                        (analisa sebelumnya terhenti, misalnya halaman dimuat ulang atau server AI sibuk).
                      </p>
                      <div className="row wrap" style={{ gap: 8 }}>
                        <button
                          type="button"
                          className="btn btn-primary"
                          disabled={!!analyzing}
                          onClick={() => void analyze(currentProject.id, activeFloor.id, activeFloor.imageDataUrl!, activeFloor.hint, multiFloor ? activeFloor.name : null)}
                        >
                          <RefreshCw size={16} /> Analisa lantai ini
                        </button>
                        {pendingCount > 1 && (
                          <button type="button" className="btn" disabled={!!analyzing} onClick={analyzePending}>
                            Analisa semua yang belum ({pendingCount})
                          </button>
                        )}
                        <button type="button" className="btn btn-ghost" onClick={() => setShowUploader(true)}>
                          Ganti gambar
                        </button>
                      </div>
                    </div>
                  </div>
                ) : isAnalyzingCurrent || errorCurrent ? (
                  <AnalyzingCard
                    imageUrl={activeFloor.imageDataUrl}
                    startedAt={analyzeStartedAt}
                    error={errorCurrent}
                    label={isAnalyzingCurrent ? analyzing?.label ?? null : null}
                    onRetry={() =>
                      activeFloor.imageDataUrl &&
                      void analyze(currentProject.id, activeFloor.id, activeFloor.imageDataUrl, activeFloor.hint, multiFloor ? activeFloor.name : null)
                    }
                    onOpenSettings={() => setShowSettingsModal(true)}
                  />
                ) : (
                  <>
                    <UploadPanel
                      onFile={(f) => void handleFile(f, currentProject.id)}
                      busy={!!analyzingId || !!pdfLoading}
                      title={activePlan ? `Upload ulang denah${multiFloor ? ` ${activeFloor.name}` : ""}` : `Upload denah${multiFloor ? ` ${activeFloor.name}` : " rumah"}`}
                      hint={
                        activePlan
                          ? "Hasil bacaan AI yang lama akan diganti dengan hasil baru."
                          : "Foto, gambar, atau PDF denah (PDF CAD dibaca langsung angka ukurannya; PDF banyak halaman = banyak lantai)."
                      }
                    />
                    <div className="row wrap" style={{ gap: 8 }}>
                      <label className="btn">
                        <FileJson size={16} />
                        Impor denah JSON
                        <input type="file" accept="application/json,.json" hidden onChange={(e) => { const f = e.target.files?.[0]; e.target.value = ""; if (f) void importPlanJson(f); }} />
                      </label>
                    </div>
                    {activePlan && (
                      <button type="button" className="btn" style={{ alignSelf: "flex-start" }} onClick={() => setShowUploader(false)}>
                        <ChevronLeft size={16} />
                        Kembali ke hasil sebelumnya
                      </button>
                    )}
                  </>
                )}
              </div>
            )}

            {/* STEP 2: Cek hasil AI */}
            {activeTab === "denah" && !inUpload && activePlan && activeFloor && (
              <div className="cek-layout">
                <div className="col" style={{ gap: 12, minWidth: 0 }}>
                  <div id="plan-canvas">
                    <PlanCanvas
                      key={activeFloor.id}
                      plan={activePlan}
                      imageUrl={activeFloor.imageDataUrl}
                      onUpdatePlan={(plan) => updateFloor(currentProject.id, activeFloor.id, { plan })}
                      selectedId={selectedEntityId}
                      onSelect={(id, type) => {
                        setSelectedEntityId(id);
                        setSelectedEntityType(type);
                      }}
                    />
                  </div>
                </div>
                <div className="col cek-side" style={{ gap: 14 }}>
                  {selectedEntityType === "room" && selectedEntityId && activePlan.rooms.some((r) => r.id === selectedEntityId) && (
                    <RoomActions
                      plan={activePlan}
                      roomId={selectedEntityId}
                      onChange={(plan) => updateFloor(currentProject.id, activeFloor.id, { plan })}
                      onClose={() => setSelectedEntityId(null)}
                    />
                  )}
                  <AuditPanel compact title="Cek otomatis" issues={audit.filter((i) => i.floorId === activeFloor.id)} onFix={applyFix} />
                  <CheckPanel key={activeFloor.id} plan={activePlan} onFocusWall={focusWall} />
                  <button type="button" className="btn" onClick={() => setShowUploader(true)}>
                    <RefreshCw size={15} />
                    Upload ulang denah{multiFloor ? ` ${activeFloor.name}` : ""}
                  </button>
                  <div className="btn-pair">
                    <button type="button" className="btn btn-sm" onClick={exportPlanJson}>
                      <FileJson size={14} /> Ekspor JSON
                    </button>
                    <label className="btn btn-sm">
                      <FileJson size={14} /> Impor JSON
                      <input type="file" accept="application/json,.json" hidden onChange={(e) => { const f = e.target.files?.[0]; e.target.value = ""; if (f) void importPlanJson(f); }} />
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Parameter */}
            {activeTab === "params" && (
              <div className="col" style={{ gap: 16 }}>
                <AuditPanel compact title="Audit sebelum hitung" issues={audit} onFix={applyFix} onOpenFloor={openFloor} />
                <ParamsEditor params={currentProject.params} onChange={(params) => updateProject(currentProject.id, { params })} />
                <StructureView project={currentProject} company={company} onUpdateProject={(patch) => updateProject(currentProject.id, patch)} />
              </div>
            )}

            {/* STEP 4: RAB */}
            {activeTab === "rab" && rabData && <AuditPanel title="Audit RAB" issues={audit} onFix={applyFix} onOpenFloor={openFloor} />}
            {activeTab === "rab" && rabData && (
              <RabView
                project={currentProject}
                rab={rabData.rab}
                company={company}
                onUpdateProject={(patch) => updateProject(currentProject.id, patch)}
                scheduleSlot={
                  <ScheduleView
                    project={currentProject}
                    rab={rabData.rab}
                    company={company}
                    priceDb={priceDb}
                    onUpdateProject={(patch) => updateProject(currentProject.id, patch)}
                  />
                }
              />
            )}

            {/* STEP 5: Penawaran */}
            {activeTab === "offer" && rabData && (
              <div className="offer-layout">
                <OfferPanel
                  project={currentProject}
                  rab={rabData.rab}
                  company={company}
                  onUpdateProject={(patch) => updateProject(currentProject.id, patch)}
                  onUpdateCompany={setCompany}
                  duration={duration}
                  onExportZandor={exportZandor}
                />
                <div className="offer-preview">
                  <RabView
                    project={currentProject}
                    rab={rabData.rab}
                    company={company}
                    forcedTab="surat"
                    duration={duration}
                    onUpdateProject={(patch) => updateProject(currentProject.id, patch)}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        <footer className="footer no-print">
          <div>
            ZanRab • Dibuat untuk kontraktor oleh{" "}
            <a href="https://zandev.id" target="_blank" rel="noopener noreferrer">
              Zandev
            </a>
          </div>
        </footer>

        {dock && rabData && (
          <TotalDock
            total={rabData.rab.grandTotalRounded}
            perM2={rabData.rab.costPerM2}
            label={dock.label}
            actionLabel={dock.action}
            actionIcon={dock.icon}
            onAction={dock.run}
            extra={duration ? `± ${duration.weeks} minggu` : null}
          />
        )}

        {toast && (
          <div className="toast glass no-print" role="status">
            {toast}
          </div>
        )}

        {pdfLoading && (
          <div className="backdrop no-print" role="status" aria-live="polite">
            <div className="card glass row items-center" style={{ gap: 12 }}>
              <Loader2 size={18} className="spin" />
              <span>{pdfLoading}</span>
            </div>
          </div>
        )}

        {pdfDialog && (
          <PdfImportDialog fileName={pdfDialog.fileName} pages={pdfDialog.pages} onCancel={() => setPdfDialog(null)} onConfirm={(sel) => void confirmPdf(sel)} />
        )}

      {/* Settings Modal (Input API Keys) */}
      {showSettingsModal && (
        <div className="backdrop" onClick={() => setShowSettingsModal(false)}>
          <div
            className="sheet card glass col"
            style={{ maxWidth: 520, gap: 18 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="row justify-between items-center">
              <div className="row items-center" style={{ gap: 8 }}>
                <KeyRound size={20} color="var(--accent)" />
                <h2 className="h2" style={{ fontSize: 20 }}>Pengaturan API Key & Model</h2>
              </div>
              <button
                type="button"
                className="btn btn-sm btn-ghost btn-icon"
                onClick={() => setShowSettingsModal(false)}
              >
                <X size={16} />
              </button>
            </div>

            <p className="muted" style={{ fontSize: 13.5, margin: 0 }}>
              Masukkan API key lo di bawah ini agar ZanRab bisa otomatis membaca dan mengekstrak denah 2D menggunakan AI Vision tercerdas. Key disimpan secara aman di local storage browser lo (Local-First IndexedDB).
            </p>

            <div className="col" style={{ gap: 14 }}>
              <div className="field">
                <label>Engine Default</label>
                <select
                  className="input"
                  value={settings.provider}
                  onChange={(e) => setSettings({ provider: e.target.value as any })}
                >
                  <option value="gemini">Google Gemini 3.1 Pro (Spatial Vision & Cepat)</option>
                  <option value="claude">Anthropic Claude Opus 5.5 (OCR Akurat & Teliti)</option>
                  <option value="consensus">Konsensus (Gemini + Claude Berjalan Paralel)</option>
                </select>
              </div>

              <div className="field">
                <div className="row justify-between items-center">
                  <label>Google Gemini API Key</label>
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noreferrer"
                    className="faint row items-center"
                    style={{ gap: 4, textDecoration: "underline" }}
                  >
                    <span>Google AI Studio</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
                <input
                  type="password"
                  className="input"
                  placeholder="AIzaSy..."
                  value={settings.geminiKey}
                  onChange={(e) => setSettings({ geminiKey: e.target.value })}
                />
              </div>

              <div className="field">
                <div className="row justify-between items-center">
                  <label>Anthropic Claude API Key</label>
                  <a
                    href="https://console.anthropic.com/settings/keys"
                    target="_blank"
                    rel="noreferrer"
                    className="faint row items-center"
                    style={{ gap: 4, textDecoration: "underline" }}
                  >
                    <span>Anthropic Console</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
                <input
                  type="password"
                  className="input"
                  placeholder="sk-ant-api03..."
                  value={settings.claudeKey}
                  onChange={(e) => setSettings({ claudeKey: e.target.value })}
                />
              </div>

              <div
                style={{
                  background: "rgba(10, 132, 255, 0.08)",
                  borderRadius: "var(--radius-sm)",
                  padding: 12,
                  fontSize: 12.5,
                  lineHeight: 1.5,
                  color: "var(--text-2)",
                }}
              >
                💡 <strong>Tips Developer:</strong> Lo juga bisa simpan API Key di file <code>.env.local</code> di folder root proyek dengan nama <code>GEMINI_API_KEY</code> atau <code>ANTHROPIC_API_KEY</code> tanpa perlu input manual setiap saat.
              </div>
            </div>

            <div className="row justify-end" style={{ gap: 8, marginTop: 4 }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setShowSettingsModal(false)}
              >
                Simpan & Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Buat Proyek Baru */}
      {showNewProjectModal && (
        <div className="backdrop" onClick={() => setShowNewProjectModal(false)}>
          <div
            className="sheet card glass col"
            style={{ maxWidth: 480, gap: 18 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="row justify-between items-center">
              <div className="row items-center" style={{ gap: 8 }}>
                <Plus size={20} color="var(--accent)" />
                <h2 className="h2" style={{ fontSize: 20 }}>Buat Proyek Baru</h2>
              </div>
              <button
                type="button"
                className="btn btn-sm btn-ghost btn-icon"
                onClick={() => setShowNewProjectModal(false)}
              >
                <X size={16} />
              </button>
            </div>

            <p className="muted" style={{ fontSize: 13.5, margin: 0 }}>
              Tentukan nama proyek, data pemilik, serta jumlah lantai bangunan yang akan dihitung.
            </p>

            <form
              className="col"
              style={{ gap: 14 }}
              onSubmit={(e) => {
                e.preventDefault();
                const id = createProject({
                  title: newTitle.trim() || "Proyek Rumah Tinggal",
                  location: newLocation.trim(),
                  client: { name: newClientName.trim(), address: newLocation.trim(), phone: "" },
                  params: {
                    ...structuredClone(DEFAULT_PARAMS),
                    floorCount: newFloorCount,
                  },
                });
                openProject(id);
                setShowNewProjectModal(false);
              }}
            >
              <div className="field">
                <label>Nama / Judul Proyek *</label>
                <input
                  type="text"
                  required
                  autoFocus
                  className="input"
                  placeholder="Contoh: Rumah Tinggal 2 Lantai Bp. Hendra"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>

              <div className="grid grid-2">
                <div className="field">
                  <label>Nama Klien / Pemilik</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Contoh: Bp. Hendra"
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                  />
                </div>
                <div className="field">
                  <label>Lokasi Proyek</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Contoh: Surabaya Barat"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                  />
                </div>
              </div>

              <div className="field">
                <label>Jumlah Lantai Bangunan</label>
                <select
                  className="input"
                  value={newFloorCount}
                  onChange={(e) => setNewFloorCount(parseInt(e.target.value, 10) || 1)}
                >
                  <option value="1">1 Lantai (Standar Rumah Tapak)</option>
                  <option value="2">2 Lantai (+ Pelat Lantai Beton Bertulang)</option>
                  <option value="3">3 Lantai (+ Pelat Lantai Multi-Level)</option>
                  <option value="4">4 Lantai (Gedung Bertingkat)</option>
                </select>
                <div className="faint" style={{ fontSize: 11.5, marginTop: 2 }}>
                  {newFloorCount > 1
                    ? `Perhitungan struktur kolom dan ring balok otomatis dikalikan ${newFloorCount}x, serta ditambahkan dak beton lantai atas.`
                    : "Perhitungan struktur tunggal standar rumah tapak 1 lantai."}
                </div>
              </div>

              <div className="row justify-end" style={{ gap: 8, marginTop: 8 }}>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setShowNewProjectModal(false)}
                >
                  Batal
                </button>
                <button type="submit" className="btn btn-primary">
                  Mulai Proyek Ini
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

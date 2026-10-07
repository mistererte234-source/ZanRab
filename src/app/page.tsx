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
  const [, setSelectedEntityType] = useState<"wall" | "opening" | "room" | null>(null);

  const [analyzingId, setAnalyzingId] = useState<string | null>(null);
  const [analyzeStartedAt, setAnalyzeStartedAt] = useState<number | null>(null);
  const [analyzeError, setAnalyzeError] = useState<{ projectId: string; message: string } | null>(null);
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

  const totals = useMemo(() => {
    const out: Record<string, string> = {};
    for (const p of projectList) {
      if (!p.plan) continue;
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
    setShowHome(false);
    setShowUploader(false);
    setSelectedEntityId(null);
    setVisited({});
    setActiveTab("denah");
  };

  // ---------------------------------------------------------------------------
  // AI analysis
  // ---------------------------------------------------------------------------
  const analyze = async (projectId: string, dataUrl: string) => {
    setAnalyzingId(projectId);
    setAnalyzeStartedAt(Date.now());
    setAnalyzeError(null);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(settings.geminiKey ? { "x-gemini-key": settings.geminiKey } : {}),
          ...(settings.claudeKey ? { "x-anthropic-key": settings.claudeKey } : {}),
        },
        body: JSON.stringify({ image: dataUrl, provider: settings.provider }),
      });
      let data: { error?: string; plan?: unknown; meta?: unknown } = {};
      try {
        data = await res.json();
      } catch {
        throw new Error(res.status === 413 ? "Gambar terlalu besar untuk server." : `Server membalas ${res.status}. Coba lagi sebentar.`);
      }
      if (!res.ok || !data.plan) throw new Error(data.error || "Gagal memproses gambar dengan AI Vision");
      const plan = data.plan as NonNullable<typeof currentProject>["plan"];
      updateProject(projectId, { plan, analyzeMeta: data.meta as NonNullable<typeof currentProject>["analyzeMeta"] });
      if (plan) setToast(`Denah terbaca: ${plan.walls.length} dinding, ${plan.openings.length} bukaan, ${plan.rooms.length} ruang`);
      setShowUploader(false);
    } catch (err) {
      setAnalyzeError({ projectId, message: err instanceof Error ? err.message : String(err) });
    } finally {
      setAnalyzingId(null);
    }
  };

  const handleFile = async (file: File, targetId?: string) => {
    let dataUrl: string;
    try {
      dataUrl = await fileToDownscaledDataUrl(file);
    } catch (e) {
      setToast(e instanceof Error ? e.message : "Gagal membaca gambar");
      return;
    }
    const id =
      targetId ??
      createProject({
        title: `Proyek ${new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}`,
      });
    setActiveProjectId(id);
    setShowHome(false);
    setActiveTab("denah");
    updateProject(id, { imageDataUrl: dataUrl });
    void analyze(id, dataUrl);
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
  // Step state
  // ---------------------------------------------------------------------------
  const hasPlan = !!currentProject?.plan;
  const isAnalyzingCurrent = !!currentProject && analyzingId === currentProject.id;
  const errorCurrent = currentProject && analyzeError?.projectId === currentProject.id ? analyzeError.message : null;
  const inUpload = activeTab === "denah" && (!hasPlan || showUploader || isAnalyzingCurrent || !!errorCurrent);
  const activeStep: StepId = activeTab === "denah" ? (inUpload ? "upload" : "cek") : activeTab;

  const steps: StepDef[] = [
    { id: "upload", label: "Upload", done: !!currentProject?.imageDataUrl || hasPlan, disabled: false },
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
    window.open(buildWhatsAppUrl(currentProject, rabData.rab, company), "_blank", "noopener,noreferrer");
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

            {/* STEP 1: Upload / analisa */}
            {activeTab === "denah" && inUpload && (
              <div className="col" style={{ gap: 14 }}>
                {isAnalyzingCurrent || errorCurrent ? (
                  <AnalyzingCard
                    imageUrl={currentProject.imageDataUrl}
                    startedAt={analyzeStartedAt}
                    error={errorCurrent}
                    onRetry={() => currentProject.imageDataUrl && void analyze(currentProject.id, currentProject.imageDataUrl)}
                    onOpenSettings={() => setShowSettingsModal(true)}
                  />
                ) : (
                  <>
                    <UploadPanel
                      onFile={(f) => void handleFile(f, currentProject.id)}
                      busy={!!analyzingId}
                      title={hasPlan ? "Upload ulang denah" : "Upload denah rumah"}
                      hint={
                        hasPlan
                          ? "Hasil bacaan AI yang lama akan diganti dengan hasil baru."
                          : "Pastikan angka ukuran di denah terbaca jelas. JPG, PNG, atau WEBP."
                      }
                    />
                    {hasPlan && (
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
            {activeTab === "denah" && !inUpload && currentProject.plan && (
              <div className="cek-layout">
                <div className="col" style={{ gap: 12, minWidth: 0 }}>
                  <div id="plan-canvas">
                    <PlanCanvas
                      plan={currentProject.plan}
                      imageUrl={currentProject.imageDataUrl}
                      onUpdatePlan={(plan) => updateProject(currentProject.id, { plan })}
                      selectedId={selectedEntityId}
                      onSelect={(id, type) => {
                        setSelectedEntityId(id);
                        setSelectedEntityType(type);
                      }}
                    />
                  </div>
                </div>
                <div className="col cek-side" style={{ gap: 14 }}>
                  <CheckPanel plan={currentProject.plan} onFocusWall={focusWall} />
                  <button type="button" className="btn" onClick={() => setShowUploader(true)}>
                    <RefreshCw size={15} />
                    Upload ulang denah
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Parameter */}
            {activeTab === "params" && (
              <ParamsEditor params={currentProject.params} onChange={(params) => updateProject(currentProject.id, { params })} />
            )}

            {/* STEP 4: RAB */}
            {activeTab === "rab" && rabData && (
              <RabView
                project={currentProject}
                rab={rabData.rab}
                company={company}
                onUpdateProject={(patch) => updateProject(currentProject.id, patch)}
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
                />
                <div className="offer-preview">
                  <RabView
                    project={currentProject}
                    rab={rabData.rab}
                    company={company}
                    forcedTab="surat"
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
          />
        )}

        {toast && (
          <div className="toast glass no-print" role="status">
            {toast}
          </div>
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

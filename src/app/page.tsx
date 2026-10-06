"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useStore } from "@/lib/store";
import { PlanCanvas } from "@/components/PlanCanvas";
import { ParamsEditor } from "@/components/ParamsEditor";
import { RabView } from "@/components/RabView";
import { SplashScreen } from "@/components/SplashScreen";
import { computeRab, rupiah } from "@/lib/rab";
import { defaultPriceDb } from "@/lib/pricing";
import {
  Sparkles,
  Settings,
  Plus,
  UploadCloud,
  FileSpreadsheet,
  SlidersHorizontal,
  Compass,
  Building,
  KeyRound,
  ExternalLink,
  X,
  RefreshCw,
  Cpu,
} from "lucide-react";

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
  } = useStore();

  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"denah" | "params" | "rab" | "audit">("denah");
  const [selectedEntityId, setSelectedEntityId] = useState<string | null>(null);
  const [selectedEntityType, setSelectedEntityType] = useState<"wall" | "opening" | "room" | null>(null);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzeError, setAnalyzeError] = useState<string | null>(null);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newClientName, setNewClientName] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newFloorCount, setNewFloorCount] = useState(1);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const projectList = Object.values(projects).sort((a, b) => b.updatedAt - a.updatedAt);
  const currentProject = activeProjectId ? projects[activeProjectId] : projectList[0] || null;

  // Auto-select first project if available
  useEffect(() => {
    if (!activeProjectId && projectList.length > 0) {
      setActiveProjectId(projectList[0].id);
    }
  }, [activeProjectId, projectList]);

  // Compute live RAB
  const rabData = currentProject ? computeRab(currentProject, priceDb) : null;

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentProject) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      updateProject(currentProject.id, { imageDataUrl: dataUrl });

      // Run AI Analysis
      try {
        setIsAnalyzing(true);
        setAnalyzeError(null);

        const res = await fetch("/api/analyze", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(settings.geminiKey ? { "x-gemini-key": settings.geminiKey } : {}),
            ...(settings.claudeKey ? { "x-anthropic-key": settings.claudeKey } : {}),
          },
          body: JSON.stringify({
            image: dataUrl,
            provider: settings.provider,
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Gagal memproses gambar dengan AI Vision");
        }

        updateProject(currentProject.id, {
          plan: data.plan,
          analyzeMeta: data.meta,
        });
      } catch (err: any) {
        console.error("Analysis Error:", err);
        setAnalyzeError(err.message);
      } finally {
        setIsAnalyzing(false);
      }
    };
    reader.readAsDataURL(file);
  };

  if (!ready) {
    return (
      <div className="shell col items-center justify-center" style={{ minHeight: "80vh" }}>
        <div className="card glass row items-center" style={{ gap: 12 }}>
          <div className="pulse-dot" />
          <span>Memuat ZanRab Workspace...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <SplashScreen />
      <div className="shell col" style={{ gap: 20 }}>
        {/* Top Bar Navigation */}
        <header className="topbar">
          <div className="brand" style={{ cursor: "pointer" }} onClick={() => window.location.reload()} title="ZanRab">
            <div
              className="brand-logo-pod"
              style={{
                width: 36,
                height: 36,
                borderRadius: 11,
                display: "grid",
                placeItems: "center",
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))",
                border: "1px solid rgba(255, 255, 255, 0.25)",
                boxShadow: "0 4px 14px rgba(0, 117, 177, 0.25)",
                padding: 4,
              }}
            >
              <Image
                src="/zanrab_icon.svg"
                alt="ZanRab Logo"
                width={26}
                height={26}
                priority
              />
            </div>
            <span style={{ fontSize: 19, letterSpacing: "-0.03em" }}>ZanRab</span>
          </div>
          <span className="badge blue hide-mobile">v1.0 iOS Glass Edition</span>

          <div className="spacer" />

        <div className="row" style={{ gap: 8 }}>
          {projectList.length > 0 && currentProject && (
            <select
              className="input input-sm"
              value={currentProject.id}
              onChange={(e) => setActiveProjectId(e.target.value)}
              style={{ maxWidth: 220 }}
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
            className="btn btn-sm btn-demo row items-center"
            style={{ gap: 6 }}
            title="Contoh Denah Kamal"
            onClick={async () => {
              const id = await createDemoProject();
              setActiveProjectId(id);
            }}
          >
            <Sparkles size={14} color="var(--accent)" />
            <span>Contoh Denah Kamal</span>
          </button>

          <button
            type="button"
            className="btn btn-sm btn-icon"
            title="Pengaturan API Key & Model"
            onClick={() => setShowSettingsModal(true)}
            style={{ position: "relative" }}
          >
            <Settings size={15} />
            {(!settings.geminiKey && !settings.claudeKey) && (
              <span
                style={{
                  position: "absolute",
                  top: 6,
                  right: 6,
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "var(--orange)",
                }}
              />
            )}
          </button>
        </div>
      </header>

      {/* Main Workspace Body */}
      {!currentProject ? (
        <div className="card glass col items-center" style={{ padding: "clamp(28px, 8vw, 60px) clamp(18px, 5vw, 60px)", textAlign: "center", gap: 16 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: "rgba(10, 132, 255, 0.1)",
              display: "grid",
              placeItems: "center",
              color: "var(--accent)",
            }}
          >
            <Compass size={32} />
          </div>
          <h2 className="h2">Mulai Hitung RAB Denah Anda</h2>
          <p className="muted" style={{ maxWidth: 480 }}>
            Upload gambar denah 2D Anda (JPG/PNG), biarkan AI mengekstrak geometri dinding dan ruang,
            lalu hasilkan RAB penawaran kontraktor secara otomatis.
          </p>
          <div className="row" style={{ gap: 12 }}>
            <button
              type="button"
              className="btn btn-primary row items-center"
              style={{ gap: 8 }}
              onClick={async () => {
                const id = await createDemoProject();
                setActiveProjectId(id);
              }}
            >
              <Sparkles size={16} />
              <span>Muat Contoh Denah & RAB Kamal</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="col" style={{ gap: 18 }}>
          {/* Project Details Title & Subheader */}
          <div className="card glass row wrap justify-between items-center" style={{ padding: "14px 20px" }}>
            <div className="col" style={{ gap: 2 }}>
              <input
                className="h2"
                style={{ background: "transparent", border: 0, outline: "none", width: "100%", padding: 0 }}
                value={currentProject.title}
                onChange={(e) => updateProject(currentProject.id, { title: e.target.value })}
                placeholder="Judul Proyek"
              />
              <div className="row" style={{ gap: 10 }}>
                <span className="faint">Klien: {currentProject.client.name || "Belum diisi"}</span>
                <span className="faint">•</span>
                <span className="faint">Status: {currentProject.status.toUpperCase()}</span>
                {currentProject.analyzeMeta && (
                  <>
                    <span className="faint">•</span>
                    <span className="badge green">AI: {currentProject.analyzeMeta.provider}</span>
                  </>
                )}
              </div>
            </div>

            {rabData && (
              <div className="row items-center" style={{ gap: 16 }}>
                <div style={{ textAlign: "right" }}>
                  <div className="faint">Estimasi Nilai Total</div>
                  <div className="h2 mono" style={{ color: "var(--accent)" }}>
                    {rupiah(rabData.rab.grandTotalRounded)}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Tab Navigation */}
          <div className="row wrap justify-between items-center" style={{ gap: 8 }}>
            <div className="segmented">
              <button
                type="button"
                data-active={activeTab === "denah"}
                onClick={() => setActiveTab("denah")}
                className="row items-center"
                style={{ gap: 6 }}
              >
                <Compass size={14} />
                <span>Denah & Geometri</span>
              </button>
              <button
                type="button"
                data-active={activeTab === "params"}
                onClick={() => setActiveTab("params")}
                className="row items-center"
                style={{ gap: 6 }}
              >
                <SlidersHorizontal size={14} />
                <span>Parameter Teknis</span>
              </button>
              <button
                type="button"
                data-active={activeTab === "rab"}
                onClick={() => setActiveTab("rab")}
                className="row items-center"
                style={{ gap: 6 }}
              >
                <FileSpreadsheet size={14} />
                <span>Rencana Anggaran Biaya (RAB)</span>
              </button>
            </div>
          </div>

          {/* TAB 1: Denah & Geometry Editor */}
          {activeTab === "denah" && (
            <div className="grid grid-3" style={{ alignItems: "start" }}>
              <div style={{ gridColumn: "span 2" }} className="col">
                {currentProject.plan ? (
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
                ) : (
                  <div className="dropzone col items-center justify-center">
                    <input
                      type="file"
                      accept="image/*"
                      id="upload-denah"
                      style={{ display: "none" }}
                      onChange={handleImageUpload}
                    />
                    <label htmlFor="upload-denah" style={{ cursor: "pointer", width: "100%" }}>
                      <div className="icon">
                        <UploadCloud size={30} />
                      </div>
                      <h3 style={{ margin: "0 0 6px" }}>Pilih atau Seret Gambar Denah ke Sini</h3>
                      <div className="faint">Mendukung format JPEG, PNG, atau WEBP resolusi tinggi</div>
                    </label>
                  </div>
                )}

                {isAnalyzing && (
                  <div className="card glass row items-center scan" style={{ gap: 12, padding: 16 }}>
                    <div className="pulse-dot" />
                    <div className="col" style={{ gap: 2 }}>
                      <strong>AI Vision Sedang Menganalisa Denah...</strong>
                      <span className="faint">
                        Mendeteksi rantai dimensi, dinding as, posisi bukaan pintu/jendela, dan ruang.
                      </span>
                    </div>
                  </div>
                )}

                {analyzeError && (
                  <div className="issue error">
                    ⚠️ <strong>Error Analisa:</strong> {analyzeError}
                  </div>
                )}
              </div>

              {/* Sidebar Info & Controls */}
              <div className="col sticky-side" style={{ gap: 14 }}>
                <div className="card glass col" style={{ gap: 12 }}>
                  <div className="row items-center" style={{ gap: 8 }}>
                    <Building size={16} color="var(--accent)" />
                    <h3 style={{ margin: 0 }}>Ringkasan Geometri</h3>
                  </div>
                  {currentProject.plan ? (
                    <div className="col" style={{ gap: 8, fontSize: 13.5 }}>
                      <div className="row justify-between">
                        <span className="muted">Ukuran Outline:</span>
                        <span className="mono font-semibold">
                          {currentProject.plan.outline.width}m × {currentProject.plan.outline.depth}m
                        </span>
                      </div>
                      <div className="row justify-between">
                        <span className="muted">Total Panjang Dinding:</span>
                        <span className="mono font-semibold">
                          {rabData?.ctx.metrics.wallLength || 0} m1
                        </span>
                      </div>
                      <div className="row justify-between">
                        <span className="muted">Luas Bersih Lantai:</span>
                        <span className="mono font-semibold">
                          {rabData?.ctx.metrics.netFloorArea || 0} m²
                        </span>
                      </div>
                      <div className="row justify-between">
                        <span className="muted">Total Pintu / Daun Jendela:</span>
                        <span className="mono font-semibold">
                          {rabData?.ctx.metrics.doors} pintu / {rabData?.ctx.metrics.windowLeaves} jendela
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="faint">Belum ada data geometri. Silakan upload denah.</div>
                  )}

                  <hr style={{ border: 0, borderTop: "1px solid var(--hairline)", margin: "4px 0" }} />

                  <label className="btn btn-sm row items-center justify-center" style={{ width: "100%", cursor: "pointer", gap: 6 }}>
                    <RefreshCw size={14} />
                    <span>Upload Ulang Denah</span>
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>

                <div className="card glass col" style={{ gap: 10 }}>
                  <div className="row items-center" style={{ gap: 8 }}>
                    <Cpu size={16} color="var(--accent-2)" />
                    <h3 style={{ margin: 0 }}>Pengaturan AI Vision</h3>
                  </div>
                  <div className="field">
                    <label>Engine Pilihan</label>
                    <select
                      className="input input-sm"
                      value={settings.provider}
                      onChange={(e) => setSettings({ provider: e.target.value as any })}
                    >
                      <option value="gemini">Gemini 3.1 Pro (Spatial Vision)</option>
                      <option value="claude">Claude Opus 5.5 (OCR Akurat)</option>
                      <option value="consensus">Konsensus (Gemini + Claude Paralel)</option>
                    </select>
                  </div>

                  <div className="field">
                    <label>Gemini API Key</label>
                    <input
                      type="password"
                      className="input input-sm"
                      placeholder="AIzaSy..."
                      value={settings.geminiKey}
                      onChange={(e) => setSettings({ geminiKey: e.target.value })}
                    />
                  </div>

                  <div className="field">
                    <label>Anthropic API Key</label>
                    <input
                      type="password"
                      className="input input-sm"
                      placeholder="sk-ant-api03..."
                      value={settings.claudeKey}
                      onChange={(e) => setSettings({ claudeKey: e.target.value })}
                    />
                  </div>

                  <div className="faint" style={{ fontSize: 11 }}>
                    💡 API key disimpan aman di browser lo (local-first IndexedDB) atau bisa ditaruh di file <code>.env.local</code>.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Parameter Teknis */}
          {activeTab === "params" && (
            <ParamsEditor
              params={currentProject.params}
              onChange={(params) => updateProject(currentProject.id, { params })}
            />
          )}

          {/* TAB 3: RAB View & Proposal */}
          {activeTab === "rab" && rabData && (
            <RabView
              project={currentProject}
              rab={rabData.rab}
              company={company}
              onUpdateProject={(patch) => updateProject(currentProject.id, patch)}
            />
          )}
        </div>
      )}

      {/* Persistent Clickable Zandev Watermark Footer */}
      <footer className="footer no-print">
        <div>
          ZanRab System • Built for Professional Contractors by{" "}
          <a href="https://zandev.id" target="_blank" rel="noopener noreferrer">
            Zandev
          </a>
        </div>
      </footer>

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
                    ...structuredClone(currentProject?.params || {}),
                    floorCount: newFloorCount,
                  },
                });
                setActiveProjectId(id);
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

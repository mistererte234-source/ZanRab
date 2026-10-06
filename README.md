# ZanRab 🏗️📐

> **Next-Generation AI Construction Cost Estimator (RAB) with Floor Plan Vision & Engineering Precision.**  
> Crafted with premium iOS glassmorphism UI, dual-mode pricing (Borongan & AHSP SNI), smart multi-story structural calculations, and a real-world Bill of Materials (BOM) logistics breakdown.

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Design-iOS%20Glassmorphism-06b6d4)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Powered by Zandev](https://img.shields.io/badge/Built%20by-Zandev-6366f1)](https://zandev.id)

---

## 🌟 Fitur Unggulan

### 1. 👁️ Multi-Engine AI Vision (Floor Plan Digitizer)
- **Input Gambar Denah:** Cukup upload denah 2D (JPEG/PNG/PDF hasil scan atau arsitek).
- **Multi-Engine AI Support:**
  - Google **Gemini 3.1 Pro**
  - Anthropic **Claude Opus 5.5**
  - **Parallel Consensus Mode:** Membandingkan kedua model AI secara bersamaan untuk verifikasi akurasi dimensi ruang dan panjang as dinding.
- **Local-First Security:** API Key disimpan secara privat di browser pengguna (IndexedDB / LocalStorage) tanpa disimpan di server manapun.

### 2. 🏛️ Smart Structural Sizing & Material Presets
- **Preset Dinding:**
  - *Bata Ringan / Hebel AAC* (~750 kg/m³, perekat thinbed mortar).
  * *Bata Merah Bakar Konvensional* (~1.750 kg/m³, adukan 1:4).
  * *Batako Press Semen* (ekonomis & padat).
- **Multi-Floor Engineering:**
  - Perhitungan otomatis pelat dak beton bertulang (t=12cm) untuk lantai 2 ke atas.
  - Multiplikasi beban vertikal tinggi kolom dan balok struktur.
- **Auto Lintel Beam:** Dinding dengan tinggi > 3.8 meter otomatis dilengkapi balok pinggang / balok lintel praktis pengaku tekuk lentur.

### 3. 📦 Bill of Materials (BOM) Logistics Summary
Mengubah angka kubikasi & meter persegi teknis menjadi **daftar belanja fisik nyata** untuk kontraktor:
- **Semen Portland:** Dikonversi ke satuan **Sak (@ 50 kg)**.
- **Pasir Pasang & Kerikil Split:** Dikonversi ke satuan rit **Dump Truck (@ 6 m³)**.
- **Besi Beton Bertulang:** Dihitung estimasi kebutuhan **Batang (12 meter)**.
- **Bata / Hebel:** Jumlah biji satuan.
- **Granit / Keramik:** Dikonversi ke satuan **Dus**.
- **Cat & Finishing:** Kemasan **Pail (@ 20 kg)**.

### 4. 📊 Executive Visual Cost Breakdown
- **Stacked Progress Bar:** Visualisasi distribusi anggaran per kategori (Persiapan, Pondasi, Struktur, Pasangan, Atap, Finishing, MEP).
- **Metric Cards:** Proporsi persentase (%) dan total nominal per divisi pekerjaan untuk presentasi resmi ke pemilik rumah (*owner*).

### 5. 💰 Dual-Mode Pricing & Proposal Resmi
- **Mode Borongan:** Harga satuan all-in (material + upah) standar kontraktor.
- **Mode AHSP SNI:** Analisa koefisien recursive PUPR/SNI (Bahan, Upah Tukang/Mandor, Alat).
- **Surat Penawaran Resmi:** Template surat formal otomatis lengkap dengan kop perusahaan, terbilang rupiah, termin pembayaran, dan tanda tangan legal.
- **Excel Export (.xlsx):** Export file spreadsheet interaktif dengan formula hidup.

---

## 🎨 Desain & Persona
- **iOS Premium Glassmorphism:** Efek frosted glass, border tipis bercahaya, mesh gradient animasi, dan micro-animations responsif.
- **Lucide Icons:** Ikonografi profesional dan elegan tanpa emoji amatir.
- **Watermark:** Terintegrasi resmi dengan link langsung ke [Zandev](https://zandev.id).

---

## 🚀 Quick Start (Development)

### 1. Clone Repository
```bash
git clone https://github.com/mistererte234-source/ZanRab.git
cd ZanRab
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Buka browser di [http://localhost:3000](http://localhost:3000).

### 4. Run Automated Unit Tests
```bash
npm test
```

### 5. Build for Production
```bash
npm run build
npm start
```

---

## 📁 Struktur Direktori

```
ZanRab/
├── docs/                 # Sampel denah uji & RAB acuan
├── public/               # Asset statis & sampel denah
├── src/
│   ├── app/              # Next.js App Router (UI & API routes)
│   ├── components/       # UI Components (ParamsEditor, RabView, PlanCanvas)
│   └── lib/              # Core Computation Engine
│       ├── ai/           # Prompt & AI Provider connector (Gemini/Claude)
│       ├── bom.ts        # Bill of Materials (BOM) Logistics Engine
│       ├── defaults.ts   # Parameter default struktur & arsitektur
│       ├── export/       # Excel (.xlsx) exporter
│       ├── geometry.ts   # Algoritma komputasi poligon denah
│       ├── pricing.ts    # Database harga & analisa koefisien AHSP
│       ├── rab.ts        # Aggregator & formatter RAB
│       ├── takeoff.ts    # Engineering Volume Take-off Engine
│       ├── types.ts      # TypeScript interfaces & domain models
│       └── store.ts      # State management lokal (Local-First)
└── tests/                # Automated Vitest Suite
```

---

## 📄 Lisensi
Didistribusikan di bawah Lisensi MIT. Dikembangkan dengan dedikasi untuk industri konstruksi oleh [Zandev](https://zandev.id).

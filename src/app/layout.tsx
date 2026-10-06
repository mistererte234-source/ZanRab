import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZanRab — Estimasi RAB Denah AI untuk Kontraktor",
  description: "Aplikasi hitung RAB otomatis dari denah gambar dengan AI vision cerdas, engine deterministik, dan styling iOS glassmorphism.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
        <div className="mesh">
          <i />
          <i />
          <i />
        </div>
        {children}
      </body>
    </html>
  );
}

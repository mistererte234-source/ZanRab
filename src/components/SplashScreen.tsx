"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface SplashScreenProps {
  onFinish?: () => void;
  minDurationMs?: number;
}

export function SplashScreen({ onFinish, minDurationMs = 1800 }: SplashScreenProps) {
  const [phase, setPhase] = useState<"enter" | "active" | "exit" | "hidden">("enter");

  useEffect(() => {
    // Phase 1: Enter animation
    const tEnter = setTimeout(() => {
      setPhase("active");
    }, 100);

    // Phase 2: Exit fade out
    const tExit = setTimeout(() => {
      setPhase("exit");
    }, minDurationMs);

    // Phase 3: Completely remove from DOM
    const tHidden = setTimeout(() => {
      setPhase("hidden");
      if (onFinish) onFinish();
    }, minDurationMs + 600);

    return () => {
      clearTimeout(tEnter);
      clearTimeout(tExit);
      clearTimeout(tHidden);
    };
  }, [minDurationMs, onFinish]);

  if (phase === "hidden") return null;

  return (
    <div
      className={`splash-overlay ${phase === "exit" ? "splash-exit" : ""}`}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(circle at center, rgba(14, 20, 36, 0.96) 0%, rgba(7, 8, 12, 0.99) 100%)",
        backdropFilter: "blur(32px) saturate(190%)",
        WebkitBackdropFilter: "blur(32px) saturate(190%)",
        transition: "opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1), transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)",
        opacity: phase === "exit" ? 0 : 1,
        transform: phase === "exit" ? "scale(1.04)" : "scale(1)",
        pointerEvents: phase === "exit" ? "none" : "auto",
      }}
    >
      {/* Background ambient glowing orbs */}
      <div
        style={{
          position: "absolute",
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0, 117, 177, 0.35) 0%, rgba(94, 92, 230, 0.15) 50%, transparent 70%)",
          filter: "blur(40px)",
          animation: "splashPulse 2.4s ease-in-out infinite alternate",
          pointerEvents: "none",
        }}
      />

      <div
        className="splash-content"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Animated Icon Glass Pod */}
        <div
          className="splash-logo-pod"
          style={{
            position: "relative",
            width: 104,
            height: 104,
            borderRadius: 28,
            padding: 16,
            display: "grid",
            placeItems: "center",
            background: "linear-gradient(145deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.03) 100%)",
            border: "1px solid rgba(255, 255, 255, 0.22)",
            boxShadow: "0 20px 50px rgba(0, 117, 177, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.4)",
            animation: "splashFloat 3s ease-in-out infinite alternate, splashScale 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          {/* Glowing ring animation */}
          <div
            style={{
              position: "absolute",
              inset: -3,
              borderRadius: 31,
              background: "linear-gradient(135deg, rgba(0, 117, 177, 0.6), rgba(94, 92, 230, 0.6))",
              zIndex: -1,
              opacity: 0.6,
              filter: "blur(6px)",
              animation: "splashSpin 4s linear infinite",
            }}
          />

          <Image
            src="/zanrab_icon.svg"
            alt="ZanRab"
            width={72}
            height={72}
            priority
            style={{
              filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.3))",
            }}
          />
        </div>

        {/* Brand Text & Typography */}
        <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <div
            style={{
              fontSize: 28,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              background: "linear-gradient(135deg, #ffffff 40%, #7ec4ff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 10px 24px rgba(0,0,0,0.3)",
            }}
          >
            ZanRab
          </div>
          <div
            style={{
              fontSize: 12.5,
              fontWeight: 500,
              color: "rgba(255, 255, 255, 0.65)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            AI Construction Cost Estimator
          </div>
        </div>

        {/* Minimal iOS Loading Progress Bar */}
        <div
          style={{
            width: 140,
            height: 3.5,
            borderRadius: 99,
            background: "rgba(255, 255, 255, 0.1)",
            overflow: "hidden",
            marginTop: 10,
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              width: "45%",
              borderRadius: 99,
              background: "linear-gradient(90deg, #0075b1, #60a5fa)",
              animation: "splashBar 1.4s ease-in-out infinite alternate",
            }}
          />
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useRef, useState } from "react";
import type { Plan, Wall, Opening, Room } from "@/lib/types";
import { dist, pointToSegment, round, wallLength } from "@/lib/geometry";
import { MousePointer, Eye, EyeOff, Ruler } from "lucide-react";

interface PlanCanvasProps {
  plan: Plan;
  imageUrl: string | null;
  onUpdatePlan: (updated: Plan) => void;
  selectedId: string | null;
  onSelect: (id: string | null, type: "wall" | "opening" | "room" | null) => void;
}

export function PlanCanvas({
  plan,
  imageUrl,
  onUpdatePlan,
  selectedId,
  onSelect,
}: PlanCanvasProps) {
  const [showImg, setShowImg] = useState(true);
  const [showDim, setShowDim] = useState(true);
  const [activeTool, setActiveTool] = useState<"select" | "add_wall">("select");
  const [dragging, setDragging] = useState<{
    id: string;
    target: "a" | "b" | "center";
  } | null>(null);

  const svgRef = useRef<SVGSVGElement | null>(null);

  const { width: W, depth: D } = plan.outline;
  const padding = 1.2;
  const viewBox = `${-padding} ${-padding} ${W + padding * 2} ${D + padding * 2}`;

  const getSvgCoords = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const pt = svgRef.current.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const ctm = svgRef.current.getScreenCTM();
    if (!ctm) return { x: 0, y: 0 };
    const svgP = pt.matrixTransform(ctm.inverse());
    return { x: round(svgP.x, 3), y: round(svgP.y, 3) };
  };

  const handleMouseDownNode = (
    e: React.MouseEvent,
    wallId: string,
    target: "a" | "b"
  ) => {
    e.stopPropagation();
    onSelect(wallId, "wall");
    setDragging({ id: wallId, target });
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!dragging) return;
    const { x, y } = getSvgCoords(e);
    const updatedWalls = plan.walls.map((w) => {
      if (w.id === dragging.id) {
        if (dragging.target === "a") {
          return { ...w, a: { x, y } };
        } else {
          return { ...w, b: { x, y } };
        }
      }
      return w;
    });
    onUpdatePlan({ ...plan, walls: updatedWalls });
  };

  const handleMouseUp = () => {
    if (dragging) {
      setDragging(null);
    }
  };

  return (
    <div className="col" style={{ gap: 12 }}>
      {/* Editor Top Bar Toolbar */}
      <div className="row wrap justify-between items-center" style={{ gap: 8 }}>
        <div className="toolbar">
          <button
            type="button"
            className="btn btn-sm"
            data-active={activeTool === "select"}
            onClick={() => setActiveTool("select")}
          >
            <MousePointer size={14} />
            <span>Pilih & Geser</span>
          </button>
          <button
            type="button"
            className="btn btn-sm"
            data-active={showImg}
            onClick={() => setShowImg(!showImg)}
          >
            {showImg ? <EyeOff size={14} /> : <Eye size={14} />}
            <span>{showImg ? "Sembunyikan Denah" : "Tampilkan Denah"}</span>
          </button>
          <button
            type="button"
            className="btn btn-sm"
            data-active={showDim}
            onClick={() => setShowDim(!showDim)}
          >
            <Ruler size={14} />
            <span>{showDim ? "Dimensi Aktif" : "Dimensi Nonaktif"}</span>
          </button>
        </div>
        <div className="row" style={{ gap: 6 }}>
          <span className="badge blue">
            {W}m × {D}m ({round(W * D, 1)} m²)
          </span>
          <span className="badge purple">{plan.walls.length} Dinding</span>
          <span className="badge green">{plan.openings.length} Bukaan</span>
          <span className="badge orange">{plan.rooms.length} Ruang</span>
        </div>
      </div>

      {/* Interactive Visual Viewport */}
      <div
        className="editor glass"
        data-dim={showImg}
        style={{
          width: "100%",
          aspectRatio: `${W + padding * 2} / ${D + padding * 2}`,
          maxHeight: "560px",
          position: "relative",
          background: "var(--bg-2)",
        }}
      >
        {imageUrl && showImg && (
          <img
            src={imageUrl}
            alt="Denah Asli"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain",
              opacity: 0.38,
              pointerEvents: "none",
            }}
          />
        )}

        <svg
          ref={svgRef}
          viewBox={viewBox}
          style={{ width: "100%", height: "100%", display: "block" }}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onClick={() => onSelect(null, null)}
        >
          <defs>
            <pattern
              id="grid"
              width="1"
              height="1"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 1 0 L 0 0 0 1"
                fill="none"
                stroke="rgba(0,0,0,0.06)"
                strokeWidth="0.04"
              />
            </pattern>
          </defs>
          <rect
            x={-padding}
            y={-padding}
            width={W + padding * 2}
            height={D + padding * 2}
            fill="url(#grid)"
          />

          {/* Batas Outline Bangunan */}
          <rect
            x={0}
            y={0}
            width={W}
            height={D}
            fill="none"
            stroke="rgba(10, 132, 255, 0.4)"
            strokeWidth="0.04"
            strokeDasharray="0.2 0.2"
          />

          {/* Rooms (Polygons) */}
          {plan.rooms.map((r) => {
            const isSel = selectedId === r.id;
            const pts = r.polygon.map((p) => `${p.x},${p.y}`).join(" ");
            // compute center for label
            const cx =
              r.polygon.reduce((a, b) => a + b.x, 0) / (r.polygon.length || 1);
            const cy =
              r.polygon.reduce((a, b) => a + b.y, 0) / (r.polygon.length || 1);

            return (
              <g key={r.id}>
                <polygon
                  points={pts}
                  className={`room ${isSel ? "sel" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(r.id, "room");
                  }}
                />
                {/* Font kecil (0,26 m) dirender rusak di Chrome; render 13px lalu diskalakan */}
                <text
                  transform={`translate(${cx} ${cy}) scale(0.02)`}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="room-label"
                  fontSize={13}
                >
                  {r.name}
                </text>
              </g>
            );
          })}

          {/* Walls */}
          {plan.walls.map((w) => {
            const isSel = selectedId === w.id;
            return (
              <g key={w.id}>
                <line
                  x1={w.a.x}
                  y1={w.a.y}
                  x2={w.b.x}
                  y2={w.b.y}
                  strokeWidth={w.thickness || 0.15}
                  className={`wall ${w.exterior ? "ext" : ""} ${
                    isSel ? "sel" : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(w.id, "wall");
                  }}
                />
                {/* Drag Handles if selected */}
                {isSel && (
                  <>
                    <circle
                      cx={w.a.x}
                      cy={w.a.y}
                      r="0.16"
                      className="handle"
                      onMouseDown={(e) => handleMouseDownNode(e, w.id, "a")}
                    />
                    <circle
                      cx={w.b.x}
                      cy={w.b.y}
                      r="0.16"
                      className="handle"
                      onMouseDown={(e) => handleMouseDownNode(e, w.id, "b")}
                    />
                  </>
                )}
              </g>
            );
          })}

          {/* Openings (Doors & Windows) */}
          {plan.openings.map((o) => {
            const isSel = selectedId === o.id;
            const isDoor = o.type === "door";
            const wall = plan.walls.find((w) => w.id === o.wallId);
            let dx = 1, dy = 0;
            if (wall) {
              const L = Math.hypot(wall.b.x - wall.a.x, wall.b.y - wall.a.y) || 1;
              dx = (wall.b.x - wall.a.x) / L;
              dy = (wall.b.y - wall.a.y) / L;
            }
            const h = o.width / 2;
            const p1 = { x: o.at.x - dx * h, y: o.at.y - dy * h };
            const p2 = { x: o.at.x + dx * h, y: o.at.y + dy * h };
            // daun pintu: tegak lurus dinding dari p1, busur seperempat lingkaran ke p2
            const nx = -dy, ny = dx;
            const q = { x: p1.x + nx * o.width, y: p1.y + ny * o.width };
            const sweep = nx * dy - ny * dx > 0 ? 1 : 0;
            const color = isSel ? "var(--orange)" : isDoor ? "var(--accent)" : "var(--accent-2)";
            return (
              <g
                key={o.id}
                className="opening"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(o.id, "opening");
                }}
              >
                <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="transparent" strokeWidth={0.45} />
                <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="#ffffff" strokeWidth={0.17} />
                {isDoor ? (
                  <>
                    <path
                      d={`M ${p1.x} ${p1.y} L ${q.x} ${q.y} A ${o.width} ${o.width} 0 0 ${sweep} ${p2.x} ${p2.y}`}
                      fill={isSel ? "rgba(255,159,10,0.12)" : "rgba(10,132,255,0.08)"}
                      stroke={color}
                      strokeWidth={0.035}
                      strokeDasharray="0.08 0.05"
                    />
                    <line x1={p1.x} y1={p1.y} x2={q.x} y2={q.y} stroke={color} strokeWidth={0.06} strokeLinecap="round" />
                  </>
                ) : (
                  <>
                    <line x1={p1.x - nx * 0.04} y1={p1.y - ny * 0.04} x2={p2.x - nx * 0.04} y2={p2.y - ny * 0.04} stroke={color} strokeWidth={0.035} />
                    <line x1={p1.x + nx * 0.04} y1={p1.y + ny * 0.04} x2={p2.x + nx * 0.04} y2={p2.y + ny * 0.04} stroke={color} strokeWidth={0.035} />
                  </>
                )}
              </g>
            );
          })}

          {/* Dimension Chains */}
          {showDim &&
            plan.chains.map((chain, cIdx) => {
              if (chain.side === "top") {
                let curX = 0;
                return (
                  <g key={`top-${cIdx}`}>
                    {chain.segments.map((seg, sIdx) => {
                      const x1 = curX;
                      const x2 = curX + seg;
                      const mid = (x1 + x2) / 2;
                      curX += seg;
                      return (
                        <g key={sIdx}>
                          <line
                            x1={x1}
                            y1={-0.3}
                            x2={x2}
                            y2={-0.3}
                            stroke="#8a8f98"
                            strokeWidth="0.02"
                          />
                          <text
                            transform={`translate(${mid} -0.42) scale(0.02)`}
                            fontSize={10}
                            textAnchor="middle"
                            fill="var(--text-2)"
                          >
                            {seg}m
                          </text>
                        </g>
                      );
                    })}
                  </g>
                );
              }
              return null;
            })}
        </svg>
      </div>
      <div className="faint text-center" style={{ fontSize: 12.5 }}>
        Klik garis dinding untuk memunculkan tuas edit titik. Seret node lingkaran untuk menyelaraskan as dinding.
      </div>
    </div>
  );
}

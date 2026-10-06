module.exports = [
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[project]/src/app/api/analyze/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST,
    "maxDuration",
    ()=>maxDuration,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ai$2f$providers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/ai/providers.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$geometry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/geometry.ts [app-route] (ecmascript)");
;
;
;
const runtime = "nodejs";
const maxDuration = 300;
async function GET() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        gemini: Boolean(process.env.GEMINI_API_KEY),
        claude: Boolean(process.env.ANTHROPIC_API_KEY),
        geminiModel: process.env.GEMINI_MODEL || "gemini-3.1-pro-preview",
        claudeModel: process.env.CLAUDE_MODEL || "claude-opus-5-5"
    });
}
async function POST(req) {
    try {
        const { image, provider } = await req.json();
        const m = /^data:(image\/(?:png|jpeg|webp|gif));base64,(.+)$/.exec(image ?? "");
        if (!m) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Format gambar tidak didukung (PNG/JPG/WEBP)"
        }, {
            status: 400
        });
        // Key milik user (opsional) dikirim via header, tidak pernah disimpan di server
        const keys = {
            gemini: req.headers.get("x-gemini-key") || undefined,
            claude: req.headers.get("x-anthropic-key") || undefined
        };
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ai$2f$providers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["extractPlan"])(provider ?? "gemini", m[2], m[1], keys);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            plan: result.plan,
            meta: {
                provider: result.provider,
                model: result.model,
                durationMs: result.durationMs,
                consensus: result.consensus
            },
            issues: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$geometry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validatePlan"])(result.plan)
        });
    } catch (e) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: e instanceof Error ? e.message : String(e)
        }, {
            status: 500
        });
    }
}
}),
"[project]/src/lib/ai/prompt.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Prompt & JSON schema untuk ekstraksi denah oleh AI Vision.
 * Prinsip: AI hanya MEMBACA gambar → JSON geometri. Semua hitungan volume dilakukan engine deterministik.
 */ __turbopack_context__.s([
    "EXTRACTION_PROMPT",
    ()=>EXTRACTION_PROMPT,
    "PLAN_JSON_SCHEMA",
    ()=>PLAN_JSON_SCHEMA
]);
const EXTRACTION_PROMPT = `Kamu adalah quantity surveyor & drafter senior Indonesia. Tugasmu MEMBACA gambar denah rumah ini dan mengubahnya menjadi data geometri JSON yang presisi. JANGAN menghitung biaya.

SISTEM KOORDINAT
- Satuan METER. Origin (0,0) = pojok KIRI-ATAS sisi LUAR bangunan. Sumbu X ke kanan, sumbu Y ke BAWAH.
- outline.width = lebar total luar (arah X), outline.depth = panjang total luar (arah Y).

LANGKAH WAJIB (ikuti berurutan, teliti):
1. BACA SEMUA RANTAI DIMENSI di keempat sisi gambar (top/bottom/left/right). Tulis setiap segmen persis seperti angka di gambar, urut dari kiri→kanan (top/bottom) atau atas→bawah (left/right). Koma desimal Indonesia "0,15" = 0.15. Total = angka dimensi keseluruhan di sisi itu.
   Pastikan jumlah segmen = total. Jika ada sisi tanpa dimensi, lewati sisi itu.
2. Tentukan tebal dinding (wallThickness), biasanya segmen kecil berulang seperti 0.15 atau 0.1.
3. Bangun GRID: posisi as dinding = kumulatif segmen + setengah tebal dinding. Contoh rantai [0.15, 3, 0.15] → as dinding di x=0.075 dan x=3.225.
4. DINDING: tulis setiap dinding sebagai garis AS (centerline) lurus a→b dalam meter. Gunakan koordinat grid dari langkah 3 sebisa mungkin. Pecah dinding hanya di pertemuan/ujung. exterior=true untuk dinding keliling luar (termasuk dinding depan yang mundur membentuk teras). Dinding yang tidak ada di rantai dimensi (mis. partisi KM) estimasikan dari dimensi ruang yang tertulis (mis. label "1,5m").
   Jangan buat dinding di area terbuka (open plan) tanpa garis dinding di gambar.
5. BUKAAN: setiap pintu (busur ayun / simbol pintu), jendela (garis ganda tipis / simbol kaca pada dinding), dan bukaan tanpa daun (passage). Isi:
   - at = titik tengah bukaan di as dinding, width = lebar (pakai label seperti "0,9m" bila ada), leaves = jumlah daun (jendela dengan pembagi tengah = 2),
   - wallId = id dinding tempatnya, material "pvc" untuk pintu kamar mandi, selain itu "kayu".
6. RUANG: setiap ruang/area beserta nama label di gambar, polygon LANTAI BERSIH (sisi dalam dinding) dalam meter, dan type (kamar|kamar_mandi|dapur|ruang_tamu|ruang_keluarga|musholla|teras|carport|gudang|selasar|lainnya). Area sirkulasi tanpa label (lorong/selasar) juga dimasukkan sebagai "selasar". Teras di dalam outline juga dimasukkan. Ruang open-plan boleh digabung menjadi satu polygon.
7. KALIBRASI: calibration.outerBox = [ymin, xmin, ymax, xmax] kotak sisi LUAR bangunan pada gambar, ternormalisasi 0-1000 terhadap tinggi & lebar gambar.
8. notes: catat ketidakpastian (angka buram, dimensi yang diasumsikan, simbol ambigu).

ATURAN KETELITIAN
- Prioritaskan angka dimensi tertulis di atas ukuran piksel.
- Semua dinding harus berada di dalam outline. Ruang tidak boleh tumpang tindih.
- Gunakan id unik pendek: w1, w2, ... untuk dinding; d1.. pintu, j1.. jendela, b1.. passage; r1.. ruang.
- Jawab HANYA dengan JSON sesuai skema.`;
const point = {
    type: "object",
    properties: {
        x: {
            type: "number"
        },
        y: {
            type: "number"
        }
    },
    required: [
        "x",
        "y"
    ]
};
const PLAN_JSON_SCHEMA = {
    type: "object",
    properties: {
        outline: {
            type: "object",
            properties: {
                width: {
                    type: "number"
                },
                depth: {
                    type: "number"
                }
            },
            required: [
                "width",
                "depth"
            ]
        },
        wallThickness: {
            type: "number"
        },
        chains: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    side: {
                        type: "string",
                        enum: [
                            "top",
                            "bottom",
                            "left",
                            "right"
                        ]
                    },
                    segments: {
                        type: "array",
                        items: {
                            type: "number"
                        }
                    },
                    total: {
                        type: "number"
                    }
                },
                required: [
                    "side",
                    "segments",
                    "total"
                ]
            }
        },
        walls: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    id: {
                        type: "string"
                    },
                    a: point,
                    b: point,
                    exterior: {
                        type: "boolean"
                    }
                },
                required: [
                    "id",
                    "a",
                    "b",
                    "exterior"
                ]
            }
        },
        openings: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    id: {
                        type: "string"
                    },
                    type: {
                        type: "string",
                        enum: [
                            "door",
                            "window",
                            "passage"
                        ]
                    },
                    wallId: {
                        type: "string"
                    },
                    at: point,
                    width: {
                        type: "number"
                    },
                    leaves: {
                        type: "integer"
                    },
                    material: {
                        type: "string",
                        enum: [
                            "kayu",
                            "pvc",
                            "aluminium",
                            "kaca"
                        ]
                    },
                    label: {
                        type: "string"
                    }
                },
                required: [
                    "id",
                    "type",
                    "wallId",
                    "at",
                    "width",
                    "leaves"
                ]
            }
        },
        rooms: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    id: {
                        type: "string"
                    },
                    name: {
                        type: "string"
                    },
                    type: {
                        type: "string",
                        enum: [
                            "kamar",
                            "kamar_mandi",
                            "dapur",
                            "ruang_tamu",
                            "ruang_keluarga",
                            "musholla",
                            "teras",
                            "carport",
                            "gudang",
                            "selasar",
                            "lainnya"
                        ]
                    },
                    polygon: {
                        type: "array",
                        items: point
                    }
                },
                required: [
                    "id",
                    "name",
                    "type",
                    "polygon"
                ]
            }
        },
        calibration: {
            type: "object",
            properties: {
                outerBox: {
                    type: "array",
                    items: {
                        type: "number"
                    }
                }
            },
            required: [
                "outerBox"
            ]
        },
        notes: {
            type: "array",
            items: {
                type: "string"
            }
        }
    },
    required: [
        "outline",
        "wallThickness",
        "chains",
        "walls",
        "openings",
        "rooms",
        "calibration",
        "notes"
    ]
};
}),
"[project]/src/lib/ai/providers.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "extractPlan",
    ()=>extractPlan,
    "qualityScore",
    ()=>qualityScore,
    "sanitizePlan",
    ()=>sanitizePlan
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$geometry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/geometry.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ai$2f$prompt$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/ai/prompt.ts [app-route] (ecmascript)");
;
;
const GEMINI_MODEL = ()=>process.env.GEMINI_MODEL || "gemini-3.1-pro-preview";
const CLAUDE_MODEL = ()=>process.env.CLAUDE_MODEL || "claude-opus-5-5";
// ----------------------------------------------------------------------------
// Gemini — spatial reasoning & bounding box kuat
// ----------------------------------------------------------------------------
async function callGemini(imageB64, mime, key) {
    const model = GEMINI_MODEL();
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
    const body = (withSchema)=>({
            contents: [
                {
                    role: "user",
                    parts: [
                        {
                            inline_data: {
                                mime_type: mime,
                                data: imageB64
                            }
                        },
                        {
                            text: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ai$2f$prompt$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EXTRACTION_PROMPT"]
                        }
                    ]
                }
            ],
            generationConfig: {
                temperature: 0,
                responseMimeType: "application/json",
                ...withSchema ? {
                    responseJsonSchema: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ai$2f$prompt$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PLAN_JSON_SCHEMA"]
                } : {},
                mediaResolution: "MEDIA_RESOLUTION_HIGH"
            }
        });
    const post = (withSchema)=>fetch(url, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "x-goog-api-key": key
            },
            body: JSON.stringify(body(withSchema))
        });
    let res = await post(true);
    if (res.status === 400) res = await post(false); // fallback bila endpoint menolak field skema
    if (!res.ok) throw new Error(`Gemini ${res.status}: ${(await res.text()).slice(0, 400)}`);
    const json = await res.json();
    const text = json?.candidates?.[0]?.content?.parts?.map((p)=>p.text ?? "").join("") ?? "";
    return parseJsonLoose(text);
}
// ----------------------------------------------------------------------------
// Claude — OCR angka & kepatuhan instruksi sangat presisi (structured via tool use)
// ----------------------------------------------------------------------------
async function callClaude(imageB64, mime, key) {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "x-api-key": key,
            "anthropic-version": "2023-06-01"
        },
        body: JSON.stringify({
            model: CLAUDE_MODEL(),
            max_tokens: 16000,
            tools: [
                {
                    name: "submit_plan",
                    description: "Kirim hasil ekstraksi denah",
                    input_schema: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ai$2f$prompt$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PLAN_JSON_SCHEMA"]
                }
            ],
            tool_choice: {
                type: "tool",
                name: "submit_plan"
            },
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "image",
                            source: {
                                type: "base64",
                                media_type: mime,
                                data: imageB64
                            }
                        },
                        {
                            type: "text",
                            text: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ai$2f$prompt$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EXTRACTION_PROMPT"]
                        }
                    ]
                }
            ]
        })
    });
    if (!res.ok) throw new Error(`Claude ${res.status}: ${(await res.text()).slice(0, 400)}`);
    const json = await res.json();
    const tool = json?.content?.find((c)=>c.type === "tool_use");
    if (tool?.input) return tool.input;
    const text = json?.content?.map((c)=>c.text ?? "").join("") ?? "";
    return parseJsonLoose(text);
}
function parseJsonLoose(text) {
    const s = text.trim().replace(/^```(?:json)?/i, "").replace(/```$/, "");
    const start = s.indexOf("{");
    const end = s.lastIndexOf("}");
    if (start < 0 || end < 0) throw new Error("Respons AI bukan JSON");
    return JSON.parse(s.slice(start, end + 1));
}
const numOr = (v, d = 0)=>typeof v === "number" && Number.isFinite(v) ? v : typeof v === "string" ? Number(v.replace(",", ".")) || d : d;
const pt = (p)=>({
        x: numOr(p?.x),
        y: numOr(p?.y)
    });
function sanitizePlan(raw) {
    const t = numOr(raw.wallThickness, 0.15) || 0.15;
    const plan = {
        outline: {
            width: numOr(raw.outline?.width),
            depth: numOr(raw.outline?.depth)
        },
        wallThickness: t,
        chains: (raw.chains ?? []).map((c)=>({
                side: c.side,
                segments: (c.segments ?? []).map((s)=>numOr(s)),
                total: numOr(c.total)
            })),
        walls: (raw.walls ?? []).map((w, i)=>({
                id: String(w.id ?? `w${i + 1}`),
                a: pt(w.a),
                b: pt(w.b),
                thickness: t,
                exterior: Boolean(w.exterior)
            })),
        openings: (raw.openings ?? []).map((o, i)=>({
                id: String(o.id ?? `o${i + 1}`),
                type: [
                    "door",
                    "window",
                    "passage"
                ].includes(o.type) ? o.type : "door",
                wallId: o.wallId ? String(o.wallId) : null,
                at: pt(o.at),
                width: numOr(o.width, 0.8),
                height: o.type === "window" ? 1.2 : 2.1,
                leaves: Math.max(1, Math.round(numOr(o.leaves, 1))),
                material: o.type === "door" ? o.material === "pvc" ? "pvc" : o.material ?? "kayu" : undefined,
                label: o.label
            })),
        rooms: (raw.rooms ?? []).map((r, i)=>({
                id: String(r.id ?? `r${i + 1}`),
                name: String(r.name ?? `Ruang ${i + 1}`),
                type: r.type ?? "lainnya",
                polygon: (r.polygon ?? []).map(pt)
            })),
        columns: null,
        calibration: Array.isArray(raw.calibration?.outerBox) && raw.calibration.outerBox.length === 4 ? {
            outerBox: raw.calibration.outerBox.map((v)=>numOr(v))
        } : null,
        notes: Array.isArray(raw.notes) ? raw.notes.map(String) : []
    };
    // outline fallback dari rantai dimensi
    const top = plan.chains.find((c)=>c.side === "top" || c.side === "bottom");
    const left = plan.chains.find((c)=>c.side === "left" || c.side === "right");
    if (!plan.outline.width && top) plan.outline.width = top.total;
    if (!plan.outline.depth && left) plan.outline.depth = left.total;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$geometry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizePlan"])(plan);
}
function qualityScore(plan) {
    const issues = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$geometry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validatePlan"])(plan);
    let s = 100;
    for (const i of issues)s -= i.level === "error" ? 15 : i.level === "warning" ? 5 : 1;
    if (!plan.chains.length) s -= 20;
    if (!plan.rooms.length) s -= 20;
    return s;
}
function compare(a, b) {
    const ma = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$geometry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["planMetrics"])(a);
    const mb = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$geometry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["planMetrics"])(b);
    const metrics = [
        [
            "Lebar bangunan (m)",
            a.outline.width,
            b.outline.width
        ],
        [
            "Panjang bangunan (m)",
            a.outline.depth,
            b.outline.depth
        ],
        [
            "Panjang dinding (m)",
            ma.wallLength,
            mb.wallLength
        ],
        [
            "Luas lantai bersih (m²)",
            ma.netFloorArea,
            mb.netFloorArea
        ],
        [
            "Jumlah pintu",
            ma.doors,
            mb.doors
        ],
        [
            "Jumlah daun jendela",
            ma.windowLeaves,
            mb.windowLeaves
        ],
        [
            "Jumlah ruang",
            ma.roomCount,
            mb.roomCount
        ]
    ];
    return metrics.map(([metric, x, y])=>({
            metric,
            a: x,
            b: y,
            deltaPct: Math.max(x, y) > 0 ? Math.abs(x - y) / Math.max(x, y) * 100 : 0
        }));
}
async function extractPlan(provider, imageB64, mime, keys) {
    const t0 = Date.now();
    const gk = keys.gemini || process.env.GEMINI_API_KEY;
    const ck = keys.claude || process.env.ANTHROPIC_API_KEY;
    // Cek ketersediaan key
    if (provider === "gemini") {
        if (!gk) {
            throw new Error("GEMINI_API_KEY belum diset. Masukkan API Key di Pengaturan AI Vision atau .env.local");
        }
        const plan = sanitizePlan(await callGemini(imageB64, mime, gk));
        return {
            plan,
            provider: "Gemini",
            model: GEMINI_MODEL(),
            durationMs: Date.now() - t0
        };
    }
    if (provider === "claude") {
        if (!ck) {
            throw new Error("ANTHROPIC_API_KEY belum diset. Masukkan API Key di Pengaturan AI Vision atau .env.local");
        }
        const plan = sanitizePlan(await callClaude(imageB64, mime, ck));
        return {
            plan,
            provider: "Claude",
            model: CLAUDE_MODEL(),
            durationMs: Date.now() - t0
        };
    }
    // KONSENSUS: jika hanya satu key yang tersedia, fallback otomatis ke key yang ada
    if (gk && !ck) {
        const plan = sanitizePlan(await callGemini(imageB64, mime, gk));
        plan.notes.push("Mode konsensus beralih ke Gemini (ANTHROPIC_API_KEY belum diset)");
        return {
            plan,
            provider: "Gemini (Fallback Konsensus)",
            model: GEMINI_MODEL(),
            durationMs: Date.now() - t0
        };
    }
    if (!gk && ck) {
        const plan = sanitizePlan(await callClaude(imageB64, mime, ck));
        plan.notes.push("Mode konsensus beralih ke Claude (GEMINI_API_KEY belum diset)");
        return {
            plan,
            provider: "Claude (Fallback Konsensus)",
            model: CLAUDE_MODEL(),
            durationMs: Date.now() - t0
        };
    }
    if (!gk && !ck) {
        throw new Error("Belum ada API Key yang dikonfigurasi! Masukkan GEMINI_API_KEY atau ANTHROPIC_API_KEY di panel 'Pengaturan AI Vision' di samping, atau tambahkan di file .env.local.");
    }
    const [g, c] = await Promise.allSettled([
        callGemini(imageB64, mime, gk),
        callClaude(imageB64, mime, ck)
    ]);
    const pg = g.status === "fulfilled" ? sanitizePlan(g.value) : null;
    const pc = c.status === "fulfilled" ? sanitizePlan(c.value) : null;
    if (!pg && !pc) throw new Error(`Kedua model gagal: ${g.reason} | ${c.reason}`);
    if (!pg || !pc) {
        const plan = pg ?? pc;
        plan.notes.push(`Konsensus parsial: ${pg ? "Claude" : "Gemini"} gagal merespons`);
        return {
            plan,
            provider: pg ? "Gemini" : "Claude",
            model: pg ? GEMINI_MODEL() : CLAUDE_MODEL(),
            durationMs: Date.now() - t0
        };
    }
    const sg = qualityScore(pg);
    const sc = qualityScore(pc);
    const primaryIsG = sg >= sc;
    const primary = primaryIsG ? pg : pc;
    const diffs = compare(pg, pc);
    const agreement = diffs.reduce((acc, d)=>acc + (d.deltaPct <= 3 ? 1 : d.deltaPct <= 10 ? 0.5 : 0), 0) / diffs.length;
    for (const d of diffs.filter((x)=>x.deltaPct > 3))primary.notes.push(`⚠️ Model tidak sepakat soal ${d.metric}: Gemini ${d.a} vs Claude ${d.b} — cek manual`);
    return {
        plan: primary,
        provider: "Konsensus",
        model: `${GEMINI_MODEL()} + ${CLAUDE_MODEL()}`,
        durationMs: Date.now() - t0,
        consensus: {
            primary: primaryIsG ? "Gemini" : "Claude",
            agreementScore: agreement,
            diffs
        }
    };
}
}),
"[project]/src/lib/geometry.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EPS",
    ()=>EPS,
    "attachOpening",
    ()=>attachOpening,
    "detectColumns",
    ()=>detectColumns,
    "dist",
    ()=>dist,
    "gridFromChain",
    ()=>gridFromChain,
    "normalizePlan",
    ()=>normalizePlan,
    "openingArea",
    ()=>openingArea,
    "planMetrics",
    ()=>planMetrics,
    "pointToSegment",
    ()=>pointToSegment,
    "polygonArea",
    ()=>polygonArea,
    "polygonCentroid",
    ()=>polygonCentroid,
    "polygonPerimeter",
    ()=>polygonPerimeter,
    "rect",
    ()=>rect,
    "roomIsWet",
    ()=>roomIsWet,
    "round",
    ()=>round,
    "uid",
    ()=>uid,
    "validatePlan",
    ()=>validatePlan,
    "wallLength",
    ()=>wallLength
]);
const EPS = 0.02; // toleransi 2 cm
const round = (v, d = 2)=>Math.round(v * 10 ** d) / 10 ** d;
const dist = (p, q)=>Math.hypot(p.x - q.x, p.y - q.y);
const wallLength = (w)=>dist(w.a, w.b);
function uid(prefix = "id") {
    return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}
function polygonArea(poly) {
    let s = 0;
    for(let i = 0; i < poly.length; i++){
        const p = poly[i];
        const q = poly[(i + 1) % poly.length];
        s += p.x * q.y - q.x * p.y;
    }
    return Math.abs(s) / 2;
}
function polygonPerimeter(poly) {
    let s = 0;
    for(let i = 0; i < poly.length; i++)s += dist(poly[i], poly[(i + 1) % poly.length]);
    return s;
}
function polygonCentroid(poly) {
    const n = poly.length || 1;
    return {
        x: poly.reduce((a, p)=>a + p.x, 0) / n,
        y: poly.reduce((a, p)=>a + p.y, 0) / n
    };
}
const rect = (x, y, w, h)=>[
        {
            x,
            y
        },
        {
            x: x + w,
            y
        },
        {
            x: x + w,
            y: y + h
        },
        {
            x,
            y: y + h
        }
    ];
function pointToSegment(p, a, b) {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const len2 = dx * dx + dy * dy;
    let t = len2 === 0 ? 0 : ((p.x - a.x) * dx + (p.y - a.y) * dy) / len2;
    t = Math.max(0, Math.min(1, t));
    const proj = {
        x: a.x + t * dx,
        y: a.y + t * dy
    };
    return {
        d: dist(p, proj),
        t,
        proj
    };
}
function gridFromChain(chain, wallThickness) {
    const lines = [];
    let cur = 0;
    for (const seg of chain.segments){
        if (Math.abs(seg - wallThickness) <= EPS) lines.push(round(cur + seg / 2, 4));
        cur += seg;
    }
    return lines;
}
function normalizePlan(plan, snapTol = 0.12) {
    const t = plan.wallThickness;
    const gx = new Set();
    const gy = new Set();
    for (const c of plan.chains){
        const lines = gridFromChain(c, t);
        for (const l of lines)(c.side === "top" || c.side === "bottom" ? gx : gy).add(l);
    }
    const snap1 = (v, grid)=>{
        let best = v;
        let bd = snapTol;
        for (const g of grid){
            const d = Math.abs(g - v);
            if (d < bd) {
                bd = d;
                best = g;
            }
        }
        return round(best, 4);
    };
    let walls = plan.walls.map((w)=>{
        const a = {
            x: snap1(w.a.x, gx),
            y: snap1(w.a.y, gy)
        };
        const b = {
            x: snap1(w.b.x, gx),
            y: snap1(w.b.y, gy)
        };
        // luruskan dinding yang hampir ortogonal
        if (Math.abs(a.x - b.x) < snapTol) b.x = a.x;
        if (Math.abs(a.y - b.y) < snapTol) b.y = a.y;
        return {
            ...w,
            a,
            b,
            thickness: w.thickness || t
        };
    });
    // snap ujung ke ujung dinding lain / ke badan dinding (T-junction)
    const endpoints = walls.flatMap((w)=>[
            w.a,
            w.b
        ]);
    walls = walls.map((w)=>{
        const fix = (p, other)=>{
            for (const q of endpoints){
                if (q !== p && dist(p, q) < snapTol && dist(p, q) > 0) return {
                    ...q
                };
            }
            for (const ow of walls){
                if (ow.id === w.id) continue;
                const r = pointToSegment(p, ow.a, ow.b);
                if (r.d < snapTol && r.d > 0) {
                    // proyeksikan sepanjang arah dinding sendiri agar tetap ortogonal
                    if (Math.abs(p.x - other.x) < EPS) return {
                        x: p.x,
                        y: round(r.proj.y, 4)
                    };
                    if (Math.abs(p.y - other.y) < EPS) return {
                        x: round(r.proj.x, 4),
                        y: p.y
                    };
                    return {
                        x: round(r.proj.x, 4),
                        y: round(r.proj.y, 4)
                    };
                }
            }
            return p;
        };
        return {
            ...w,
            a: fix(w.a, w.b),
            b: fix(w.b, w.a)
        };
    });
    walls = walls.filter((w)=>wallLength(w) > EPS);
    const openings = plan.openings.map((o)=>attachOpening(o, walls));
    return {
        ...plan,
        walls,
        openings
    };
}
function attachOpening(o, walls) {
    let best = null;
    for (const w of walls){
        const r = pointToSegment(o.at, w.a, w.b);
        if (!best || r.d < best.d) best = {
            id: w.id,
            d: r.d,
            proj: r.proj
        };
    }
    if (!best || best.d > 0.6) return {
        ...o,
        wallId: o.wallId && walls.some((w)=>w.id === o.wallId) ? o.wallId : null
    };
    return {
        ...o,
        wallId: best.id,
        at: {
            x: round(best.proj.x, 4),
            y: round(best.proj.y, 4)
        }
    };
}
function detectColumns(walls, maxSpan) {
    const pts = [];
    const add = (p)=>{
        if (!pts.some((q)=>dist(p, q) < 0.1)) pts.push({
            x: round(p.x, 3),
            y: round(p.y, 3)
        });
    };
    for (const w of walls){
        add(w.a);
        add(w.b);
    }
    // kolom antara pada bentang panjang
    for (const w of walls){
        const onWall = pts.map((p)=>({
                p,
                r: pointToSegment(p, w.a, w.b)
            })).filter((o)=>o.r.d < 0.1).map((o)=>o.r.t).sort((a, b)=>a - b);
        const L = wallLength(w);
        for(let i = 0; i < onWall.length - 1; i++){
            const span = (onWall[i + 1] - onWall[i]) * L;
            if (span > maxSpan + EPS) {
                const n = Math.ceil(span / maxSpan);
                for(let k = 1; k < n; k++){
                    const tt = onWall[i] + (onWall[i + 1] - onWall[i]) * k / n;
                    add({
                        x: w.a.x + (w.b.x - w.a.x) * tt,
                        y: w.a.y + (w.b.y - w.a.y) * tt
                    });
                }
            }
        }
    }
    return pts;
}
function openingArea(o, doorH, winH) {
    const h = o.height || (o.type === "window" ? winH : doorH);
    return o.width * h;
}
function planMetrics(plan, doorH = 2.1, winH = 1.2) {
    const ext = plan.walls.filter((w)=>w.exterior).reduce((a, w)=>a + wallLength(w), 0);
    const all = plan.walls.reduce((a, w)=>a + wallLength(w), 0);
    const net = plan.rooms.reduce((a, r)=>a + polygonArea(r.polygon), 0);
    return {
        wallLength: round(all, 3),
        exteriorWallLength: round(ext, 3),
        interiorWallLength: round(all - ext, 3),
        grossArea: round(plan.outline.width * plan.outline.depth, 3),
        netFloorArea: round(net, 3),
        wallFootprint: round(plan.walls.reduce((a, w)=>a + wallLength(w) * w.thickness, 0), 3),
        doors: plan.openings.filter((o)=>o.type === "door").length,
        windows: plan.openings.filter((o)=>o.type === "window").length,
        windowLeaves: plan.openings.filter((o)=>o.type === "window").reduce((a, o)=>a + (o.leaves || 1), 0),
        passages: plan.openings.filter((o)=>o.type === "passage").length,
        openingArea: round(plan.openings.reduce((a, o)=>a + openingArea(o, doorH, winH), 0), 3),
        roomCount: plan.rooms.length
    };
}
function validatePlan(plan) {
    const issues = [];
    const { width, depth } = plan.outline;
    for (const c of plan.chains){
        const sum = c.segments.reduce((a, b)=>a + b, 0);
        if (Math.abs(sum - c.total) > EPS) issues.push({
            level: "error",
            message: `Rantai dimensi ${c.side}: jumlah segmen ${round(sum, 3)} m ≠ total ${c.total} m`
        });
        const expect = c.side === "top" || c.side === "bottom" ? width : depth;
        if (Math.abs(c.total - expect) > EPS) issues.push({
            level: "warning",
            message: `Total rantai ${c.side} (${c.total} m) beda dengan ukuran bangunan (${expect} m)`
        });
    }
    if (plan.chains.length === 0) issues.push({
        level: "warning",
        message: "Tidak ada rantai dimensi terbaca — skala belum terverifikasi"
    });
    for (const w of plan.walls){
        for (const p of [
            w.a,
            w.b
        ]){
            if (p.x < -EPS || p.y < -EPS || p.x > width + EPS || p.y > depth + EPS) issues.push({
                level: "error",
                message: `Dinding ${w.id} keluar dari batas bangunan`
            });
        }
    }
    // ujung dinding menggantung
    for (const w of plan.walls){
        for (const p of [
            w.a,
            w.b
        ]){
            const connected = plan.walls.some((o)=>o.id !== w.id && pointToSegment(p, o.a, o.b).d < 0.05);
            if (!connected) issues.push({
                level: "info",
                message: `Ujung dinding ${w.id} tidak tersambung (bisa wajar untuk bukaan)`
            });
        }
    }
    for (const o of plan.openings){
        const w = plan.walls.find((x)=>x.id === o.wallId);
        if (!w) issues.push({
            level: "warning",
            message: `${labelOpening(o)} tidak menempel di dinding manapun`
        });
        else if (o.width > wallLength(w) + EPS) issues.push({
            level: "error",
            message: `${labelOpening(o)} lebih lebar dari dindingnya`
        });
    }
    const m = planMetrics(plan);
    if (m.grossArea > 0 && plan.rooms.length) {
        const approx = m.netFloorArea + m.wallFootprint;
        const dev = Math.abs(approx - m.grossArea) / m.grossArea;
        if (dev > 0.08) issues.push({
            level: "warning",
            message: `Luas ruang + tapak dinding (${round(approx)} m²) beda ${round(dev * 100, 1)}% dari luas bruto (${m.grossArea} m²) — cek ruang yang terlewat`
        });
    }
    return dedupe(issues);
}
function labelOpening(o) {
    const t = o.type === "door" ? "Pintu" : o.type === "window" ? "Jendela" : "Bukaan";
    return `${t} ${o.label ?? o.id} (${o.width} m)`;
}
function dedupe(list) {
    const seen = new Set();
    return list.filter((i)=>seen.has(i.message) ? false : (seen.add(i.message), true));
}
function roomIsWet(r) {
    return r.type === "kamar_mandi";
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__14-2_8h._.js.map
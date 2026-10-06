module.exports = [
"[project]/src/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

var e = new Error("Could not parse module '[project]/src/app/page.tsx'\n\nUnexpected token. Did you mean `{'}'}` or `&rbrace;`?");
e.code = 'MODULE_UNPARSABLE';
throw e;
}),
"[project]/src/components/ParamsEditor.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ParamsEditor",
    ()=>ParamsEditor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$vertical$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sliders$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sliders-vertical.mjs [app-ssr] (ecmascript) <export default as Sliders>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$complex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/building-complex.mjs [app-ssr] (ecmascript) <export default as Building2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/house.mjs [app-ssr] (ecmascript) <export default as Home>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$paintbrush$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Paintbrush$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/paintbrush.mjs [app-ssr] (ecmascript) <export default as Paintbrush>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/dollar-sign.mjs [app-ssr] (ecmascript) <export default as DollarSign>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2d$2$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings-2.mjs [app-ssr] (ecmascript) <export default as Settings2>");
"use client";
;
;
;
function ParamsEditor({ params, onChange }) {
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("umum");
    const setVal = (key, val)=>{
        onChange({
            ...params,
            [key]: val
        });
    };
    const tabIcons = {
        umum: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$vertical$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sliders$3e$__["Sliders"], {
            size: 14
        }, void 0, false, {
            fileName: "[project]/src/components/ParamsEditor.tsx",
            lineNumber: 20,
            columnNumber: 11
        }, this),
        struktur: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$complex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__["Building2"], {
            size: 14
        }, void 0, false, {
            fileName: "[project]/src/components/ParamsEditor.tsx",
            lineNumber: 21,
            columnNumber: 15
        }, this),
        atap: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__["Home"], {
            size: 14
        }, void 0, false, {
            fileName: "[project]/src/components/ParamsEditor.tsx",
            lineNumber: 22,
            columnNumber: 11
        }, this),
        finishing: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$paintbrush$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Paintbrush$3e$__["Paintbrush"], {
            size: 14
        }, void 0, false, {
            fileName: "[project]/src/components/ParamsEditor.tsx",
            lineNumber: 23,
            columnNumber: 16
        }, this),
        komersial: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__["DollarSign"], {
            size: 14
        }, void 0, false, {
            fileName: "[project]/src/components/ParamsEditor.tsx",
            lineNumber: 24,
            columnNumber: 16
        }, this)
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "card glass col",
        style: {
            gap: 16
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "row wrap justify-between items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "row items-center",
                        style: {
                            gap: 8
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2d$2$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings2$3e$__["Settings2"], {
                                size: 18,
                                color: "var(--accent)"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ParamsEditor.tsx",
                                lineNumber: 31,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                style: {
                                    margin: 0
                                },
                                children: "Parameter Spesifikasi Teknis"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ParamsEditor.tsx",
                                lineNumber: 32,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ParamsEditor.tsx",
                        lineNumber: 30,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "segmented",
                        children: [
                            "umum",
                            "struktur",
                            "atap",
                            "finishing",
                            "komersial"
                        ].map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                "data-active": activeTab === tab,
                                onClick: ()=>setActiveTab(tab),
                                className: "row items-center",
                                style: {
                                    gap: 6,
                                    textTransform: "capitalize"
                                },
                                children: [
                                    tabIcons[tab],
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: tab
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ParamsEditor.tsx",
                                        lineNumber: 45,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, tab, true, {
                                fileName: "[project]/src/components/ParamsEditor.tsx",
                                lineNumber: 36,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/ParamsEditor.tsx",
                        lineNumber: 34,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ParamsEditor.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            activeTab === "umum" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "field",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                children: "Jumlah Lantai Bangunan"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ParamsEditor.tsx",
                                lineNumber: 54,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                className: "input",
                                value: params.floorCount || 1,
                                onChange: (e)=>setVal("floorCount", parseInt(e.target.value, 10) || 1),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "1",
                                        children: "1 Lantai (Standar Rumah Tinggal)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ParamsEditor.tsx",
                                        lineNumber: 60,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "2",
                                        children: "2 Lantai (+ Pelat Lantai Dak Beton Lantai 2)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ParamsEditor.tsx",
                                        lineNumber: 61,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "3",
                                        children: "3 Lantai (+ Pelat Lantai Dak Beton Lantai 2 & 3)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ParamsEditor.tsx",
                                        lineNumber: 62,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "4",
                                        children: "4 Lantai (+ Pelat Lantai Multi-Level)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ParamsEditor.tsx",
                                        lineNumber: 63,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ParamsEditor.tsx",
                                lineNumber: 55,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ParamsEditor.tsx",
                        lineNumber: 53,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "field",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                children: "Tinggi Dinding per Lantai (m)"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ParamsEditor.tsx",
                                lineNumber: 67,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                step: "0.05",
                                className: "input",
                                value: params.wallHeight,
                                onChange: (e)=>setVal("wallHeight", parseFloat(e.target.value) || 3.5)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ParamsEditor.tsx",
                                lineNumber: 68,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ParamsEditor.tsx",
                        lineNumber: 66,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ParamsEditor.tsx",
                lineNumber: 52,
                columnNumber: 9
            }, this),
            activeTab === "umum" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "field",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                children: "Peninggian Urug Tanah (m)"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ParamsEditor.tsx",
                                lineNumber: 82,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                step: "0.05",
                                className: "input",
                                value: params.fillHeight,
                                onChange: (e)=>setVal("fillHeight", parseFloat(e.target.value) || 0)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ParamsEditor.tsx",
                                lineNumber: 83,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ParamsEditor.tsx",
                        lineNumber: 81,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "field",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                children: "Bongkaran Gedung Lama (Rp)"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ParamsEditor.tsx",
                                lineNumber: 92,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                step: "500000",
                                className: "input",
                                value: params.demolitionLumpSum,
                                onChange: (e)=>setVal("demolitionLumpSum", parseFloat(e.target.value) || 0)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ParamsEditor.tsx",
                                lineNumber: 93,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ParamsEditor.tsx",
                        lineNumber: 91,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ParamsEditor.tsx",
                lineNumber: 80,
                columnNumber: 9
            }, this),
            activeTab === "umum" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "field",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                children: "Pilihan Material Dinding"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ParamsEditor.tsx",
                                lineNumber: 107,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                className: "input",
                                value: params.wallType || "bata_ringan",
                                onChange: (e)=>setVal("wallType", e.target.value),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "bata_ringan",
                                        children: "Bata Ringan / Hebel AAC (Ringan ~750 kg/m³, Cepat & Rapi)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ParamsEditor.tsx",
                                        lineNumber: 113,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "bata_merah",
                                        children: "Bata Merah Bakar Konvensional (Kuat, Berat ~1.750 kg/m³)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ParamsEditor.tsx",
                                        lineNumber: 114,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "batako",
                                        children: "Batako Press Semen (Ekonomis, Padat)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ParamsEditor.tsx",
                                        lineNumber: 115,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ParamsEditor.tsx",
                                lineNumber: 108,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ParamsEditor.tsx",
                        lineNumber: 106,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "field",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                children: "Tier Finishing & Kelengkapan"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ParamsEditor.tsx",
                                lineNumber: 119,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                className: "input",
                                value: params.tier || "medium",
                                onChange: (e)=>setVal("tier", e.target.value),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "standard",
                                        children: "Standard (Ekonomis, Keramik 40x40, Cat Standar)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ParamsEditor.tsx",
                                        lineNumber: 125,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "medium",
                                        children: 'Medium / Optimal (Granit 60x60, Kusen Alumunium 3", Cat Dulux/Catylac)'
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ParamsEditor.tsx",
                                        lineNumber: 126,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "luxury",
                                        children: "Luxury / Premium (Granit 80x80/Slab, Sanitari Kohler/Toto, Cat Jotun Top)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ParamsEditor.tsx",
                                        lineNumber: 127,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ParamsEditor.tsx",
                                lineNumber: 120,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ParamsEditor.tsx",
                        lineNumber: 118,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ParamsEditor.tsx",
                lineNumber: 105,
                columnNumber: 9
            }, this),
            ((params.floorCount || 1) > 1 || params.wallHeight > 3.8 || params.wallType === "bata_merah") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card",
                style: {
                    background: "rgba(234, 179, 8, 0.08)",
                    border: "1px solid rgba(234, 179, 8, 0.25)",
                    padding: "10px 14px",
                    borderRadius: 12,
                    fontSize: "0.82rem",
                    color: "var(--text-sub)",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$complex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__["Building2"], {
                        size: 16,
                        color: "var(--warning)",
                        style: {
                            flexShrink: 0,
                            marginTop: 2
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/ParamsEditor.tsx",
                        lineNumber: 149,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                style: {
                                    color: "var(--text-main)",
                                    display: "block",
                                    marginBottom: 2
                                },
                                children: "Analisa Struktur Rekayasa Sipil Otomatis Aktif:"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ParamsEditor.tsx",
                                lineNumber: 151,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                style: {
                                    margin: 0,
                                    paddingLeft: 16
                                },
                                children: [
                                    (params.floorCount || 1) > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: [
                                            "Bangunan ",
                                            params.floorCount,
                                            " lantai: Otomatis menghitung pelat dak beton lantai atas (t=12cm) & kapasitas beban vertikal kolom-balok bertingkat."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ParamsEditor.tsx",
                                        lineNumber: 156,
                                        columnNumber: 17
                                    }, this),
                                    params.wallHeight > 3.8 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: [
                                            "Tinggi dinding ",
                                            params.wallHeight,
                                            "m (>3.8m): Otomatis menambahkan balok pinggang / balok lintel praktis pengaku tekuk lentur."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ParamsEditor.tsx",
                                        lineNumber: 159,
                                        columnNumber: 17
                                    }, this),
                                    params.wallType === "bata_merah" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: "Bata Merah (beban mati 2.5x bata ringan): Direkomendasikan dimensi kolom min. 15x25 atau pembesian K-225 D13 ulir."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ParamsEditor.tsx",
                                        lineNumber: 162,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ParamsEditor.tsx",
                                lineNumber: 154,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ParamsEditor.tsx",
                        lineNumber: 150,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ParamsEditor.tsx",
                lineNumber: 135,
                columnNumber: 9
            }, this),
            activeTab === "struktur" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "col",
                style: {
                    gap: 14
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "field",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        children: "Tipe Pondasi"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ParamsEditor.tsx",
                                        lineNumber: 173,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        className: "input",
                                        value: params.foundation,
                                        onChange: (e)=>setVal("foundation", e.target.value),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "strauss_kumbung",
                                                children: "Strauss Pile + Batu Kumbung (Standar)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ParamsEditor.tsx",
                                                lineNumber: 179,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "batu_kali",
                                                children: "Pondasi Menerus Batu Kali 1:4"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ParamsEditor.tsx",
                                                lineNumber: 180,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "footplat_batu_kali",
                                                children: "Footplat Beton + Batu Kali"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ParamsEditor.tsx",
                                                lineNumber: 181,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ParamsEditor.tsx",
                                        lineNumber: 174,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ParamsEditor.tsx",
                                lineNumber: 172,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "field",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        children: "Kedalaman Strauss (m)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ParamsEditor.tsx",
                                        lineNumber: 185,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        step: "0.5",
                                        className: "input",
                                        value: params.straussDepth,
                                        onChange: (e)=>setVal("straussDepth", parseFloat(e.target.value) || 3)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ParamsEditor.tsx",
                                        lineNumber: 186,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ParamsEditor.tsx",
                                lineNumber: 184,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ParamsEditor.tsx",
                        lineNumber: 171,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "field",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        children: "Dimensi Sloof (Lebar x Tinggi)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ParamsEditor.tsx",
                                        lineNumber: 197,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "row",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                step: "0.01",
                                                className: "input",
                                                value: params.sloof.b,
                                                onChange: (e)=>setVal("sloof", {
                                                        ...params.sloof,
                                                        b: parseFloat(e.target.value) || 0.15
                                                    })
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ParamsEditor.tsx",
                                                lineNumber: 199,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "x"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ParamsEditor.tsx",
                                                lineNumber: 208,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                step: "0.01",
                                                className: "input",
                                                value: params.sloof.h,
                                                onChange: (e)=>setVal("sloof", {
                                                        ...params.sloof,
                                                        h: parseFloat(e.target.value) || 0.25
                                                    })
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ParamsEditor.tsx",
                                                lineNumber: 209,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ParamsEditor.tsx",
                                        lineNumber: 198,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ParamsEditor.tsx",
                                lineNumber: 196,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "field",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        children: "Dimensi Kolom Praktis"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ParamsEditor.tsx",
                                        lineNumber: 221,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "row",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                step: "0.01",
                                                className: "input",
                                                value: params.column.b,
                                                onChange: (e)=>setVal("column", {
                                                        ...params.column,
                                                        b: parseFloat(e.target.value) || 0.15
                                                    })
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ParamsEditor.tsx",
                                                lineNumber: 223,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "x"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ParamsEditor.tsx",
                                                lineNumber: 232,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                step: "0.01",
                                                className: "input",
                                                value: params.column.h,
                                                onChange: (e)=>setVal("column", {
                                                        ...params.column,
                                                        h: parseFloat(e.target.value) || 0.2
                                                    })
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ParamsEditor.tsx",
                                                lineNumber: 233,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ParamsEditor.tsx",
                                        lineNumber: 222,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ParamsEditor.tsx",
                                lineNumber: 220,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "field",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        children: "Tebal Rabat Lantai (m)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ParamsEditor.tsx",
                                        lineNumber: 245,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        step: "0.01",
                                        className: "input",
                                        value: params.floorSlabThickness,
                                        onChange: (e)=>setVal("floorSlabThickness", parseFloat(e.target.value) || 0.1)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ParamsEditor.tsx",
                                        lineNumber: 246,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ParamsEditor.tsx",
                                lineNumber: 244,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ParamsEditor.tsx",
                        lineNumber: 195,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ParamsEditor.tsx",
                lineNumber: 170,
                columnNumber: 9
            }, this),
            activeTab === "atap" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "field",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                children: "Bentuk Atap"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ParamsEditor.tsx",
                                lineNumber: 261,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                className: "input",
                                value: params.roofType,
                                onChange: (e)=>setVal("roofType", e.target.value),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "pelana",
                                        children: "Pelana (Gable)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ParamsEditor.tsx",
                                        lineNumber: 267,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "perisai",
                                        children: "Perisai / Limasan (Hip)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ParamsEditor.tsx",
                                        lineNumber: 268,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "dak",
                                        children: "Full Dak Beton"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ParamsEditor.tsx",
                                        lineNumber: 269,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ParamsEditor.tsx",
                                lineNumber: 262,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ParamsEditor.tsx",
                        lineNumber: 260,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "field",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                children: "Penutup Atap"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ParamsEditor.tsx",
                                lineNumber: 273,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                className: "input",
                                value: params.roofCover,
                                onChange: (e)=>setVal("roofCover", e.target.value),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "genteng_beton",
                                        children: "Genteng Beton Flat"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ParamsEditor.tsx",
                                        lineNumber: 279,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "genteng_metal",
                                        children: "Genteng Metal Pasir"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ParamsEditor.tsx",
                                        lineNumber: 280,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "spandek",
                                        children: "Spandek / Zincalume"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ParamsEditor.tsx",
                                        lineNumber: 281,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ParamsEditor.tsx",
                                lineNumber: 274,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ParamsEditor.tsx",
                        lineNumber: 272,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "field",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                children: "Kemiringan Sudut Atap (°)"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ParamsEditor.tsx",
                                lineNumber: 285,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                className: "input",
                                value: params.roofSlopeDeg,
                                onChange: (e)=>setVal("roofSlopeDeg", parseFloat(e.target.value) || 30)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ParamsEditor.tsx",
                                lineNumber: 286,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ParamsEditor.tsx",
                        lineNumber: 284,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ParamsEditor.tsx",
                lineNumber: 259,
                columnNumber: 9
            }, this),
            activeTab === "finishing" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "field",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                children: "Waste Keramik / Granit (%)"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ParamsEditor.tsx",
                                lineNumber: 299,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                step: "1",
                                className: "input",
                                value: Math.round(params.floorWaste * 100),
                                onChange: (e)=>setVal("floorWaste", (parseFloat(e.target.value) || 5) / 100)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ParamsEditor.tsx",
                                lineNumber: 300,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ParamsEditor.tsx",
                        lineNumber: 298,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "field",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                children: "Tinggi Keramik Dinding KM (m)"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ParamsEditor.tsx",
                                lineNumber: 309,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                step: "0.1",
                                className: "input",
                                value: params.wetWallTileHeight,
                                onChange: (e)=>setVal("wetWallTileHeight", parseFloat(e.target.value) || 1.8)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ParamsEditor.tsx",
                                lineNumber: 310,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ParamsEditor.tsx",
                        lineNumber: 308,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "field",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                children: "Meja Dapur Beton (m1)"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ParamsEditor.tsx",
                                lineNumber: 319,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                step: "0.5",
                                className: "input",
                                value: params.kitchenCounterLength,
                                onChange: (e)=>setVal("kitchenCounterLength", parseFloat(e.target.value) || 0)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ParamsEditor.tsx",
                                lineNumber: 320,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ParamsEditor.tsx",
                        lineNumber: 318,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ParamsEditor.tsx",
                lineNumber: 297,
                columnNumber: 9
            }, this),
            activeTab === "komersial" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "field",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                children: "Profit & Overhead (%)"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ParamsEditor.tsx",
                                lineNumber: 334,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                step: "1",
                                className: "input",
                                value: Math.round(params.overheadProfitPct * 100),
                                onChange: (e)=>setVal("overheadProfitPct", (parseFloat(e.target.value) || 10) / 100)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ParamsEditor.tsx",
                                lineNumber: 335,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ParamsEditor.tsx",
                        lineNumber: 333,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "field",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                children: "Sertakan PPN 11%?"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ParamsEditor.tsx",
                                lineNumber: 346,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "row items-center",
                                style: {
                                    height: 40
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "switch",
                                        "data-on": params.includePpn,
                                        onClick: ()=>setVal("includePpn", !params.includePpn)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ParamsEditor.tsx",
                                        lineNumber: 348,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "muted",
                                        children: params.includePpn ? "PPN Aktif (+11%)" : "Non-PPN"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ParamsEditor.tsx",
                                        lineNumber: 354,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ParamsEditor.tsx",
                                lineNumber: 347,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ParamsEditor.tsx",
                        lineNumber: 345,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "field",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                children: "Pembulatan Akhir (Rp)"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ParamsEditor.tsx",
                                lineNumber: 358,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                className: "input",
                                value: params.roundTo,
                                onChange: (e)=>setVal("roundTo", parseInt(e.target.value, 10) || 1000),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "1",
                                        children: "Tanpa Pembulatan"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ParamsEditor.tsx",
                                        lineNumber: 364,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "1000",
                                        children: "Ribuan Terdekat (1.000)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ParamsEditor.tsx",
                                        lineNumber: 365,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "100000",
                                        children: "Ratusan Ribu (100.000)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ParamsEditor.tsx",
                                        lineNumber: 366,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "1000000",
                                        children: "Juta Terdekat (1.000.000)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ParamsEditor.tsx",
                                        lineNumber: 367,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ParamsEditor.tsx",
                                lineNumber: 359,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ParamsEditor.tsx",
                        lineNumber: 357,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ParamsEditor.tsx",
                lineNumber: 332,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ParamsEditor.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/PlanCanvas.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PlanCanvas",
    ()=>PlanCanvas
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$geometry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/geometry.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mouse$2d$pointer$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MousePointer$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mouse-pointer.mjs [app-ssr] (ecmascript) <export default as MousePointer>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.mjs [app-ssr] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye-off.mjs [app-ssr] (ecmascript) <export default as EyeOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ruler$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Ruler$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/ruler.mjs [app-ssr] (ecmascript) <export default as Ruler>");
"use client";
;
;
;
;
function PlanCanvas({ plan, imageUrl, onUpdatePlan, selectedId, onSelect }) {
    const [showImg, setShowImg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [showDim, setShowDim] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [activeTool, setActiveTool] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("select");
    const [dragging, setDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const svgRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { width: W, depth: D } = plan.outline;
    const padding = 1.2;
    const viewBox = `${-padding} ${-padding} ${W + padding * 2} ${D + padding * 2}`;
    const getSvgCoords = (e)=>{
        if (!svgRef.current) return {
            x: 0,
            y: 0
        };
        const pt = svgRef.current.createSVGPoint();
        pt.x = e.clientX;
        pt.y = e.clientY;
        const ctm = svgRef.current.getScreenCTM();
        if (!ctm) return {
            x: 0,
            y: 0
        };
        const svgP = pt.matrixTransform(ctm.inverse());
        return {
            x: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$geometry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["round"])(svgP.x, 3),
            y: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$geometry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["round"])(svgP.y, 3)
        };
    };
    const handleMouseDownNode = (e, wallId, target)=>{
        e.stopPropagation();
        onSelect(wallId, "wall");
        setDragging({
            id: wallId,
            target
        });
    };
    const handleMouseMove = (e)=>{
        if (!dragging) return;
        const { x, y } = getSvgCoords(e);
        const updatedWalls = plan.walls.map((w)=>{
            if (w.id === dragging.id) {
                if (dragging.target === "a") {
                    return {
                        ...w,
                        a: {
                            x,
                            y
                        }
                    };
                } else {
                    return {
                        ...w,
                        b: {
                            x,
                            y
                        }
                    };
                }
            }
            return w;
        });
        onUpdatePlan({
            ...plan,
            walls: updatedWalls
        });
    };
    const handleMouseUp = ()=>{
        if (dragging) {
            setDragging(null);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "col",
        style: {
            gap: 12
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "row wrap justify-between items-center",
                style: {
                    gap: 8
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "toolbar",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "btn btn-sm",
                                "data-active": activeTool === "select",
                                onClick: ()=>setActiveTool("select"),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mouse$2d$pointer$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MousePointer$3e$__["MousePointer"], {
                                        size: 14
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/PlanCanvas.tsx",
                                        lineNumber: 91,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Pilih & Geser"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/PlanCanvas.tsx",
                                        lineNumber: 92,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/PlanCanvas.tsx",
                                lineNumber: 85,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "btn btn-sm",
                                "data-active": showImg,
                                onClick: ()=>setShowImg(!showImg),
                                children: [
                                    showImg ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__["EyeOff"], {
                                        size: 14
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/PlanCanvas.tsx",
                                        lineNumber: 100,
                                        columnNumber: 24
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                        size: 14
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/PlanCanvas.tsx",
                                        lineNumber: 100,
                                        columnNumber: 47
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: showImg ? "Sembunyikan Denah" : "Tampilkan Denah"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/PlanCanvas.tsx",
                                        lineNumber: 101,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/PlanCanvas.tsx",
                                lineNumber: 94,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "btn btn-sm",
                                "data-active": showDim,
                                onClick: ()=>setShowDim(!showDim),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ruler$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Ruler$3e$__["Ruler"], {
                                        size: 14
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/PlanCanvas.tsx",
                                        lineNumber: 109,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: showDim ? "Dimensi Aktif" : "Dimensi Nonaktif"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/PlanCanvas.tsx",
                                        lineNumber: 110,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/PlanCanvas.tsx",
                                lineNumber: 103,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/PlanCanvas.tsx",
                        lineNumber: 84,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "row",
                        style: {
                            gap: 6
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "badge blue",
                                children: [
                                    W,
                                    "m × ",
                                    D,
                                    "m (",
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$geometry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["round"])(W * D, 1),
                                    " m²)"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/PlanCanvas.tsx",
                                lineNumber: 114,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "badge purple",
                                children: [
                                    plan.walls.length,
                                    " Dinding"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/PlanCanvas.tsx",
                                lineNumber: 117,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "badge green",
                                children: [
                                    plan.openings.length,
                                    " Bukaan"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/PlanCanvas.tsx",
                                lineNumber: 118,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "badge orange",
                                children: [
                                    plan.rooms.length,
                                    " Ruang"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/PlanCanvas.tsx",
                                lineNumber: 119,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/PlanCanvas.tsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/PlanCanvas.tsx",
                lineNumber: 83,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "editor glass",
                "data-dim": showImg,
                style: {
                    width: "100%",
                    aspectRatio: `${W + padding * 2} / ${D + padding * 2}`,
                    maxHeight: "560px",
                    position: "relative",
                    background: "var(--bg-2)"
                },
                children: [
                    imageUrl && showImg && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: imageUrl,
                        alt: "Denah Asli",
                        style: {
                            position: "absolute",
                            inset: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            opacity: 0.38,
                            pointerEvents: "none"
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/PlanCanvas.tsx",
                        lineNumber: 136,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        ref: svgRef,
                        viewBox: viewBox,
                        style: {
                            width: "100%",
                            height: "100%",
                            display: "block"
                        },
                        onMouseMove: handleMouseMove,
                        onMouseUp: handleMouseUp,
                        onClick: ()=>onSelect(null, null),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pattern", {
                                    id: "grid",
                                    width: "1",
                                    height: "1",
                                    patternUnits: "userSpaceOnUse",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M 1 0 L 0 0 0 1",
                                        fill: "none",
                                        stroke: "rgba(0,0,0,0.06)",
                                        strokeWidth: "0.04"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/PlanCanvas.tsx",
                                        lineNumber: 166,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/PlanCanvas.tsx",
                                    lineNumber: 160,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/PlanCanvas.tsx",
                                lineNumber: 159,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                x: -padding,
                                y: -padding,
                                width: W + padding * 2,
                                height: D + padding * 2,
                                fill: "url(#grid)"
                            }, void 0, false, {
                                fileName: "[project]/src/components/PlanCanvas.tsx",
                                lineNumber: 174,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                x: 0,
                                y: 0,
                                width: W,
                                height: D,
                                fill: "none",
                                stroke: "rgba(10, 132, 255, 0.4)",
                                strokeWidth: "0.04",
                                strokeDasharray: "0.2 0.2"
                            }, void 0, false, {
                                fileName: "[project]/src/components/PlanCanvas.tsx",
                                lineNumber: 183,
                                columnNumber: 11
                            }, this),
                            plan.rooms.map((r)=>{
                                const isSel = selectedId === r.id;
                                const pts = r.polygon.map((p)=>`${p.x},${p.y}`).join(" ");
                                // compute center for label
                                const cx = r.polygon.reduce((a, b)=>a + b.x, 0) / (r.polygon.length || 1);
                                const cy = r.polygon.reduce((a, b)=>a + b.y, 0) / (r.polygon.length || 1);
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                                            points: pts,
                                            className: `room ${isSel ? "sel" : ""}`,
                                            onClick: (e)=>{
                                                e.stopPropagation();
                                                onSelect(r.id, "room");
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/PlanCanvas.tsx",
                                            lineNumber: 206,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                            x: cx,
                                            y: cy,
                                            textAnchor: "middle",
                                            dominantBaseline: "middle",
                                            className: "room-label",
                                            fontSize: "0.26",
                                            children: r.name
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/PlanCanvas.tsx",
                                            lineNumber: 214,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, r.id, true, {
                                    fileName: "[project]/src/components/PlanCanvas.tsx",
                                    lineNumber: 205,
                                    columnNumber: 15
                                }, this);
                            }),
                            plan.walls.map((w)=>{
                                const isSel = selectedId === w.id;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                            x1: w.a.x,
                                            y1: w.a.y,
                                            x2: w.b.x,
                                            y2: w.b.y,
                                            strokeWidth: w.thickness || 0.15,
                                            className: `wall ${w.exterior ? "ext" : ""} ${isSel ? "sel" : ""}`,
                                            onClick: (e)=>{
                                                e.stopPropagation();
                                                onSelect(w.id, "wall");
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/PlanCanvas.tsx",
                                            lineNumber: 233,
                                            columnNumber: 17
                                        }, this),
                                        isSel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                    cx: w.a.x,
                                                    cy: w.a.y,
                                                    r: "0.16",
                                                    className: "handle",
                                                    onMouseDown: (e)=>handleMouseDownNode(e, w.id, "a")
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/PlanCanvas.tsx",
                                                    lineNumber: 250,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                    cx: w.b.x,
                                                    cy: w.b.y,
                                                    r: "0.16",
                                                    className: "handle",
                                                    onMouseDown: (e)=>handleMouseDownNode(e, w.id, "b")
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/PlanCanvas.tsx",
                                                    lineNumber: 257,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/PlanCanvas.tsx",
                                            lineNumber: 249,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, w.id, true, {
                                    fileName: "[project]/src/components/PlanCanvas.tsx",
                                    lineNumber: 232,
                                    columnNumber: 15
                                }, this);
                            }),
                            plan.openings.map((o)=>{
                                const isSel = selectedId === o.id;
                                const r = o.width / 2;
                                const isDoor = o.type === "door";
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                    className: "opening",
                                    onClick: (e)=>{
                                        e.stopPropagation();
                                        onSelect(o.id, "opening");
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                            cx: o.at.x,
                                            cy: o.at.y,
                                            r: r,
                                            fill: isDoor ? "rgba(10, 132, 255, 0.25)" : "rgba(94, 92, 230, 0.25)",
                                            stroke: isSel ? "var(--orange)" : isDoor ? "var(--accent)" : "var(--accent-2)",
                                            strokeWidth: "0.04"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/PlanCanvas.tsx",
                                            lineNumber: 284,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                            cx: o.at.x,
                                            cy: o.at.y,
                                            r: 0.06,
                                            fill: isDoor ? "var(--accent)" : "var(--accent-2)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/PlanCanvas.tsx",
                                            lineNumber: 296,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, o.id, true, {
                                    fileName: "[project]/src/components/PlanCanvas.tsx",
                                    lineNumber: 276,
                                    columnNumber: 15
                                }, this);
                            }),
                            showDim && plan.chains.map((chain, cIdx)=>{
                                if (chain.side === "top") {
                                    let curX = 0;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                        children: chain.segments.map((seg, sIdx)=>{
                                            const x1 = curX;
                                            const x2 = curX + seg;
                                            const mid = (x1 + x2) / 2;
                                            curX += seg;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                        x1: x1,
                                                        y1: -0.3,
                                                        x2: x2,
                                                        y2: -0.3,
                                                        stroke: "#8a8f98",
                                                        strokeWidth: "0.02"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/PlanCanvas.tsx",
                                                        lineNumber: 320,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                                        x: mid,
                                                        y: -0.42,
                                                        fontSize: "0.2",
                                                        textAnchor: "middle",
                                                        fill: "var(--text-2)",
                                                        children: [
                                                            seg,
                                                            "m"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/PlanCanvas.tsx",
                                                        lineNumber: 328,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, sIdx, true, {
                                                fileName: "[project]/src/components/PlanCanvas.tsx",
                                                lineNumber: 319,
                                                columnNumber: 25
                                            }, this);
                                        })
                                    }, `top-${cIdx}`, false, {
                                        fileName: "[project]/src/components/PlanCanvas.tsx",
                                        lineNumber: 312,
                                        columnNumber: 19
                                    }, this);
                                }
                                return null;
                            })
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/PlanCanvas.tsx",
                        lineNumber: 151,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/PlanCanvas.tsx",
                lineNumber: 124,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "faint text-center",
                style: {
                    fontSize: 12.5
                },
                children: "Klik garis dinding untuk memunculkan tuas edit titik. Seret node lingkaran untuk menyelaraskan as dinding."
            }, void 0, false, {
                fileName: "[project]/src/components/PlanCanvas.tsx",
                lineNumber: 347,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/PlanCanvas.tsx",
        lineNumber: 81,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/RabView.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RabView",
    ()=>RabView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rab$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/rab.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$export$2f$xlsx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/export/xlsx.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$bom$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/bom.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$table$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Table$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/table.mjs [app-ssr] (ecmascript) <export default as Table>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.mjs [app-ssr] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.mjs [app-ssr] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.mjs [app-ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$pie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PieChart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-pie.mjs [app-ssr] (ecmascript) <export default as PieChart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$boxes$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Boxes$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/boxes.mjs [app-ssr] (ecmascript) <export default as Boxes>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/truck.mjs [app-ssr] (ecmascript) <export default as Truck>");
"use client";
;
;
;
;
;
;
function RabView({ project, rab, company, onUpdateProject }) {
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("tabel");
    const [isExporting, setIsExporting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const bom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$bom$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["calculateBom"])(rab), [
        rab
    ]);
    // Section Color Palette for Visual Breakdown
    const SECTION_COLORS = {
        I: "#64748b",
        II: "#d97706",
        III: "#3b82f6",
        IV: "#ef4444",
        V: "#8b5cf6",
        VI: "#10b981",
        VII: "#f59e0b",
        VIII: "#ec4899",
        IX: "#06b6d4",
        X: "#0284c7",
        XI: "#84cc16"
    };
    const costDistribution = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const total = rab.directCost || 1;
        return rab.sections.map((s)=>({
                code: s.code,
                title: s.title,
                subtotal: s.subtotal,
                percentage: s.subtotal / total * 100,
                color: SECTION_COLORS[s.code] || "#6366f1"
            })).filter((s)=>s.subtotal > 0);
    }, [
        rab
    ]);
    const toggleExclude = (code)=>{
        const isEx = project.excluded.includes(code);
        const updated = isEx ? project.excluded.filter((c)=>c !== code) : [
            ...project.excluded,
            code
        ];
        onUpdateProject({
            excluded: updated
        });
    };
    const handlePriceChange = (code, newPriceStr)=>{
        const val = parseFloat(newPriceStr.replace(/\D/g, "")) || 0;
        onUpdateProject({
            priceOverrides: {
                ...project.priceOverrides,
                [code]: val
            }
        });
    };
    const handleExport = async ()=>{
        try {
            setIsExporting(true);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$export$2f$xlsx$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["exportRabXlsx"])(project, rab, company);
        } finally{
            setIsExporting(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "col",
        style: {
            gap: 16
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "row wrap justify-between items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "segmented",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                "data-active": activeTab === "tabel",
                                onClick: ()=>setActiveTab("tabel"),
                                className: "row items-center",
                                style: {
                                    gap: 6
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$table$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Table$3e$__["Table"], {
                                        size: 14
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RabView.tsx",
                                        lineNumber: 97,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Tabel Rincian RAB"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RabView.tsx",
                                        lineNumber: 98,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RabView.tsx",
                                lineNumber: 90,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                "data-active": activeTab === "bom",
                                onClick: ()=>setActiveTab("bom"),
                                className: "row items-center",
                                style: {
                                    gap: 6
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$boxes$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Boxes$3e$__["Boxes"], {
                                        size: 14
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RabView.tsx",
                                        lineNumber: 107,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Logistik Belanja (BOM)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RabView.tsx",
                                        lineNumber: 108,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RabView.tsx",
                                lineNumber: 100,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                "data-active": activeTab === "analisa",
                                onClick: ()=>setActiveTab("analisa"),
                                className: "row items-center",
                                style: {
                                    gap: 6
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$pie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PieChart$3e$__["PieChart"], {
                                        size: 14
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RabView.tsx",
                                        lineNumber: 117,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Proporsi Biaya"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RabView.tsx",
                                        lineNumber: 118,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RabView.tsx",
                                lineNumber: 110,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                "data-active": activeTab === "surat",
                                onClick: ()=>setActiveTab("surat"),
                                className: "row items-center",
                                style: {
                                    gap: 6
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                        size: 14
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RabView.tsx",
                                        lineNumber: 127,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Surat Penawaran"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RabView.tsx",
                                        lineNumber: 128,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RabView.tsx",
                                lineNumber: 120,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RabView.tsx",
                        lineNumber: 89,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "row",
                        style: {
                            gap: 8
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "segmented",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        "data-active": project.priceMode === "borongan",
                                        onClick: ()=>onUpdateProject({
                                                priceMode: "borongan"
                                            }),
                                        children: "Borongan"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RabView.tsx",
                                        lineNumber: 134,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        "data-active": project.priceMode === "ahsp",
                                        onClick: ()=>onUpdateProject({
                                                priceMode: "ahsp"
                                            }),
                                        children: "AHSP SNI"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RabView.tsx",
                                        lineNumber: 141,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RabView.tsx",
                                lineNumber: 133,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "btn btn-primary row items-center",
                                style: {
                                    gap: 6
                                },
                                onClick: handleExport,
                                disabled: isExporting,
                                children: [
                                    isExporting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                        size: 15,
                                        className: "pulse-dot"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RabView.tsx",
                                        lineNumber: 157,
                                        columnNumber: 28
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                        size: 15
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RabView.tsx",
                                        lineNumber: 157,
                                        columnNumber: 74
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: isExporting ? "Menyiapkan File..." : "Export Excel (.xlsx)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RabView.tsx",
                                        lineNumber: 158,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RabView.tsx",
                                lineNumber: 150,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RabView.tsx",
                        lineNumber: 132,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/RabView.tsx",
                lineNumber: 88,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-3 stagger",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card glass stat",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "label",
                                children: "Total Biaya Langsung"
                            }, void 0, false, {
                                fileName: "[project]/src/components/RabView.tsx",
                                lineNumber: 166,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "value mono",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rab$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rupiah"])(rab.directCost)
                            }, void 0, false, {
                                fileName: "[project]/src/components/RabView.tsx",
                                lineNumber: 167,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "faint",
                                children: [
                                    rab.sections.length,
                                    " Bagian Pekerjaan"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RabView.tsx",
                                lineNumber: 168,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RabView.tsx",
                        lineNumber: 165,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card glass stat",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "label",
                                children: "Total Penawaran Final"
                            }, void 0, false, {
                                fileName: "[project]/src/components/RabView.tsx",
                                lineNumber: 171,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "value mono",
                                style: {
                                    color: "var(--accent)"
                                },
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rab$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rupiah"])(rab.grandTotalRounded)
                            }, void 0, false, {
                                fileName: "[project]/src/components/RabView.tsx",
                                lineNumber: 172,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "faint",
                                children: [
                                    "Termasuk O&P ",
                                    project.params.overheadProfitPct * 100,
                                    "%",
                                    " ",
                                    project.params.includePpn ? "+ PPN 11%" : "(Non-PPN)"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RabView.tsx",
                                lineNumber: 175,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RabView.tsx",
                        lineNumber: 170,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card glass stat",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "label",
                                children: "Estimasi Harga / m²"
                            }, void 0, false, {
                                fileName: "[project]/src/components/RabView.tsx",
                                lineNumber: 181,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "value mono",
                                children: [
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rab$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rupiah"])(rab.costPerM2),
                                    " / m²"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RabView.tsx",
                                lineNumber: 182,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "faint",
                                children: [
                                    "Luas Bangunan: ",
                                    rab.grossArea,
                                    " m²"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RabView.tsx",
                                lineNumber: 183,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RabView.tsx",
                        lineNumber: 180,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/RabView.tsx",
                lineNumber: 164,
                columnNumber: 7
            }, this),
            activeTab === "tabel" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card glass",
                style: {
                    padding: 0,
                    overflow: "hidden"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "scroll-x",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                        className: "table",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            style: {
                                                width: 40,
                                                textAlign: "center"
                                            },
                                            children: "Act"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/RabView.tsx",
                                            lineNumber: 194,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            children: "Uraian Pekerjaan & Dasar Perhitungan"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/RabView.tsx",
                                            lineNumber: 195,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "num",
                                            children: "Volume"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/RabView.tsx",
                                            lineNumber: 196,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            style: {
                                                width: 60,
                                                textAlign: "center"
                                            },
                                            children: "Sat"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/RabView.tsx",
                                            lineNumber: 197,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "num",
                                            children: "Harga Satuan (Rp)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/RabView.tsx",
                                            lineNumber: 198,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "num",
                                            children: "Jumlah (Rp)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/RabView.tsx",
                                            lineNumber: 199,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/RabView.tsx",
                                    lineNumber: 193,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/RabView.tsx",
                                lineNumber: 192,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                children: rab.sections.map((sec)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Fragment, {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                className: "section",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    colSpan: 6,
                                                    children: [
                                                        sec.code,
                                                        ". ",
                                                        sec.title
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/RabView.tsx",
                                                    lineNumber: 206,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/RabView.tsx",
                                                lineNumber: 205,
                                                columnNumber: 21
                                            }, this),
                                            sec.lines.map((l)=>{
                                                const isExcluded = project.excluded.includes(l.code);
                                                const isCustomPrice = project.priceOverrides[l.code] != null;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    className: `line ${isExcluded ? "excluded" : ""}`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            style: {
                                                                textAlign: "center"
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "checkbox",
                                                                checked: !isExcluded,
                                                                onChange: ()=>toggleExclude(l.code)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/RabView.tsx",
                                                                lineNumber: 219,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/RabView.tsx",
                                                            lineNumber: 218,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        fontWeight: 550
                                                                    },
                                                                    children: l.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/RabView.tsx",
                                                                    lineNumber: 226,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "faint mono",
                                                                    style: {
                                                                        fontSize: 11.5,
                                                                        display: "flex",
                                                                        alignItems: "center",
                                                                        gap: 4
                                                                    },
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            style: {
                                                                                color: "var(--accent)"
                                                                            },
                                                                            children: "▪"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/RabView.tsx",
                                                                            lineNumber: 228,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        " ",
                                                                        l.formula
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/RabView.tsx",
                                                                    lineNumber: 227,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/RabView.tsx",
                                                            lineNumber: 225,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "num mono",
                                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rab$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["num"])(l.volume)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/RabView.tsx",
                                                            lineNumber: 231,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            style: {
                                                                textAlign: "center"
                                                            },
                                                            className: "muted",
                                                            children: l.unit
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/RabView.tsx",
                                                            lineNumber: 232,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "num",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "text",
                                                                className: `cell-input ${isCustomPrice ? "changed" : ""}`,
                                                                defaultValue: l.unitPrice.toLocaleString("id-ID"),
                                                                onBlur: (e)=>handlePriceChange(l.code, e.target.value)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/RabView.tsx",
                                                                lineNumber: 236,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/RabView.tsx",
                                                            lineNumber: 235,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "num mono font-semibold",
                                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rab$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rupiah"])(l.total)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/RabView.tsx",
                                                            lineNumber: 243,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, l.code, true, {
                                                    fileName: "[project]/src/components/RabView.tsx",
                                                    lineNumber: 214,
                                                    columnNumber: 25
                                                }, this);
                                            }),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                style: {
                                                    background: "rgba(0,0,0,0.02)"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        colSpan: 5,
                                                        style: {
                                                            textAlign: "right",
                                                            fontWeight: 650
                                                        },
                                                        children: [
                                                            "Subtotal ",
                                                            sec.code
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/RabView.tsx",
                                                        lineNumber: 250,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "num mono",
                                                        style: {
                                                            fontWeight: 700
                                                        },
                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rab$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rupiah"])(sec.subtotal)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/RabView.tsx",
                                                        lineNumber: 253,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/RabView.tsx",
                                                lineNumber: 249,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, sec.code, true, {
                                        fileName: "[project]/src/components/RabView.tsx",
                                        lineNumber: 204,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/RabView.tsx",
                                lineNumber: 202,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RabView.tsx",
                        lineNumber: 191,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/RabView.tsx",
                    lineNumber: 190,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/RabView.tsx",
                lineNumber: 189,
                columnNumber: 9
            }, this),
            activeTab === "bom" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "col",
                style: {
                    gap: 16
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "card glass col",
                                style: {
                                    gap: 6,
                                    borderLeft: "4px solid #3b82f6"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "row items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "muted",
                                                style: {
                                                    fontSize: 12
                                                },
                                                children: "Semen Portland"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/RabView.tsx",
                                                lineNumber: 272,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$boxes$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Boxes$3e$__["Boxes"], {
                                                size: 16,
                                                color: "#3b82f6"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/RabView.tsx",
                                                lineNumber: 273,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/RabView.tsx",
                                        lineNumber: 271,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mono font-bold",
                                        style: {
                                            fontSize: 20
                                        },
                                        children: [
                                            bom.highlightPackages.semenBags50kg.toLocaleString("id-ID"),
                                            " Sak"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/RabView.tsx",
                                        lineNumber: 275,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "faint",
                                        style: {
                                            fontSize: 11
                                        },
                                        children: "Kemasan @ 50 kg (Pondasi, Struktur, Plesteran)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RabView.tsx",
                                        lineNumber: 278,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RabView.tsx",
                                lineNumber: 270,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "card glass col",
                                style: {
                                    gap: 6,
                                    borderLeft: "4px solid #10b981"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "row items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "muted",
                                                style: {
                                                    fontSize: 12
                                                },
                                                children: "Pasir & Kerikil"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/RabView.tsx",
                                                lineNumber: 283,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__["Truck"], {
                                                size: 16,
                                                color: "#10b981"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/RabView.tsx",
                                                lineNumber: 284,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/RabView.tsx",
                                        lineNumber: 282,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mono font-bold",
                                        style: {
                                            fontSize: 20
                                        },
                                        children: [
                                            "± ",
                                            bom.highlightPackages.pasirTrucks,
                                            " Truk Pasir"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/RabView.tsx",
                                        lineNumber: 286,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "faint",
                                        style: {
                                            fontSize: 11
                                        },
                                        children: [
                                            "+ ",
                                            bom.highlightPackages.splitTrucks,
                                            " Truk Split Cor (Dump Truck @ 6 m³)"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/RabView.tsx",
                                        lineNumber: 289,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RabView.tsx",
                                lineNumber: 281,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "card glass col",
                                style: {
                                    gap: 6,
                                    borderLeft: "4px solid #f59e0b"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "row items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "muted",
                                                style: {
                                                    fontSize: 12
                                                },
                                                children: "Besi & Material Dinding"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/RabView.tsx",
                                                lineNumber: 294,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$boxes$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Boxes$3e$__["Boxes"], {
                                                size: 16,
                                                color: "#f59e0b"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/RabView.tsx",
                                                lineNumber: 295,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/RabView.tsx",
                                        lineNumber: 293,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mono font-bold",
                                        style: {
                                            fontSize: 20
                                        },
                                        children: [
                                            "± ",
                                            bom.highlightPackages.besiRods.toLocaleString("id-ID"),
                                            " Btg Besi"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/RabView.tsx",
                                        lineNumber: 297,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "faint",
                                        style: {
                                            fontSize: 11
                                        },
                                        children: [
                                            bom.highlightPackages.bataCount.toLocaleString("id-ID"),
                                            " ",
                                            bom.highlightPackages.bataType
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/RabView.tsx",
                                        lineNumber: 300,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RabView.tsx",
                                lineNumber: 292,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RabView.tsx",
                        lineNumber: 269,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card glass",
                        style: {
                            padding: 0,
                            overflow: "hidden"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "scroll-x",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                className: "table",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    children: "Bahan Konstruksi"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/RabView.tsx",
                                                    lineNumber: 312,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    style: {
                                                        width: 120
                                                    },
                                                    children: "Kategori"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/RabView.tsx",
                                                    lineNumber: 313,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "num",
                                                    children: "Total Kebutuhan"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/RabView.tsx",
                                                    lineNumber: 314,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    style: {
                                                        width: 60,
                                                        textAlign: "center"
                                                    },
                                                    children: "Satuan"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/RabView.tsx",
                                                    lineNumber: 315,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    children: "Estimasi Kemasan Logistik Belanja"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/RabView.tsx",
                                                    lineNumber: 316,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "num",
                                                    children: "Estimasi Budget (Rp)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/RabView.tsx",
                                                    lineNumber: 317,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/RabView.tsx",
                                            lineNumber: 311,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RabView.tsx",
                                        lineNumber: 310,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                        children: [
                                            bom.items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    className: "line",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        fontWeight: 600
                                                                    },
                                                                    children: item.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/RabView.tsx",
                                                                    lineNumber: 324,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "faint mono",
                                                                    style: {
                                                                        fontSize: 11
                                                                    },
                                                                    children: item.code
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/RabView.tsx",
                                                                    lineNumber: 325,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/RabView.tsx",
                                                            lineNumber: 323,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "badge",
                                                                style: {
                                                                    textTransform: "capitalize",
                                                                    fontSize: 11,
                                                                    padding: "3px 8px",
                                                                    background: "rgba(255,255,255,0.06)"
                                                                },
                                                                children: item.category.replace("_", " ")
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/RabView.tsx",
                                                                lineNumber: 328,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/RabView.tsx",
                                                            lineNumber: 327,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "num mono font-semibold",
                                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rab$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["num"])(item.quantity)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/RabView.tsx",
                                                            lineNumber: 340,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            style: {
                                                                textAlign: "center"
                                                            },
                                                            className: "muted",
                                                            children: item.unit
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/RabView.tsx",
                                                            lineNumber: 341,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            children: item.commercialPackage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "badge",
                                                                style: {
                                                                    background: "rgba(16, 185, 129, 0.12)",
                                                                    color: "#10b981",
                                                                    fontWeight: 600,
                                                                    fontSize: 12
                                                                },
                                                                children: item.commercialPackage
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/RabView.tsx",
                                                                lineNumber: 344,
                                                                columnNumber: 27
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "faint",
                                                                children: "-"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/RabView.tsx",
                                                                lineNumber: 356,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/RabView.tsx",
                                                            lineNumber: 342,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "num mono font-semibold",
                                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rab$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rupiah"])(item.estimatedCost)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/RabView.tsx",
                                                            lineNumber: 359,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, item.code, true, {
                                                    fileName: "[project]/src/components/RabView.tsx",
                                                    lineNumber: 322,
                                                    columnNumber: 21
                                                }, this)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                style: {
                                                    background: "rgba(0,0,0,0.02)"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        colSpan: 5,
                                                        style: {
                                                            textAlign: "right",
                                                            fontWeight: 700
                                                        },
                                                        children: "Total Anggaran Pembelian Material Terhitung:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/RabView.tsx",
                                                        lineNumber: 363,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "num mono",
                                                        style: {
                                                            fontWeight: 800,
                                                            color: "var(--accent)"
                                                        },
                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rab$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rupiah"])(bom.totalMaterialCost)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/RabView.tsx",
                                                        lineNumber: 366,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/RabView.tsx",
                                                lineNumber: 362,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/RabView.tsx",
                                        lineNumber: 320,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RabView.tsx",
                                lineNumber: 309,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/RabView.tsx",
                            lineNumber: 308,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/RabView.tsx",
                        lineNumber: 307,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/RabView.tsx",
                lineNumber: 267,
                columnNumber: 9
            }, this),
            activeTab === "analisa" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "col",
                style: {
                    gap: 20
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "card glass col",
                    style: {
                        gap: 14
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "row justify-between items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    style: {
                                        margin: 0
                                    },
                                    children: "Distribusi Proporsi Anggaran Biaya"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/RabView.tsx",
                                    lineNumber: 383,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "faint mono",
                                    style: {
                                        fontSize: 12
                                    },
                                    children: [
                                        "Total: ",
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rab$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rupiah"])(rab.directCost)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/RabView.tsx",
                                    lineNumber: 384,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/RabView.tsx",
                            lineNumber: 382,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                height: 22,
                                borderRadius: 8,
                                overflow: "hidden",
                                background: "rgba(255,255,255,0.05)",
                                boxShadow: "inset 0 1px 3px rgba(0,0,0,0.2)"
                            },
                            children: costDistribution.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        width: `${item.percentage}%`,
                                        backgroundColor: item.color,
                                        transition: "width 0.4s ease"
                                    },
                                    title: `${item.title}: ${item.percentage.toFixed(1)}%`
                                }, item.code, false, {
                                    fileName: "[project]/src/components/RabView.tsx",
                                    lineNumber: 399,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/RabView.tsx",
                            lineNumber: 388,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-3",
                            style: {
                                gap: 12,
                                marginTop: 8
                            },
                            children: costDistribution.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "card",
                                    style: {
                                        background: "rgba(255, 255, 255, 0.03)",
                                        border: "1px solid rgba(255, 255, 255, 0.08)",
                                        borderRadius: 10,
                                        padding: "12px 14px",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 6
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "row items-center justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "row items-center",
                                                    style: {
                                                        gap: 8
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                width: 10,
                                                                height: 10,
                                                                borderRadius: "50%",
                                                                backgroundColor: item.color,
                                                                display: "inline-block"
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/RabView.tsx",
                                                            lineNumber: 429,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                fontSize: 12,
                                                                fontWeight: 650,
                                                                color: "var(--text-main)"
                                                            },
                                                            children: [
                                                                item.code,
                                                                ". ",
                                                                item.title
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/RabView.tsx",
                                                            lineNumber: 438,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/RabView.tsx",
                                                    lineNumber: 428,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "mono font-bold",
                                                    style: {
                                                        fontSize: 13,
                                                        color: item.color
                                                    },
                                                    children: [
                                                        item.percentage.toFixed(1),
                                                        "%"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/RabView.tsx",
                                                    lineNumber: 442,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/RabView.tsx",
                                            lineNumber: 427,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mono font-bold",
                                            style: {
                                                fontSize: 16
                                            },
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rab$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rupiah"])(item.subtotal)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/RabView.tsx",
                                            lineNumber: 449,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, item.code, true, {
                                    fileName: "[project]/src/components/RabView.tsx",
                                    lineNumber: 414,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/RabView.tsx",
                            lineNumber: 412,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/RabView.tsx",
                    lineNumber: 381,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/RabView.tsx",
                lineNumber: 379,
                columnNumber: 9
            }, this),
            activeTab === "surat" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card glass col",
                style: {
                    padding: 36,
                    background: "#fff",
                    color: "#111",
                    boxShadow: "var(--shadow-lg)",
                    borderRadius: "var(--radius)",
                    gap: 20
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "row justify-between items-start",
                        style: {
                            borderBottom: "2px solid #111",
                            paddingBottom: 16
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        style: {
                                            margin: 0,
                                            fontSize: 22,
                                            fontWeight: 800
                                        },
                                        children: company.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RabView.tsx",
                                        lineNumber: 475,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 13,
                                            color: "#555"
                                        },
                                        children: company.address
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RabView.tsx",
                                        lineNumber: 476,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 13,
                                            color: "#555"
                                        },
                                        children: [
                                            "Kontak: ",
                                            company.phone,
                                            " | ",
                                            company.email
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/RabView.tsx",
                                        lineNumber: 477,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RabView.tsx",
                                lineNumber: 474,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    textAlign: "right"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "badge blue",
                                        style: {
                                            fontSize: 13,
                                            padding: "6px 12px"
                                        },
                                        children: "SURAT PENAWARAN HARGA"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RabView.tsx",
                                        lineNumber: 480,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "faint",
                                        style: {
                                            marginTop: 4
                                        },
                                        children: [
                                            "No: ",
                                            project.offerNumber
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/RabView.tsx",
                                        lineNumber: 483,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RabView.tsx",
                                lineNumber: 479,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RabView.tsx",
                        lineNumber: 473,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-2",
                        style: {
                            fontSize: 14
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: "Kepada Yth:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RabView.tsx",
                                        lineNumber: 490,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: project.client.name || "Bapak/Ibu Pemilik Rumah"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RabView.tsx",
                                        lineNumber: 491,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            color: "#666"
                                        },
                                        children: project.client.address || "Di Tempat"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RabView.tsx",
                                        lineNumber: 492,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RabView.tsx",
                                lineNumber: 489,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    textAlign: "right"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "Tanggal:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/RabView.tsx",
                                                lineNumber: 495,
                                                columnNumber: 20
                                            }, this),
                                            " ",
                                            new Date().toLocaleDateString("id-ID", {
                                                dateStyle: "long"
                                            })
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/RabView.tsx",
                                        lineNumber: 495,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "Masa Berlaku:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/RabView.tsx",
                                                lineNumber: 496,
                                                columnNumber: 20
                                            }, this),
                                            " ",
                                            project.offerValidityDays,
                                            " Hari Kalender"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/RabView.tsx",
                                        lineNumber: 496,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RabView.tsx",
                                lineNumber: 494,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RabView.tsx",
                        lineNumber: 488,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: 14,
                            lineHeight: 1.6,
                            margin: "8px 0"
                        },
                        children: [
                            "Sehubungan dengan rencana pembangunan ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: project.title
                            }, void 0, false, {
                                fileName: "[project]/src/components/RabView.tsx",
                                lineNumber: 501,
                                columnNumber: 51
                            }, this),
                            " yang berlokasi di",
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: project.location || "lokasi proyek"
                            }, void 0, false, {
                                fileName: "[project]/src/components/RabView.tsx",
                                lineNumber: 502,
                                columnNumber: 13
                            }, this),
                            " dengan luas bangunan",
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: [
                                    rab.grossArea,
                                    " m²"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RabView.tsx",
                                lineNumber: 503,
                                columnNumber: 13
                            }, this),
                            ", bersama ini kami sampaikan rincian penawaran biaya konstruksi sebagai berikut:"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RabView.tsx",
                        lineNumber: 500,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            border: "1px solid #ddd",
                            borderRadius: 12,
                            padding: 18,
                            background: "#fafafa"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "row justify-between items-center",
                                style: {
                                    marginBottom: 12
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: 16
                                        },
                                        children: "Nilai Total Penawaran:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RabView.tsx",
                                        lineNumber: 509,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: 24,
                                            fontWeight: 800,
                                            color: "var(--accent)"
                                        },
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rab$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rupiah"])(rab.grandTotalRounded)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RabView.tsx",
                                        lineNumber: 510,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RabView.tsx",
                                lineNumber: 508,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 13,
                                    color: "#555",
                                    fontStyle: "italic"
                                },
                                children: [
                                    'Terbilang: "',
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rab$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["terbilangRupiah"])(rab.grandTotalRounded),
                                    '"'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RabView.tsx",
                                lineNumber: 514,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RabView.tsx",
                        lineNumber: 507,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 13.5
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Ketentuan & Termin Pembayaran:"
                            }, void 0, false, {
                                fileName: "[project]/src/components/RabView.tsx",
                                lineNumber: 521,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    margin: "4px 0",
                                    color: "#444"
                                },
                                children: project.paymentTerms
                            }, void 0, false, {
                                fileName: "[project]/src/components/RabView.tsx",
                                lineNumber: 522,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RabView.tsx",
                        lineNumber: 520,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "row justify-between",
                        style: {
                            marginTop: 30,
                            paddingTop: 20
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    textAlign: "center",
                                    width: 200
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 13
                                        },
                                        children: "Menyetujui,"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RabView.tsx",
                                        lineNumber: 528,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 13,
                                            fontWeight: 600
                                        },
                                        children: "Pemilik Rumah"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RabView.tsx",
                                        lineNumber: 529,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            height: 60
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RabView.tsx",
                                        lineNumber: 530,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            borderTop: "1px solid #777",
                                            paddingTop: 4
                                        },
                                        children: project.client.name || "( .................................... )"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RabView.tsx",
                                        lineNumber: 531,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RabView.tsx",
                                lineNumber: 527,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    textAlign: "center",
                                    width: 200
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 13
                                        },
                                        children: "Hormat Kami,"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RabView.tsx",
                                        lineNumber: 536,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 13,
                                            fontWeight: 600
                                        },
                                        children: company.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RabView.tsx",
                                        lineNumber: 537,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            height: 60
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RabView.tsx",
                                        lineNumber: 538,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            borderTop: "1px solid #777",
                                            paddingTop: 4
                                        },
                                        children: company.director
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RabView.tsx",
                                        lineNumber: 539,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RabView.tsx",
                                lineNumber: 535,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RabView.tsx",
                        lineNumber: 526,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/RabView.tsx",
                lineNumber: 461,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/RabView.tsx",
        lineNumber: 86,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/lib/bom.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calculateBom",
    ()=>calculateBom
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pricing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/pricing.ts [app-ssr] (ecmascript)");
;
/**
 * Ekstraksi rekursif komponen bahan (Resource) dari AHSP item
 */ function extractMaterialRequirements(db, analysisCode, multiplier, acc) {
    const an = db.analyses.find((a)=>a.code === analysisCode);
    if (!an) return;
    for (const comp of an.components){
        const res = db.resources.find((r)=>r.code === comp.ref);
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
function calculateBom(rab, priceDb = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pricing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defaultPriceDb"])()) {
    const resourceQuantities = new Map();
    for (const section of rab.sections){
        for (const line of section.lines){
            // Cari analisa AHSP terkait item catalog
            const cat = priceDb.catalog.find((c)=>c.code === line.code);
            const ahspCode = cat?.ahsp;
            if (ahspCode) {
                extractMaterialRequirements(priceDb, ahspCode, line.volume, resourceQuantities);
            }
        }
    }
    const items = [];
    let totalMaterialCost = 0;
    for (const [resCode, qty] of resourceQuantities.entries()){
        if (qty <= 0) continue;
        const res = priceDb.resources.find((r)=>r.code === resCode);
        if (!res) continue;
        let category = "lainnya";
        let commercialPackage = undefined;
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
            estimatedCost: cost
        });
    }
    // Urutkan berdasarkan prioritas logistik: semen, bata, besi, pasir, finishing, lainnya
    const categoryOrder = {
        semen: 1,
        bata: 2,
        besi_baja: 3,
        pasir_agregat: 4,
        finishing: 5,
        lainnya: 6
    };
    items.sort((a, b)=>categoryOrder[a.category] - categoryOrder[b.category] || b.estimatedCost - a.estimatedCost);
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
            pasirTrucks: Math.round((totalPp + totalPb) / 6 * 10) / 10,
            splitTrucks: Math.round(totalKr / 6 * 10) / 10,
            besiRods: Math.ceil(totalBesi / 10.5),
            bataCount,
            bataType
        }
    };
}
}),
"[project]/src/lib/defaults.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_PARAMS",
    ()=>DEFAULT_PARAMS,
    "samplePlan",
    ()=>samplePlan
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$geometry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/geometry.ts [app-ssr] (ecmascript)");
;
const DEFAULT_PARAMS = {
    floorCount: 1,
    wallType: "bata_ringan",
    tier: "medium",
    wallHeight: 3.5,
    grossAreaOverride: null,
    demolitionLumpSum: 0,
    fillHeight: 0,
    foundation: "strauss_kumbung",
    straussDepth: 3,
    straussDiameter: 0.3,
    pileCap: {
        w: 0.6,
        l: 0.6,
        t: 0.2
    },
    stoneFoundationHeight: 0.7,
    stoneFoundationTop: 0.3,
    stoneFoundationBottom: 0.6,
    sloof: {
        b: 0.15,
        h: 0.25
    },
    column: {
        b: 0.15,
        h: 0.2
    },
    ringBeam: {
        b: 0.15,
        h: 0.2
    },
    maxColumnSpan: 4,
    floorSlabThickness: 0.1,
    roofType: "pelana",
    roofCover: "genteng_beton",
    roofSlopeDeg: 30,
    roofOverhang: 0.6,
    concreteDeckArea: 0,
    concreteDeckThickness: 0.12,
    gutter: true,
    doorHeight: 2.1,
    windowHeight: 1.2,
    transomHeight: 0,
    floorWaste: 0.05,
    wetWallTileHeight: 1.8,
    skirting: true,
    exteriorPaintSeparate: true,
    autoMep: true,
    septicTank: true,
    kitchenCounterLength: 0,
    overheadProfitPct: 0.1,
    ppnPct: 0.11,
    includePpn: false,
    roundTo: 1000
};
function samplePlan() {
    const yFront = 0.755; // dinding depan R.Tamu mundur (teras)
    return {
        outline: {
            width: 9,
            depth: 8
        },
        wallThickness: 0.15,
        chains: [
            {
                side: "top",
                segments: [
                    0.15,
                    3,
                    0.15,
                    2.4,
                    0.15,
                    3,
                    0.15
                ],
                total: 9
            },
            {
                side: "bottom",
                segments: [
                    0.15,
                    5.55,
                    0.15,
                    3,
                    0.15
                ],
                total: 9
            },
            {
                side: "left",
                segments: [
                    0.15,
                    2.5,
                    0.15,
                    1.3,
                    0.15,
                    1.95,
                    0.15,
                    1.5,
                    0.15
                ],
                total: 8
            },
            {
                side: "right",
                segments: [
                    0.15,
                    3,
                    0.15,
                    1.9,
                    0.15,
                    2.5,
                    0.15
                ],
                total: 8
            }
        ],
        walls: [
            w("w1", 0.075, 0.075, 3.225, 0.075, true),
            w("w2", 5.775, 0.075, 8.925, 0.075, true),
            w("w3", 3.225, yFront, 5.775, yFront, true),
            w("w4", 0.075, 0.075, 0.075, 7.925, true),
            w("w5", 8.925, 0.075, 8.925, 7.925, true),
            w("w6", 0.075, 7.925, 8.925, 7.925, true),
            w("w7", 3.225, 0.075, 3.225, 2.725, false),
            w("w8", 0.075, 2.725, 3.225, 2.725, false),
            w("w9", 1.725, 2.725, 1.725, 4.175, false),
            w("w10", 0.075, 4.175, 3.225, 4.175, false),
            w("w11", 3.225, 4.175, 3.225, 6.275, false),
            w("w12", 0.075, 6.275, 3.225, 6.275, false),
            w("w13", 5.775, 0.075, 5.775, 3.225, false),
            w("w14", 5.775, 3.225, 8.925, 3.225, false),
            w("w15", 5.775, 5.275, 8.925, 5.275, false),
            w("w16", 5.775, 5.275, 5.775, 7.925, false)
        ],
        openings: [
            o("d1", "door", "w8", 2.75, 2.725, 0.9, 1, "P1 K.Anak"),
            o("d2", "door", "w3", 5.3, yFront, 0.9, 1, "P2 Utama"),
            o("d3", "door", "w14", 6.3, 3.225, 0.9, 1, "P3 K.Utama"),
            o("d4", "door", "w9", 1.725, 3.75, 0.7, 1, "P4 KM", "pvc"),
            o("d5", "door", "w5", 8.925, 3.85, 0.7, 1, "P5 Samping"),
            o("d6", "door", "w15", 6.3, 5.275, 0.9, 1, "P6 K.Anak 2"),
            o("d7", "door", "w6", 5.3, 7.925, 0.9, 1, "P7 Belakang"),
            o("j1", "window", "w1", 1.6, 0.075, 1.32, 2, "J1 K.Anak"),
            o("j2", "window", "w3", 4.25, yFront, 0.65, 1, "J2 R.Tamu"),
            o("j3", "window", "w2", 7.3, 0.075, 1.37, 2, "J3 K.Utama"),
            o("j4", "window", "w5", 8.925, 6.65, 1.29, 1, "J4 K.Anak 2"),
            o("j5", "window", "w6", 4.25, 7.925, 0.65, 1, "J5 Dapur"),
            o("b1", "passage", "w11", 3.225, 5.2, 1.45, 1, "Bukaan Musholla")
        ],
        rooms: [
            {
                id: "r1",
                name: "Kamar Anak 1",
                type: "kamar",
                polygon: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$geometry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rect"])(0.15, 0.15, 3, 2.5)
            },
            {
                id: "r2",
                name: "Kamar Mandi",
                type: "kamar_mandi",
                polygon: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$geometry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rect"])(0.15, 2.8, 1.5, 1.3)
            },
            {
                id: "r3",
                name: "Lorong",
                type: "selasar",
                polygon: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$geometry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rect"])(1.8, 2.8, 1.5, 1.3)
            },
            {
                id: "r4",
                name: "Musholla",
                type: "musholla",
                polygon: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$geometry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rect"])(0.15, 4.25, 3, 1.95)
            },
            {
                id: "r5",
                name: "Dapur",
                type: "dapur",
                polygon: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$geometry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rect"])(0.15, 6.35, 5.55, 1.5)
            },
            {
                id: "r6",
                name: "Ruang Tamu & Keluarga",
                type: "ruang_keluarga",
                polygon: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$geometry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rect"])(3.3, yFront + 0.075, 2.4, 6.35 - yFront - 0.075)
            },
            {
                id: "r7",
                name: "Kamar Utama",
                type: "kamar",
                polygon: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$geometry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rect"])(5.85, 0.15, 3, 3)
            },
            {
                id: "r8",
                name: "Selasar",
                type: "selasar",
                polygon: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$geometry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rect"])(5.7, 3.3, 3.15, 1.9)
            },
            {
                id: "r9",
                name: "Kamar Anak 2",
                type: "kamar",
                polygon: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$geometry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rect"])(5.85, 5.35, 3, 2.5)
            },
            {
                id: "r10",
                name: "Teras",
                type: "teras",
                polygon: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$geometry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rect"])(3.3, 0, 2.4, yFront - 0.075)
            }
        ],
        columns: null,
        calibration: {
            outerBox: [
                206,
                257,
                852,
                822
            ]
        },
        notes: [
            "Fixture referensi dari docs/denah.jpeg"
        ]
    };
}
function w(id, x1, y1, x2, y2, exterior) {
    return {
        id,
        a: {
            x: x1,
            y: y1
        },
        b: {
            x: x2,
            y: y2
        },
        thickness: 0.15,
        exterior
    };
}
function o(id, type, wallId, x, y, width, leaves, label, material = "kayu") {
    const height = type === "window" ? 1.2 : 2.1;
    return {
        id,
        type,
        wallId,
        at: {
            x,
            y
        },
        width,
        height,
        leaves,
        label,
        material: type === "door" ? material : undefined
    };
}
}),
"[project]/src/lib/export/xlsx.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "exportRabXlsx",
    ()=>exportRabXlsx
]);
async function exportRabXlsx(project, rab, company) {
    const ExcelJS = (await __turbopack_context__.A("[project]/node_modules/exceljs/excel.js [app-ssr] (ecmascript, async loader)")).default;
    const wb = new ExcelJS.Workbook();
    wb.creator = "ZanRab — zandev.id";
    const ws = wb.addWorksheet("RAB", {
        pageSetup: {
            paperSize: 9,
            orientation: "portrait",
            fitToPage: true,
            fitToWidth: 1,
            fitToHeight: 0
        }
    });
    ws.columns = [
        {
            key: "no",
            width: 6
        },
        {
            key: "item",
            width: 46
        },
        {
            key: "vol",
            width: 11
        },
        {
            key: "sat",
            width: 7
        },
        {
            key: "hrg",
            width: 15
        },
        {
            key: "jml",
            width: 17
        },
        {
            key: "ket",
            width: 42
        }
    ];
    const money = '#,##0;[Red]-#,##0';
    const border = {
        top: {
            style: "thin"
        },
        left: {
            style: "thin"
        },
        bottom: {
            style: "thin"
        },
        right: {
            style: "thin"
        }
    };
    ws.mergeCells("A1:G1");
    ws.getCell("A1").value = "RENCANA ANGGARAN BIAYA (RAB)";
    ws.getCell("A1").font = {
        bold: true,
        size: 14
    };
    ws.getCell("A1").alignment = {
        horizontal: "center"
    };
    const meta = [
        [
            "Pekerjaan",
            project.title
        ],
        [
            "Lokasi",
            project.location
        ],
        [
            "Pemilik",
            project.client.name
        ],
        [
            "Kontraktor",
            company.name
        ],
        [
            "Luas bangunan",
            `${rab.grossArea} m²`
        ],
        [
            "Mode harga",
            project.priceMode === "ahsp" ? "AHSP (analisa)" : "Borongan"
        ]
    ];
    meta.forEach(([k, v], i)=>{
        ws.getCell(`A${i + 3}`).value = k;
        ws.getCell(`C${i + 3}`).value = `: ${v}`;
    });
    let r = meta.length + 4;
    const header = ws.getRow(r);
    header.values = [
        "NO",
        "URAIAN PEKERJAAN",
        "VOLUME",
        "SAT",
        "HARGA SATUAN",
        "JUMLAH HARGA",
        "DASAR PERHITUNGAN"
    ];
    header.font = {
        bold: true,
        color: {
            argb: "FFFFFFFF"
        }
    };
    header.eachCell((c)=>{
        c.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: {
                argb: "FF1C1C1E"
            }
        };
        c.border = border;
        c.alignment = {
            horizontal: "center",
            vertical: "middle"
        };
    });
    r++;
    const subtotalCells = [];
    for (const s of rab.sections){
        const sr = ws.getRow(r);
        sr.values = [
            s.code,
            s.title
        ];
        sr.font = {
            bold: true
        };
        sr.eachCell({
            includeEmpty: true
        }, (c)=>{
            c.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: {
                    argb: "FFE8F0FE"
                }
            };
            c.border = border;
        });
        r++;
        const first = r;
        s.lines.forEach((l, i)=>{
            const row = ws.getRow(r);
            row.getCell(1).value = i + 1;
            row.getCell(2).value = l.name;
            row.getCell(3).value = Math.round(l.volume * 1000) / 1000;
            row.getCell(3).numFmt = "#,##0.00";
            row.getCell(4).value = l.unit;
            row.getCell(5).value = l.unitPrice;
            row.getCell(5).numFmt = money;
            row.getCell(6).value = {
                formula: `C${r}*E${r}`,
                result: l.total
            };
            row.getCell(6).numFmt = money;
            row.getCell(7).value = l.formula;
            row.getCell(7).font = {
                size: 9,
                color: {
                    argb: "FF6B7280"
                }
            };
            row.eachCell({
                includeEmpty: true
            }, (c)=>c.border = border);
            r++;
        });
        const st = ws.getRow(r);
        st.getCell(5).value = `Subtotal ${s.code}`;
        st.getCell(6).value = {
            formula: `SUM(F${first}:F${r - 1})`,
            result: s.subtotal
        };
        st.getCell(6).numFmt = money;
        st.font = {
            bold: true
        };
        subtotalCells.push(`F${r}`);
        r += 2;
    }
    const P = project.params;
    const totals = [
        [
            "JUMLAH BIAYA LANGSUNG",
            subtotalCells.join("+"),
            rab.directCost
        ],
        [
            `Overhead & Profit ${(P.overheadProfitPct * 100).toFixed(1)}%`,
            `F${r}*${P.overheadProfitPct}`,
            rab.overheadProfit
        ],
        [
            "JUMLAH SEBELUM PAJAK",
            `F${r}+F${r + 1}`,
            rab.beforeTax
        ],
        [
            `PPN ${(P.ppnPct * 100).toFixed(0)}%`,
            P.includePpn ? `F${r + 2}*${P.ppnPct}` : "0",
            rab.ppn
        ],
        [
            "TOTAL",
            `F${r + 2}+F${r + 3}`,
            rab.grandTotal
        ],
        [
            `DIBULATKAN`,
            `CEILING(F${r + 4},${P.roundTo || 1})`,
            rab.grandTotalRounded
        ],
        [
            "Harga per m²",
            `F${r + 5}/${rab.grossArea}`,
            rab.costPerM2
        ]
    ];
    totals.forEach(([label, formula, result], i)=>{
        const row = ws.getRow(r + i);
        row.getCell(5).value = label;
        row.getCell(6).value = {
            formula,
            result
        };
        row.getCell(6).numFmt = money;
        row.font = {
            bold: i === 4 || i === 5
        };
    });
    r += totals.length + 2;
    ws.getCell(`A${r}`).value = "Dibuat dengan ZanRab — zandev.id";
    ws.getCell(`A${r}`).font = {
        italic: true,
        size: 9,
        color: {
            argb: "FF9CA3AF"
        }
    };
    ws.getCell(`A${r}`).value = {
        text: "Dibuat dengan ZanRab — zandev.id",
        hyperlink: "https://zandev.id"
    };
    const buf = await wb.xlsx.writeBuffer();
    const blob = new Blob([
        buf
    ], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `RAB ${project.title}.xlsx`.replace(/[\\/:*?"<>|]/g, "-");
    a.click();
    setTimeout(()=>URL.revokeObjectURL(a.href), 2000);
}
}),
"[project]/src/lib/geometry.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/src/lib/pricing.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Database harga ZanRab.
 *  - Mode BORONGAN: harga satuan all-in (material + upah) per item, default diambil dari RAB referensi.
 *  - Mode AHSP: harga dari analisa koefisien × harga dasar (bahan/upah).
 *
 * ⚠️ Koefisien AHSP di sini adalah nilai referensi umum (mengacu pola SNI / Permen PUPR).
 *    Wajib diverifikasi & disesuaikan dengan Permen PUPR terbaru + HSPK daerah sebelum dipakai resmi.
 *    Semua angka bisa diedit dari menu Database Harga.
 */ __turbopack_context__.s([
    "SECTIONS",
    ()=>SECTIONS,
    "ahspBreakdown",
    ()=>ahspBreakdown,
    "ahspUnitPrice",
    ()=>ahspUnitPrice,
    "defaultPriceDb",
    ()=>defaultPriceDb
]);
const SECTIONS = {
    I: "PEKERJAAN PERSIAPAN",
    II: "PEKERJAAN TANAH",
    III: "PEKERJAAN STRUKTUR BETON",
    IV: "PEKERJAAN PASANGAN & PLESTERAN",
    V: "PEKERJAAN ATAP & PLAFON",
    VI: "PEKERJAAN KUSEN, PINTU & JENDELA",
    VII: "PEKERJAAN LANTAI & KERAMIK",
    VIII: "PEKERJAAN PENGECATAN",
    IX: "PEKERJAAN INSTALASI LISTRIK",
    X: "PEKERJAAN SANITASI & INSTALASI AIR",
    XI: "PEKERJAAN LAIN-LAIN",
    XII: "PEKERJAAN TAMBAHAN"
};
const R = (code, name, unit, price, kind)=>({
        code,
        name,
        unit,
        price,
        kind
    });
const RESOURCES = [
    R("L.01", "Pekerja", "OH", 120000, "upah"),
    R("L.02", "Tukang batu", "OH", 150000, "upah"),
    R("L.03", "Tukang kayu", "OH", 150000, "upah"),
    R("L.04", "Tukang besi", "OH", 150000, "upah"),
    R("L.05", "Tukang cat", "OH", 150000, "upah"),
    R("L.06", "Kepala tukang", "OH", 170000, "upah"),
    R("L.07", "Mandor", "OH", 180000, "upah"),
    R("M.PC", "Semen portland", "kg", 1450, "bahan"),
    R("M.PP", "Pasir pasang", "m3", 280000, "bahan"),
    R("M.PB", "Pasir beton", "kg", 215, "bahan"),
    R("M.KR", "Kerikil / split 1-2", "kg", 245, "bahan"),
    R("M.AIR", "Air kerja", "liter", 50, "bahan"),
    R("M.BK", "Batu kali", "m3", 260000, "bahan"),
    R("M.TANAH", "Tanah urug", "m3", 120000, "bahan"),
    R("M.BESI", "Besi beton polos/ulir", "kg", 13500, "bahan"),
    R("M.KAWAT", "Kawat beton", "kg", 25000, "bahan"),
    R("M.KAYU3", "Kayu kelas III (bekisting)", "m3", 3800000, "bahan"),
    R("M.PAKU", "Paku 5-12 cm", "kg", 22000, "bahan"),
    R("M.MINYAK", "Minyak bekisting", "liter", 15000, "bahan"),
    R("M.BATARINGAN", "Bata ringan 60x20x10", "bh", 8500, "bahan"),
    R("M.BATAMERAH", "Bata merah bakar standar", "bh", 950, "bahan"),
    R("M.BATAKO", "Batako press keliling", "bh", 3500, "bahan"),
    R("M.MORTAR", "Mortar instan perekat bata ringan", "kg", 2800, "bahan"),
    R("M.GRANIT60", "Granit 60x60", "bh", 52000, "bahan"),
    R("M.KRMK30", "Keramik lantai 30x30", "bh", 5500, "bahan"),
    R("M.KRMK3060", "Keramik dinding 30x60", "bh", 13500, "bahan"),
    R("M.SEMENWARNA", "Semen warna / nat", "kg", 12000, "bahan"),
    R("M.PLAMIR", "Plamir tembok", "kg", 18000, "bahan"),
    R("M.CATDASAR", "Cat dasar", "kg", 30000, "bahan"),
    R("M.CATINT", "Cat tembok interior", "kg", 32000, "bahan"),
    R("M.CATEXT", "Cat tembok eksterior", "kg", 55000, "bahan"),
    R("M.GYPSUM", "Gypsum board 9 mm 1200x2400", "lbr", 75000, "bahan"),
    R("M.HOLLOW44", "Hollow galvanis 40x40", "btg", 32000, "bahan"),
    R("M.HOLLOW24", "Hollow galvanis 20x40", "btg", 28000, "bahan"),
    R("M.SKRUP", "Sekrup gypsum", "bh", 150, "bahan"),
    R("M.COMPOUND", "Compound gypsum", "kg", 12000, "bahan")
];
const A = (code, name, unit, components)=>({
        code,
        name,
        unit,
        components: components.map(([ref, coef])=>({
                ref,
                coef
            }))
    });
const LABOR_BETON = [
    [
        "L.01",
        1.65
    ],
    [
        "L.02",
        0.275
    ],
    [
        "L.06",
        0.028
    ],
    [
        "L.07",
        0.083
    ]
];
const ANALYSES = [
    A("A.GALIAN", "1 m3 Galian tanah biasa sedalam 1 m", "m3", [
        [
            "L.01",
            0.75
        ],
        [
            "L.07",
            0.025
        ]
    ]),
    A("A.URUG", "1 m3 Urugan tanah peninggian + pemadatan", "m3", [
        [
            "M.TANAH",
            1.2
        ],
        [
            "L.01",
            0.5
        ],
        [
            "L.07",
            0.05
        ]
    ]),
    A("A.URUGKEMBALI", "1 m3 Urugan tanah kembali", "m3", [
        [
            "L.01",
            0.192
        ],
        [
            "L.07",
            0.019
        ]
    ]),
    A("A.K225", "1 m3 Beton mutu fc' 19,3 MPa (K-225)", "m3", [
        [
            "M.PC",
            371
        ],
        [
            "M.PB",
            698
        ],
        [
            "M.KR",
            1047
        ],
        [
            "M.AIR",
            215
        ],
        ...LABOR_BETON
    ]),
    A("A.K175", "1 m3 Beton mutu fc' 14,5 MPa (K-175)", "m3", [
        [
            "M.PC",
            326
        ],
        [
            "M.PB",
            760
        ],
        [
            "M.KR",
            1029
        ],
        [
            "M.AIR",
            215
        ],
        ...LABOR_BETON
    ]),
    A("A.BESI", "1 kg Pembesian besi polos/ulir", "kg", [
        [
            "M.BESI",
            1.05
        ],
        [
            "M.KAWAT",
            0.015
        ],
        [
            "L.01",
            0.007
        ],
        [
            "L.04",
            0.007
        ],
        [
            "L.06",
            0.0007
        ],
        [
            "L.07",
            0.0004
        ]
    ]),
    A("A.BEKISTING", "1 m2 Bekisting kayu", "m2", [
        [
            "M.KAYU3",
            0.045
        ],
        [
            "M.PAKU",
            0.3
        ],
        [
            "M.MINYAK",
            0.1
        ],
        [
            "L.01",
            0.52
        ],
        [
            "L.03",
            0.26
        ],
        [
            "L.06",
            0.026
        ],
        [
            "L.07",
            0.026
        ]
    ]),
    // Beton bertulang komposit: beton + besi (kg/m3) + bekisting (m2/m3)
    A("A.STRAUSS", "1 m3 Strauss pile Ø30 bertulang", "m3", [
        [
            "A.K225",
            1
        ],
        [
            "A.BESI",
            56
        ],
        [
            "L.01",
            1.5
        ],
        [
            "L.02",
            0.5
        ]
    ]),
    A("A.PILECAP", "1 m3 Pile cap bertulang", "m3", [
        [
            "A.K225",
            1
        ],
        [
            "A.BESI",
            100
        ],
        [
            "A.BEKISTING",
            6.7
        ]
    ]),
    A("A.SLOOF", "1 m3 Sloof bertulang 15x25", "m3", [
        [
            "A.K225",
            1
        ],
        [
            "A.BESI",
            115
        ],
        [
            "A.BEKISTING",
            13.3
        ]
    ]),
    A("A.KOLOM", "1 m3 Kolom bertulang 15x20", "m3", [
        [
            "A.K225",
            1
        ],
        [
            "A.BESI",
            137
        ],
        [
            "A.BEKISTING",
            23.3
        ]
    ]),
    A("A.RINGBALOK", "1 m3 Ring balok bertulang 15x20", "m3", [
        [
            "A.K225",
            1
        ],
        [
            "A.BESI",
            137
        ],
        [
            "A.BEKISTING",
            18.3
        ]
    ]),
    A("A.DAK", "1 m3 Pelat dak bertulang t=12 cm", "m3", [
        [
            "A.K225",
            1
        ],
        [
            "A.BESI",
            137
        ],
        [
            "A.BEKISTING",
            8.3
        ]
    ]),
    A("A.RABAT", "1 m3 Rabat beton lantai kerja K-175", "m3", [
        [
            "A.K175",
            1
        ]
    ]),
    A("A.BATAKALI", "1 m3 Pasangan pondasi batu kali 1:4", "m3", [
        [
            "M.BK",
            1.2
        ],
        [
            "M.PC",
            163
        ],
        [
            "M.PP",
            0.52
        ],
        [
            "L.01",
            1.5
        ],
        [
            "L.02",
            0.75
        ],
        [
            "L.06",
            0.075
        ],
        [
            "L.07",
            0.075
        ]
    ]),
    A("A.BATARINGAN", "1 m2 Pasangan dinding bata ringan t=10 cm", "m2", [
        [
            "M.BATARINGAN",
            8.75
        ],
        [
            "M.MORTAR",
            4.5
        ],
        [
            "L.01",
            0.3
        ],
        [
            "L.02",
            0.1
        ],
        [
            "L.06",
            0.01
        ],
        [
            "L.07",
            0.015
        ]
    ]),
    A("A.BATAMERAH", "1 m2 Pasangan dinding bata merah 1:4", "m2", [
        [
            "M.BATAMERAH",
            70
        ],
        [
            "M.PC",
            11.5
        ],
        [
            "M.PP",
            0.043
        ],
        [
            "L.01",
            0.3
        ],
        [
            "L.02",
            0.1
        ],
        [
            "L.06",
            0.01
        ],
        [
            "L.07",
            0.015
        ]
    ]),
    A("A.BATAKO", "1 m2 Pasangan dinding batako press 1:4", "m2", [
        [
            "M.BATAKO",
            12.5
        ],
        [
            "M.PC",
            9.6
        ],
        [
            "M.PP",
            0.035
        ],
        [
            "L.01",
            0.3
        ],
        [
            "L.02",
            0.1
        ],
        [
            "L.06",
            0.01
        ],
        [
            "L.07",
            0.015
        ]
    ]),
    A("A.PLESTERACI", "1 m2 Plesteran 1:4 t=15 mm + acian", "m2", [
        [
            "M.PC",
            9.49
        ],
        [
            "M.PP",
            0.024
        ],
        [
            "L.01",
            0.5
        ],
        [
            "L.02",
            0.25
        ],
        [
            "L.06",
            0.025
        ],
        [
            "L.07",
            0.025
        ]
    ]),
    A("A.GRANIT", "1 m2 Pasang lantai granit 60x60", "m2", [
        [
            "M.GRANIT60",
            2.78
        ],
        [
            "M.PC",
            10
        ],
        [
            "M.PP",
            0.045
        ],
        [
            "M.SEMENWARNA",
            1.3
        ],
        [
            "L.01",
            0.7
        ],
        [
            "L.02",
            0.35
        ],
        [
            "L.06",
            0.035
        ],
        [
            "L.07",
            0.035
        ]
    ]),
    A("A.KRMKLANTAI", "1 m2 Pasang lantai keramik 30x30", "m2", [
        [
            "M.KRMK30",
            11.11
        ],
        [
            "M.PC",
            10
        ],
        [
            "M.PP",
            0.045
        ],
        [
            "M.SEMENWARNA",
            1.5
        ],
        [
            "L.01",
            0.7
        ],
        [
            "L.02",
            0.35
        ],
        [
            "L.06",
            0.035
        ],
        [
            "L.07",
            0.035
        ]
    ]),
    A("A.KRMKDINDING", "1 m2 Pasang dinding keramik 30x60", "m2", [
        [
            "M.KRMK3060",
            5.56
        ],
        [
            "M.PC",
            9.3
        ],
        [
            "M.PP",
            0.018
        ],
        [
            "M.SEMENWARNA",
            1.94
        ],
        [
            "L.01",
            0.9
        ],
        [
            "L.02",
            0.45
        ],
        [
            "L.06",
            0.045
        ],
        [
            "L.07",
            0.045
        ]
    ]),
    A("A.CATINT", "1 m2 Pengecatan tembok interior (plamir, dasar, 2 lapis)", "m2", [
        [
            "M.PLAMIR",
            0.1
        ],
        [
            "M.CATDASAR",
            0.1
        ],
        [
            "M.CATINT",
            0.26
        ],
        [
            "L.01",
            0.02
        ],
        [
            "L.05",
            0.063
        ],
        [
            "L.06",
            0.0063
        ],
        [
            "L.07",
            0.0025
        ]
    ]),
    A("A.CATEXT", "1 m2 Pengecatan tembok eksterior", "m2", [
        [
            "M.PLAMIR",
            0.1
        ],
        [
            "M.CATDASAR",
            0.1
        ],
        [
            "M.CATEXT",
            0.3
        ],
        [
            "L.01",
            0.02
        ],
        [
            "L.05",
            0.063
        ],
        [
            "L.06",
            0.0063
        ],
        [
            "L.07",
            0.0025
        ]
    ]),
    A("A.PLAFON", "1 m2 Plafon gypsum 9 mm rangka hollow", "m2", [
        [
            "M.GYPSUM",
            0.364
        ],
        [
            "M.HOLLOW44",
            0.45
        ],
        [
            "M.HOLLOW24",
            0.6
        ],
        [
            "M.SKRUP",
            25
        ],
        [
            "M.COMPOUND",
            0.3
        ],
        [
            "L.01",
            0.25
        ],
        [
            "L.03",
            0.25
        ],
        [
            "L.06",
            0.025
        ],
        [
            "L.07",
            0.013
        ]
    ])
];
const C = (code, section, name, unit, borongan, ahsp, note)=>({
        code,
        section,
        name,
        unit,
        borongan,
        ahsp,
        note
    });
const CATALOG = [
    C("PRS.BONGKAR", "I", "Bongkar & buang bangunan lama", "ls", 0),
    C("PRS.BERSIH", "I", "Pembersihan lahan", "m2", 10000, undefined, "estimasi"),
    C("PRS.BOUWPLANK", "I", "Pengukuran & bouwplank", "m1", 35000, undefined, "estimasi"),
    C("TNH.GALSTRAUSS", "II", "Galian / bor strauss", "m1", 60000),
    C("TNH.GALPILECAP", "II", "Galian pile cap", "ttk", 125000),
    C("TNH.GALPONDASI", "II", "Galian tanah pondasi menerus", "m3", 110000, "A.GALIAN"),
    C("TNH.URUGKEMBALI", "II", "Urugan tanah kembali", "m3", 50000, "A.URUGKEMBALI"),
    C("TNH.URUG", "II", "Urugan tanah peninggian + pemadatan", "m3", 145000, "A.URUG"),
    C("STR.STRAUSS", "III", "Pondasi strauss Ø30 bertulang", "m3", 4000000, "A.STRAUSS"),
    C("STR.PILECAP", "III", "Pile cap bertulang", "m3", 4000000, "A.PILECAP"),
    C("STR.SLOOF", "III", "Sloof beton bertulang", "m3", 4000000, "A.SLOOF"),
    C("STR.KOLOM", "III", "Kolom beton bertulang", "m3", 4000000, "A.KOLOM"),
    C("STR.RINGBALOK", "III", "Ring balok beton bertulang", "m3", 4000000, "A.RINGBALOK"),
    C("STR.RABAT", "III", "Rabat beton lantai kerja", "m3", 1250000, "A.RABAT"),
    C("STR.DAK", "III", "Pelat dak beton bertulang", "m3", 4000000, "A.DAK"),
    C("PAS.KUMBUNG", "IV", "Pondasi batu kumbung", "m2", 275000),
    C("PAS.BATUKALI", "IV", "Pasangan pondasi batu kali 1:4", "m3", 1150000, "A.BATUKALI"),
    C("PAS.BATARINGAN", "IV", "Dinding bata ringan t=10 cm", "m2", 190000, "A.BATARINGAN"),
    C("PAS.BATAMERAH", "IV", "Dinding bata merah 1/2 bata", "m2", 215000, "A.BATAMERAH"),
    C("PAS.BATAKO", "IV", "Dinding batako press", "m2", 175000),
    C("PAS.PLESTER", "IV", "Plester + acian", "m2", 45000, "A.PLESTERACI"),
    C("ATP.PLAFON", "V", "Plafon gypsum + rangka hollow", "m2", 180000, "A.PLAFON"),
    C("ATP.RANGKA", "V", "Rangka atap baja ringan", "m2", 95000),
    C("ATP.GENTENGBETON", "V", "Penutup atap genteng beton", "m2", 285000),
    C("ATP.GENTENGMETAL", "V", "Penutup atap genteng metal pasir", "m2", 120000, undefined, "estimasi"),
    C("ATP.SPANDEK", "V", "Penutup atap spandek", "m2", 110000, undefined, "estimasi"),
    C("ATP.WUWUNG", "V", "Genteng wuwung / nok", "m1", 45000),
    C("ATP.LISPLANG", "V", "Lisplang kalsiboard", "m1", 30000),
    C("ATP.TALANG", "V", "Talang PVC + pipa turun", "m1", 85000, undefined, "estimasi"),
    C("ATP.WATERPROOF", "V", "Waterproofing dak", "m2", 120000, undefined, "estimasi"),
    C("KSN.ALU", "VI", 'Kusen aluminium 3"', "m1", 180000),
    C("KSN.JENDELA", "VI", "Daun jendela + kaca 6 mm clear", "bh", 2250000),
    C("KSN.PINTUKAYU", "VI", "Daun pintu kayu + handle", "bh", 1350000),
    C("KSN.PINTUPVC", "VI", "Pintu PVC kamar mandi", "bh", 550000),
    C("LNT.GRANIT", "VII", "Lantai granit 60x60", "m2", 200000, "A.GRANIT"),
    C("LNT.KRMKKM", "VII", "Lantai keramik KM 30x30", "m2", 160000, "A.KRMKLANTAI"),
    C("LNT.DINDINGKM", "VII", "Dinding keramik KM 30x60", "m2", 200000, "A.KRMKDINDING"),
    C("LNT.PLINT", "VII", "Plint granit", "m1", 35000, undefined, "estimasi"),
    C("CAT.INT", "VIII", "Cat dinding interior", "m2", 60000, "A.CATINT"),
    C("CAT.EXT", "VIII", "Cat dinding eksterior", "m2", 70000, "A.CATEXT", "estimasi"),
    C("CAT.PLAFON", "VIII", "Cat plafon", "m2", 60000, "A.CATINT"),
    C("LST.SAKLAR1", "IX", "Instalasi saklar single", "bh", 225000),
    C("LST.SAKLAR2", "IX", "Instalasi saklar double", "bh", 225000),
    C("LST.LAMPU", "IX", "Instalasi titik lampu", "bh", 225000),
    C("LST.STOPKONTAK", "IX", "Instalasi stop kontak", "bh", 225000),
    C("LST.MCB", "IX", "Box MCB + MCB", "bh", 350000),
    C("AIR.PVC4", "X", 'Instalasi air kotor PVC 4"', "m1", 125000),
    C("AIR.PVC3", "X", 'Instalasi air kotor PVC 3"', "m1", 120000),
    C("AIR.PVC34", "X", 'Instalasi air bersih PVC 3/4"', "m1", 50000),
    C("AIR.BAKMANDI", "X", "Bak mandi PVC", "unit", 550000),
    C("AIR.FLOORDRAIN", "X", "Floor drain (avour)", "bh", 60000),
    C("AIR.KRAN", "X", "Kran air", "bh", 45000),
    C("AIR.CLOSET", "X", "Closet duduk", "bh", 2100000),
    C("AIR.SINK", "X", "Kitchen sink + kran", "unit", 1250000, undefined, "estimasi"),
    C("AIR.SEPTIC", "X", "Septic tank biofilter + resapan", "unit", 3500000, undefined, "estimasi"),
    C("LL.MEJADAPUR", "XI", "Meja dapur beton + top granit", "m1", 1500000, undefined, "estimasi"),
    C("LL.BERSIHAKHIR", "XI", "Pembersihan akhir", "ls", 750000, undefined, "estimasi")
];
function defaultPriceDb() {
    return {
        version: 1,
        region: "Jawa Timur (referensi RAB KAMAL)",
        resources: structuredClone(RESOURCES),
        analyses: structuredClone(ANALYSES),
        catalog: structuredClone(CATALOG)
    };
}
function ahspUnitPrice(db, code, depth = 0) {
    if (depth > 5) throw new Error(`Analisa AHSP siklik: ${code}`);
    const an = db.analyses.find((a)=>a.code === code);
    if (!an) return NaN;
    let total = 0;
    for (const c of an.components){
        const r = db.resources.find((x)=>x.code === c.ref);
        if (r) total += c.coef * r.price;
        else total += c.coef * ahspUnitPrice(db, c.ref, depth + 1);
    }
    return total;
}
function ahspBreakdown(db, code) {
    const an = db.analyses.find((a)=>a.code === code);
    if (!an) return [];
    return an.components.map((c)=>{
        const r = db.resources.find((x)=>x.code === c.ref);
        if (r) return {
            ref: r.code,
            name: r.name,
            unit: r.unit,
            coef: c.coef,
            price: r.price,
            total: c.coef * r.price,
            kind: r.kind
        };
        const sub = db.analyses.find((a)=>a.code === c.ref);
        const price = ahspUnitPrice(db, c.ref);
        return {
            ref: c.ref,
            name: sub?.name ?? c.ref,
            unit: sub?.unit ?? "",
            coef: c.coef,
            price,
            total: c.coef * price,
            kind: "analisa"
        };
    });
}
}),
"[project]/src/lib/rab.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "computeRab",
    ()=>computeRab,
    "num",
    ()=>num,
    "rupiah",
    ()=>rupiah,
    "terbilang",
    ()=>terbilang,
    "terbilangRupiah",
    ()=>terbilangRupiah,
    "unitPriceFor",
    ()=>unitPriceFor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pricing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/pricing.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$takeoff$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/takeoff.ts [app-ssr] (ecmascript)");
;
;
function unitPriceFor(db, project, item) {
    if (project.priceOverrides[item.code] != null) return {
        price: project.priceOverrides[item.code],
        source: "manual"
    };
    if (project.customPrices[item.code] != null) return {
        price: project.customPrices[item.code],
        source: "manual"
    };
    if (item.code === "PRS.BONGKAR") return {
        price: project.params.demolitionLumpSum,
        source: "manual"
    };
    const cat = db.catalog.find((c)=>c.code === item.code);
    if (!cat) return {
        price: 0,
        source: "manual"
    };
    if (project.priceMode === "ahsp" && cat.ahsp) {
        const p = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pricing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ahspUnitPrice"])(db, cat.ahsp);
        if (Number.isFinite(p)) return {
            price: Math.round(p),
            source: "ahsp"
        };
    }
    return {
        price: cat.borongan,
        source: "borongan"
    };
}
function computeRab(project, db) {
    if (!project.plan) return null;
    const { items, ctx } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$takeoff$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["takeoff"])(project.plan, project.params);
    const all = [
        ...items,
        ...project.customLines.map((c)=>({
                ...c,
                section: c.section || "XII"
            }))
    ];
    const lines = all.filter((it)=>!project.excluded.includes(it.code)).map((it)=>{
        const volume = project.volumeOverrides[it.code] ?? it.volume;
        const { price, source } = unitPriceFor(db, project, it);
        return {
            ...it,
            volume,
            formula: project.volumeOverrides[it.code] != null ? `Diubah manual (asli: ${it.volume})` : it.formula,
            unitPrice: price,
            total: Math.round(volume * price),
            priceSource: source
        };
    });
    const sections = Object.entries(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pricing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SECTIONS"]).map(([code, title])=>{
        const ls = lines.filter((l)=>l.section === code);
        return {
            code,
            title,
            lines: ls,
            subtotal: ls.reduce((a, l)=>a + l.total, 0)
        };
    }).filter((s)=>s.lines.length > 0);
    const P = project.params;
    const directCost = sections.reduce((a, s)=>a + s.subtotal, 0);
    const overheadProfit = Math.round(directCost * P.overheadProfitPct);
    const beforeTax = directCost + overheadProfit;
    const ppn = P.includePpn ? Math.round(beforeTax * P.ppnPct) : 0;
    const grandTotal = beforeTax + ppn;
    const r = P.roundTo > 0 ? P.roundTo : 1;
    const grandTotalRounded = Math.ceil(grandTotal / r) * r;
    const floors = Math.max(1, P.floorCount || 1);
    const baseArea = project.plan.outline.width * project.plan.outline.depth;
    const grossArea = P.grossAreaOverride ?? baseArea * floors;
    return {
        rab: {
            sections,
            directCost,
            overheadProfit,
            beforeTax,
            ppn,
            grandTotal,
            grandTotalRounded,
            grossArea,
            costPerM2: grossArea > 0 ? grandTotalRounded / grossArea : 0
        },
        quantities: items,
        ctx
    };
}
const rupiah = (v)=>"Rp " + Math.round(v).toLocaleString("id-ID", {
        maximumFractionDigits: 0
    });
const num = (v, d = 2)=>v.toLocaleString("id-ID", {
        maximumFractionDigits: d,
        minimumFractionDigits: 0
    });
const SATUAN = [
    "",
    "satu",
    "dua",
    "tiga",
    "empat",
    "lima",
    "enam",
    "tujuh",
    "delapan",
    "sembilan",
    "sepuluh",
    "sebelas"
];
function terbilang(n) {
    n = Math.floor(Math.abs(n));
    if (n < 12) return SATUAN[n];
    if (n < 20) return terbilang(n - 10) + " belas";
    if (n < 100) return terbilang(Math.floor(n / 10)) + " puluh" + sp(terbilang(n % 10));
    if (n < 200) return "seratus" + sp(terbilang(n - 100));
    if (n < 1000) return terbilang(Math.floor(n / 100)) + " ratus" + sp(terbilang(n % 100));
    if (n < 2000) return "seribu" + sp(terbilang(n - 1000));
    if (n < 1e6) return terbilang(Math.floor(n / 1000)) + " ribu" + sp(terbilang(n % 1000));
    if (n < 1e9) return terbilang(Math.floor(n / 1e6)) + " juta" + sp(terbilang(n % 1e6));
    if (n < 1e12) return terbilang(Math.floor(n / 1e9)) + " miliar" + sp(terbilang(n % 1e9));
    return terbilang(Math.floor(n / 1e12)) + " triliun" + sp(terbilang(n % 1e12));
}
const sp = (s)=>s ? " " + s : "";
function terbilangRupiah(n) {
    const t = terbilang(n).trim();
    return t.charAt(0).toUpperCase() + t.slice(1) + " rupiah";
}
}),
"[project]/src/lib/store.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "newProject",
    ()=>newProject,
    "useStore",
    ()=>useStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$idb$2d$keyval$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/idb-keyval/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$defaults$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/defaults.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pricing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/pricing.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$geometry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/geometry.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
const DEFAULT_COMPANY = {
    name: "CV. Nama Kontraktor",
    address: "Alamat kantor",
    phone: "08xx-xxxx-xxxx",
    email: "",
    director: "Nama Direktur",
    logoDataUrl: null
};
const DEFAULT_SETTINGS = {
    provider: "gemini",
    geminiKey: "",
    claudeKey: ""
};
function newProject(partial = {}) {
    const now = Date.now();
    const d = new Date(now);
    return {
        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$geometry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uid"])("prj"),
        title: "Proyek Baru",
        location: "",
        createdAt: now,
        updatedAt: now,
        client: {
            name: "",
            address: "",
            phone: ""
        },
        imageDataUrl: null,
        plan: null,
        analyzeMeta: null,
        params: structuredClone(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$defaults$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_PARAMS"]),
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
        ...partial
    };
}
function toRoman(n) {
    return [
        "I",
        "II",
        "III",
        "IV",
        "V",
        "VI",
        "VII",
        "VIII",
        "IX",
        "X",
        "XI",
        "XII"
    ][n - 1];
}
let persistTimer = null;
function persist(s) {
    if (persistTimer) clearTimeout(persistTimer);
    persistTimer = setTimeout(()=>{
        void (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$idb$2d$keyval$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["set"])("zanrab:v1", {
            projects: s.projects,
            priceDb: s.priceDb,
            company: s.company,
            settings: s.settings
        });
    }, 300);
}
async function fileToDataUrl(url) {
    const blob = await (await fetch(url)).blob();
    return new Promise((res)=>{
        const r = new FileReader();
        r.onload = ()=>res(String(r.result));
        r.readAsDataURL(blob);
    });
}
const useStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])((set, get)=>({
        ready: false,
        projects: {},
        priceDb: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pricing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defaultPriceDb"])(),
        company: DEFAULT_COMPANY,
        settings: DEFAULT_SETTINGS,
        hydrate: async ()=>{
            if (get().ready) return;
            const saved = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$idb$2d$keyval$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["get"])("zanrab:v1");
            set({
                ready: true,
                projects: saved?.projects ?? {},
                priceDb: saved?.priceDb ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pricing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defaultPriceDb"])(),
                company: saved?.company ?? DEFAULT_COMPANY,
                settings: {
                    ...DEFAULT_SETTINGS,
                    ...saved?.settings ?? {}
                }
            });
        },
        createProject: (partial)=>{
            const p = newProject(partial);
            set((s)=>({
                    projects: {
                        ...s.projects,
                        [p.id]: p
                    }
                }));
            persist(get());
            return p.id;
        },
        createDemoProject: async ()=>{
            const img = await fileToDataUrl("/samples/denah-kamal.jpeg");
            const p = newProject({
                title: "Rumah Tinggal Bp. Kamal",
                location: "Talon",
                client: {
                    name: "Bp. Kamal",
                    address: "Talon",
                    phone: ""
                },
                imageDataUrl: img,
                plan: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$defaults$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["samplePlan"])(),
                analyzeMeta: {
                    provider: "Demo",
                    model: "fixture terverifikasi",
                    durationMs: 0
                },
                params: {
                    ...structuredClone(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$defaults$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_PARAMS"]),
                    wallHeight: 3.51,
                    fillHeight: 0.7,
                    demolitionLumpSum: 5_000_000,
                    kitchenCounterLength: 2.5
                }
            });
            set((s)=>({
                    projects: {
                        ...s.projects,
                        [p.id]: p
                    }
                }));
            persist(get());
            return p.id;
        },
        updateProject: (id, patch)=>{
            set((s)=>{
                const cur = s.projects[id];
                if (!cur) return s;
                const delta = typeof patch === "function" ? patch(cur) : patch;
                return {
                    projects: {
                        ...s.projects,
                        [id]: {
                            ...cur,
                            ...delta,
                            updatedAt: Date.now()
                        }
                    }
                };
            });
            persist(get());
        },
        deleteProject: (id)=>{
            set((s)=>{
                const next = {
                    ...s.projects
                };
                delete next[id];
                return {
                    projects: next
                };
            });
            persist(get());
        },
        duplicateProject: (id)=>{
            const src = get().projects[id];
            const p = newProject({
                ...structuredClone(src),
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$geometry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uid"])("prj"),
                title: `${src.title} (salinan)`,
                status: "draft"
            });
            set((s)=>({
                    projects: {
                        ...s.projects,
                        [p.id]: p
                    }
                }));
            persist(get());
            return p.id;
        },
        setPriceDb: (db)=>{
            set({
                priceDb: db
            });
            persist(get());
        },
        setCompany: (c)=>{
            set({
                company: c
            });
            persist(get());
        },
        setSettings: (s)=>{
            set((st)=>({
                    settings: {
                        ...st.settings,
                        ...s
                    }
                }));
            persist(get());
        }
    }));
}),
"[project]/src/lib/takeoff.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "openingsOfRoom",
    ()=>openingsOfRoom,
    "roomWallContact",
    ()=>roomWallContact,
    "takeoff",
    ()=>takeoff
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$geometry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/geometry.ts [app-ssr] (ecmascript)");
;
const f = (v, d = 2)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$geometry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["round"])(v, d).toLocaleString("id-ID", {
        maximumFractionDigits: d
    });
function roomWallContact(room, walls) {
    let total = 0;
    const poly = room.polygon;
    for(let i = 0; i < poly.length; i++){
        const p = poly[i];
        const q = poly[(i + 1) % poly.length];
        const elen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$geometry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dist"])(p, q);
        if (elen < 1e-6) continue;
        const ux = (q.x - p.x) / elen;
        const uy = (q.y - p.y) / elen;
        // gabungkan interval kontak sepanjang sisi
        const intervals = [];
        for (const w of walls){
            const wl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$geometry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["wallLength"])(w);
            if (wl < 1e-6) continue;
            const wx = (w.b.x - w.a.x) / wl;
            const wy = (w.b.y - w.a.y) / wl;
            if (Math.abs(ux * wy - uy * wx) > 0.02) continue; // tidak sejajar
            const off = Math.abs((w.a.x - p.x) * -uy + (w.a.y - p.y) * ux);
            if (Math.abs(off - w.thickness / 2) > 0.05) continue; // bukan muka dinding ini
            const s1 = (w.a.x - p.x) * ux + (w.a.y - p.y) * uy;
            const s2 = (w.b.x - p.x) * ux + (w.b.y - p.y) * uy;
            const lo = Math.max(0, Math.min(s1, s2) - w.thickness / 2);
            const hi = Math.min(elen, Math.max(s1, s2) + w.thickness / 2);
            if (hi > lo) intervals.push([
                lo,
                hi
            ]);
        }
        intervals.sort((a, b)=>a[0] - b[0]);
        let cur = null;
        for (const iv of intervals){
            if (!cur) cur = [
                ...iv
            ];
            else if (iv[0] <= cur[1]) cur[1] = Math.max(cur[1], iv[1]);
            else {
                total += cur[1] - cur[0];
                cur = [
                    ...iv
                ];
            }
        }
        if (cur) total += cur[1] - cur[0];
    }
    return total;
}
function openingsOfRoom(room, openings, tol = 0.15) {
    return openings.filter((o)=>{
        for(let i = 0; i < room.polygon.length; i++){
            const r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$geometry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pointToSegment"])(o.at, room.polygon[i], room.polygon[(i + 1) % room.polygon.length]);
            if (r.d <= tol) return true;
        }
        return false;
    });
}
function distanceToExterior(p, walls) {
    let best = Infinity;
    for (const w of walls.filter((x)=>x.exterior))best = Math.min(best, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$geometry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pointToSegment"])(p, w.a, w.b).d);
    return Number.isFinite(best) ? best : 3;
}
function takeoff(plan, P) {
    const items = [];
    const add = (it)=>{
        if (it.volume > 0) items.push({
            ...it,
            volume: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$geometry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["round"])(it.volume, 3)
        });
    };
    const m = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$geometry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["planMetrics"])(plan, P.doorHeight, P.windowHeight);
    const L = m.wallLength;
    const Lext = m.exteriorWallLength;
    const H = P.wallHeight;
    const gross = P.grossAreaOverride ?? m.grossArea;
    const columns = plan.columns ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$geometry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["detectColumns"])(plan.walls, P.maxColumnSpan);
    const n = columns.length;
    const wetRooms = plan.rooms.filter((r)=>r.type === "kamar_mandi");
    const dryRooms = plan.rooms.filter((r)=>r.type !== "kamar_mandi");
    const area = (rs)=>rs.reduce((a, r)=>a + (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$geometry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["polygonArea"])(r.polygon), 0);
    const netFloor = area(plan.rooms);
    const indoorFloor = area(plan.rooms.filter((r)=>r.type !== "teras" && r.type !== "carport"));
    // ---------- I. PERSIAPAN ----------
    if (P.demolitionLumpSum > 0) add({
        code: "PRS.BONGKAR",
        section: "I",
        name: "Bongkar & buang bangunan lama",
        unit: "ls",
        volume: 1,
        formula: "Lump sum (parameter)",
        source: "parameter"
    });
    add({
        code: "PRS.BERSIH",
        section: "I",
        name: "Pembersihan lahan",
        unit: "m2",
        volume: gross,
        formula: `Luas bruto ${f(gross)} m²`,
        source: "denah"
    });
    const bp = 2 * (plan.outline.width + 2 + plan.outline.depth + 2);
    add({
        code: "PRS.BOUWPLANK",
        section: "I",
        name: "Pengukuran & bouwplank",
        unit: "m1",
        volume: bp,
        formula: `2 × ((${f(plan.outline.width)} + 2) + (${f(plan.outline.depth)} + 2))`,
        source: "denah"
    });
    // ---------- II. TANAH & III. STRUKTUR ----------
    const usesStrauss = P.foundation === "strauss_kumbung";
    const usesStone = P.foundation === "batu_kali" || P.foundation === "footplat_batu_kali";
    if (usesStrauss) {
        add({
            code: "TNH.GALSTRAUSS",
            section: "II",
            name: `Galian / bor strauss @ ${f(P.straussDepth)} m`,
            unit: "m1",
            volume: n * P.straussDepth,
            formula: `${n} titik × ${f(P.straussDepth)} m`,
            source: "denah"
        });
        add({
            code: "TNH.GALPILECAP",
            section: "II",
            name: `Galian pile cap ${cm(P.pileCap.w)}x${cm(P.pileCap.l)}x${cm(P.pileCap.t)}`,
            unit: "ttk",
            volume: n,
            formula: `${n} titik kolom`,
            source: "denah"
        });
    }
    if (usesStone) {
        const gw = P.stoneFoundationBottom + 0.2;
        const gd = P.stoneFoundationHeight + 0.15;
        let gal = L * gw * gd;
        let formula = `${f(L)} m × ${f(gw)} × ${f(gd)}`;
        if (P.foundation === "footplat_batu_kali") {
            const fp = n * (P.pileCap.w + 0.4) * (P.pileCap.l + 0.4) * 1.0;
            gal += fp;
            formula += ` + footplat ${n} × ${f(P.pileCap.w + 0.4)}² × 1,0`;
        }
        const stoneVol = L * ((P.stoneFoundationTop + P.stoneFoundationBottom) / 2) * P.stoneFoundationHeight;
        add({
            code: "TNH.GALPONDASI",
            section: "II",
            name: "Galian tanah pondasi",
            unit: "m3",
            volume: gal,
            formula,
            source: "denah"
        });
        add({
            code: "TNH.URUGKEMBALI",
            section: "II",
            name: "Urugan tanah kembali",
            unit: "m3",
            volume: Math.max(0, gal - stoneVol) / 3,
            formula: `(galian − pasangan) ÷ 3`,
            source: "asumsi"
        });
    }
    if (P.fillHeight > 0) add({
        code: "TNH.URUG",
        section: "II",
        name: `Urugan peninggian t=${cm(P.fillHeight)} cm`,
        unit: "m3",
        volume: netFloor * P.fillHeight,
        formula: `Luas lantai ${f(netFloor)} m² × ${f(P.fillHeight)} m (dihitung SEKALI)`,
        source: "parameter"
    });
    if (usesStrauss) {
        const r = P.straussDiameter / 2;
        add({
            code: "STR.STRAUSS",
            section: "III",
            name: `Pondasi strauss Ø${cm(P.straussDiameter)} @ ${f(P.straussDepth)} m — ${n} titik`,
            unit: "m3",
            volume: n * Math.PI * r * r * P.straussDepth,
            formula: `${n} × π × ${f(r, 3)}² × ${f(P.straussDepth)}`,
            source: "denah"
        });
    }
    if (usesStrauss || P.foundation === "footplat_batu_kali") {
        const nm = usesStrauss ? "Pile cap" : "Footplat";
        add({
            code: "STR.PILECAP",
            section: "III",
            name: `${nm} ${cm(P.pileCap.w)}x${cm(P.pileCap.l)}x${cm(P.pileCap.t)} — ${n} titik`,
            unit: "m3",
            volume: n * P.pileCap.w * P.pileCap.l * P.pileCap.t,
            formula: `${n} × ${f(P.pileCap.w)} × ${f(P.pileCap.l)} × ${f(P.pileCap.t)}`,
            source: "denah"
        });
    }
    const floors = Math.max(1, P.floorCount || 1);
    add({
        code: "STR.SLOOF",
        section: "III",
        name: `Sloof ${cm(P.sloof.b)}x${cm(P.sloof.h)}`,
        unit: "m3",
        volume: L * P.sloof.b * P.sloof.h,
        formula: `${f(L)} m × ${f(P.sloof.b)} × ${f(P.sloof.h)}`,
        source: "denah"
    });
    add({
        code: "STR.KOLOM",
        section: "III",
        name: `Kolom ${cm(P.column.b)}x${cm(P.column.h)} — ${n} titik (${floors} lantai)`,
        unit: "m3",
        volume: n * P.column.b * P.column.h * H * floors,
        formula: `${n} × ${f(P.column.b)} × ${f(P.column.h)} × ${f(H)} m × ${floors} lt`,
        source: "denah"
    });
    add({
        code: "STR.RINGBALOK",
        section: "III",
        name: `Ring balok ${cm(P.ringBeam.b)}x${cm(P.ringBeam.h)}`,
        unit: "m3",
        volume: L * P.ringBeam.b * P.ringBeam.h * floors,
        formula: `${f(L)} m × ${f(P.ringBeam.b)} × ${f(P.ringBeam.h)} × ${floors} lt`,
        source: "denah"
    });
    // Standar Teknik Sipil: Dinding > 3.8 m butuh Balok Lintel / Balok Pinggang Praktis di tengah bentang dinding
    if (H > 3.8) {
        const lintelB = 0.12;
        const lintelH = 0.15;
        add({
            code: "STR.RINGBALOK",
            section: "III",
            name: `Balok lintel / pinggang pengaku dinding ${cm(lintelB)}x${cm(lintelH)} (h=${f(H)} m > 3.8 m)`,
            unit: "m3",
            volume: L * lintelB * lintelH * floors,
            formula: `Pengaku dinding tinggi ${f(L)} m × ${f(lintelB)} × ${f(lintelH)} × ${floors} lt`,
            source: "parameter"
        });
    }
    add({
        code: "STR.RABAT",
        section: "III",
        name: `Rabat beton lantai dasar t=${cm(P.floorSlabThickness)} cm`,
        unit: "m3",
        volume: netFloor * P.floorSlabThickness,
        formula: `${f(netFloor)} m² × ${f(P.floorSlabThickness)}`,
        source: "denah"
    });
    // Pelat lantai beton bertulang untuk lantai 2 ke atas (jika > 1 lantai)
    if (floors > 1) {
        const upperFloorSlabArea = indoorFloor * (floors - 1);
        add({
            code: "STR.DAK",
            section: "III",
            name: `Pelat lantai beton bertulang (Lantai 2..${floors}) t=12 cm`,
            unit: "m3",
            volume: upperFloorSlabArea * 0.12,
            formula: `Luas lantai atas ${f(upperFloorSlabArea)} m² × 0,12 m (${floors - 1} lantai)`,
            source: "parameter"
        });
    }
    const deckArea = P.roofType === "dak" ? P.concreteDeckArea || gross : P.concreteDeckArea;
    if (deckArea > 0) add({
        code: "STR.DAK",
        section: "III",
        name: `Pelat dak atap t=${cm(P.concreteDeckThickness)} cm`,
        unit: "m3",
        volume: deckArea * P.concreteDeckThickness,
        formula: `${f(deckArea)} m² × ${f(P.concreteDeckThickness)}`,
        source: "parameter"
    });
    // ---------- IV. PASANGAN ----------
    if (usesStrauss) add({
        code: "PAS.KUMBUNG",
        section: "IV",
        name: `Pondasi batu kumbung t=${cm(P.stoneFoundationHeight)} cm`,
        unit: "m2",
        volume: L * P.stoneFoundationHeight,
        formula: `${f(L)} m × ${f(P.stoneFoundationHeight)} m`,
        source: "denah"
    });
    if (usesStone) add({
        code: "PAS.BATUKALI",
        section: "IV",
        name: "Pondasi batu kali 1:4",
        unit: "m3",
        volume: L * ((P.stoneFoundationTop + P.stoneFoundationBottom) / 2) * P.stoneFoundationHeight,
        formula: `${f(L)} × (${f(P.stoneFoundationTop)} + ${f(P.stoneFoundationBottom)})/2 × ${f(P.stoneFoundationHeight)}`,
        source: "denah"
    });
    const opArea = (o)=>{
        const base = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$geometry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["openingArea"])(o, P.doorHeight, P.windowHeight);
        return o.type === "door" && P.transomHeight > 0 ? base + o.width * P.transomHeight : base;
    };
    const totalOpening = plan.openings.reduce((a, o)=>a + opArea(o), 0);
    const extIds = new Set(plan.walls.filter((w)=>w.exterior).map((w)=>w.id));
    const extOpening = plan.openings.filter((o)=>o.wallId && extIds.has(o.wallId)).reduce((a, o)=>a + opArea(o), 0);
    const wallGross = L * H;
    const wallNet = Math.max(0, wallGross - totalOpening);
    // Pemilihan material dinding & spesifikasi
    const wallType = P.wallType || "bata_ringan";
    if (wallType === "bata_merah") {
        add({
            code: "PAS.BATAMERAH",
            section: "IV",
            name: "Dinding bata merah 1/2 bata adukan 1:4",
            unit: "m2",
            volume: wallNet,
            formula: `${f(L)} m × ${f(H)} m − ${f(totalOpening)} m² bukaan (${plan.openings.length} bh)`,
            source: "denah"
        });
    } else if (wallType === "batako") {
        add({
            code: "PAS.BATAKO",
            section: "IV",
            name: "Dinding batako press adukan 1:4",
            unit: "m2",
            volume: wallNet,
            formula: `${f(L)} m × ${f(H)} m − ${f(totalOpening)} m² bukaan (${plan.openings.length} bh)`,
            source: "denah"
        });
    } else {
        add({
            code: "PAS.BATARINGAN",
            section: "IV",
            name: "Dinding bata ringan (Hebel) t=10 cm + thinbed",
            unit: "m2",
            volume: wallNet,
            formula: `${f(L)} m × ${f(H)} m − ${f(totalOpening)} m² bukaan (${plan.openings.length} bh)`,
            source: "denah"
        });
    }
    const plaster = wallNet * 2;
    add({
        code: "PAS.PLESTER",
        section: "IV",
        name: "Plester + acian 2 sisi",
        unit: "m2",
        volume: plaster,
        formula: `${f(wallNet)} m² × 2 sisi`,
        source: "denah"
    });
    // ---------- V. ATAP & PLAFON ----------
    const ceiling = netFloor;
    add({
        code: "ATP.PLAFON",
        section: "V",
        name: "Plafon gypsum + rangka hollow",
        unit: "m2",
        volume: ceiling,
        formula: `Σ luas ruang ${f(ceiling)} m² (${plan.rooms.length} ruang)`,
        source: "denah"
    });
    let roofArea = 0;
    if (P.roofType !== "dak") {
        const o = P.roofOverhang;
        const Wr = plan.outline.width + 2 * o;
        const Dr = plan.outline.depth + 2 * o;
        const long = Math.max(Wr, Dr);
        const short = Math.min(Wr, Dr);
        const th = P.roofSlopeDeg * Math.PI / 180;
        const k = 1 / Math.cos(th);
        const planRoof = Math.max(0, Wr * Dr - deckArea);
        roofArea = planRoof * k;
        const rf = `(${f(Wr)} × ${f(Dr)}${deckArea ? ` − dak ${f(deckArea)}` : ""}) ÷ cos ${P.roofSlopeDeg}°`;
        add({
            code: "ATP.RANGKA",
            section: "V",
            name: "Rangka atap baja ringan",
            unit: "m2",
            volume: roofArea,
            formula: rf,
            source: "parameter"
        });
        const coverCode = P.roofCover === "genteng_beton" ? "ATP.GENTENGBETON" : P.roofCover === "genteng_metal" ? "ATP.GENTENGMETAL" : "ATP.SPANDEK";
        add({
            code: coverCode,
            section: "V",
            name: coverName(P.roofCover),
            unit: "m2",
            volume: roofArea,
            formula: rf,
            source: "parameter"
        });
        const rise = short / 2 * Math.tan(th);
        let ridge;
        let ridgeF;
        let fascia;
        let fasciaF;
        let gutter;
        if (P.roofType === "pelana") {
            ridge = long;
            ridgeF = `Nok sepanjang ${f(long)} m`;
            fascia = 2 * long + 4 * (short / 2 * k);
            fasciaF = `2 × ${f(long)} + 4 × ${f(short / 2 * k)} (sisi miring)`;
            gutter = 2 * long;
        } else {
            const hip = Math.sqrt(2 * (short / 2) ** 2 + rise ** 2);
            ridge = long - short + 4 * hip;
            ridgeF = `Nok ${f(long - short)} + 4 jurai × ${f(hip)}`;
            fascia = 2 * (Wr + Dr);
            fasciaF = `Keliling 2 × (${f(Wr)} + ${f(Dr)})`;
            gutter = fascia;
        }
        add({
            code: "ATP.WUWUNG",
            section: "V",
            name: "Genteng wuwung / nok",
            unit: "m1",
            volume: ridge,
            formula: ridgeF,
            source: "parameter"
        });
        add({
            code: "ATP.LISPLANG",
            section: "V",
            name: "Lisplang kalsiboard",
            unit: "m1",
            volume: fascia,
            formula: fasciaF,
            source: "parameter"
        });
        if (P.gutter) add({
            code: "ATP.TALANG",
            section: "V",
            name: "Talang PVC + pipa turun",
            unit: "m1",
            volume: gutter,
            formula: "Sepanjang tepi bawah atap",
            source: "parameter"
        });
    }
    if (deckArea > 0) add({
        code: "ATP.WATERPROOF",
        section: "V",
        name: "Waterproofing dak",
        unit: "m2",
        volume: deckArea,
        formula: `Luas dak ${f(deckArea)} m²`,
        source: "parameter"
    });
    // ---------- VI. KUSEN ----------
    let frame = 0;
    for (const o of plan.openings){
        const h = o.height || (o.type === "window" ? P.windowHeight : P.doorHeight);
        if (o.type === "door") {
            const tr = P.transomHeight;
            frame += 2 * (h + tr) + o.width + (tr > 0 ? o.width : 0);
        } else if (o.type === "window") frame += 2 * (o.width + h) + Math.max(0, (o.leaves || 1) - 1) * h;
    }
    const doors = plan.openings.filter((o)=>o.type === "door");
    const windows = plan.openings.filter((o)=>o.type === "window");
    add({
        code: "KSN.ALU",
        section: "VI",
        name: 'Kusen aluminium 3"',
        unit: "m1",
        volume: frame,
        formula: `Keliling kusen ${doors.length} pintu + ${windows.length} jendela${P.transomHeight ? ` (+ boven ${cm(P.transomHeight)} cm)` : ""}`,
        source: "denah"
    });
    const leaves = windows.reduce((a, o)=>a + (o.leaves || 1), 0);
    add({
        code: "KSN.JENDELA",
        section: "VI",
        name: "Daun jendela + kaca 6 mm clear",
        unit: "bh",
        volume: leaves,
        formula: `${windows.length} jendela, total ${leaves} daun`,
        source: "denah"
    });
    const pvc = doors.filter((o)=>o.material === "pvc").length;
    add({
        code: "KSN.PINTUKAYU",
        section: "VI",
        name: "Daun pintu kayu + handle",
        unit: "bh",
        volume: doors.length - pvc,
        formula: `${doors.length - pvc} pintu`,
        source: "denah"
    });
    add({
        code: "KSN.PINTUPVC",
        section: "VI",
        name: "Pintu PVC kamar mandi",
        unit: "bh",
        volume: pvc,
        formula: `${pvc} pintu KM`,
        source: "denah"
    });
    // ---------- VII. LANTAI ----------
    const dryArea = area(dryRooms);
    const wetArea = area(wetRooms);
    const waste = 1 + P.floorWaste;
    add({
        code: "LNT.GRANIT",
        section: "VII",
        name: "Lantai granit 60x60",
        unit: "m2",
        volume: dryArea * waste,
        formula: `${f(dryArea)} m² × ${f(waste)} (waste ${Math.round(P.floorWaste * 100)}%)`,
        source: "denah"
    });
    add({
        code: "LNT.KRMKKM",
        section: "VII",
        name: "Lantai keramik KM 30x30",
        unit: "m2",
        volume: wetArea * waste,
        formula: `${f(wetArea)} m² × ${f(waste)}`,
        source: "denah"
    });
    let wetTile = 0;
    for (const r of wetRooms){
        const contact = roomWallContact(r, plan.walls);
        const doorW = openingsOfRoom(r, doors).reduce((a, o)=>a + o.width, 0);
        wetTile += (contact - doorW) * P.wetWallTileHeight;
    }
    add({
        code: "LNT.DINDINGKM",
        section: "VII",
        name: `Dinding keramik KM 30x60 t=${f(P.wetWallTileHeight)} m`,
        unit: "m2",
        volume: wetTile,
        formula: `(keliling dinding KM − lebar pintu) × ${f(P.wetWallTileHeight)} m`,
        source: "denah"
    });
    if (P.skirting) {
        let sk = 0;
        for (const r of dryRooms){
            const contact = roomWallContact(r, plan.walls);
            const ow = openingsOfRoom(r, plan.openings.filter((o)=>o.type !== "window")).reduce((a, o)=>a + o.width, 0);
            sk += Math.max(0, contact - ow);
        }
        add({
            code: "LNT.PLINT",
            section: "VII",
            name: "Plint granit",
            unit: "m1",
            volume: sk,
            formula: "Σ muka dinding ruang kering − lebar pintu/bukaan",
            source: "denah"
        });
    }
    // ---------- VIII. CAT ----------
    const extSide = Math.max(0, Lext * H - extOpening);
    const intPaint = Math.max(0, plaster - (P.exteriorPaintSeparate ? extSide : 0) - wetTile);
    add({
        code: "CAT.INT",
        section: "VIII",
        name: "Cat dinding interior",
        unit: "m2",
        volume: intPaint,
        formula: `Plester ${f(plaster)}${P.exteriorPaintSeparate ? ` − sisi luar ${f(extSide)}` : ""} − keramik KM ${f(wetTile)}`,
        source: "denah"
    });
    if (P.exteriorPaintSeparate) add({
        code: "CAT.EXT",
        section: "VIII",
        name: "Cat dinding eksterior",
        unit: "m2",
        volume: extSide,
        formula: `${f(Lext)} m × ${f(H)} − ${f(extOpening)} m² bukaan luar`,
        source: "denah"
    });
    add({
        code: "CAT.PLAFON",
        section: "VIII",
        name: "Cat plafon",
        unit: "m2",
        volume: ceiling,
        formula: `= luas plafon`,
        source: "denah"
    });
    // ---------- IX & X. MEP (rule-of-thumb) ----------
    if (P.autoMep) {
        let lamps = 0;
        let s1 = 0;
        let s2 = 0;
        let sockets = 0;
        let circulation = 0;
        for (const r of plan.rooms){
            const a = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$geometry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["polygonArea"])(r.polygon);
            const nl = a > 16 ? 2 : 1;
            lamps += nl;
            if (r.type === "selasar" || r.type === "teras" || r.type === "carport") circulation++;
            else if (nl === 2) s2++;
            else s1++;
            if (r.type === "kamar") sockets += 2;
            else if (r.type === "ruang_keluarga" || r.type === "ruang_tamu" || r.type === "dapur") sockets += 2;
            else if (r.type === "musholla" || r.type === "gudang") sockets += 1;
        }
        s2 += Math.ceil(circulation / 2);
        add({
            code: "LST.SAKLAR1",
            section: "IX",
            name: "Instalasi saklar single",
            unit: "bh",
            volume: s1,
            formula: "1 per ruang (1 lampu)",
            source: "asumsi"
        });
        add({
            code: "LST.SAKLAR2",
            section: "IX",
            name: "Instalasi saklar double",
            unit: "bh",
            volume: s2,
            formula: "Ruang besar + area sirkulasi berpasangan",
            source: "asumsi"
        });
        add({
            code: "LST.LAMPU",
            section: "IX",
            name: "Instalasi titik lampu",
            unit: "bh",
            volume: lamps,
            formula: "1 per ruang, 2 bila > 16 m²",
            source: "asumsi"
        });
        add({
            code: "LST.STOPKONTAK",
            section: "IX",
            name: "Instalasi stop kontak",
            unit: "bh",
            volume: sockets,
            formula: "Kamar 2, R.keluarga/tamu 2, dapur 2, musholla 1",
            source: "asumsi"
        });
        add({
            code: "LST.MCB",
            section: "IX",
            name: "Box MCB + MCB",
            unit: "bh",
            volume: 1 + Math.floor(indoorFloor / 90),
            formula: "1 box per ±90 m²",
            source: "asumsi"
        });
        const kitchens = plan.rooms.filter((r)=>r.type === "dapur");
        const dExt = (r)=>distanceToExterior((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$geometry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["polygonCentroid"])(r.polygon), plan.walls);
        const pvc4 = wetRooms.reduce((a, r)=>a + dExt(r) + 3, 0);
        const pvc3 = [
            ...wetRooms,
            ...kitchens
        ].reduce((a, r)=>a + dExt(r) + 2, 0);
        const pvc34 = [
            ...wetRooms,
            ...kitchens
        ].reduce((a, r)=>a + dExt(r) + 3, 0) + 6;
        if (wetRooms.length) {
            add({
                code: "AIR.PVC4",
                section: "X",
                name: 'Instalasi air kotor PVC 4"',
                unit: "m1",
                volume: Math.max(6, Math.ceil(pvc4)),
                formula: "Jarak KM → dinding luar + 3 m ke septic (min 6 m)",
                source: "asumsi"
            });
        }
        if (wetRooms.length + kitchens.length) {
            add({
                code: "AIR.PVC3",
                section: "X",
                name: 'Instalasi air kotor PVC 3"',
                unit: "m1",
                volume: Math.max(6, Math.ceil(pvc3)),
                formula: "Jarak KM & dapur → luar + 2 m (min 6 m)",
                source: "asumsi"
            });
            add({
                code: "AIR.PVC34",
                section: "X",
                name: 'Instalasi air bersih PVC 3/4"',
                unit: "m1",
                volume: Math.ceil(pvc34),
                formula: "Jarak titik air → luar + 3 m, + 6 m kran luar",
                source: "asumsi"
            });
        }
        add({
            code: "AIR.BAKMANDI",
            section: "X",
            name: "Bak mandi PVC",
            unit: "unit",
            volume: wetRooms.length,
            formula: `${wetRooms.length} KM`,
            source: "denah"
        });
        add({
            code: "AIR.FLOORDRAIN",
            section: "X",
            name: "Floor drain (avour)",
            unit: "bh",
            volume: wetRooms.length,
            formula: `${wetRooms.length} KM`,
            source: "denah"
        });
        add({
            code: "AIR.KRAN",
            section: "X",
            name: "Kran air",
            unit: "bh",
            volume: wetRooms.length * 2 + 2,
            formula: "2 per KM + 2 kran luar",
            source: "asumsi"
        });
        add({
            code: "AIR.CLOSET",
            section: "X",
            name: "Closet duduk",
            unit: "bh",
            volume: wetRooms.length,
            formula: `${wetRooms.length} KM`,
            source: "denah"
        });
        add({
            code: "AIR.SINK",
            section: "X",
            name: "Kitchen sink + kran",
            unit: "unit",
            volume: kitchens.length,
            formula: `${kitchens.length} dapur`,
            source: "denah"
        });
    }
    if (P.septicTank) add({
        code: "AIR.SEPTIC",
        section: "X",
        name: "Septic tank biofilter + resapan",
        unit: "unit",
        volume: 1,
        formula: "1 unit",
        source: "parameter"
    });
    // ---------- XI. LAIN-LAIN ----------
    if (P.kitchenCounterLength > 0) add({
        code: "LL.MEJADAPUR",
        section: "XI",
        name: "Meja dapur beton + top granit",
        unit: "m1",
        volume: P.kitchenCounterLength,
        formula: "Parameter",
        source: "parameter"
    });
    add({
        code: "LL.BERSIHAKHIR",
        section: "XI",
        name: "Pembersihan akhir",
        unit: "ls",
        volume: 1,
        formula: "Lump sum",
        source: "asumsi"
    });
    return {
        items,
        ctx: {
            columns,
            metrics: m,
            wallNetArea: wallNet,
            roofArea
        }
    };
}
const cm = (m)=>Math.round(m * 100);
function coverName(c) {
    return c === "genteng_beton" ? "Penutup atap genteng beton" : c === "genteng_metal" ? "Penutup atap genteng metal pasir" : "Penutup atap spandek";
}
}),
];

//# sourceMappingURL=src_0172deb._.js.map
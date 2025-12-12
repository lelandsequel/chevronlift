"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";

type SystemKey = "gulf_crude" | "midcon_products";
type ScenarioKey = "base" | "late_vessel" | "tank_stress";

type Movement = {
    id: string;
    system: SystemKey;
    scenario: ScenarioKey;
    assetType: "Pipeline" | "Tank Transfer" | "Vessel";
    assetName: string;
    product: string;
    volume: number;
    unit: "bbl";
    startTime: string;
    endTime: string;
    status: "Planned" | "Adjusted" | "At Risk";
    location: string;
};

type Conflict = {
    id: string;
    system: SystemKey;
    scenario: ScenarioKey;
    severity: "High" | "Medium" | "Low";
    type:
    | "Tank Overfill Risk"
    | "Dock Conflict"
    | "Batch Incompatibility"
    | "Demurrage Risk"
    | "Timing Overlap";
    summary: string;
    explanation: string;
    suggestedAction: string;
};

const MOVEMENTS: Movement[] = [
    // Gulf Coast Crude — Base
    {
        id: "GC-01",
        system: "gulf_crude",
        scenario: "base",
        assetType: "Pipeline",
        assetName: "Enbridge Mainline",
        product: "WCS",
        volume: 50000,
        unit: "bbl",
        startTime: "2025-03-02 06:00",
        endTime: "2025-03-02 18:00",
        status: "Planned",
        location: "Cushing → Gulf Coast"
    },
    {
        id: "GC-02",
        system: "gulf_crude",
        scenario: "base",
        assetType: "Tank Transfer",
        assetName: "Chevron Tank 401 → 407",
        product: "Maya",
        volume: 30000,
        unit: "bbl",
        startTime: "2025-03-02 08:00",
        endTime: "2025-03-02 11:00",
        status: "Planned",
        location: "Gulf Coast Terminal A"
    },
    {
        id: "GC-03",
        system: "gulf_crude",
        scenario: "base",
        assetType: "Vessel",
        assetName: "MT Gulf Voyager",
        product: "Mixed Crude Blend",
        volume: 600000,
        unit: "bbl",
        startTime: "2025-03-02 13:00",
        endTime: "2025-03-03 01:00",
        status: "Planned",
        location: "Berth 3"
    },

    // Gulf Coast Crude — Late Vessel scenario (adjusted plan)
    {
        id: "GC-03-LATE",
        system: "gulf_crude",
        scenario: "late_vessel",
        assetType: "Vessel",
        assetName: "MT Gulf Voyager (Delayed)",
        product: "Mixed Crude Blend",
        volume: 600000,
        unit: "bbl",
        startTime: "2025-03-02 21:00",
        endTime: "2025-03-03 09:00",
        status: "At Risk",
        location: "Berth 3"
    },
    {
        id: "GC-04-LATE",
        system: "gulf_crude",
        scenario: "late_vessel",
        assetType: "Pipeline",
        assetName: "Enterprise Crude",
        product: "WCS",
        volume: 40000,
        unit: "bbl",
        startTime: "2025-03-02 18:00",
        endTime: "2025-03-03 03:00",
        status: "Adjusted",
        location: "Inland → Gulf Coast"
    },
    {
        id: "GC-05-LATE",
        system: "gulf_crude",
        scenario: "late_vessel",
        assetType: "Tank Transfer",
        assetName: "Chevron Tank 407 → 411 (Buffer)",
        product: "Maya",
        volume: 20000,
        unit: "bbl",
        startTime: "2025-03-02 12:00",
        endTime: "2025-03-02 15:00",
        status: "Adjusted",
        location: "Gulf Coast Terminal A"
    },

    // Gulf Coast Crude — Tank Stress scenario
    {
        id: "GC-06-TS",
        system: "gulf_crude",
        scenario: "tank_stress",
        assetType: "Pipeline",
        assetName: "Enbridge Mainline (High Inflow)",
        product: "WCS",
        volume: 70000,
        unit: "bbl",
        startTime: "2025-03-02 06:00",
        endTime: "2025-03-02 18:00",
        status: "At Risk",
        location: "Cushing → Gulf Coast"
    },
    {
        id: "GC-07-TS",
        system: "gulf_crude",
        scenario: "tank_stress",
        assetType: "Tank Transfer",
        assetName: "Chevron Tank 401 → 407 (Pre-drain)",
        product: "Maya",
        volume: 25000,
        unit: "bbl",
        startTime: "2025-03-01 22:00",
        endTime: "2025-03-02 02:00",
        status: "Adjusted",
        location: "Gulf Coast Terminal A"
    },
    {
        id: "GC-08-TS",
        system: "gulf_crude",
        scenario: "tank_stress",
        assetType: "Tank Transfer",
        assetName: "Chevron Tank 407 → 409",
        product: "Mixed Crude Blend",
        volume: 30000,
        unit: "bbl",
        startTime: "2025-03-02 10:00",
        endTime: "2025-03-02 14:00",
        status: "Planned",
        location: "Gulf Coast Terminal A"
    },

    // Midcon Products — Base
    {
        id: "MP-01",
        system: "midcon_products",
        scenario: "base",
        assetType: "Pipeline",
        assetName: "Magellan Refined",
        product: "ULSD",
        volume: 40000,
        unit: "bbl",
        startTime: "2025-03-02 05:00",
        endTime: "2025-03-02 13:00",
        status: "Planned",
        location: "Refinery X → Demand Hub 1"
    },
    {
        id: "MP-02",
        system: "midcon_products",
        scenario: "base",
        assetType: "Tank Transfer",
        assetName: "Tank P201 → P205",
        product: "RBOB",
        volume: 25000,
        unit: "bbl",
        startTime: "2025-03-02 09:00",
        endTime: "2025-03-02 12:00",
        status: "Planned",
        location: "Midcon Terminal B"
    },
    {
        id: "MP-03",
        system: "midcon_products",
        scenario: "base",
        assetType: "Vessel",
        assetName: "Barge River Star",
        product: "Jet A",
        volume: 80000,
        unit: "bbl",
        startTime: "2025-03-02 16:00",
        endTime: "2025-03-03 02:00",
        status: "Planned",
        location: "River Dock 2"
    }
];

const CONFLICTS: Conflict[] = [
    {
        id: "C-GC-LATE-1",
        system: "gulf_crude",
        scenario: "late_vessel",
        severity: "High",
        type: "Demurrage Risk",
        summary: "MT Gulf Voyager arrival shifts into next tide window.",
        explanation:
            "The updated ETA pushes discharge into a higher-tariff window and risks missing the current laycan, increasing demurrage exposure.",
        suggestedAction:
            "Advance one inland pipeline batch and pre-drain Tank 407 to tighten the discharge window, or renegotiate laycan with counterparty."
    },
    {
        id: "C-GC-LATE-2",
        system: "gulf_crude",
        scenario: "late_vessel",
        severity: "Medium",
        type: "Timing Overlap",
        summary: "Berth 3 discharge overlaps with planned maintenance window.",
        explanation:
            "Berth 3 planned outage overlaps with the shifted discharge time for MT Gulf Voyager, creating a conflict between operations and marine schedule.",
        suggestedAction:
            "Shift lower-priority maintenance or temporarily reassign the vessel to Berth 2 if draft and manifold configuration allow."
    },
    {
        id: "C-GC-TS-1",
        system: "gulf_crude",
        scenario: "tank_stress",
        severity: "High",
        type: "Tank Overfill Risk",
        summary: "Tank 401 projected to exceed maximum working capacity.",
        explanation:
            "With the Enbridge batch at 70 kbbl and current inventory levels, Tank 401 is projected to breach its working max by ~8 kbbl at 18:00.",
        suggestedAction:
            "Advance pre-drain movements from Tank 401 into downstream tanks and pull forward a pipeline or vessel load to free additional capacity."
    },
    {
        id: "C-GC-TS-2",
        system: "gulf_crude",
        scenario: "tank_stress",
        severity: "Medium",
        type: "Batch Incompatibility",
        summary: "Incompatible crude qualities planned in the same tank sequence.",
        explanation:
            "Maya and a lighter sweet blend are scheduled in close succession in Tank 407, risking off-spec blend if sequencing or flush volumes are not adjusted.",
        suggestedAction:
            "Insert a flush volume or re-sequence tanks so heavier barrels are segregated before introduction of the lighter stream."
    },
    {
        id: "C-MP-BASE-1",
        system: "midcon_products",
        scenario: "base",
        severity: "Low",
        type: "Timing Overlap",
        summary: "RBOB tank transfer and Jet A loading overlap on staffing.",
        explanation:
            "The planned RBOB transfer in Tank P201 and Jet A barge loading both require dedicated panel/operator coverage at Midcon Terminal B.",
        suggestedAction:
            "Stagger start times by 60–90 minutes or temporarily staff an additional operator for the shift."
    }
];

const SYSTEM_OPTIONS: { key: SystemKey; label: string }[] = [
    { key: "gulf_crude", label: "Gulf Coast Crude" },
    { key: "midcon_products", label: "Midcon Products" }
];

const SCENARIO_OPTIONS: { key: ScenarioKey; label: string; description: string }[] = [
    {
        key: "base",
        label: "Base Plan",
        description: "Feasible next-day schedule with no major disruptions applied."
    },
    {
        key: "late_vessel",
        label: "Late Vessel",
        description: "MT Gulf Voyager ETA pushed back; see impact on berth and tank flows."
    },
    {
        key: "tank_stress",
        label: "Tank Stress",
        description: "Increased inflow triggers tank capacity pressure at a key terminal."
    }
];

const severityColor: Record<Conflict["severity"], string> = {
    High: "text-rose-300 border-rose-500/50 bg-rose-500/10",
    Medium: "text-amber-200 border-amber-400/60 bg-amber-400/10",
    Low: "text-emerald-200 border-emerald-500/50 bg-emerald-500/10"
};

const FeatureCard: React.FC<{ title: string; body: string }> = ({
    title,
    body
}) => (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-xs">
        <p className="mb-1 text-sm font-semibold text-slate-50">{title}</p>
        <p className="text-slate-300">{body}</p>
    </div>
);

const ChevronLiftCockpit: React.FC = () => {
    const [system, setSystem] = useState<SystemKey>("gulf_crude");
    const [scenario, setScenario] = useState<ScenarioKey>("base");

    const scenarioMeta = useMemo(
        () => SCENARIO_OPTIONS.find((s) => s.key === scenario),
        [scenario]
    );

    const filteredMovements = useMemo(
        () =>
            MOVEMENTS.filter(
                (m) => m.system === system && m.scenario === scenario
            ),
        [system, scenario]
    );

    const filteredConflicts = useMemo(
        () =>
            CONFLICTS.filter(
                (c) =>
                    c.system === system &&
                    (c.scenario === scenario ||
                        (scenario === "base" && c.scenario === "base"))
            ),
        [system, scenario]
    );

    const totalVolume = filteredMovements.reduce(
        (sum, m) => sum + m.volume,
        0
    );

    return (
        <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/70 p-4 shadow-sm shadow-black/70">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                <div className="space-y-1">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-amber-300">
                        Scheduling Cockpit (Demo)
                    </p>
                    <h2 className="text-lg font-semibold text-slate-50 md:text-xl">
                        See tomorrow&apos;s barrel flows, not someone&apos;s spreadsheet
                    </h2>
                    <p className="max-w-xl text-[0.8rem] text-slate-300">
                        Flip between systems and scenarios to see how ChevronLift represents
                        crude &amp; product movements, flags conflicts, and surfaces
                        suggested actions schedulers can actually use.
                    </p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/80 px-3 py-2 text-[0.7rem] text-slate-300">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-amber-200">
                        How to play with this demo
                    </p>
                    <ul className="mt-1 space-y-1.5">
                        <li>1. Pick a system (Gulf crude vs. Midcon products).</li>
                        <li>2. Switch between Base, Late Vessel, and Tank Stress.</li>
                        <li>3. Watch the plan and conflicts update together.</li>
                    </ul>
                </div>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-[minmax(0,1.7fr)_minmax(0,1.3fr)]">
                {/* Left: controls + movement table */}
                <div className="flex flex-col gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                        {SYSTEM_OPTIONS.map((opt) => (
                            <button
                                key={opt.key}
                                onClick={() => setSystem(opt.key)}
                                className={`rounded-full border px-3 py-1 text-[0.7rem] font-medium transition-colors ${system === opt.key
                                        ? "border-amber-400 bg-amber-400/15 text-amber-100"
                                        : "border-slate-700 bg-slate-950/80 text-slate-300 hover:bg-slate-800/80"
                                    }`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        {SCENARIO_OPTIONS.map((opt) => (
                            <button
                                key={opt.key}
                                onClick={() => setScenario(opt.key)}
                                className={`rounded-full border px-3 py-1 text-[0.7rem] font-medium transition-colors ${scenario === opt.key
                                        ? "border-amber-400 bg-amber-400/15 text-amber-100"
                                        : "border-slate-700 bg-slate-950/80 text-slate-300 hover:bg-slate-800/80"
                                    }`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>

                    {scenarioMeta && (
                        <p className="text-[0.7rem] text-slate-400">
                            {scenarioMeta.description}
                        </p>
                    )}

                    <div className="mt-1 grid gap-2 text-[0.7rem] text-slate-300 md:grid-cols-3">
                        <div className="rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2">
                            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                                Movements in View
                            </p>
                            <p className="text-base font-semibold text-slate-50">
                                {filteredMovements.length}
                            </p>
                            <p className="text-[0.68rem] text-slate-400">
                                Pipelines, tank transfers, and vessels.
                            </p>
                        </div>
                        <div className="rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2">
                            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                                Total Volume
                            </p>
                            <p className="text-base font-semibold text-slate-50">
                                {totalVolume.toLocaleString()} bbl
                            </p>
                            <p className="text-[0.68rem] text-slate-400">
                                Across the filtered schedule.
                            </p>
                        </div>
                        <div className="rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2">
                            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                                Conflicts Flagged
                            </p>
                            <p className="text-base font-semibold text-slate-50">
                                {filteredConflicts.length}
                            </p>
                            <p className="text-[0.68rem] text-slate-400">
                                Issues requiring scheduler judgment.
                            </p>
                        </div>
                    </div>

                    <div className="mt-2 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/80">
                        <div className="border-b border-slate-800 px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                            Movement Plan (Demo Data)
                        </div>
                        <div className="no-scrollbar max-h-64 overflow-auto text-[0.7rem]">
                            <table className="min-w-full border-separate border-spacing-0">
                                <thead className="sticky top-0 bg-slate-950">
                                    <tr>
                                        <th className="border-b border-slate-800 px-3 py-2 text-left font-medium text-slate-400">
                                            ID
                                        </th>
                                        <th className="border-b border-slate-800 px-3 py-2 text-left font-medium text-slate-400">
                                            Asset
                                        </th>
                                        <th className="border-b border-slate-800 px-3 py-2 text-left font-medium text-slate-400">
                                            Product
                                        </th>
                                        <th className="border-b border-slate-800 px-3 py-2 text-left font-medium text-slate-400">
                                            Volume
                                        </th>
                                        <th className="border-b border-slate-800 px-3 py-2 text-left font-medium text-slate-400">
                                            Window
                                        </th>
                                        <th className="border-b border-slate-800 px-3 py-2 text-left font-medium text-slate-400">
                                            Location
                                        </th>
                                        <th className="border-b border-slate-800 px-3 py-2 text-left font-medium text-slate-400">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredMovements.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={7}
                                                className="px-3 py-4 text-center text-slate-500"
                                            >
                                                No movements defined for this system/scenario in the
                                                demo data.
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredMovements.map((m, idx) => (
                                            <tr
                                                key={m.id}
                                                className={
                                                    idx % 2 === 0
                                                        ? "bg-slate-950/60"
                                                        : "bg-slate-900/40"
                                                }
                                            >
                                                <td className="border-b border-slate-900 px-3 py-2 text-slate-200">
                                                    {m.id}
                                                </td>
                                                <td className="border-b border-slate-900 px-3 py-2 text-slate-200">
                                                    <span className="block text-[0.7rem] font-semibold text-slate-50">
                                                        {m.assetName}
                                                    </span>
                                                    <span className="text-[0.65rem] text-slate-400">
                                                        {m.assetType}
                                                    </span>
                                                </td>
                                                <td className="border-b border-slate-900 px-3 py-2 text-slate-200">
                                                    {m.product}
                                                </td>
                                                <td className="border-b border-slate-900 px-3 py-2 text-slate-200">
                                                    {m.volume.toLocaleString()} {m.unit}
                                                </td>
                                                <td className="border-b border-slate-900 px-3 py-2 text-slate-200">
                                                    <span className="block">{m.startTime}</span>
                                                    <span className="text-[0.65rem] text-slate-400">
                                                        → {m.endTime}
                                                    </span>
                                                </td>
                                                <td className="border-b border-slate-900 px-3 py-2 text-slate-200">
                                                    {m.location}
                                                </td>
                                                <td className="border-b border-slate-900 px-3 py-2">
                                                    <span
                                                        className={`inline-flex rounded-full px-2 py-0.5 text-[0.65rem] ${m.status === "Planned"
                                                                ? "bg-slate-800 text-slate-200"
                                                                : m.status === "Adjusted"
                                                                    ? "bg-amber-400/20 text-amber-100"
                                                                    : "bg-rose-500/20 text-rose-100"
                                                            }`}
                                                    >
                                                        {m.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right: conflicts panel */}
                <div className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-950/80 p-3">
                    <div className="flex items-center justify-between gap-2">
                        <div>
                            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-amber-200">
                                Conflicts &amp; Risk (Demo)
                            </p>
                            <p className="text-[0.7rem] text-slate-400">
                                Operational issues surfaced for this system and scenario —
                                things schedulers care about before traders feel it in P&amp;L.
                            </p>
                        </div>
                    </div>

                    <div className="no-scrollbar mt-1 max-h-72 space-y-2 overflow-auto text-[0.7rem]">
                        {filteredConflicts.length === 0 ? (
                            <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-emerald-100">
                                <p className="font-semibold">No conflicts detected.</p>
                                <p className="mt-1 text-[0.68rem] text-emerald-50/80">
                                    For this demo scenario, ChevronLift doesn&apos;t see any
                                    projected tank, dock, or compatibility issues.
                                </p>
                            </div>
                        ) : (
                            filteredConflicts.map((c) => (
                                <div
                                    key={c.id}
                                    className={`rounded-xl border px-3 py-2 ${severityColor[c.severity]
                                        }`}
                                >
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em]">
                                            {c.type}
                                        </p>
                                        <span className="text-[0.65rem] font-semibold">
                                            {c.severity} impact
                                        </span>
                                    </div>
                                    <p className="mt-1 text-[0.7rem] font-semibold">
                                        {c.summary}
                                    </p>
                                    <p className="mt-1 text-[0.7rem] opacity-90">
                                        {c.explanation}
                                    </p>
                                    <p className="mt-1 text-[0.7rem] opacity-90">
                                        <span className="font-semibold">Suggested action: </span>
                                        {c.suggestedAction}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default function Page() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
            <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 pb-16 pt-8 md:px-6 lg:px-8">
                {/* App hero */}
                <header className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="space-y-3">
                        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-amber-300">
                            ChevronLift · Internal Scheduling Cockpit
                        </p>
                        <h1 className="text-balance text-3xl font-semibold tracking-tight text-slate-50 md:text-4xl">
                            Automated crude &amp; product scheduling that schedulers can live in
                        </h1>
                        <p className="max-w-xl text-sm text-slate-300 md:text-[0.95rem]">
                            This is the live ChevronLift prototype: a single place for crude
                            and refined product schedulers to see tomorrow&apos;s movements,
                            understand conflicts, and explore options without rebuilding
                            spreadsheets.
                        </p>
                        <div className="flex flex-wrap gap-2 text-[0.7rem]">
                            <span className="inline-flex items-center rounded-full border border-slate-700 bg-slate-950/80 px-3 py-1 text-slate-200">
                                Crude &amp; product logistics
                            </span>
                            <span className="inline-flex items-center rounded-full border border-slate-700 bg-slate-950/80 px-3 py-1 text-slate-200">
                                Scheduling &amp; demurrage risk
                            </span>
                            <span className="inline-flex items-center rounded-full border border-slate-700 bg-slate-950/80 px-3 py-1 text-slate-200">
                                AI-assisted planning (not full autopilot)
                            </span>
                        </div>
                    </div>
                    <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-xs text-slate-300 shadow-sm shadow-black/70">
                        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-amber-200">
                            Want the full product story?
                        </p>
                        <p>
                            This page focuses on the app experience. If you want the full
                            breakdown of problem framing, user personas, flows, and impact,
                            there&apos;s a separate case study.
                        </p>
                        <Link
                            href="/case-study"
                            className="inline-flex items-center gap-1 rounded-full border border-amber-400/60 bg-amber-400/10 px-3 py-1 text-[0.75rem] font-medium text-amber-100 hover:bg-amber-400/20"
                        >
                            <span>Read the ChevronLift case study</span>
                            <span aria-hidden>↗</span>
                        </Link>
                    </div>
                </header>

                {/* Core app experience */}
                <ChevronLiftCockpit />

                {/* Feature summary */}
                <section className="mt-4 space-y-3">
                    <h2 className="text-lg font-semibold text-slate-50 md:text-xl">
                        What ChevronLift is designed to handle in a real environment
                    </h2>
                    <p className="max-w-3xl text-sm text-slate-300 md:text-[0.95rem]">
                        The prototype only scratches the surface of what an internal
                        Chevron deployment would do, but it&apos;s built around the same core
                        ideas: unify movements, surface risk early, and make recomputation
                        cheap instead of painful.
                    </p>
                    <div className="grid gap-4 md:grid-cols-3">
                        <FeatureCard
                            title="Unified movement layer"
                            body="Pipelines, tanks, docks, and vessels represented in one interface so schedulers aren’t the human integration bus between systems."
                        />
                        <FeatureCard
                            title="Conflicts with explanations"
                            body="Tank overfills, berth conflicts, and batch incompatibility surfaced alongside why they matter and what knobs schedulers can turn."
                        />
                        <FeatureCard
                            title="Scenario-friendly by design"
                            body="Late vessels, stressed tanks, and trader changes don’t require rebuilding the schedule — just rerunning constraints against the same graph."
                        />
                    </div>
                </section>
            </div>
        </main>
    );
}

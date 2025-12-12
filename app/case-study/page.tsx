"use client";

import React from "react";
import Link from "next/link";

type PillProps = {
  label: string;
};

type StatProps = {
  label: string;
  value: string;
  sublabel?: string;
};

type FlowProps = {
  title: string;
  goal: string;
  steps: string[];
  outcome: string;
};

const Pill: React.FC<PillProps> = ({ label }) => (
  <span className="inline-flex items-center rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-amber-200">
    {label}
  </span>
);

const StatCard: React.FC<StatProps> = ({ label, value, sublabel }) => (
  <div className="flex flex-col gap-1 rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 shadow-sm shadow-black/60">
    <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-slate-400">
      {label}
    </p>
    <p className="text-lg font-semibold text-slate-50">{value}</p>
    {sublabel && (
      <p className="text-xs leading-snug text-slate-400">{sublabel}</p>
    )}
  </div>
);

const FlowCard: React.FC<FlowProps> = ({ title, goal, steps, outcome }) => (
  <div className="flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-950/70 p-4 shadow-sm shadow-black/60">
    <div className="mb-2">
      <p className="text-sm font-semibold text-slate-50">{title}</p>
      <p className="text-xs text-slate-400">Goal: {goal}</p>
    </div>
    <div className="mt-3 space-y-1.5 text-xs text-slate-300">
      {steps.map((step, idx) => (
        <div key={step} className="flex gap-2">
          <span className="mt-[2px] flex h-4 w-4 items-center justify-center rounded-full border border-slate-600 text-[0.65rem] text-slate-200">
            {idx + 1}
          </span>
          <span>{step}</span>
        </div>
      ))}
    </div>
    <p className="mt-3 border-t border-slate-800 pt-3 text-xs text-amber-200">
      Outcome: {outcome}
    </p>
  </div>
);

const Section: React.FC<{
  id?: string;
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
}> = ({ id, eyebrow, title, children }) => (
  <section id={id} className="scroll-mt-24">
    <div className="mb-4">
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-1 text-xl font-semibold text-slate-50 md:text-2xl">
        {title}
      </h2>
    </div>
    <div className="space-y-3 text-sm text-slate-300 md:text-[0.95rem]">
      {children}
    </div>
  </section>
);

const QuickNav: React.FC = () => {
  const items = [
    { id: "problem", label: "Problem" },
    { id: "users", label: "Users" },
    { id: "solution", label: "Solution" },
    { id: "flows", label: "Key Flows" },
    { id: "screens", label: "What the Demo Shows" },
    { id: "impact", label: "Impact" },
    { id: "role", label: "My Role & AI" },
  ];

  return (
    <nav className="no-scrollbar mt-6 flex gap-2 overflow-x-auto rounded-full border border-slate-800 bg-slate-950/90 px-3 py-2 text-[0.7rem] text-slate-300">
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className="inline-flex items-center rounded-full px-3 py-1 hover:bg-slate-800/80 hover:text-amber-100 transition-colors"
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
};

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-16 pt-10 md:px-6 lg:px-8">
        {/* Hero */}
        <header className="grid gap-8 md:grid-cols-[minmax(0,2.1fr)_minmax(0,1.5fr)] md:items-start">
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <Pill label="Internal PM Case Study" />
              <Pill label="Energy Ops & Logistics" />
              <Pill label="Chevron (Hypothetical)" />
            </div>

            <div>
              <h1 className="text-balance text-3xl font-semibold tracking-tight text-slate-50 md:text-4xl">
                ChevronLift — Automated Crude &amp; Product Scheduling Platform
              </h1>
              <p className="mt-3 max-w-xl text-sm text-slate-300 md:text-[0.95rem]">
                ChevronLift is an internal scheduling cockpit for crude oil and
                refined products. It pulls together pipeline, terminal, and
                marine data to generate draft movement plans, highlight
                conflicts, and give schedulers a single, live view of tomorrow&apos;s
                barrel flows.
              </p>

              <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-xs text-slate-300">
                <p className="mb-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-amber-200">
                  Prefer to see the product?
                </p>
                <p className="text-[0.8rem] text-slate-300">
                  This page walks through the product thinking behind ChevronLift. If you’d
                  rather click around the scheduling cockpit itself, you can jump straight
                  into the live demo.
                </p>
                <Link
                  href="/"
                  className="mt-2 inline-flex items-center gap-1 rounded-full border border-emerald-500/60 bg-emerald-500/10 px-3 py-1 text-[0.75rem] font-medium text-emerald-100 hover:bg-emerald-500/20"
                >
                  <span>Open the ChevronLift cockpit</span>
                  <span aria-hidden>↻</span>
                </Link>
              </div>
            </div>

            <div className="grid gap-3 text-xs text-slate-300 md:grid-cols-3">
              <StatCard
                label="Primary Problem"
                value="Manual, fragmented scheduling"
                sublabel="Schedulers stitch plans across emails, spreadsheets, and siloed logistics systems."
              />
              <StatCard
                label="Who I Designed For"
                value="Schedulers & Traders"
                sublabel="Crude/product schedulers, marine logistics, terminal ops, and desk traders."
              />
              <StatCard
                label="My Role"
                value="Product Manager"
                sublabel="Framed the problem, defined flows, and scoped a realistic scheduling cockpit with AI assist."
              />
            </div>

            <p className="text-[0.75rem] text-slate-400">
              This is a portfolio artifact. Data and counterparties are
              illustrative, but the flows and constraints reflect how I&apos;d
              approach a real scheduling platform for a major like Chevron.
            </p>
          </div>

          <aside className="space-y-4 rounded-2xl border border-slate-800 bg-slate-950/80 p-4 shadow-sm shadow-black/70">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
              How to read this page
            </p>
            <p className="text-xs text-slate-300">
              In under a minute, you should be able to see:
            </p>
            <ul className="mt-1 space-y-1.5 text-xs text-slate-300">
              <li className="flex gap-2">
                <span className="mt-[5px] h-[3px] w-[3px] rounded-full bg-amber-300" />
                <span>
                  How crude &amp; product scheduling breaks down in practice.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-[5px] h-[3px] w-[3px] rounded-full bg-amber-300" />
                <span>
                  What ChevronLift automates vs. what stays in human control.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-[5px] h-[3px] w-[3px] rounded-full bg-amber-300" />
                <span>
                  The key flows that ground the live demo in realistic ops.
                </span>
              </li>
            </ul>
            <p className="mt-3 text-[0.7rem] text-slate-400">
              The live prototype focuses on a few opinionated screens instead of
              trying to replicate the entire Chevron scheduling stack.
            </p>
          </aside>
        </header>

        <QuickNav />

        {/* Problem */}
        <Section
          id="problem"
          eyebrow="Context"
          title="Scheduling is the nervous system of the barrel — and it’s held together with email"
        >
          <p>
            In trading and supply, &quot;the barrels&quot; only matter if they
            show up in the right tank, on the right vessel, at the right time.
            Today, crude and product schedulers are forced to reconcile pipeline
            nominations, terminal capacities, refinery run plans, and marine
            ETAs in tools that were never designed for the job.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Pain points today
              </p>
              <ul className="space-y-1.5 text-xs">
                <li className="flex gap-2">
                  <span className="mt-[5px] h-[3px] w-[3px] rounded-full bg-rose-400" />
                  <span>
                    Pipelines, terminals, marine, and refinery plans sit in
                    separate systems — schedulers become the integration layer.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-[5px] h-[3px] w-[3px] rounded-full bg-rose-400" />
                  <span>
                    Daily schedules are built in spreadsheets that are brittle,
                    single-user, and hard to audit later.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-[5px] h-[3px] w-[3px] rounded-full bg-rose-400" />
                  <span>
                    Conflicts (tank overfills, incompatible batches, missed
                    laycans) are discovered late, not surfaced early.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-[5px] h-[3px] w-[3px] rounded-full bg-rose-400" />
                  <span>
                    Traders change their mind; schedulers carry the cognitive
                    load of recomputing a complex puzzle on the fly.
                  </span>
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                What ChevronLift aims to do
              </p>
              <ul className="space-y-1.5 text-xs text-emerald-50">
                <li className="flex gap-2">
                  <span className="mt-[5px] h-[3px] w-[3px] rounded-full bg-emerald-400" />
                  <span>
                    Provide a single operational view of crude &amp; product
                    movements across pipelines, terminals, and marine.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-[5px] h-[3px] w-[3px] rounded-full bg-emerald-400" />
                  <span>
                    Generate draft schedules based on current inventory,
                    nominations, and constraints — schedulers stay in control,
                    AI does the grunt work.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-[5px] h-[3px] w-[3px] rounded-full bg-emerald-400" />
                  <span>
                    Detect and explain conflicts early so schedulers can act
                    before traders and terminals feel the pain.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-[5px] h-[3px] w-[3px] rounded-full bg-emerald-400" />
                  <span>
                    Make &quot;what changed since yesterday?&quot; and
                    &quot;what breaks if this vessel is late?&quot; answerable
                    questions.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </Section>

        {/* Users */}
        <Section id="users" eyebrow="Users" title="Who ChevronLift is built for">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 text-xs">
              <p className="text-sm font-semibold text-slate-50">Scheduler</p>
              <p className="text-[0.7rem] text-slate-400">
                Owns the physical reality of the barrels.
              </p>
              <div className="mt-2 space-y-2">
                <div>
                  <p className="mb-1 font-semibold text-slate-200">Needs</p>
                  <ul className="space-y-1">
                    <li className="flex gap-2">
                      <span className="mt-[4px] h-[3px] w-[3px] rounded-full bg-amber-300" />
                      <span>
                        A reliable picture of all movements planned for the next
                        1–7 days.
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-[4px] h-[3px] w-[3px] rounded-full bg-amber-300" />
                      <span>
                        Early warning on conflicts before they become phone
                        calls.
                      </span>
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="mb-1 font-semibold text-slate-200">
                    What ChevronLift gives them
                  </p>
                  <p className="text-[0.7rem] text-slate-300">
                    A cockpit that auto-builds a draft plan, flags conflicts,
                    and lets them override with context — not a black-box
                    scheduler.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 text-xs">
              <p className="text-sm font-semibold text-slate-50">
                Trader / Trading Analyst
              </p>
              <p className="text-[0.7rem] text-slate-400">
                Owns the book, P&amp;L, and optionality.
              </p>
              <div className="mt-2 space-y-2">
                <div>
                  <p className="mb-1 font-semibold text-slate-200">Needs</p>
                  <ul className="space-y-1">
                    <li className="flex gap-2">
                      <span className="mt-[4px] h-[3px] w-[3px] rounded-full bg-amber-300" />
                      <span>
                        Confidence that physical constraints are surfaced before
                        trades are locked in.
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-[4px] h-[3px] w-[3px] rounded-full bg-amber-300" />
                      <span>
                        Fast answers to &quot;what if we shift this volume or
                        this laycan?&quot;
                      </span>
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="mb-1 font-semibold text-slate-200">
                    What ChevronLift gives them
                  </p>
                  <p className="text-[0.7rem] text-slate-300">
                    A shared view of the schedule and constraints so they can
                    negotiate and restructure deals with eyes wide open.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 text-xs">
              <p className="text-sm font-semibold text-slate-50">
                Terminal &amp; Marine Ops
              </p>
              <p className="text-[0.7rem] text-slate-400">
                Run tanks, docks, and vessel movements.
              </p>
              <div className="mt-2 space-y-2">
                <div>
                  <p className="mb-1 font-semibold text-slate-200">Needs</p>
                  <ul className="space-y-1">
                    <li className="flex gap-2">
                      <span className="mt-[4px] h-[3px] w-[3px] rounded-full bg-amber-300" />
                      <span>Clear view of what&apos;s coming and when.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-[4px] h-[3px] w-[3px] rounded-full bg-amber-300" />
                      <span>
                        Early warning on tank stress and dock conflicts.
                      </span>
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="mb-1 font-semibold text-slate-200">
                    What ChevronLift gives them
                  </p>
                  <p className="text-[0.7rem] text-slate-300">
                    A filtered operational view tailored to their assets: tanks,
                    docks, and movements at their sites.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Solution */}
        <Section
          id="solution"
          eyebrow="Solution"
          title="A scheduling cockpit that keeps humans in charge and lets AI handle the recomputation"
        >
          <p>
            ChevronLift isn&apos;t a fully autonomous scheduler. It&apos;s a
            decision cockpit that keeps the humans in control of the book while
            offloading the heavy lifting of recomputing feasible plans when
            something changes.
          </p>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-xs">
              <p className="mb-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-amber-200">
                Unified Movement Graph
              </p>
              <p className="text-slate-300">
                Pipes, tanks, docks, and vessels represented in one mental
                model, not scattered across systems.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-xs">
              <p className="mb-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-amber-200">
                Draft Schedule Generator
              </p>
              <p className="text-slate-300">
                Given current inventory, nominations, and constraints, the
                system proposes a feasible next-day plan that schedulers can
                tweak.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-xs">
              <p className="mb-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-amber-200">
                Conflict Detection &amp; Explainability
              </p>
              <p className="text-slate-300">
                Tank overfills, incompatible batches, dock conflicts, and late
                vessels flagged with human-readable justifications.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-xs">
              <p className="mb-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-amber-200">
                Scenario &quot;What-if&quot; Support
              </p>
              <p className="text-slate-300">
                Schedulers can adjust volumes or timings and see how the plan
                recomputes in seconds instead of rebuilding a spreadsheet.
              </p>
            </div>
          </div>
        </Section>

        {/* Key Flows */}
        <Section
          id="flows"
          eyebrow="Flows"
          title="Key flows the live demo is built around"
        >
          <p>
            The prototype anchors on three flows that feel real to anyone who
            has lived in scheduling: tomorrow&apos;s plan, a late vessel, and a
            tank stress test.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <FlowCard
              title="1. Building tomorrow’s schedule"
              goal="Generate a draft next-day schedule and sanity-check it."
              steps={[
                "Scheduler selects region, system (e.g., Gulf Coast crude), and date.",
                "ChevronLift pulls in latest inventory, pipeline nominations, and planned receipts/shipments.",
                "AI generates a draft movement plan respecting tank minima/maxima and known constraints.",
                "Scheduler reviews conflicts and overrides specific moves as needed.",
              ]}
              outcome="The team starts from a consistent, feasible base plan instead of rebuilding it from scratch every day."
            />
            <FlowCard
              title="2. Handling a late vessel"
              goal="Re-plan around a delayed marine arrival without breaking everything else."
              steps={[
                "Marine ops updates a vessel ETA, triggering an alert in ChevronLift.",
                "System highlights movements and tanks impacted by the delay.",
                "Scheduler runs a &quot;recompute&quot; scenario that shifts certain pipeline or terminal moves.",
                "Resulting plan shows which actions reduce demurrage and tank stress the most.",
              ]}
              outcome="Schedulers can respond to late vessels with structured options instead of ad-hoc firefighting."
            />
            <FlowCard
              title="3. Tank stress test at a key terminal"
              goal="Avoid overfills and minimum violations at a constrained site."
              steps={[
                "Scheduler opens the terminal view for a high-traffic tank farm.",
                "ChevronLift projects tank levels over the next 7 days under the current schedule.",
                "System flags days where levels breach max/min thresholds.",
                "Scheduler adjusts timing or reroutes volumes; AI recomputes a conflict-free variant.",
              ]}
              outcome="Tank risk is caught days in advance, not when operators are already scrambling."
            />
          </div>
        </Section>

        {/* Screens */}
        <Section
          id="screens"
          eyebrow="Demo"
          title="What the live prototype actually shows"
        >
          <p>
            Under the hood this is a simple Next.js app with mocked data, but
            the screens are designed to feel like something a Chevron scheduler
            could actually live in.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-xs">
              <p className="mb-1 text-sm font-semibold text-slate-50">
                Movement Plan Board
              </p>
              <p className="text-slate-300">
                Table-style view of planned movements (pipeline batches, tank
                transfers, loadings) with status, volume, timing, and conflict
                icons. Filters by system, date, and asset.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-xs">
              <p className="mb-1 text-sm font-semibold text-slate-50">
                Conflict &amp; Risk Pane
              </p>
              <p className="text-slate-300">
                Side panel listing conflicts (tank overfill, incompatible
                batches, dock overlaps) with explanations and suggested fixes,
                powered by lightweight AI narration.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-xs">
              <p className="mb-1 text-sm font-semibold text-slate-50">
                Scenario Sandbox
              </p>
              <p className="text-slate-300">
                Small control panel where schedulers tweak volumes or timings
                and trigger a &quot;recompute&quot; to see an updated draft plan
                and tank forecast.
              </p>
            </div>
          </div>
        </Section>

        {/* Impact */}
        <Section
          id="impact"
          eyebrow="Outcomes"
          title="Target outcomes and how I’d measure success"
        >
          <p>
            Because this is a portfolio artifact, the numbers are directional.
            The measurement mindset is real: less chaos, fewer surprises, and
            lower P&amp;L drag from operational friction.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <StatCard
              label="Scheduling conflicts surfaced earlier"
              value="60–80%"
              sublabel="Share of tank/dock conflicts flagged at least 24 hours before they would have been noticed in today’s workflow."
            />
            <StatCard
              label="Demurrage exposure reduction"
              value="10–20%"
              sublabel="Modeled reduction in demurrage driven by earlier response to late vessels and berth conflicts."
            />
            <StatCard
              label="Time spent rebuilding schedules"
              value="-30–40%"
              sublabel="Reduction in scheduler time spent reworking plans after a mid-day change."
            />
          </div>
        </Section>

        {/* Role & AI */}
        <Section
          id="role"
          eyebrow="Execution"
          title="How I approached ChevronLift as a PM (and where AI actually fits)"
        >
          <ul className="space-y-1.5 text-sm text-slate-300">
            <li className="flex gap-2">
              <span className="mt-[6px] h-[3px] w-[3px] rounded-full bg-amber-200" />
              <span>
                <strong>Started from real constraints</strong> — tanks, docks,
                pipeline batches, laycans — rather than &quot;let&apos;s add AI
                to scheduling.&quot;
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-[6px] h-[3px] w-[3px] rounded-full bg-amber-200" />
              <span>
                <strong>Defined human responsibilities</strong> first (scheduler
                owns the plan, trader owns the book), then used AI to recompute
                options and narrate risk.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-[6px] h-[3px] w-[3px] rounded-full bg-amber-200" />
              <span>
                <strong>Chose three anchor flows</strong> that feel painfully
                familiar to schedulers: building tomorrow, handling a late
                vessel, and managing a stressed terminal.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-[6px] h-[3px] w-[3px] rounded-full bg-amber-200" />
              <span>
                <strong>Scoped the UI to be believable</strong> as a Chevron
                internal tool — opinionated but not sci-fi, with synthetic data
                standing in for feeds from pipeline/terminal/marine systems.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-[6px] h-[3px] w-[3px] rounded-full bg-amber-200" />
              <span>
                <strong>Anchored on measurable outcomes</strong> like reduced
                conflicts and demurrage, not just &quot;nice dashboards.&quot;
              </span>
            </li>
          </ul>
          <p className="mt-3 text-[0.8rem] text-slate-400">
            In a real engagement, this would sit alongside integrations to
            actual pipeline, terminal, and marine systems. For the portfolio,
            the goal is to make the product thinking and tradeoffs legible in a
            single, navigable experience.
          </p>
        </Section>
      </div>
    </main>
  );
}

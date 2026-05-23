"use client";

import { useEffect, useState } from "react";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";
import {
  IconCalendar,
  IconChart,
  IconClipboard,
  IconKanban,
  IconReceipt,
  IconShield,
  IconWrench,
} from "./Icons";

type ColKey = "progress" | "inspection" | "ready";
type Card = { id: string; col: ColKey };

const INITIAL: Card[] = [
  { id: "JC-0312", col: "progress" },
  { id: "JC-0308", col: "progress" },
  { id: "JC-0311", col: "inspection" },
  { id: "JC-0310", col: "ready" },
];

const NEXT_COL: Record<ColKey, ColKey> = {
  progress: "inspection",
  inspection: "ready",
  ready: "progress",
};

const COL_META: Record<ColKey, { name: string; tone: string }> = {
  progress: {
    name: "In Progress",
    tone: "border-amber-300/70 dark:border-amber-500/30",
  },
  inspection: {
    name: "Inspection",
    tone: "border-sky-300/70 dark:border-sky-500/30",
  },
  ready: {
    name: "Ready",
    tone: "border-emerald-300/70 dark:border-emerald-500/30",
  },
};

function LiveKanban() {
  const [cards, setCards] = useState<Card[]>(INITIAL);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setInterval(() => {
      setCards((curr) => {
        const idx = Math.floor(Math.random() * curr.length);
        const card = curr[idx];
        const next = { ...card, col: NEXT_COL[card.col] };
        const out = [...curr];
        out[idx] = next;
        return out;
      });
    }, 2200);
    return () => clearInterval(id);
  }, []);

  const cols: ColKey[] = ["progress", "inspection", "ready"];

  return (
    <div className="mt-5 grid grid-cols-3 gap-2">
      {cols.map((col) => {
        const meta = COL_META[col];
        const items = cards.filter((c) => c.col === col);
        return (
          <div
            key={col}
            className={`rounded-xl border bg-white/60 p-2.5 transition-colors dark:bg-brand-900/30 ${meta.tone} dark:border-brand-800/70`}
          >
            <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {meta.name}
            </div>
            <div className="space-y-1.5">
              {items.map((it) => (
                <div
                  key={it.id}
                  className="animate-card-pop rounded-lg border border-slate-200 bg-white p-2 text-[11px] font-medium text-slate-700 shadow-sm transition-transform hover:-translate-y-0.5 dark:border-brand-900 dark:bg-brand-950 dark:text-slate-300"
                >
                  {it.id}
                  <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-brand-900">
                    <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-brand-500 to-brand-700" />
                  </div>
                </div>
              ))}
              {items.length === 0 && (
                <div className="h-7 rounded-lg border border-dashed border-slate-200 dark:border-brand-900" />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function MiniChecklist() {
  const items = [
    { label: "Brake pads — front", ok: true },
    { label: "Tire tread depth", ok: true },
    { label: "Battery voltage", ok: false },
    { label: "Wiper blades", ok: true },
  ];
  return (
    <div className="mt-5 space-y-2">
      {items.map((it, i) => (
        <div
          key={it.label}
          style={{ animationDelay: `${i * 90}ms` }}
          className="flex animate-card-pop items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2 transition-colors hover:border-brand-300 dark:border-brand-900 dark:bg-brand-950 dark:hover:border-brand-700"
        >
          <span className="text-sm text-slate-700 dark:text-slate-300">
            {it.label}
          </span>
          <span
            className={`rounded-full px-2 py-0.5 text-[11px] font-semibold transition-transform hover:scale-105 ${
              it.ok
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
                : "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300"
            }`}
          >
            {it.ok ? "OK" : "Report"}
          </span>
        </div>
      ))}
    </div>
  );
}

function MiniInvoice() {
  return (
    <div className="mt-5 rounded-xl border border-slate-200 bg-white p-4 transition-shadow hover:shadow-soft dark:border-brand-900 dark:bg-brand-950">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[11px] font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Sales Invoice
          </div>
          <div className="text-sm font-semibold text-slate-900 dark:text-white">
            ACC-SINV-2026-00128
          </div>
        </div>
        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
          Paid
        </span>
      </div>
      <div className="mt-3 space-y-1.5 text-[12px]">
        <div className="flex justify-between text-slate-600 dark:text-slate-400">
          <span>Labour · Service & inspection</span>
          <span>$120.00</span>
        </div>
        <div className="flex justify-between text-slate-600 dark:text-slate-400">
          <span>Parts · 5W-30 oil, filter</span>
          <span>$48.50</span>
        </div>
        <div className="flex justify-between border-t border-slate-200 pt-1.5 font-semibold text-slate-900 dark:border-brand-900 dark:text-white">
          <span>Total</span>
          <span>$168.50</span>
        </div>
      </div>
    </div>
  );
}

function MiniReports() {
  const cards = [
    { l: "Daily Revenue", v: "$2,184" },
    { l: "Jobs Ready", v: "5" },
    { l: "Parts Used", v: "37" },
    { l: "Avg. Turnaround", v: "1.6d" },
  ];
  return (
    <div className="mt-5 grid grid-cols-2 gap-2">
      {cards.map((r, i) => (
        <div
          key={r.l}
          style={{ animationDelay: `${i * 90}ms` }}
          className="animate-card-pop rounded-xl border border-slate-200 bg-white p-3 transition-transform hover:-translate-y-0.5 dark:border-brand-900 dark:bg-brand-950"
        >
          <div className="text-[11px] font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {r.l}
          </div>
          <div className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
            {r.v}
          </div>
        </div>
      ))}
    </div>
  );
}

export function Features() {
  return (
    <section id="features" className="py-16 md:py-24">
      <div className="container-px mx-auto max-w-6xl">
        <Reveal>
          <SectionHeader
            eyebrow="Features"
            title="Everything you need to run service day."
            description="A workspace built around the actual flow of a workshop — not a database form for every action."
          />
        </Reveal>

        {/* Bento grid */}
        <div className="mt-12 grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-6">
          {/* Large card */}
          <Reveal className="md:col-span-4 md:row-span-2" delay={0}>
            <div className="tilt h-full rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-brand-300 hover:shadow-soft dark:border-brand-900/60 dark:bg-brand-950/60 dark:hover:border-brand-700">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white shadow-soft">
                  <IconKanban className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
                    Job card kanban for the floor
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Drag cards across states — watch the workflow do the paperwork.
                  </p>
                </div>
              </div>
              <LiveKanban />
            </div>
          </Reveal>

          <Reveal className="md:col-span-2" delay={80}>
            <div className="tilt h-full rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-brand-300 hover:shadow-soft dark:border-brand-900/60 dark:bg-brand-950/60 dark:hover:border-brand-700">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700 dark:bg-brand-900/60 dark:text-brand-300">
                  <IconCalendar className="h-5 w-5" />
                </span>
                <h3 className="text-base font-semibold tracking-tight text-slate-900 dark:text-white">
                  Appointments in 30 seconds
                </h3>
              </div>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                Create new customers and vehicles inline — no jumping to admin forms.
              </p>
            </div>
          </Reveal>

          <Reveal className="md:col-span-2" delay={160}>
            <div className="tilt h-full rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-brand-300 hover:shadow-soft dark:border-brand-900/60 dark:bg-brand-950/60 dark:hover:border-brand-700">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700 dark:bg-brand-900/60 dark:text-brand-300">
                  <IconClipboard className="h-5 w-5" />
                </span>
                <h3 className="text-base font-semibold tracking-tight text-slate-900 dark:text-white">
                  Vehicle inspection checklist
                </h3>
              </div>
              <MiniChecklist />
            </div>
          </Reveal>

          <Reveal className="md:col-span-2" delay={120}>
            <div className="tilt h-full rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-brand-300 hover:shadow-soft dark:border-brand-900/60 dark:bg-brand-950/60 dark:hover:border-brand-700">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700 dark:bg-brand-900/60 dark:text-brand-300">
                  <IconReceipt className="h-5 w-5" />
                </span>
                <h3 className="text-base font-semibold tracking-tight text-slate-900 dark:text-white">
                  One-click Sales Invoice
                </h3>
              </div>
              <MiniInvoice />
            </div>
          </Reveal>

          <Reveal className="md:col-span-2" delay={200}>
            <div className="tilt h-full rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-brand-300 hover:shadow-soft dark:border-brand-900/60 dark:bg-brand-950/60 dark:hover:border-brand-700">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700 dark:bg-brand-900/60 dark:text-brand-300">
                  <IconWrench className="h-5 w-5" />
                </span>
                <h3 className="text-base font-semibold tracking-tight text-slate-900 dark:text-white">
                  Job card workspace
                </h3>
              </div>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                Editable service & parts lines with live totals and workflow action buttons.
              </p>
            </div>
          </Reveal>

          <Reveal className="md:col-span-4" delay={120}>
            <div className="tilt h-full rounded-2xl border border-slate-200 bg-gradient-to-br from-brand-50/60 to-white p-6 transition-all hover:border-brand-300 hover:shadow-soft dark:border-brand-900/60 dark:from-brand-900/30 dark:to-brand-950/60 dark:hover:border-brand-700">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white shadow-soft">
                  <IconChart className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-base font-semibold tracking-tight text-slate-900 dark:text-white">
                    Reports managers actually use
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Daily Revenue · Jobs by Status · Ready to Invoice · Parts Consumption · Service History
                  </p>
                </div>
              </div>
              <MiniReports />
            </div>
          </Reveal>

          <Reveal className="md:col-span-2" delay={200}>
            <div className="tilt h-full rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-brand-300 hover:shadow-soft dark:border-brand-900/60 dark:bg-brand-950/60 dark:hover:border-brand-700">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700 dark:bg-brand-900/60 dark:text-brand-300">
                  <IconShield className="h-5 w-5" />
                </span>
                <h3 className="text-base font-semibold tracking-tight text-slate-900 dark:text-white">
                  Standards out of the box
                </h3>
              </div>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                Frappe permissions, fixtures, hooks and REST API. Anything not in the portal lives one click away in Desk.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

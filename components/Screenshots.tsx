"use client";

import { useState } from "react";
import { SectionHeader } from "./SectionHeader";
import { DashboardPreview } from "./DashboardPreview";
import { Reveal } from "./Reveal";
import {
  IconCalendar,
  IconChart,
  IconClipboard,
  IconKanban,
} from "./Icons";

const tabs = [
  { key: "dashboard", label: "Dashboard", icon: IconChart },
  { key: "appointments", label: "Appointments", icon: IconCalendar },
  { key: "inspection", label: "Inspection", icon: IconClipboard },
  { key: "kanban", label: "Job card kanban", icon: IconKanban },
] as const;

type TabKey = (typeof tabs)[number]["key"];

function AppointmentsMock() {
  const rows = [
    ["09:00", "M. Perera", "Toyota Aqua", "Service A", "Confirmed"],
    ["10:15", "S. Fernando", "Honda Civic", "Brake check", "Checked-In"],
    ["11:00", "K. Silva", "Suzuki Wagon-R", "Battery", "Booked"],
    ["13:30", "R. Jayaweera", "Nissan Leaf", "Full inspection", "Confirmed"],
    ["15:00", "T. Bandara", "Mazda CX-5", "Oil change", "Booked"],
  ];
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-ring dark:border-brand-900/60 dark:bg-brand-950/80">
      <div className="flex items-center justify-between border-b border-slate-200/80 px-4 py-3 dark:border-brand-900/60">
        <div className="text-sm font-semibold text-slate-900 dark:text-white">
          Appointments · Today
        </div>
        <button className="cursor-pointer rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white">
          + New appointment
        </button>
      </div>
      <div className="grid grid-cols-12 border-b border-slate-200/80 bg-slate-50/60 px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:border-brand-900/60 dark:bg-brand-900/30 dark:text-slate-400">
        <div className="col-span-2">Time</div>
        <div className="col-span-3">Customer</div>
        <div className="col-span-3">Vehicle</div>
        <div className="col-span-2">Service</div>
        <div className="col-span-2 text-right">Status</div>
      </div>
      <div className="divide-y divide-slate-200/80 dark:divide-brand-900/50">
        {rows.map((r) => (
          <div key={r[0] + r[1]} className="grid grid-cols-12 items-center px-4 py-3 text-sm">
            <div className="col-span-2 font-mono text-xs text-slate-500 dark:text-slate-400">{r[0]}</div>
            <div className="col-span-3 font-medium text-slate-800 dark:text-slate-200">{r[1]}</div>
            <div className="col-span-3 text-slate-500 dark:text-slate-400">{r[2]}</div>
            <div className="col-span-2 text-slate-700 dark:text-slate-300">{r[3]}</div>
            <div className="col-span-2 text-right">
              <span className="inline-flex rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-medium text-brand-700 dark:bg-brand-900/60 dark:text-brand-200">
                {r[4]}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InspectionMock() {
  const sections = [
    {
      name: "Engine",
      items: [
        { l: "Oil level", ok: true },
        { l: "Coolant", ok: true },
        { l: "Belts", ok: false },
      ],
    },
    {
      name: "Brakes",
      items: [
        { l: "Front pads", ok: true },
        { l: "Rear pads", ok: false },
      ],
    },
    {
      name: "Tires",
      items: [
        { l: "FL tread", ok: true },
        { l: "FR tread", ok: true },
        { l: "RL tread", ok: true },
        { l: "RR tread", ok: false },
      ],
    },
  ];
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-ring dark:border-brand-900/60 dark:bg-brand-950/80">
      <div className="flex items-center justify-between border-b border-slate-200/80 px-4 py-3 dark:border-brand-900/60">
        <div className="text-sm font-semibold text-slate-900 dark:text-white">
          Inspection · INSP-0142 · Toyota Aqua
        </div>
        <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Auto-saved</div>
      </div>
      <div className="grid gap-3 p-4 md:grid-cols-3">
        {sections.map((s) => (
          <div
            key={s.name}
            className="rounded-xl border border-slate-200 bg-white p-3 dark:border-brand-900 dark:bg-brand-900/30"
          >
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-brand-700 dark:text-brand-300">
              {s.name}
            </div>
            <div className="space-y-1.5">
              {s.items.map((i) => (
                <div
                  key={i.l}
                  className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs dark:border-brand-900 dark:bg-brand-950"
                >
                  <span className="text-slate-700 dark:text-slate-300">{i.l}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      i.ok
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
                        : "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300"
                    }`}
                  >
                    {i.ok ? "OK" : "Report"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function KanbanMock() {
  const cols = [
    { name: "Open", count: 3, items: ["JC-0314 · Toyota Aqua", "JC-0313 · Honda Fit", "JC-0307 · Suzuki Alto"] },
    { name: "In Progress", count: 2, items: ["JC-0312 · Toyota Aqua", "JC-0308 · Mazda CX-5"] },
    { name: "Inspection", count: 1, items: ["JC-0311 · Honda Civic"] },
    { name: "Ready", count: 2, items: ["JC-0310 · Wagon-R", "JC-0306 · Vitz"] },
  ];
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 shadow-ring dark:border-brand-900/60 dark:bg-brand-950/80">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {cols.map((c) => (
          <div
            key={c.name}
            className="rounded-xl border border-slate-200 bg-slate-50/60 p-3 dark:border-brand-900 dark:bg-brand-900/30"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-900 dark:text-white">{c.name}</span>
              <span className="rounded-full bg-white px-1.5 py-0.5 text-[10px] font-semibold text-slate-600 dark:bg-brand-950 dark:text-slate-300">
                {c.count}
              </span>
            </div>
            <div className="space-y-2">
              {c.items.map((it) => (
                <div
                  key={it}
                  className="rounded-lg border border-slate-200 bg-white p-2.5 text-xs text-slate-700 shadow-sm dark:border-brand-900 dark:bg-brand-950 dark:text-slate-300"
                >
                  <div className="font-medium">{it}</div>
                  <div className="mt-2 h-1 w-full rounded-full bg-slate-100 dark:bg-brand-900">
                    <div className="h-full w-1/2 rounded-full bg-brand-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Screenshots() {
  const [active, setActive] = useState<TabKey>("dashboard");

  return (
    <section id="screenshots" className="py-16 md:py-24">
      <div className="container-px mx-auto max-w-6xl">
        <Reveal>
          <SectionHeader
            eyebrow="Screens"
            title="The portal, on the inside."
            description="A quick walk through the screens your team will live in every day."
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {tabs.map((t) => {
              const Icon = t.icon;
              const isActive = active === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => setActive(t.key)}
                  className={`cursor-pointer inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition-all hover:-translate-y-0.5 ${
                    isActive
                      ? "border-brand-600 bg-brand-600 text-white shadow-soft"
                      : "border-slate-200 bg-white text-slate-700 hover:border-brand-300 hover:text-brand-700 dark:border-brand-900 dark:bg-brand-950 dark:text-slate-300 dark:hover:border-brand-700"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {t.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div key={active} className="mt-8 animate-fade-up">
          {active === "dashboard" && <DashboardPreview />}
          {active === "appointments" && <AppointmentsMock />}
          {active === "inspection" && <InspectionMock />}
          {active === "kanban" && <KanbanMock />}
        </div>
      </div>
    </section>
  );
}

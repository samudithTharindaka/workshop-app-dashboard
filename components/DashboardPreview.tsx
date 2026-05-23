"use client";

import { useEffect, useState } from "react";
import { CountUp } from "./CountUp";
import { IconCar, IconChart, IconReceipt, IconWrench } from "./Icons";

const kpis = [
  {
    label: "Today revenue",
    value: 2184,
    prefix: "$",
    trend: "+12%",
    icon: IconReceipt,
  },
  { label: "Open jobs", value: 14, trend: "4 ready", icon: IconWrench },
  { label: "Vehicles in", value: 9, trend: "2 waiting", icon: IconCar },
  {
    label: "Outstanding",
    value: 4920,
    prefix: "$",
    trend: "5 invoices",
    icon: IconChart,
  },
];

const trendBars = [22, 38, 30, 52, 44, 60, 48, 70, 58, 72, 64, 84];

const jobs = [
  {
    id: "JC-0312",
    customer: "M. Perera",
    vehicle: "Toyota Aqua",
    status: "In Progress",
    tone: "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300",
  },
  {
    id: "JC-0311",
    customer: "S. Fernando",
    vehicle: "Honda Civic",
    status: "Inspection",
    tone: "bg-sky-100 text-sky-800 dark:bg-sky-500/15 dark:text-sky-300",
  },
  {
    id: "JC-0310",
    customer: "K. Silva",
    vehicle: "Suzuki Wagon-R",
    status: "Ready to Invoice",
    tone: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300",
  },
  {
    id: "JC-0309",
    customer: "R. Jayaweera",
    vehicle: "Nissan Leaf",
    status: "Awaiting Parts",
    tone: "bg-rose-100 text-rose-800 dark:bg-rose-500/15 dark:text-rose-300",
  },
];

export function DashboardPreview() {
  // Cycle the highlighted bar like a live tick
  const [activeBar, setActiveBar] = useState(trendBars.length - 1);
  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setInterval(() => {
      setActiveBar((v) => (v + 1) % trendBars.length);
    }, 1400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative">
      <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-tr from-brand-200/40 via-transparent to-brand-300/30 blur-2xl dark:from-brand-800/30 dark:to-brand-500/10 animate-float-slow" />
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-ring dark:border-brand-900/60 dark:bg-brand-950/80">
        {/* App chrome */}
        <div className="flex items-center justify-between border-b border-slate-200/80 px-4 py-3 dark:border-brand-900/60">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          </div>
          <div className="mx-4 hidden flex-1 rounded-lg border border-slate-200/80 bg-slate-50 px-3 py-1.5 text-xs text-slate-500 dark:border-brand-900/60 dark:bg-brand-900/40 dark:text-slate-400 sm:block">
            workshop.example.com / workshop
          </div>
          <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-brand-600 dark:text-brand-300">
            <span className="live-dot" />
            Live
          </div>
        </div>

        <div className="grid gap-4 p-4 sm:p-5 md:grid-cols-12">
          {/* Sidebar */}
          <aside className="hidden md:col-span-3 md:flex md:flex-col md:gap-1">
            {[
              "Dashboard",
              "Appointments",
              "Inspections",
              "Job Cards",
              "Invoices",
              "Reports",
            ].map((item, i) => (
              <div
                key={item}
                style={{ animationDelay: `${i * 60}ms` }}
                className={`animate-fade-up rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  i === 0
                    ? "bg-brand-50 text-brand-700 dark:bg-brand-900/50 dark:text-brand-200"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-brand-900/40"
                }`}
              >
                {item}
              </div>
            ))}
          </aside>

          {/* Main */}
          <div className="md:col-span-9">
            {/* KPI row */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {kpis.map(({ label, value, prefix, trend, icon: Icon }, i) => (
                <div
                  key={label}
                  style={{ animationDelay: `${100 + i * 80}ms` }}
                  className="animate-card-pop rounded-xl border border-slate-200/80 bg-white p-3 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-soft dark:border-brand-900/60 dark:bg-brand-900/30 dark:hover:border-brand-700"
                >
                  <div className="flex items-center justify-between gap-2 text-slate-500 dark:text-slate-400">
                    <span className="truncate whitespace-nowrap text-[11px] font-medium uppercase tracking-wider">
                      {label}
                    </span>
                    <Icon className="h-4 w-4 shrink-0" />
                  </div>
                  <div className="mt-1.5 text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
                    <CountUp
                      value={value}
                      prefix={prefix}
                      duration={1400 + i * 120}
                    />
                  </div>
                  <div className="text-[11px] font-medium text-emerald-600 dark:text-emerald-300">
                    {trend}
                  </div>
                </div>
              ))}
            </div>

            {/* Chart + table */}
            <div className="mt-4 grid gap-4 lg:grid-cols-5">
              <div className="lg:col-span-2 rounded-xl border border-slate-200/80 bg-white p-4 dark:border-brand-900/60 dark:bg-brand-900/30">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">
                    Revenue trend
                  </div>
                  <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    Last 12d
                  </div>
                </div>
                <div className="mt-4 flex h-28 origin-bottom items-end gap-1.5">
                  {trendBars.map((h, i) => (
                    <div
                      key={i}
                      style={{
                        height: `${h}%`,
                        animationDelay: `${i * 60}ms`,
                        transformOrigin: "bottom",
                      }}
                      className={`flex-1 origin-bottom animate-bar-grow rounded-md transition-colors duration-300 ${
                        i === activeBar
                          ? "bg-brand-600"
                          : "bg-brand-200 hover:bg-brand-400 dark:bg-brand-800 dark:hover:bg-brand-600"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="lg:col-span-3 rounded-xl border border-slate-200/80 bg-white dark:border-brand-900/60 dark:bg-brand-900/30">
                <div className="flex items-center justify-between border-b border-slate-200/80 px-4 py-3 dark:border-brand-900/60">
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">
                    Open job cards
                  </div>
                  <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    14 total
                  </div>
                </div>
                <div className="divide-y divide-slate-200/80 dark:divide-brand-900/50">
                  {jobs.map((j, i) => (
                    <div
                      key={j.id}
                      style={{ animationDelay: `${300 + i * 80}ms` }}
                      className="grid animate-fade-up grid-cols-12 items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-slate-50/70 dark:hover:bg-brand-900/30"
                    >
                      <div className="col-span-2 truncate whitespace-nowrap font-mono text-xs text-slate-500 dark:text-slate-400">
                        {j.id}
                      </div>
                      <div className="col-span-3 truncate whitespace-nowrap font-medium text-slate-800 dark:text-slate-200">
                        {j.customer}
                      </div>
                      <div className="col-span-3 truncate whitespace-nowrap text-slate-500 dark:text-slate-400">
                        {j.vehicle}
                      </div>
                      <div className="col-span-4 text-right">
                        <span
                          className={`inline-flex whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-medium ${j.tone}`}
                        >
                          {j.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";
import {
  IconCalendar,
  IconCar,
  IconClipboard,
  IconReceipt,
  IconWrench,
} from "./Icons";

const steps = [
  {
    icon: IconCalendar,
    title: "Book",
    body: "Customer rings, you create the appointment in 30 seconds. Add new customers and vehicles inline.",
  },
  {
    icon: IconCar,
    title: "Check in",
    body: "Vehicle arrives, click Check in. Status flips and the next actions appear.",
  },
  {
    icon: IconClipboard,
    title: "Inspect",
    body: "Load the standard checklist. Mark each item OK or Report. Note what's needed.",
  },
  {
    icon: IconWrench,
    title: "Work",
    body: "Convert to a job card. Add labour and parts, drag through workflow states.",
  },
  {
    icon: IconReceipt,
    title: "Invoice",
    body: "One click creates a Sales Invoice. The job card status moves to Invoiced automatically.",
  },
];

export function HowItWorks() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const node = wrapRef.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setDrawn(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setDrawn(true);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.25 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="how-it-works" className="relative py-16 md:py-24">
      <div className="container-px mx-auto max-w-6xl">
        <Reveal>
          <SectionHeader
            eyebrow="How it works"
            title="From phone call to paid invoice in five steps."
            description="A workflow your front desk and technicians can run without a manual."
          />
        </Reveal>

        <div ref={wrapRef} className="relative mt-14">
          {/* Animated connector line (drawn SVG) */}
          <svg
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px w-full lg:block"
            preserveAspectRatio="none"
            viewBox="0 0 1000 1"
          >
            <defs>
              <linearGradient id="line-grad" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="rgba(0,109,119,0)" />
                <stop offset="50%" stopColor="#2A929D" />
                <stop offset="100%" stopColor="rgba(0,109,119,0)" />
              </linearGradient>
            </defs>
            <line
              x1="0"
              y1="0.5"
              x2="1000"
              y2="0.5"
              stroke="url(#line-grad)"
              strokeWidth="1"
              style={{
                strokeDasharray: 1000,
                strokeDashoffset: drawn ? 0 : 1000,
                transition: "stroke-dashoffset 1400ms cubic-bezier(0.22,1,0.36,1)",
              }}
            />
          </svg>

          <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.title} as="li" delay={i * 120}>
                  <div className="group relative rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-soft dark:border-brand-900/60 dark:bg-brand-950/60 dark:hover:border-brand-700">
                    <div className="relative mx-auto -mt-9 mb-3 h-14 w-14">
                      <span className="absolute inset-0 rounded-2xl bg-brand-500/40 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100" />
                      <div className="absolute inset-0 rounded-2xl bg-brand-600 shadow-soft transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" />
                      <div className="relative flex h-full w-full items-center justify-center rounded-2xl text-white">
                        <Icon className="h-6 w-6 transition-transform group-hover:scale-110" />
                      </div>
                      <div className="absolute -right-1 -top-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-slate-200 bg-white text-[10px] font-bold text-brand-700 dark:border-brand-800 dark:bg-brand-950 dark:text-brand-300">
                        {i + 1}
                      </div>
                    </div>
                    <div className="text-center">
                      <h3 className="text-base font-semibold tracking-tight text-slate-900 dark:text-white">
                        {s.title}
                      </h3>
                      <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400">
                        {s.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

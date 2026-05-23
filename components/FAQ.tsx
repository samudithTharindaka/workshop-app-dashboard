"use client";

import { useState } from "react";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";
import { IconMinus, IconPlus } from "./Icons";

const faqs = [
  {
    q: "Do I need to know ERPNext to use it?",
    a: "No. The portal is built so floor staff never have to open Desk. Admins still use Desk for accounting and configuration.",
  },
  {
    q: "Can I keep using my existing ERPNext setup?",
    a: "Yes. Workshop Management installs as a standard app on top of an existing site — no fork, no replacement.",
  },
  {
    q: "What happens to my Sales Invoices?",
    a: "They are standard ERPNext invoices with one extra link field (custom_job_card) tying them back to the work order they came from.",
  },
  {
    q: "Is the workflow customizable?",
    a: "Yes — it's a real ERPNext Workflow at /app/workflow/Workshop Job Card. Edit states, transitions, and the roles allowed on each.",
  },
  {
    q: "Does it work on tablets?",
    a: "Yes. The portal is responsive and tested on tablets — ideal for shop-floor use.",
  },
  {
    q: "Can customers see their own jobs?",
    a: "The install hook configures Frappe's customer portal so they can optionally log in at /me to see their service history.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 md:py-24">
      <div className="container-px mx-auto max-w-3xl">
        <Reveal>
          <SectionHeader
            eyebrow="FAQ"
            title="Questions, answered."
            description="Short answers to the things workshop owners ask before they install."
          />
        </Reveal>

        <div className="mt-10 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 70}>
                <div
                  className={`overflow-hidden rounded-2xl border bg-white transition-colors dark:bg-brand-950/60 ${
                    isOpen
                      ? "border-brand-300 dark:border-brand-700"
                      : "border-slate-200 dark:border-brand-900/60"
                  }`}
                >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="cursor-pointer flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-sm font-semibold text-slate-900 sm:text-base dark:text-white">
                    {f.q}
                  </span>
                  <span
                    className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 transition-colors dark:border-brand-900 ${
                      isOpen ? "bg-brand-600 text-white" : "bg-white text-slate-600 dark:bg-brand-950 dark:text-slate-300"
                    }`}
                  >
                    {isOpen ? <IconMinus className="h-4 w-4" /> : <IconPlus className="h-4 w-4" />}
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      {f.a}
                    </p>
                  </div>
                </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

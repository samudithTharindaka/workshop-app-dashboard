"use client";

import { useEffect, useState } from "react";
import type { Heading } from "@/lib/docs-meta";

export function Toc({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string | null>(
    headings[0]?.id ?? null,
  );

  useEffect(() => {
    if (headings.length === 0) return;
    if (typeof IntersectionObserver === "undefined") return;

    const visible = new Set<string>();

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const id = e.target.id;
          if (e.isIntersecting) visible.add(id);
          else visible.delete(id);
        }
        const ordered = headings
          .map((h) => h.id)
          .filter((id) => visible.has(id));
        if (ordered[0]) setActiveId(ordered[0]);
      },
      { rootMargin: "-96px 0px -65% 0px", threshold: 0 },
    );

    for (const h of headings) {
      const el = document.getElementById(h.id);
      if (el) obs.observe(el);
    }
    return () => obs.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <aside
      aria-label="On this page"
      className="sticky top-28 hidden h-fit xl:block"
    >
      <div className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700 dark:text-brand-300">
        On this page
      </div>
      <ul className="space-y-1.5 border-l border-slate-200 pl-3 dark:border-brand-900/60">
        {headings.map((h) => {
          const isActive = h.id === activeId;
          return (
            <li
              key={h.id}
              className={h.level === 3 ? "ml-3" : undefined}
            >
              <a
                href={`#${h.id}`}
                className={`cursor-pointer block py-0.5 text-sm transition-colors ${
                  isActive
                    ? "font-medium text-brand-700 dark:text-brand-200"
                    : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
                }`}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  CATEGORIES,
  type CategoryKey,
  type DocMeta,
} from "@/lib/docs-meta";

type Props = {
  allDocs: DocMeta[];
  activeCategory: CategoryKey;
  activeSlug: string;
};

function ChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function CategoryGroup({
  catKey,
  label,
  items,
  activeSlug,
  defaultOpen,
}: {
  catKey: CategoryKey;
  label: string;
  items: DocMeta[];
  activeSlug: string;
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  if (items.length === 0) return null;

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={`docs-cat-${catKey}`}
        className="cursor-pointer group flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700 transition-colors hover:bg-slate-100 dark:text-brand-300 dark:hover:bg-brand-900/40"
      >
        <span className="flex items-center gap-2">
          {label}
          <span className="rounded-full bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold tracking-normal text-slate-600 dark:bg-brand-900/60 dark:text-slate-300">
            {items.length}
          </span>
        </span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ${
            open ? "rotate-0" : "-rotate-90"
          }`}
        />
      </button>

      <div
        id={`docs-cat-${catKey}`}
        className={`grid transition-all duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <ul className="overflow-hidden space-y-0.5 pt-1">
          {items.map((d) => {
            const isActive = d.slug === activeSlug;
            return (
              <li key={d.slug}>
                <Link
                  href={`/docs/${d.slug}`}
                  className={`cursor-pointer relative block rounded-lg py-2 pl-6 pr-3 text-sm transition-colors ${
                    isActive
                      ? "bg-brand-50 font-medium text-brand-700 dark:bg-brand-900/50 dark:text-brand-200"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-brand-900/40 dark:hover:text-slate-200"
                  }`}
                >
                  {isActive && (
                    <span className="absolute inset-y-1.5 left-2 w-0.5 rounded-full bg-brand-600 dark:bg-brand-400" />
                  )}
                  <span className="truncate">{d.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export function DocsSidebar({ allDocs, activeCategory, activeSlug }: Props) {
  const [query, setQuery] = useState("");

  const grouped = useMemo(() => {
    const q = query.trim().toLowerCase();
    const match = (d: DocMeta) =>
      !q ||
      d.title.toLowerCase().includes(q) ||
      (d.description?.toLowerCase().includes(q) ?? false);

    const out: Record<CategoryKey, DocMeta[]> = {
      setup: [],
      operations: [],
      reference: [],
    };
    for (const d of allDocs) {
      if (match(d)) out[d.category].push(d);
    }
    return out;
  }, [allDocs, query]);

  const totalShown =
    grouped.setup.length + grouped.operations.length + grouped.reference.length;
  const searching = query.trim().length > 0;

  return (
    <nav aria-label="Documentation pages" className="text-sm">
      <div className="relative mb-4">
        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            className="h-4 w-4"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3-3" strokeLinecap="round" />
          </svg>
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search docs..."
          className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-800 placeholder:text-slate-400 transition-colors focus:border-brand-400 focus:outline-none dark:border-brand-900 dark:bg-brand-950 dark:text-slate-200 dark:placeholder:text-slate-500"
        />
      </div>

      {totalShown === 0 ? (
        <p className="px-3 text-sm text-slate-500 dark:text-slate-400">
          No pages match.
        </p>
      ) : (
        <div className="space-y-3">
          {CATEGORIES.map((cat) => (
            <CategoryGroup
              key={cat.key}
              catKey={cat.key}
              label={cat.label}
              items={grouped[cat.key]}
              activeSlug={activeSlug}
              defaultOpen={searching || cat.key === activeCategory}
            />
          ))}
        </div>
      )}
    </nav>
  );
}

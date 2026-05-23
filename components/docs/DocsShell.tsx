import Link from "next/link";
import {
  CATEGORIES,
  type Doc,
  type DocMeta,
  type Heading,
} from "@/lib/docs-meta";
import { DocsSidebar } from "./DocsSidebar";
import { MarkdownContent } from "./MarkdownContent";
import { Toc } from "./Toc";

type Props = {
  allDocs: DocMeta[];
  doc: Doc;
  headings: Heading[];
  prev: DocMeta | null;
  next: DocMeta | null;
};

export function DocsShell({ allDocs, doc, headings, prev, next }: Props) {
  const catLabel =
    CATEGORIES.find((c) => c.key === doc.category)?.label ?? "Docs";

  return (
    <div className="relative">
      {/* Subtle backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-grid-light bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_at_top,black_0%,transparent_55%)] dark:bg-grid-dark"
      />

      <div className="container-px mx-auto max-w-7xl pb-20 pt-8 md:pt-12">
        <div className="grid gap-10 lg:grid-cols-[260px_1fr] xl:grid-cols-[260px_1fr_220px] xl:gap-12">
          <DocsSidebar
            allDocs={allDocs}
            activeCategory={doc.category}
            activeSlug={doc.slug}
          />

          <article className="min-w-0">
            <nav
              aria-label="Breadcrumb"
              className="mb-6 flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400"
            >
              <Link
                href="/"
                className="cursor-pointer hover:text-brand-700 dark:hover:text-brand-200"
              >
                Home
              </Link>
              <span aria-hidden>/</span>
              <Link
                href="/docs"
                className="cursor-pointer hover:text-brand-700 dark:hover:text-brand-200"
              >
                Docs
              </Link>
              <span aria-hidden>/</span>
              <span className="text-slate-700 dark:text-slate-300">
                {catLabel}
              </span>
              <span aria-hidden>/</span>
              <span className="text-slate-900 dark:text-white">{doc.title}</span>
            </nav>

            <header className="mb-10 border-b border-slate-200 pb-8 dark:border-brand-900/60">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700 dark:border-brand-800/70 dark:bg-brand-900/40 dark:text-brand-200">
                {catLabel}
              </div>
              <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-[2.75rem] dark:text-white">
                {doc.title}
              </h1>
              {doc.description && (
                <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                  {doc.description}
                </p>
              )}
            </header>

            <MarkdownContent html={doc.html} />

            {(prev || next) && (
              <nav
                aria-label="Pager"
                className="mt-16 grid gap-4 border-t border-slate-200 pt-8 sm:grid-cols-2 dark:border-brand-900/60"
              >
                {prev ? (
                  <Link
                    href={`/docs/${prev.slug}`}
                    className="cursor-pointer group rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-soft dark:border-brand-900/60 dark:bg-brand-950/60 dark:hover:border-brand-700"
                  >
                    <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                      ← Previous
                    </div>
                    <div className="mt-1 text-base font-semibold tracking-tight text-slate-900 transition-colors group-hover:text-brand-700 dark:text-white dark:group-hover:text-brand-200">
                      {prev.title}
                    </div>
                  </Link>
                ) : (
                  <span />
                )}
                {next ? (
                  <Link
                    href={`/docs/${next.slug}`}
                    className="cursor-pointer group rounded-2xl border border-slate-200 bg-white p-4 text-right transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-soft dark:border-brand-900/60 dark:bg-brand-950/60 dark:hover:border-brand-700"
                  >
                    <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                      Next →
                    </div>
                    <div className="mt-1 text-base font-semibold tracking-tight text-slate-900 transition-colors group-hover:text-brand-700 dark:text-white dark:group-hover:text-brand-200">
                      {next.title}
                    </div>
                  </Link>
                ) : (
                  <span />
                )}
              </nav>
            )}
          </article>

          <Toc headings={headings} />
        </div>
      </div>
    </div>
  );
}

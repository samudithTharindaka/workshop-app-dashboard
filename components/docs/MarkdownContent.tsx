type Props = { html: string };

export function MarkdownContent({ html }: Props) {
  return (
    <div
      className={[
        "prose prose-slate dark:prose-invert max-w-none",
        // Headings
        "prose-headings:scroll-mt-28 prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-slate-900 dark:prose-headings:text-white",
        "prose-h1:text-3xl prose-h1:mb-4",
        "prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-slate-200 dark:prose-h2:border-brand-900/60",
        "prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3",
        // Body
        "prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-p:leading-relaxed",
        "prose-strong:text-slate-900 dark:prose-strong:text-white",
        "prose-li:text-slate-700 dark:prose-li:text-slate-300 prose-li:marker:text-brand-500",
        // Links
        "prose-a:text-brand-700 dark:prose-a:text-brand-300 prose-a:font-medium prose-a:no-underline hover:prose-a:underline prose-a:decoration-brand-400 prose-a:underline-offset-4",
        // Inline code
        "prose-code:rounded-md prose-code:border prose-code:border-slate-200 dark:prose-code:border-brand-900 prose-code:bg-slate-100 dark:prose-code:bg-brand-900/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-[0.85em] prose-code:font-medium prose-code:text-brand-700 dark:prose-code:text-brand-200 prose-code:before:content-none prose-code:after:content-none",
        // Code blocks
        "prose-pre:rounded-2xl prose-pre:border prose-pre:border-brand-900 prose-pre:bg-brand-950 prose-pre:text-slate-100 prose-pre:shadow-soft",
        // Tables
        "prose-table:overflow-hidden prose-table:rounded-xl prose-table:border prose-table:border-slate-200 dark:prose-table:border-brand-900/60",
        "prose-thead:bg-slate-50 dark:prose-thead:bg-brand-900/30",
        "prose-th:text-[11px] prose-th:font-semibold prose-th:uppercase prose-th:tracking-wider prose-th:text-slate-500 dark:prose-th:text-slate-400 prose-th:px-4 prose-th:py-2.5",
        "prose-td:px-4 prose-td:py-2.5 prose-td:text-sm prose-td:text-slate-700 dark:prose-td:text-slate-300 prose-td:border-t prose-td:border-slate-200 dark:prose-td:border-brand-900/50",
        // Blockquote — callout style
        "prose-blockquote:not-italic prose-blockquote:rounded-xl prose-blockquote:border-l-4 prose-blockquote:border-brand-500 prose-blockquote:bg-brand-50/70 dark:prose-blockquote:bg-brand-900/30 prose-blockquote:py-3 prose-blockquote:px-4 prose-blockquote:text-slate-700 dark:prose-blockquote:text-slate-200 prose-blockquote:font-normal",
        "[&_blockquote_p]:before:content-none [&_blockquote_p]:after:content-none",
        // Horizontal rule
        "prose-hr:border-slate-200 dark:prose-hr:border-brand-900/60",
        // Images
        "prose-img:rounded-xl prose-img:border prose-img:border-slate-200 dark:prose-img:border-brand-900/60",
      ].join(" ")}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

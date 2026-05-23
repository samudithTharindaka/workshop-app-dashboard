type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeader({ eyebrow, title, description, align = "center" }: Props) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`max-w-2xl ${alignment}`}>
      {eyebrow && (
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700 dark:border-brand-800/70 dark:bg-brand-900/40 dark:text-brand-200">
          {eyebrow}
        </div>
      )}
      <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl md:text-[2.5rem] dark:text-white">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base text-slate-600 sm:text-lg dark:text-slate-300">
          {description}
        </p>
      )}
    </div>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <a
      href="#top"
      className={`cursor-pointer inline-flex items-center gap-2.5 ${className}`}
      aria-label="Workshop Management home"
    >
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white shadow-soft">
        <span className="font-bold tracking-tight">W</span>
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[15px] font-semibold tracking-tight text-slate-900 dark:text-white">
          Workshop
        </span>
        <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-brand-600 dark:text-brand-300">
          Management
        </span>
      </span>
    </a>
  );
}

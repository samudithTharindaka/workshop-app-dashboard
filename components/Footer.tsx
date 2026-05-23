import Link from "next/link";
import { Logo } from "./Logo";
import { IconGithub } from "./Icons";

const productLinks = [
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#screenshots", label: "Screens" },
  { href: "/#faq", label: "FAQ" },
];

const resourceLinks = [
  { href: "/docs", label: "Documentation", internal: true },
  {
    href: "https://github.com/samudithTharindaka/workshop_mgmt",
    label: "GitHub",
  },
  { href: "https://frappe.io", label: "Frappe" },
  { href: "https://erpnext.com", label: "ERPNext" },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-brand-900/60 dark:bg-brand-950">
      <div className="container-px mx-auto max-w-6xl py-14">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-4 max-w-sm text-sm text-slate-600 dark:text-slate-400">
              Workshop Management adds a focused, real-time portal on top of ERPNext — built for
              service advisors, technicians, and managers.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <a
                href="https://github.com/samudithTharindaka/workshop_mgmt"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="cursor-pointer inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-100 hover:text-brand-600 dark:border-brand-900 dark:bg-brand-950 dark:text-slate-300 dark:hover:bg-brand-900"
              >
                <IconGithub className="h-4 w-4" />
              </a>
              <a
                href="mailto:info@infoney.com"
                className="cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-brand-700 dark:border-brand-900 dark:bg-brand-950 dark:text-slate-300 dark:hover:bg-brand-900"
              >
                info@infoney.com
              </a>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              Product
            </div>
            <ul className="mt-4 space-y-2.5">
              {productLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="cursor-pointer text-sm text-slate-700 transition-colors hover:text-brand-700 dark:text-slate-300 dark:hover:text-brand-200"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              Resources
            </div>
            <ul className="mt-4 space-y-2.5">
              {resourceLinks.map((l) =>
                "internal" in l && l.internal ? (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="cursor-pointer text-sm text-slate-700 transition-colors hover:text-brand-700 dark:text-slate-300 dark:hover:text-brand-200"
                    >
                      {l.label}
                    </Link>
                  </li>
                ) : (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="cursor-pointer text-sm text-slate-700 transition-colors hover:text-brand-700 dark:text-slate-300 dark:hover:text-brand-200"
                    >
                      {l.label}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center dark:border-brand-900/60 dark:text-slate-400">
          <div>
            © {new Date().getFullYear()} Infoney · MIT License · Made for the automotive industry
          </div>
          <div className="font-mono text-[11px]">v0.0.1 · workshop_mgmt</div>
        </div>
      </div>
    </footer>
  );
}

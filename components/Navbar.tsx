"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { IconArrowRight, IconBook, IconGithub } from "./Icons";

const navLinks = [
  { href: "/#features", label: "Features", external: false },
  { href: "/#how-it-works", label: "How it works", external: false },
  { href: "/#personas", label: "For your team", external: false },
  { href: "/#screenshots", label: "Screens", external: false },
  { href: "/docs", label: "Docs", external: false, route: true },
  { href: "/#faq", label: "FAQ", external: false },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const onDocs = pathname?.startsWith("/docs") ?? false;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav
        className={`flex w-full max-w-6xl items-center justify-between gap-4 rounded-2xl border px-3 py-2.5 transition-all duration-300 ${
          scrolled
            ? "border-slate-200/80 bg-white/85 shadow-soft backdrop-blur-md dark:border-brand-900/70 dark:bg-brand-950/70"
            : "border-transparent bg-white/60 backdrop-blur-sm dark:bg-brand-950/40"
        }`}
      >
        <Logo />

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive =
              link.route && pathname?.startsWith(link.href);
            const className = `cursor-pointer rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "bg-brand-50 text-brand-700 dark:bg-brand-900/60 dark:text-brand-200"
                : "text-slate-700 hover:bg-slate-100 hover:text-brand-700 dark:text-slate-300 dark:hover:bg-brand-900/60 dark:hover:text-brand-200"
            }`;
            if (link.route) {
              return (
                <Link key={link.href} href={link.href} className={className}>
                  {link.label}
                </Link>
              );
            }
            return (
              <a key={link.href} href={link.href} className={className}>
                {link.label}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/samudithTharindaka/workshop_mgmt"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub repository"
            className="cursor-pointer hidden h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-100 hover:text-brand-600 dark:border-brand-900 dark:bg-brand-950 dark:text-slate-300 dark:hover:bg-brand-900 dark:hover:text-brand-200 sm:inline-flex"
          >
            <IconGithub className="h-4 w-4" />
          </a>
          <ThemeToggle />
          {onDocs ? (
            <Link
              href="/#cta"
              className="cursor-pointer hidden items-center gap-1.5 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition-all hover:bg-brand-700 hover:shadow-ring sm:inline-flex"
            >
              Get started
              <IconArrowRight className="h-4 w-4" />
            </Link>
          ) : (
            <Link
              href="/docs"
              className="cursor-pointer hidden items-center gap-1.5 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition-all hover:bg-brand-700 hover:shadow-ring sm:inline-flex"
            >
              <IconBook className="h-4 w-4" />
              Read the docs
            </Link>
          )}
          <button
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="cursor-pointer inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-100 dark:border-brand-900 dark:bg-brand-950 dark:text-slate-300 md:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            >
              {open ? (
                <path d="M6 6l12 12M6 18L18 6" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-x-4 top-20 z-40 rounded-2xl border border-slate-200 bg-white p-3 shadow-soft animate-fade-in dark:border-brand-900 dark:bg-brand-950 md:hidden">
          <div className="grid">
            {navLinks.map((link) => {
              const className =
                "cursor-pointer rounded-lg px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-brand-900";
              if (link.route) {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={className}
                  >
                    {link.label}
                  </Link>
                );
              }
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={className}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              );
            })}
            <Link
              href={onDocs ? "/#cta" : "/docs"}
              className="cursor-pointer mt-2 inline-flex items-center justify-center gap-1.5 rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white"
            >
              {onDocs ? "Get started" : "Read the docs"}
              <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

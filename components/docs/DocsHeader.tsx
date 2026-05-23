"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { IconArrowRight, IconGithub } from "@/components/Icons";

function IconArrowLeft({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M19 12H5M11 19l-7-7 7-7" />
    </svg>
  );
}

export function DocsHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors ${
        scrolled
          ? "border-slate-200 bg-white/85 backdrop-blur-md dark:border-brand-900/70 dark:bg-brand-950/80"
          : "border-transparent bg-white dark:bg-brand-950"
      }`}
    >
      <div className="mx-auto flex w-full items-center justify-between gap-3 px-5 py-3 md:px-8 lg:px-10 2xl:px-16">
        {/* Back button — prominent on the left */}
        <Link
          href="/"
          aria-label="Back to home"
          className="cursor-pointer group inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold text-slate-800 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 dark:border-brand-900 dark:bg-brand-950 dark:text-slate-200 dark:hover:border-brand-700 dark:hover:bg-brand-900/60 dark:hover:text-brand-200"
        >
          <IconArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to home</span>
        </Link>

        {/* Centre brand */}
        <div className="hidden items-center gap-2 sm:flex">
          <Logo />
          <span className="ml-1 hidden rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700 md:inline-block dark:bg-brand-900/40 dark:text-brand-200">
            Docs
          </span>
        </div>

        {/* Right controls */}
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
          <Link
            href="/#cta"
            className="cursor-pointer hidden items-center gap-1.5 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition-all hover:bg-brand-700 hover:shadow-ring sm:inline-flex"
          >
            Get started
            <IconArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}

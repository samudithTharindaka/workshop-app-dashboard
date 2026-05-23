import { DashboardPreview } from "./DashboardPreview";
import { IconArrowRight, IconBook, IconCheck, IconSparkles } from "./Icons";
import { Spotlight } from "./Spotlight";

const bullets = [
  "Appointment → Invoice in one screen",
  "Built on ERPNext, so accounting is free",
  "Light + dark mode, mobile-friendly",
];

const trustLogos = [
  "Frappe",
  "ERPNext",
  "Vue 3",
  "PrimeVue",
  "Tailwind CSS",
  "Vite",
  "Python",
  "REST API",
];

export function Hero() {
  return (
    <Spotlight className="relative isolate overflow-hidden">
      {/* Background layers — fill the entire hero (incl. top padding) */}
      <div className="absolute inset-0 -z-10 mesh-bg" />
      <div className="absolute inset-0 -z-10 bg-grid-light bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)] dark:bg-grid-dark" />

      {/* Floating orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-10 left-1/4 -z-10 h-72 w-72 rounded-full bg-brand-300/30 blur-3xl animate-float dark:bg-brand-700/30"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-10 top-20 -z-10 h-80 w-80 rounded-full bg-brand-200/40 blur-3xl animate-float-slow dark:bg-brand-800/30"
      />

      <section id="top" className="relative pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container-px mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="animate-fade-up lg:col-span-5">
              <a
                href="#features"
                className="cursor-pointer group inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/70 px-3 py-1 text-xs font-medium text-brand-700 backdrop-blur transition-all hover:bg-white hover:border-brand-400 dark:border-brand-800/70 dark:bg-brand-900/40 dark:text-brand-200 dark:hover:bg-brand-900/70"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-500 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-600" />
                </span>
                <IconSparkles className="h-3.5 w-3.5 transition-transform group-hover:rotate-90" />
                v0.0.1 · Built on Frappe + ERPNext
              </a>

              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl md:text-6xl dark:text-white">
                Run your garage{" "}
                <span className="gradient-text">without wrestling</span> with ERP forms.
              </h1>

              <p className="mt-5 max-w-xl text-base text-slate-600 sm:text-lg dark:text-slate-300">
                Workshop Management is a focused, real-time portal for service advisors,
                technicians, and managers. Book appointments, run inspections, work job cards,
                and invoice the customer — all from one screen.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href="https://github.com/samudithTharindaka/workshop_mgmt"
                  target="_blank"
                  rel="noreferrer"
                  className="cursor-pointer group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-soft transition-all hover:bg-brand-700 hover:shadow-ring"
                >
                  <span className="relative z-10">Get started on GitHub</span>
                  <IconArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  <span className="absolute inset-y-0 left-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-[250%]">
                    <span className="block h-full w-24" />
                  </span>
                </a>
                <a
                  href="#how-it-works"
                  className="cursor-pointer inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:bg-slate-50 dark:border-brand-800 dark:bg-brand-950 dark:text-slate-200 dark:hover:bg-brand-900"
                >
                  <IconBook className="h-4 w-4" />
                  See the user guide
                </a>
              </div>

              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
                {bullets.map((b, i) => (
                  <li
                    key={b}
                    style={{ animationDelay: `${300 + i * 90}ms` }}
                    className="animate-fade-up inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400"
                  >
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-50 text-brand-700 dark:bg-brand-900/60 dark:text-brand-300">
                      <IconCheck className="h-3 w-3" />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/*
              Right column: dashboard renders at full desktop width and is
              clipped on overflow. The right-edge fade mask makes the clip
              feel intentional and shows "more content available".
            */}
            <div className="animate-fade-up [animation-delay:120ms] lg:col-span-7">
              <div className="relative lg:[mask-image:linear-gradient(to_right,black_82%,transparent_100%)]">
                <div className="lg:overflow-hidden">
                  <div className="lg:w-[820px] xl:w-[920px]">
                    <DashboardPreview />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust marquee */}
          <div className="mt-16 border-t border-slate-200/70 pt-6 dark:border-brand-900/60">
            <div className="mb-3 text-center text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              Built with the platforms you trust
            </div>
            <div className="marquee-mask overflow-hidden">
              <div className="flex w-max gap-12 animate-marquee">
                {[...trustLogos, ...trustLogos].map((t, i) => (
                  <span
                    key={t + i}
                    className="shrink-0 text-base font-semibold tracking-tight text-slate-600/90 dark:text-slate-300/90"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Spotlight>
  );
}

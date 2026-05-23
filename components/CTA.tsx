import { IconArrowRight, IconBook, IconGithub } from "./Icons";
import { CodeBlock } from "./CodeBlock";
import { Reveal } from "./Reveal";

export function CTA() {
  return (
    <section id="cta" className="px-4 py-16 md:py-24">
      <Reveal>
        <div className="mx-auto max-w-6xl">
          <div className="gradient-border relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 p-1 shadow-ring">
            <div className="relative grid items-center gap-10 rounded-[1.4rem] bg-brand-700/95 p-8 md:grid-cols-2 md:p-12">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_20%_0%,rgba(255,255,255,0.18),transparent_60%),radial-gradient(50%_60%_at_90%_100%,rgba(255,255,255,0.12),transparent_60%)]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full bg-white/10 blur-3xl animate-float-slow"
              />

              <div className="relative text-white">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]">
                  <span className="live-dot" />
                  Ready to try it
                </div>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Ready to try it on your own bench?
                </h2>
                <p className="mt-4 max-w-md text-base text-brand-50/90">
                  Install in five minutes — works on any Frappe/ERPNext site. No card,
                  no trial gate, MIT licensed.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href="https://github.com/samudithTharindaka/workshop_mgmt"
                    target="_blank"
                    rel="noreferrer"
                    className="cursor-pointer group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-white px-5 py-3 text-sm font-semibold text-brand-700 transition-all hover:-translate-y-0.5 hover:bg-brand-50"
                  >
                    <span className="relative z-10 inline-flex items-center gap-2">
                      <IconGithub className="h-4 w-4" />
                      View on GitHub
                    </span>
                    <span className="absolute inset-y-0 left-0 -translate-x-full bg-gradient-to-r from-transparent via-brand-200/60 to-transparent transition-transform duration-700 group-hover:translate-x-[250%]">
                      <span className="block h-full w-24" />
                    </span>
                  </a>
                  <a
                    href="#features"
                    className="cursor-pointer inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white/15"
                  >
                    <IconBook className="h-4 w-4" />
                    Read the docs
                    <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </div>
              </div>

              <div className="relative">
                <CodeBlock
                  lines={[
                    "bench get-app https://github.com/samudithTharindaka/workshop_mgmt.git",
                    "bench --site <your-site> install-app workshop_mgmt",
                    "bench --site <your-site> migrate",
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

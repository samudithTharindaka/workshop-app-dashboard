import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";

const items = [
  { title: "Mobile app integration", status: "Planning" },
  { title: "SMS / Email notifications", status: "In design" },
  { title: "Customer self-service portal", status: "In design" },
  { title: "Online appointment booking", status: "Planning" },
  { title: "Loyalty program", status: "Idea" },
  { title: "Multi-location support", status: "Idea" },
  { title: "Advanced analytics", status: "Idea" },
  { title: "WhatsApp integration", status: "Idea" },
];

const toneFor = (s: string) =>
  s === "In design"
    ? "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300"
    : s === "Planning"
    ? "bg-sky-100 text-sky-800 dark:bg-sky-500/15 dark:text-sky-300"
    : "bg-slate-100 text-slate-700 dark:bg-brand-900/60 dark:text-slate-300";

export function Roadmap() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-px mx-auto max-w-6xl">
        <Reveal>
          <SectionHeader
            eyebrow="Roadmap"
            title="Where Workshop Management is heading."
            description="Shipped weekly, prioritised by what real workshops ask for first."
          />
        </Reveal>

        <div className="relative mt-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-5 hidden w-px bg-gradient-to-b from-brand-200 via-brand-400 to-transparent dark:from-brand-800 dark:via-brand-600 md:block"
          />
          <ul className="grid gap-3 md:pl-12">
            {items.map((i, idx) => (
              <Reveal key={i.title} as="li" delay={idx * 70}>
                <div className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:border-brand-300 hover:shadow-soft hover:translate-x-0.5 dark:border-brand-900/60 dark:bg-brand-950/60 dark:hover:border-brand-700">
                  <span className="absolute -left-12 hidden h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-xs font-bold text-brand-700 shadow-soft transition-all group-hover:scale-110 group-hover:border-brand-300 group-hover:text-brand-600 md:inline-flex dark:border-brand-900 dark:bg-brand-950 dark:text-brand-300">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-700 md:hidden dark:bg-brand-900/60 dark:text-brand-300">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">
                    {i.title}
                  </div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-semibold transition-transform group-hover:scale-105 ${toneFor(
                      i.status,
                    )}`}
                  >
                    {i.status}
                  </span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

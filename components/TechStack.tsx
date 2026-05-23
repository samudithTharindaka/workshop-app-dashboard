import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";

const stack = [
  { name: "Frappe", note: ">= 14.0.0" },
  { name: "ERPNext", note: ">= 14.0.0" },
  { name: "Vue 3", note: "+ Vue Router 4" },
  { name: "Vite 5", note: "Fast builds" },
  { name: "PrimeVue 4", note: "Unstyled mode" },
  { name: "Tailwind CSS 3", note: "Utility-first" },
  { name: "Python", note: ">= 3.10" },
  { name: "REST API", note: "Frappe-native" },
];

export function TechStack() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-px mx-auto max-w-6xl">
        <Reveal>
          <SectionHeader
            eyebrow="Tech stack"
            title="Standing on the right shoulders."
            description="Open, proven, and easy to extend. No bespoke runtime, no surprise lock-in."
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-4">
          {stack.map((s, i) => (
            <Reveal key={s.name} delay={i * 60}>
              <div className="group h-full rounded-2xl border border-slate-200 bg-white p-4 text-center transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-soft dark:border-brand-900/60 dark:bg-brand-950/60 dark:hover:border-brand-700">
                <div className="text-base font-semibold tracking-tight text-slate-900 transition-colors group-hover:text-brand-700 dark:text-white dark:group-hover:text-brand-200">
                  {s.name}
                </div>
                <div className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                  {s.note}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import { IconBolt, IconLayers, IconShield, IconUsers } from "./Icons";
import { Reveal } from "./Reveal";

const props = [
  {
    icon: IconLayers,
    title: "One portal for the full lifecycle",
    body: "Appointment → check-in → inspection → job card → quotation → invoice. No tab-switching, no Desk gymnastics.",
  },
  {
    icon: IconShield,
    title: "Built on ERPNext, so accounting is free",
    body: "Stock movements, taxes, invoicing, and GL — handled by the platform the world trusts.",
  },
  {
    icon: IconUsers,
    title: "Made for the floor",
    body: "Kanban with drag-to-status, checklist editor with OK/Report quick buttons, dark mode, mobile-friendly.",
  },
  {
    icon: IconBolt,
    title: "Real workflows, not just statuses",
    body: "A 10-state Job Card workflow with role-based transitions ships out of the box.",
  },
];

export function ValueProps() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-px mx-auto max-w-6xl">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {props.map(({ icon: Icon, title, body }, i) => (
            <Reveal key={title} delay={i * 90}>
              <div className="group tilt h-full rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-brand-300 hover:shadow-soft dark:border-brand-900/60 dark:bg-brand-950/60 dark:hover:border-brand-700">
                <div className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-600 group-hover:text-white dark:bg-brand-900/60 dark:text-brand-300">
                  <Icon className="h-5 w-5 transition-transform group-hover:scale-110" />
                  <span className="absolute inset-0 rounded-xl bg-brand-500/20 opacity-0 blur-md transition-opacity group-hover:opacity-100" />
                </div>
                <h3 className="mt-4 text-base font-semibold tracking-tight text-slate-900 dark:text-white">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

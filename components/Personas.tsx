import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";

const personas = [
  {
    role: "Service advisor",
    sub: "Front desk",
    desc: "Books appointments, takes the keys, talks to customers, hands off to technicians.",
    uses: ["Appointments", "Customer & vehicle creation", "Job hand-off"],
  },
  {
    role: "Technician",
    sub: "Shop floor",
    desc: "Runs inspections, updates job cards, and advances the workflow.",
    uses: ["Inspection checklist", "Job card kanban", "Workflow transitions"],
  },
  {
    role: "Workshop manager",
    sub: "Operations",
    desc: "Watches the floor on the kanban, approves estimates, runs the billing queue, reads reports.",
    uses: ["Real-time KPIs", "Kanban overview", "Daily revenue reports"],
  },
  {
    role: "Back office",
    sub: "Admin",
    desc: "Manages customers, items and accounting in Desk; uses the portal for cross-checks.",
    uses: ["ERPNext Desk", "Permissions & fixtures", "Invoice reconciliation"],
  },
];

export function Personas() {
  return (
    <section id="personas" className="py-16 md:py-24">
      <div className="container-px mx-auto max-w-6xl">
        <Reveal>
          <SectionHeader
            eyebrow="Who it's for"
            title="One portal, four roles, zero confusion."
            description="Each person sees what they need — and only what they need."
          />
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {personas.map((p, i) => (
            <Reveal key={p.role} delay={i * 100}>
              <div className="group tilt relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-brand-300 hover:shadow-soft dark:border-brand-900/60 dark:bg-brand-950/60 dark:hover:border-brand-700">
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand-100/60 transition-transform duration-500 group-hover:scale-150 dark:bg-brand-900/40" />
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-brand-100/40 transition-transform duration-700 group-hover:scale-125 dark:bg-brand-900/20" />
                <div className="relative">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700 dark:text-brand-300">
                    {p.sub}
                  </div>
                  <h3 className="mt-1 text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
                    {p.role}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {p.desc}
                  </p>
                  <ul className="mt-4 space-y-1.5 border-t border-slate-200 pt-3 dark:border-brand-900/60">
                    {p.uses.map((u) => (
                      <li
                        key={u}
                        className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-500 transition-transform group-hover:scale-150" />
                        {u}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

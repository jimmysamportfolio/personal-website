import { PageLoadCascade } from "@/components/layout/PageLoadCascade";

const experience = [
  {
    company: "Cedar AI Agents",
    role: "Founding Engineer",
    period: "2026 - Present",
    details: ["Building voice AI agents."],
  },
  {
    company: "Advizr",
    role: "Software Engineer",
    period: "2025",
    details: [
      "Built a hybrid RAG pipeline for 100+ leases, saving 5-10 hours of manual checking each week.",
      "Built a data pipeline for 10,000+ clinics across Canada.",
    ],
  },
];

export default function ResumePage() {
  return (
    <main>
      <PageLoadCascade>
        <article className="mx-auto max-w-3xl pb-12 pt-4 text-[15px] leading-relaxed sm:text-base">
          <header className="border-b-2 border-foreground pb-5 text-center">
            <h1 className="text-4xl font-semibold tracking-tight">Jimmy Sam</h1>
            <p className="mt-1 text-muted-foreground">
              Founding Engineer at Cedar AI Agents
            </p>
          </header>

          <section className="pt-7">
            <h2 className="border-b border-foreground pb-1 text-lg font-semibold uppercase tracking-wide">
              Experience
            </h2>
            <div className="space-y-6 pt-4">
              {experience.map((item) => (
                <div key={`${item.company}-${item.role}`}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 font-semibold">
                    <h3>{item.company}</h3>
                    <p className="text-sm font-normal text-muted-foreground">{item.period}</p>
                  </div>
                  <p className="italic">{item.role}</p>
                  <ul className="mt-1 list-disc space-y-1 pl-5">
                    {item.details.map((detail) => <li key={detail}>{detail}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </article>
      </PageLoadCascade>
    </main>
  );
}

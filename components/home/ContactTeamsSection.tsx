import { ArrowUpRight } from "lucide-react";

const contacts = [
  { label: "GitHub", href: "https://github.com/jimmysamportfolio" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jimmy-sam-13b7b8297/" },
  { label: "Email", href: "mailto:jimmygsam@gmail.com" },
  { label: "X", href: "https://x.com/__JimmySam__" },
];

const experience = [
  {
    company: "Cedar AI Agents",
    title: "Founding Engineer",
    period: "2026 - Present",
    href: "https://www.getcedar.ai/",
  },
  {
    company: "Advizr",
    title: "Software Engineer",
    period: "2025",
    href: "https://advizr.ca/",
  },
];

export default function ContactTeamsSection() {
  return (
    <section className="grid gap-10 py-6 sm:grid-cols-[0.8fr_1.2fr] sm:gap-16">
      <div>
        <h2 className="mb-5 text-xl font-semibold">Contact</h2>
        <ul className="flex flex-wrap gap-x-4 gap-y-3 text-base sm:text-lg">
          {contacts.map((contact) => (
            <li key={contact.label}>
              <a
                className="inline-flex items-center gap-0.5 hover:opacity-70 transition-opacity"
                href={contact.href}
                target={contact.href.startsWith("http") ? "_blank" : undefined}
              >
                {contact.label}
                <ArrowUpRight size={12} />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="mb-5 text-xl font-semibold">Experience</h2>
        <div className="space-y-5">
          {experience.map((item) => (
            <a key={item.company} className="group block" href={item.href} target="_blank">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-base sm:text-lg">
                <h3 className="font-medium group-hover:text-muted-foreground">{item.title}, {item.company}</h3>
                <span className="text-sm text-muted-foreground">{item.period}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

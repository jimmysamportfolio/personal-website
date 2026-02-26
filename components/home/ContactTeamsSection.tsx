"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const contactLinks = [
  { label: "GitHub", href: "https://github.com/jimmysamportfolio" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jimmy-sam-13b7b8297/" },
  { label: "Email", href: "mailto:jimmygsam@gmail.com" },
  { label: "X", href: "https://x.com/__JimmySam__"}
];

const experience = [
  {
    company: "Advizr",
    title: "Software Engineer",
    description: "Shipping agentic AI and RAG products to small businesses.",
    website: "https://advizr.ca/",
    period: "2025 - Present",
    colors: "bg-[#3b3b3b]",
  },
  {
    company: "Pit Stop Portables",
    title: "Technical Operations",
    description: "Managed technical operations and logistics systems.",
    website: "https://www.pitstopportables.com/",
    period: "2025",
    colors: "bg-[#2a7dd6]",
  },
];

const leadership = [
  {
    company: "UBC BizTech",
    title: "Partnerships Director",
    description: "Secured 40+ partners and $10k+ in sponsorships for flagship events.",
    website: "https://www.ubcbiztech.com/",
    period: "2025 - Present",
    colors: "bg-[#6c5ce7]",
  },
];

export default function ContactTeamsSection() {
  return (
    <div className="w-full space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center mb-2">
            <h2 className="text-sm font-medium">Contact</h2>
          </div>
          <div className="flex items-center gap-4">
            {contactLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target="_blank"
                className="flex items-center gap-0.5 group hover:text-muted-foreground text-sm"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full border-t border-dashed border-muted-foreground/20" />

      <div>
        <div className="flex items-center mb-3">
          <h2 className="text-sm font-medium">Experience</h2>
        </div>
        <div className="space-y-3">
          {experience.map((exp) => (
            <a
              key={exp.company}
              href={exp.website}
              target="_blank"
              className="block text-sm group"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-1.5 h-1.5 mt-0.5 shrink-0 aspect-square ${exp.colors} group-hover:opacity-80`}
                  />
                  <span className="group-hover:text-muted-foreground font-medium">{exp.title}</span>
                  <span className="text-muted-foreground">&middot;</span>
                  <span className="group-hover:text-muted-foreground">
                    {exp.company}
                  </span>
                </div>
                <span className="group-hover:text-muted-foreground shrink-0">{exp.period}</span>
              </div>
              <p className="ml-[22px] -mt-0.5 text-xs text-muted-foreground leading-snug">{exp.description}</p>
            </a>
          ))}
        </div>
      </div>

      <div className="w-full border-t border-dashed border-muted-foreground/20" />

      <div>
        <div className="flex items-center mb-3">
          <h2 className="text-sm font-medium">Leadership</h2>
        </div>
        <div className="space-y-3">
          {leadership.map((item) => (
            <a
              key={item.company}
              href={item.website}
              target="_blank"
              className="block text-sm group"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-1.5 h-1.5 mt-0.5 shrink-0 aspect-square ${item.colors} group-hover:opacity-80`}
                  />
                  <span className="group-hover:text-muted-foreground font-medium">{item.title}</span>
                  <span className="text-muted-foreground">&middot;</span>
                  <span className="group-hover:text-muted-foreground">
                    {item.company}
                  </span>
                </div>
                <span className="group-hover:text-muted-foreground shrink-0">{item.period}</span>
              </div>
              <p className="ml-[22px] -mt-0.5 text-xs text-muted-foreground leading-snug">{item.description}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

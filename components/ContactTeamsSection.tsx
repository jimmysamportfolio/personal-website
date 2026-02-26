"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const contactLinks = [
  { label: "GitHub", href: "https://github.com/jimmysamportfolio" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jimmy-sam-13b7b8297/" },
  { label: "Email", href: "mailto:jimmygsam@gmail.com" },
];

const experience = [
  {
    company: "Advizr",
    website: "https://advizr.ca/",
    period: "2025 -",
    colors: "bg-[#3b3b3b]",
  },
  {
    company: "Pit Stop Portables",
    website: "https://www.pitstopportables.com/",
    period: "2025",
    colors: "bg-[#2a7dd6]",
  },
];

const leadership = [
  {
    company: "UBC BizTech",
    role: "Partnerships Director",
    website: "https://www.ubcbiztech.com/",
    period: "2025 -",
    colors: "bg-[#6c5ce7]",
  },
];

export default function ContactTeamsSection() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <div className="flex items-center mb-2">
            <h2 className="text-sm font-medium">Contact</h2>
          </div>
          <div className="-space-y-0.5">
            {contactLinks.map((link, index) => (
              <Link
                key={link.label}
                href={link.href}
                target="_blank"
                className="flex items-center justify-between group hover:text-muted-foreground text-sm"
              >
                <span className="flex flex-row items-start justify-start gap-0.5">
                  <span className="text-muted-foreground text-[8px] w-2 text-center -mt-0.5">
                    {index + 1}
                  </span>
                  <span>{link.label}</span>
                </span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center mb-2">
            <h2 className="text-sm font-medium">Experience</h2>
          </div>
          <div className="-space-y-0.5">
            {experience.map((exp) => (
              <a
                key={exp.company}
                href={exp.website}
                target="_blank"
                className="flex items-start justify-between gap-2 text-sm group"
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-1.5 h-1.5 mt-0.5 aspect-square ${exp.colors} group-hover:opacity-80`}
                  />
                  <span className="group-hover:text-muted-foreground">
                    {exp.company}
                  </span>
                </div>
                <span className="group-hover:text-muted-foreground">{exp.period}</span>
              </a>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center mb-2">
            <h2 className="text-sm font-medium">Leadership</h2>
          </div>
          <div className="-space-y-0.5">
            {leadership.map((item) => (
              <a
                key={item.company}
                href={item.website}
                target="_blank"
                className="flex items-start justify-between gap-2 text-sm group"
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-1.5 h-1.5 mt-0.5 aspect-square ${item.colors} group-hover:opacity-80`}
                  />
                  <span className="group-hover:text-muted-foreground">
                    {item.company}
                  </span>
                </div>
                <span className="group-hover:text-muted-foreground">{item.period}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

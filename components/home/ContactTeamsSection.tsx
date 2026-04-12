"use client";


const experience = [
  {
    company: "Cedar AI Agents",
    title: "Founding Engineer",
    description: [
      "Building with voice AI agents. Currently in stealth.",
    ],
    website: "https://www.getcedar.ai/",
    period: "2026 - Present",
    colors: "bg-[#2d6a4f]",
  },
  {
    company: "Advizr",
    title: "Software Engineer",
    description: [
      "Built a hybrid RAG pipeline for 100+ leases, saving 5-10 hours per week of manual checking.",
      "Built a specialized jane app scraping pipeline for 10,000+ clinics scaled Canada-wide.",
    ],
    website: "https://advizr.ca/",
    period: "2025",
    colors: "bg-[#3b3b3b]",
  },
];

const leadership = [
  {
    company: "UBC BizTech",
    title: "Partnerships Co-Lead",
    description: [
      "Leading BizTech's partnerships team that serves over 900 members.",
    ],
    website: "https://www.ubcbiztech.com/",
    period: "2026 - Present",
    colors: "bg-[#6c5ce7]",
  },
  {
    company: "UBC BizTech",
    title: "Partnerships Director",
    description: [
      "Secured 40+ partners and $10k+ in sponsorships for flagship events.",
      "Got us a live interview on global news."
    ],
    website: "https://www.ubcbiztech.com/",
    period: "2025",
    colors: "bg-[#6c5ce7]",
  },
];

const education = [
  {
    school: "UBC",
    degree: "CS + Business",
    description: "GPA: 4.31/4.33 (Ranked 4/794 in class), Presidential Scholar ($60,000).",
    website: "https://www.sauder.ubc.ca/",
    period: "2024 - 2028",
    colors: "bg-[#002145]",
  },
];

export default function ContactTeamsSection() {
  return (
    <div className="w-full space-y-4">

      {/*Education*/}

      <div>
        <div className="flex items-center mb-3">
          <h2 className="text-sm font-medium">education</h2>
        </div>
        <div className="space-y-3">
          {education.map((item) => (
            <a
              key={item.school}
              href={item.website}
              target="_blank"
              className="block text-sm group"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-1.5 h-1.5 mt-0.5 shrink-0 aspect-square ${item.colors} group-hover:opacity-80`}
                  />
                  <span className="group-hover:text-muted-foreground font-medium">{item.degree}</span>
                  <span className="text-muted-foreground">&middot;</span>
                  <span className="group-hover:text-muted-foreground">
                    {item.school}
                  </span>
                </div>
                <span className="group-hover:text-muted-foreground shrink-0">{item.period}</span>
              </div>
              <p className="ml-[22px] -mt-0.5 text-xs text-muted-foreground leading-snug">{item.description}</p>
            </a>
          ))}
        </div>
      </div>

      {/*Experience*/}
      <div className="w-full border-t border-dashed border-muted-foreground/20" />

      <div>
        <div className="flex items-center mb-3">
          <h2 className="text-sm font-medium">experience</h2>
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
              <div className="ml-[22px] -mt-0.5 text-xs text-muted-foreground leading-snug">
                {Array.isArray(exp.description)
                  ? exp.description.map((line, i) => <p key={i}>{line}</p>)
                  : <p>{exp.description}</p>}
              </div>
            </a>
          ))}
        </div>
      </div>

      {/*Leadership*/}
      <div className="w-full border-t border-dashed border-muted-foreground/20" />

      <div>
        <div className="flex items-center mb-3">
          <h2 className="text-sm font-medium">leadership</h2>
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
              <div className="ml-[22px] -mt-0.5 text-xs text-muted-foreground leading-snug">
                {Array.isArray(item.description)
                  ? item.description.map((line, i) => <p key={i}>{line}</p>)
                  : <p>{item.description}</p>}
              </div>
            </a>
          ))}
        </div>
      </div>

      
    </div>
  );
}

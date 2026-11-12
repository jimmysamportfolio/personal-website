import type { StaticImageData } from "next/image";
import type { ReactNode } from "react";
import advizrAnalytics from "./projects/advizr/portfolio-analytics.jpg";
import advizrClauses from "./projects/advizr/clause-comparison.jpg";
import advizrIngestion from "./projects/advizr/document-ingestion-end.jpg";
import blueprintAudience from "./projects/blueprint/audience.jpg";
import blueprintBooth from "./projects/blueprint/booth.jpg";
import blueprintKeynote from "./projects/blueprint/keynote.jpg";
import kickstartFinalists from "./projects/kickstart/finalists.jpg";
import kickstartFireside from "./projects/kickstart/fireside.jpg";
import kickstartWorkshop from "./projects/kickstart/workshop.jpg";
import nexusDashboard from "./projects/nexus/dashboard.jpg";
import nexusLanding from "./projects/nexus/landing.jpg";
import prdSpeaking from "./projects/prd/speaking.jpg";
import prdSprint from "./projects/prd/productsprint.jpg";

export type Block =
  | { kind: "figure"; image: StaticImageData; alt: string; caption: string; wide?: boolean }
  | { kind: "text"; body: ReactNode };

export type Project = {
  slug: string;
  title: string;
  kicker: string;
  dek: string;
  facts: [string, string][];
  links: { label: string; href: string }[];
  blocks: Block[];
};

export const PROJECTS: Project[] = [
  {
    slug: "advizr",
    title: "Advizr",
    kicker: "Work · 2025",
    dek: "A secure chatbot for a commercial real estate client, built on a RAG pipeline over 100+ leases.",
    facts: [["Role", "Forward deployed engineer"], ["Client", "Commercial real estate"], ["Stack", "Python, Pinecone, Gemini"]],
    links: [{ label: "advizr.ca", href: "https://advizr.ca/" }],
    blocks: [
      { kind: "figure", image: advizrAnalytics, alt: "Portfolio analytics view with lease metrics and a sortable table of leases", caption: "Portfolio analytics. Client data is redacted.", wide: true },
      {
        kind: "text",
        body: (
          <>
            <p>At Advizr I was a forward deployed engineer. I built a secure chatbot for a commercial real estate company with more than 100 leases, backed by a RAG pipeline over every lease. The code belongs to the client, so this page covers the design.</p>
            <p>It had to do three things: answer a specific question (&ldquo;What&apos;s the holdover rate for Starbucks?&rdquo;), compare a clause across leases, and add up numbers across the whole portfolio. Each lease runs about 25,000 words, and a wrong answer on a legal document costs more than a slow one, so accuracy came first.</p>
            <h2>Ingestion</h2>
            <p>Leases are split by article and section instead of fixed token windows, and tiny leftover chunks are merged into the next one. Then each lease takes two paths. Enriched chunks are embedded with Gemini and stored in Pinecone. Key deal terms (rent, dates, parties, renewal options) are pulled into a typed schema and stored in SQLite.</p>
          </>
        ),
      },
      { kind: "figure", image: advizrIngestion, alt: "Diagram of the two ingestion paths", caption: "Two paths at ingestion: deal terms to SQLite, enriched chunks to Pinecone." },
      {
        kind: "text",
        body: (
          <>
            <h2>Answering</h2>
            <p>A router reads each question and picks a path. Document questions get vector search, reranking down to the best 10 passages, and an answer with sources and a confidence score. Portfolio questions become tool calls against SQLite.</p>
            <p>I checked the embedding model with a small recall test built from question and answer pairs the client gave us.</p>
          </>
        ),
      },
      { kind: "figure", image: advizrClauses, alt: "Clause comparison table across selected leases", caption: "Clause comparison across selected leases." },
    ],
  },
  {
    slug: "nexus",
    title: "Nexus",
    kicker: "Side quest · January 2026",
    dek: "Agents that run a team's sheets, Slack, and docs from one chat.",
    facts: [["Role", "Full-stack engineer"], ["Event", "nwHacks 2026"], ["Result", "Won"]],
    links: [
      { label: "nexusapp.tech", href: "https://nexusapp.tech" },
      { label: "GitHub", href: "https://github.com/DanielTong50/nexus" },
    ],
    blocks: [
      { kind: "figure", image: nexusLanding, alt: "The Nexus landing page", caption: "The Nexus landing page.", wide: true },
      {
        kind: "text",
        body: (
          <>
            <p>Running a big event means work spread across spreadsheets, Slack channels, Notion pages, and GitHub repos, all kept up to date by hand. We had lived that as event organizers, so we built the tool we wanted.</p>
            <p>Nexus plugs into the tools a team already uses and maps out each person&apos;s role. You tell it what happened, and it does the follow-up. A partnerships lead can say they just met a new partner, and Nexus updates the sheet, posts in Slack, and drafts the agreement as a Word doc.</p>
          </>
        ),
      },
      { kind: "figure", image: nexusDashboard, alt: "The Nexus dashboard", caption: "Each role mapped to its own agent workflow." },
      {
        kind: "text",
        body: (
          <>
            <h2>How it works</h2>
            <p>A multi-step agent flow reads each request, breaks it into tasks, and hands them to one agent per role. The agents call Gemini, ChatGPT, and Vultr serverless inference, keep state in MongoDB, and act through Slack, Sheets, Word, Notion, and GitHub. The frontend is Next.js and Tailwind.</p>
            <p>We won nwHacks 2026, and Nexus is live at <a href="https://nexusapp.tech">nexusapp.tech</a>.</p>
          </>
        ),
      },
    ],
  },
  {
    slug: "blueprint",
    title: "BluePrint",
    kicker: "Side quest · January 2026",
    dek: "Partnerships for a 200-person tech conference in Vancouver.",
    facts: [["Role", "Partnerships director"], ["Date", "January 24, 2026"], ["Press", "Live on Global News"]],
    links: [{ label: "Watch on Global News", href: "https://globalnews.ca/video/11648924/ubc-biztechs-2026-blueprint-conference" }],
    blocks: [
      { kind: "figure", image: blueprintKeynote, alt: "Rahul Rao giving the keynote on stage", caption: "Rahul Rao's keynote.", wide: true },
      {
        kind: "text",
        body: (
          <>
            <p>BluePrint brought more than 200 people downtown for a day of talks, workshops, coffee chats, and partner booths, all built to make tech easier to break into.</p>
            <p>I ran partnerships. On my own, I brought in 7 partner booths, the keynote, a product demo from Internet Backyard, and $3k in sponsorship. I also got us a live segment on Global News.</p>
          </>
        ),
      },
      { kind: "figure", image: blueprintAudience, alt: "The audience at BluePrint", caption: "More than 200 attendees." },
      {
        kind: "text",
        body: (
          <>
            <h2>What it added up to</h2>
            <ul>
              <li>A live segment on Global News</li>
              <li>30 partner booths</li>
              <li>$3k in sponsorship</li>
              <li>200+ attendees</li>
            </ul>
            <p>It took eight months of planning with a team that went all in.</p>
          </>
        ),
      },
      { kind: "figure", image: blueprintBooth, alt: "Partner booths at BluePrint", caption: "Partner booths." },
    ],
  },
  {
    slug: "kickstart",
    title: "KickStart",
    kicker: "Side quest · October 2025",
    dek: "A week-long startup competition with 40+ partners and an a16z fireside chat.",
    facts: [["Role", "Partnerships director"], ["Date", "October 2025"], ["Partners", "40+"]],
    links: [],
    blocks: [
      { kind: "figure", image: kickstartFireside, alt: "Olivia Moore of a16z in the fireside chat", caption: "Olivia Moore, a partner at a16z, in the fireside chat.", wide: true },
      {
        kind: "text",
        body: (
          <>
            <p>KickStart is a week where teams go from strangers to co-founders, and from a pitch deck to their first customers. I led partnerships.</p>
            <p>Fetch.ai was the presenting sponsor and Andreessen Horowitz (a16z) the keynote partner, with support from Fidelity&apos;s Investly, vidIQ, and Launch Academy. Olivia Moore, a partner at a16z, sat down for a fireside chat, and Fetch.ai ran a hands-on workshop.</p>
          </>
        ),
      },
      { kind: "figure", image: kickstartWorkshop, alt: "Fetch.ai running a workshop", caption: "Fetch.ai's workshop." },
      { kind: "text", body: <p>Fourteen judges, from YC founders to seed investors, and nine industry mentors worked with the teams. Judges asked when they could invest.</p> },
      { kind: "figure", image: kickstartFinalists, alt: "The KickStart finalists on stage", caption: "The finalists on stage." },
    ],
  },
  {
    slug: "prd",
    title: "PRD+",
    kicker: "Side quest · 2025",
    dek: "A Chrome extension that helps product teams write specs and agree on them.",
    facts: [["Event", "TELUS product sprint"], ["Result", "1st of 20 teams"], ["Built", "Figma prototype and pitch"]],
    links: [
      { label: "Figma prototype", href: "https://www.figma.com/proto/3qY3c5FyRSYmdIhgryyZvm/PMC?node-id=15-685&t=FVF6rxmJWlF6Kwy6-1&starting-point-node-id=15%3A685" },
      { label: "GitHub", href: "https://github.com/jimmysamportfolio/PRD-Plus" },
    ],
    blocks: [
      { kind: "figure", image: prdSprint, alt: "The team holding the first place award", caption: "First place at the TELUS product sprint." },
      {
        kind: "text",
        body: (
          <>
            <p>My first real tech project was a product one. In a product sprint run with TELUS, our team designed PRD+, a Chrome extension that helps TELUS product teams write requirements and get everyone aligned on them.</p>
            <p>We built a Figma prototype and a pitch, and placed first out of 20 teams.</p>
            <p>It taught me that good products start with asking why.</p>
          </>
        ),
      },
      { kind: "figure", image: prdSpeaking, alt: "Presenting at the product sprint", caption: "Presenting at the sprint." },
    ],
  },
];

export function getProject(slug: string) {
  return PROJECTS.find((p) => p.slug === slug);
}

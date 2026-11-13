import Link from "next/link";
import { Clouds } from "@/components/Clouds";
import { EmailPill } from "@/components/EmailPill";
import { ExternalArrow, NextArrow } from "@/components/icons";
import { Peek } from "@/components/Peek";
import { POST_SLUG, POST_TITLE } from "@/content/posts";
import "./home.css";

type Row = { name: string; by?: string; meta: string; desc?: string; href: string; peek: string; external?: boolean };

const WORK: Row[] = [
  { name: "Cedar", by: "backed by a16z", meta: "2026 - now", desc: "Building AI agents that help exceptional teams hire through their network.", href: "https://www.getcedar.ai/", peek: "cedar", external: true },
  { name: "Advizr", meta: "2025", desc: "Forward deployed engineer. Built a secure chatbot for a commercial real estate client.", href: "/project/advizr", peek: "advizr" },
];

const SIDE_QUESTS: Row[] = [
  { name: "Nexus", meta: "Won nwHacks", desc: "Agents that run a team's sheets, Slack, and docs from one chat.", href: "/project/nexus", peek: "nexus" },
  { name: "BluePrint", meta: "2026", desc: "Ran partnerships for a 200-person tech conference. Got it on Global News.", href: "/project/blueprint", peek: "blueprint" },
  { name: "KickStart", meta: "2025", desc: "Brought in 40+ partners and an a16z fireside chat for a startup competition.", href: "/project/kickstart", peek: "kickstart" },
  { name: "PRD+", meta: "1st of 20", desc: "Chrome extension for writing product specs, built for TELUS.", href: "/project/prd", peek: "prd" },
];

const WRITING: Row[] = [{ name: POST_TITLE, meta: "Nov 2026", href: `/writing/${POST_SLUG}`, peek: "factory" }];

const LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jimmy-sam-13b7b8297/" },
  { label: "GitHub", href: "https://github.com/jimmysamportfolio" },
  { label: "X", href: "https://x.com/__JimmySam__" },
];

function Section({ id, title, rows, i }: { id: string; title: string; rows: Row[]; i: number }) {
  return (
    <section className="sec rise" style={{ "--i": i } as React.CSSProperties} aria-labelledby={id}>
      <h2 className="eyebrow" id={id}>{title}</h2>
      <ul className="items">
        {rows.map((r) => {
          const inner = (
            <>
              <span className="n">
                {r.name}
                {r.by && <span className="by">{r.by}</span>}
                {r.external ? <ExternalArrow /> : <NextArrow />}
              </span>
              <span className="m">{r.meta}</span>
              {r.desc && <span className="d">{r.desc}</span>}
            </>
          );
          return (
            <li className="item" key={r.name}>
              {r.external ? (
                <a href={r.href} data-peek={r.peek}>{inner}</a>
              ) : (
                <Link href={r.href} data-peek={r.peek}>{inner}</Link>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Clouds top={1} bottom={1} side={0.26} />
      <main className="home" data-column>
        <header>
          <h1 className="rise" style={{ "--i": 0 } as React.CSSProperties}>Jimmy Sam</h1>
          <div className="intro">
            <p className="rise" style={{ "--i": 1 } as React.CSSProperties}>
              I&apos;m a founding engineer at <b>Cedar</b>, backed by a16z. We build AI agents that help exceptional teams hire through the people they already trust.
            </p>
            <p className="rise" style={{ "--i": 2 } as React.CSSProperties}>
              My job is to make bets, ship them fast, and keep what works. I&nbsp;get to do it with some of the fastest-growing companies in the world, alongside people I love building with.
            </p>
          </div>
          <ul className="pills rise" style={{ "--i": 3 } as React.CSSProperties}>
            <li><EmailPill address="jimmygsam@gmail.com" /></li>
            {LINKS.map((l) => (
              <li key={l.label}><a href={l.href}>{l.label}<ExternalArrow /></a></li>
            ))}
          </ul>
        </header>
        <Section id="work" title="Work" rows={WORK} i={4} />
        <Section id="side" title="Side quests" rows={SIDE_QUESTS} i={5} />
        <Section id="writing" title="Writing" rows={WRITING} i={6} />
      </main>
      <Peek />
    </>
  );
}

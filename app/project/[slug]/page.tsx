import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clouds } from "@/components/Clouds";
import { BackArrow, BigArrow, ExternalArrow } from "@/components/icons";
import { PROJECTS, getProject } from "@/content/projects";
import "../project.css";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  const cover = p.blocks.find((b) => b.kind === "figure")?.image.src ?? "/og.png";
  return {
    title: p.title,
    description: p.dek,
    alternates: { canonical: `/project/${p.slug}` },
    openGraph: { title: `${p.title} · Jimmy Sam`, description: p.dek, url: `/project/${p.slug}`, images: [cover] },
    twitter: { card: "summary_large_image", title: `${p.title} · Jimmy Sam`, description: p.dek, images: [cover] },
  };
}

const style = (i: number) => ({ "--i": i }) as React.CSSProperties;

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const next = PROJECTS[(PROJECTS.indexOf(p) + 1) % PROJECTS.length];

  return (
    <>
      <Clouds top={0.7} bottom={0.75} side={0.18} />
      <main className="proj" data-column>
        <Link className="back rise" style={style(0)} href="/"><BackArrow />Jimmy Sam</Link>
        <p className="kicker rise" style={style(1)}>{p.kicker}</p>
        <h1 className="rise" style={style(2)}>{p.title}</h1>
        <p className="dek rise" style={style(3)}>{p.dek}</p>
        <dl className="facts rise" style={style(4)}>
          {p.facts.map(([k, v]) => (
            <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
          ))}
        </dl>
        {p.links.length > 0 && (
          <ul className="pills rise" style={style(5)}>
            {p.links.map((l) => (
              <li key={l.href}><a href={l.href}>{l.label}<ExternalArrow /></a></li>
            ))}
          </ul>
        )}
        {p.blocks.map((b, i) =>
          b.kind === "figure" ? (
            <figure key={i} className={b.wide ? "shot reveal wide" : "shot reveal"}>
              <div className="img">
                <Image src={b.image} alt={b.alt} placeholder="blur" sizes={b.wide ? "(max-width: 900px) 100vw, 808px" : "(max-width: 760px) 100vw, 712px"} priority={i === 0} />
              </div>
              <figcaption>{b.caption}</figcaption>
            </figure>
          ) : (
            <div key={i} className="body reveal">{b.body}</div>
          ),
        )}
        <nav className="next reveal" aria-label="Next project">
          <span>Next</span>
          <Link href={`/project/${next.slug}`}>{next.title}<BigArrow /></Link>
        </nav>
      </main>
    </>
  );
}

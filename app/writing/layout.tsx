import Link from "next/link";
import { Clouds } from "@/components/Clouds";
import { BackArrow } from "@/components/icons";
import "./post.css";

export default function WritingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Clouds top={0.6} bottom={0.7} side={0.14} />
      <main className="post" data-column>
        <Link className="back rise" href="/"><BackArrow />Jimmy Sam</Link>
        <article>{children}</article>
      </main>
    </>
  );
}

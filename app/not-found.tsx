import Link from "next/link";
import { BackArrow } from "@/components/icons";
import "./project/project.css";

export const metadata = { title: "Not found" };

export default function NotFound() {
  return (
    <main className="proj" data-column>
      <Link className="back" href="/"><BackArrow />Jimmy Sam</Link>
      <p className="kicker">404</p>
      <h1>Nothing here.</h1>
      <p className="dek">This page moved or never existed. The homepage has everything.</p>
    </main>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { el, reducedMotion, tooltip } from "./util";

const GROUPS = [
  { k: "merged", n: 151, label: "Merged by the agent" },
  { k: "close", n: 46, label: "Flagged to close" },
  { k: "skip", n: 6, label: "Skipped" },
  { k: "left", n: 15, label: "Left for me" },
];

/** The October 23 sweep: one square per open agent PR, grouped by what happened to it. */
export function SweepFigure() {
  const ref = useRef<SVGSVGElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const svg = ref.current!;
    const inner = boxRef.current!;
    const tip = tooltip(inner);
    const byK = Object.fromEntries(GROUPS.map((g) => [g.k, g]));
    const ROWS = 10, STEP = 15, S = 12;
    const grid = el("g", { transform: "translate(0 8)" }, svg);
    const cells: SVGRectElement[] = [];
    let idx = 0;
    for (const g of GROUPS) {
      for (let i = 0; i < g.n; i++, idx++) {
        const col = Math.floor(idx / ROWS), row = idx % ROWS;
        cells.push(el("rect", { x: col * STEP + 0.75, y: row * STEP + 0.75, width: S - 1.5, height: S - 1.5, rx: 2.5, class: "cell open", "data-g": g.k }, grid));
      }
    }
    const legend = GROUPS.map((g, i) => {
      const y = 24 + i * 32;
      const row = el("g", { class: "lg", "data-g": g.k }, svg);
      el("rect", { x: 372.75, y: y - 9.75, width: 10.5, height: 10.5, rx: 2.5, class: `cell ${g.k}` }, row);
      el("text", { x: 392, y: y + 0.5, class: "lg-n" }, row).textContent = String(g.n);
      el("text", { x: 424, y: y + 0.5, class: "lg-l" }, row).textContent = g.label.toLowerCase();
      return row;
    });
    el("text", { x: 372, y: 156, class: "small" }, svg).textContent = "218 open PRs from scheduled agents";

    let shown = 0;
    const fill = (n: number) => {
      for (let i = shown; i < n; i++) cells[i].setAttribute("class", `cell ${cells[i].dataset.g}`);
      shown = n;
    };
    const focus = (k: string | null) => {
      cells.forEach((c) => c.classList.toggle("dim", !!k && c.dataset.g !== k));
      legend.forEach((l) => l.classList.toggle("dim", !!k && l.dataset.g !== k));
    };
    const over = (e: PointerEvent) => {
      const t = (e.target as Element).closest<SVGElement>("[data-g]");
      if (!t) { focus(null); tip.hide(); return; }
      const g = byK[t.dataset.g!];
      focus(g.k);
      const r = t.getBoundingClientRect(), b = inner.getBoundingClientRect();
      tip.show(g.label, String(g.n), r.left - b.left + r.width / 2, r.top - b.top - 8);
    };
    const leave = () => { focus(null); tip.hide(); };
    svg.addEventListener("pointerover", over);
    svg.addEventListener("pointerleave", leave);

    let raf = 0;
    let io: IntersectionObserver | undefined;
    if (reducedMotion()) fill(cells.length);
    else {
      io = new IntersectionObserver(([e]) => {
        if (!e.isIntersecting) return;
        io?.disconnect();
        const t0 = performance.now();
        const tick = (t: number) => {
          fill(Math.min(cells.length, Math.floor((t - t0) / 9)));
          if (shown < cells.length) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      }, { threshold: 0.3 });
      io.observe(svg);
    }
    return () => {
      io?.disconnect();
      cancelAnimationFrame(raf);
      svg.removeEventListener("pointerover", over);
      svg.removeEventListener("pointerleave", leave);
      tip.remove();
      svg.replaceChildren();
    };
  }, []);

  return (
    <figure>
      <div className="frame"><div className="inner" ref={boxRef}>
        <svg ref={ref} viewBox="0 0 600 170" role="img" aria-label="218 open PRs from scheduled agents: 151 merged by the agent, 46 flagged to close, 6 skipped, 15 left for me." />
      </div></div>
      <figcaption>The October 23 sweep. Each square is one open PR from a scheduled agent. Hover a group to see it.</figcaption>
    </figure>
  );
}

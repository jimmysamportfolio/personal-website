"use client";

import { useEffect, useRef } from "react";
import { animateWhileVisible, clamp, el, reducedMotion } from "./util";

type Chip = { lane: number; s: number; stop: number; dwell: number; max: number; node: SVGRectElement };

/** The factory line: PRs flow from tickets and schedules through review and pile up at CI. */
export function LineFigure() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current!;
    const lanes = [svg.querySelector<SVGPathElement>("[data-lane='a']")!, svg.querySelector<SVGPathElement>("[data-lane='b']")!];
    const layer = svg.querySelector<SVGGElement>("[data-chips]")!;
    const box = svg.querySelector<SVGRectElement>("[data-ci-box]")!;
    const bar = svg.querySelector<SVGRectElement>("[data-ci-bar]")!;
    const wait = svg.querySelector<SVGTextElement>("[data-ci-wait]")!;
    const MX = 110, Y = 110;
    const mergeLen = lanes.map((p) => {
      let lo = 0, hi = p.getTotalLength();
      for (let i = 0; i < 26; i++) {
        const m = (lo + hi) / 2;
        if (p.getPointAtLength(m).x < MX - 0.01) lo = m; else hi = m;
      }
      return hi;
    });
    const D_CI = 350 - MX, D_OK = 505 - MX, D_END = 594 - MX;
    const STOPS: [number, number][] = [[D_CI, 2.1], [D_OK, 0.4]];
    const V = 85, GAP = 17;
    let chips: Chip[] = [];
    let spawnIn = 0.1, nextLane = 0;
    const dOf = (c: Chip) => c.s - mergeLen[c.lane];
    const make = (lane: number, s: number) => {
      const c: Chip = { lane, s, stop: 0, dwell: 0, max: 1, node: el("rect", { width: 12, height: 8, rx: 2, class: "chip" }, layer) };
      chips.push(c);
      return c;
    };
    const render = () => {
      let busy: Chip | null = null, waiting = 0;
      for (const c of chips) {
        const d = dOf(c);
        let x: number, y: number;
        if (d <= 0) { const p = lanes[c.lane].getPointAtLength(c.s); x = p.x; y = p.y; } else { x = MX + d; y = Y; }
        c.node.setAttribute("x", (x - 6).toFixed(1));
        c.node.setAttribute("y", (y - 4).toFixed(1));
        c.node.style.opacity = clamp((D_END - d) / 24).toFixed(2);
        if (c.stop === 0 && c.dwell > 0) busy = c; else if (c.stop === 0 && d > 0) waiting++;
      }
      box.classList.toggle("busy", !!busy);
      bar.setAttribute("width", busy ? (26 * (1 - busy.dwell / busy.max)).toFixed(1) : "0");
      wait.textContent = waiting > 1 ? `${waiting} waiting for CI` : "";
    };

    let stop = () => {};
    if (reducedMotion()) {
      const c0 = make(0, mergeLen[0] + D_CI); c0.dwell = 0.8; c0.max = 1.6;
      for (let k = 1; k <= 5; k++) make(k % 2, mergeLen[k % 2] + D_CI - GAP * k);
      make(0, mergeLen[0] + D_OK + 34).stop = 2;
      render();
    } else {
      stop = animateWhileVisible(svg, (dt) => {
        spawnIn -= dt;
        if (spawnIn <= 0 && chips.filter((c) => c.stop === 0).length < 8) { make(nextLane, 0); nextLane ^= 1; spawnIn = 0.85; }
        chips.sort((a, b) => dOf(b) - dOf(a));
        for (let i = 0; i < chips.length; i++) {
          const c = chips[i], lead = chips[i - 1];
          if (c.dwell > 0) { c.dwell -= dt; if (c.dwell <= 0) { c.dwell = 0; c.stop++; } continue; }
          let s = c.s + V * dt;
          if (lead) s = Math.min(s, dOf(lead) - GAP + mergeLen[c.lane]);
          s = Math.max(s, c.s);
          const st = STOPS[c.stop];
          if (st && s - mergeLen[c.lane] >= st[0]) { s = st[0] + mergeLen[c.lane]; c.dwell = c.max = st[1]; }
          c.s = s;
        }
        chips = chips.filter((c) => { if (dOf(c) >= D_END) { c.node.remove(); return false; } return true; });
        render();
      });
    }
    return () => {
      stop();
      layer.replaceChildren();
      chips = [];
    };
  }, []);

  return (
    <figure>
      <div className="frame"><div className="inner">
        <svg ref={ref} viewBox="0 0 600 196" role="img" aria-label="A line of stations from left to right: a Linear ticket or a schedule feeds an agent, then review bots, the merge queue, CI, stage, a person, and production. Pull requests move along it and pile up in front of CI.">
          <path data-lane="a" className="wire" d="M8,52 H44 C80,52 76,110 110,110 H596" />
          <path data-lane="b" className="wire" d="M8,168 H44 C80,168 76,110 110,110 H596" />
          <text className="lbl" x="8" y="40">Linear ticket</text>
          <text className="lbl" x="8" y="188">Schedule</text>
          <rect className="st" x="103" y="103" width="14" height="14" rx="4" />
          <rect className="st" x="183" y="103" width="14" height="14" rx="4" />
          <rect className="st" x="263" y="103" width="14" height="14" rx="4" />
          <rect data-ci-box className="st ci" x="332" y="98" width="36" height="24" rx="6" />
          <rect className="st" x="423" y="103" width="14" height="14" rx="4" />
          <circle className="st" cx="505" cy="110" r="7.5" />
          <rect className="st prod" x="568" y="103" width="14" height="14" rx="4" />
          <rect data-ci-bar className="ci-bar" x="337" y="116.5" width="0" height="2.5" rx="1.25" />
          <g textAnchor="middle">
            <text className="lbl" x="110" y="142">Agent</text>
            <text className="lbl" x="190" y="142">Review bots</text>
            <text className="lbl" x="270" y="142">Merge queue</text>
            <text className="lbl strong" x="350" y="142">CI</text>
            <text className="lbl" x="430" y="142">Stage</text>
            <text className="lbl" x="505" y="142">A person</text>
            <text className="lbl" x="575" y="142">Prod</text>
          </g>
          <text data-ci-wait className="small" x="350" y="86" textAnchor="middle" />
          <g data-chips />
        </svg>
      </div></div>
      <figcaption>Each square is a pull request. Tickets and scheduled agents feed the same line, and every PR waits its turn at CI. Timing is conceptual.</figcaption>
    </figure>
  );
}

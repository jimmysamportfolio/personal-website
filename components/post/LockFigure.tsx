"use client";

import { useEffect, useRef } from "react";
import { animateWhileVisible, clamp, el, useReducedMotion } from "./util";

type State = "write" | "wait" | "check";
type Agent = { y: number; bar: SVGRectElement; st: SVGTextElement; state: State; p: number; dur: number };

const LABEL: Record<State, string> = { write: "Writing code", wait: "Waiting", check: "Checking" };

/** Several agents write code at once but take turns for the expensive check. */
export function LockFigure() {
  const ref = useRef<SVGSVGElement>(null);
  const still = useReducedMotion();

  useEffect(() => {
    const svg = ref.current!;
    const rows = svg.querySelector<SVGGElement>("[data-rows]")!;
    const mark = svg.querySelector<SVGGElement>("[data-lock]")!;
    const X0 = 70, X1 = 418, Y0 = 36, DY = 32, LX = 540, W = X1 - X0;
    const agents: Agent[] = [];
    for (let i = 0; i < 5; i++) {
      const y = Y0 + i * DY;
      el("text", { x: 0, y: y + 4.5, class: "lbl" }, rows).textContent = `Agent ${i + 1}`;
      el("rect", { x: X0, y: y - 4, width: W, height: 8, rx: 4, class: "track" }, rows);
      const bar = el("rect", { x: X0, y: y - 4, width: 0, height: 8, rx: 4, class: "fill write" }, rows);
      const st = el("text", { x: X1 + 14, y: y + 4.5, class: "state" }, rows);
      agents.push({ y, bar, st, state: "write", p: Math.random() * 0.8, dur: 1.8 + Math.random() * 3.2 });
    }
    let holder: Agent | null = null;
    let ly = Y0;
    const queue: Agent[] = [];
    const render = () => {
      for (const a of agents) {
        a.bar.setAttribute("width", a.state === "wait" ? "0" : (W * clamp(a.p)).toFixed(1));
        a.bar.setAttribute("class", `fill ${a.state}`);
        a.st.textContent = LABEL[a.state];
        a.st.setAttribute("class", `state ${a.state}`);
      }
      mark.setAttribute("transform", `translate(${LX} ${ly.toFixed(1)})`);
    };

    let stop = () => {};
    if (still) {
      const states: State[] = ["write", "wait", "check", "write", "wait"];
      agents.forEach((a, i) => { a.state = states[i]; a.p = [0.6, 0, 0.5, 0.3, 0][i]; });
      ly = agents[2].y;
      render();
    } else {
      stop = animateWhileVisible(svg, (dt) => {
        for (const a of agents) {
          if (a.state === "write") { a.p += dt / a.dur; if (a.p >= 1) { a.state = "wait"; a.p = 0; queue.push(a); } }
          else if (a.state === "check") { a.p += dt / 1.1; if (a.p >= 1) { a.state = "write"; a.p = 0; a.dur = 1.8 + Math.random() * 3.4; holder = null; } }
        }
        if (!holder && queue.length) { holder = queue.shift()!; holder.state = "check"; holder.p = 0; }
        if (holder) ly += (holder.y - ly) * Math.min(1, dt * 14);
        render();
      });
    }
    return () => {
      stop();
      rows.replaceChildren();
    };
  }, [still]);

  return (
    <figure>
      <div className="frame"><div className="inner">
        <svg ref={ref} viewBox="0 0 600 184" role="img" aria-label="Five agents write code in parallel. When one needs a heavy check, it waits for a single lock, so only one check runs at a time.">
          <g data-rows />
          <text className="small" x="540" y="14" textAnchor="middle">Lock</text>
          <line className="rail" x1="540" x2="540" y1="24" y2="176" />
          <g data-lock transform="translate(540 36)">
            <path className="lock-shackle" d="M-3.6,-3 V-6 a3.6,3.6 0 0 1 7.2,0 V-3" />
            <rect className="lock-body" x="-6" y="-3.5" width="12" height="9" rx="2" />
          </g>
        </svg>
      </div></div>
      <figcaption>Agents write code in parallel but take turns for the expensive check. Timing is conceptual.</figcaption>
    </figure>
  );
}

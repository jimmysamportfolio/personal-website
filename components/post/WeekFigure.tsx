"use client";

import { useEffect, useRef } from "react";
import { animateWhileVisible, el, reducedMotion } from "./util";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const JOBS = [["Dead code", "Design docs"], ["Comments"], ["Abstractions"], ["Layering"], ["Logging"], ["Types"], []];

/** The routine week: each scheduled agent gets a day and drops small PRs when it runs. */
export function WeekFigure() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current!;
    const CW = 86, W = 80, TOP = 62, CH = 42, CG = 8;
    const cols = DAYS.map((_, i) => el("rect", { x: i * CW, y: 0, width: W, height: 184, rx: 10, class: "col" }, svg));
    el("rect", { x: 4, y: 28, width: 5 * CW - 14, height: 20, rx: 6, class: "strip" }, svg);
    el("text", { x: 14, y: 42, class: "strip-t" }, svg).textContent = "Daily standup";
    DAYS.forEach((d, i) => {
      const x = i * CW;
      el("text", { x: x + W / 2, y: 18, class: "dh" }, svg).textContent = d;
      JOBS[i].forEach((j, k) => {
        const y = TOP + k * (CH + CG);
        el("rect", { x: x + 4, y, width: W - 8, height: CH, rx: 8, class: "card" }, svg);
        el("text", { x: x + W / 2, y: y + CH / 2 + 4, class: "ct" }, svg).textContent = j;
      });
      if (!JOBS[i].length) el("text", { x: x + W / 2, y: TOP + CH / 2 + 4, class: "off" }, svg).textContent = "Off";
    });
    const chips = el("g", {}, svg);
    const timers = new Set<ReturnType<typeof setTimeout>>();
    let day = -1;
    let t = 0;
    const next = () => {
      day = (day + 1) % 7;
      cols.forEach((c, i) => c.classList.toggle("on", i === day));
      const n = JOBS[day].length;
      if (!n) return;
      const yb = TOP + n * (CH + CG) + 2, cx = day * CW + W / 2;
      for (let k = 0; k < 3; k++) {
        const r = el("rect", { x: cx - 19 + k * 14, y: yb, width: 10, height: 7, rx: 2, class: "chip drop" }, chips);
        r.style.animationDelay = `${k * 0.12}s`;
        const tm = setTimeout(() => { r.remove(); timers.delete(tm); }, 1800);
        timers.add(tm);
      }
    };

    let stop = () => {};
    if (reducedMotion()) cols[0].classList.add("on");
    else stop = animateWhileVisible(svg, (dt) => { t -= dt; if (t <= 0) { next(); t = 1.2; } });
    return () => {
      stop();
      timers.forEach(clearTimeout);
      svg.replaceChildren();
    };
  }, []);

  return (
    <figure>
      <div className="frame"><div className="inner">
        <svg ref={ref} viewBox="0 0 596 184" role="img" aria-label="A week calendar. Monday: dead code and design docs. Tuesday: comments. Wednesday: abstractions. Thursday: layering. Friday: logging. Saturday: types. Sunday: off. A daily standup runs Monday to Friday." />
      </div></div>
      <figcaption>Seven weekly cleanup agents and a daily standup. Each one opens small, labeled PRs on its day.</figcaption>
    </figure>
  );
}

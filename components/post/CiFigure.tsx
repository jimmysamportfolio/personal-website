"use client";

import { useEffect, useRef } from "react";
import { el, tooltip } from "./util";

type Point = [string, number];
type ChartOpts = {
  max: number;
  ticks: number[];
  tickLabel: (v: number) => string;
  valueLabel: (v: number) => string;
  tipLabel: (v: number) => string;
  events?: [string, string, number][];
  aria: string;
};

const TESTS: Point[] = [["2026-06-16", 314], ["2026-08-28", 1066], ["2026-10-14", 2167], ["2026-11-11", 2718]];
const PIPELINE: Point[] = [["2026-08-17", 2.8], ["2026-08-31", 3.5], ["2026-09-14", 5.5], ["2026-09-28", 8.4], ["2026-10-05", 10.1], ["2026-10-19", 10.3], ["2026-11-02", 12.0], ["2026-11-09", 12.1]];

const D0 = Date.UTC(2026, 5, 1), D1 = Date.UTC(2026, 10, 20);
const W = 290, H = 196, L = 34, R = 14, T = 34, B = 26;
const day = (s: string) => Date.UTC(+s.slice(0, 4), +s.slice(5, 7) - 1, +s.slice(8, 10));
const fmtDate = (t: number) => new Date(t).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
const X = (t: number) => L + ((t - D0) / (D1 - D0)) * (W - L - R);

function drawChart(box: HTMLElement, data: Point[], o: ChartOpts) {
  const svg = el("svg", { viewBox: `0 0 ${W} ${H}`, role: "img", "aria-label": o.aria });
  box.appendChild(svg);
  const Y = (v: number) => H - B - (v / o.max) * (H - T - B);
  o.ticks.forEach((v) => {
    el("line", { x1: L, x2: W - R, y1: Y(v), y2: Y(v), class: v ? "grid" : "axis" }, svg);
    el("text", { x: L - 7, y: Y(v) + 3.5, class: "ax ya" }, svg).textContent = o.tickLabel(v);
  });
  ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"].forEach((m, i) => {
    el("text", { x: X(Date.UTC(2026, 5 + i, 1)), y: H - 8, class: "ax xa" }, svg).textContent = m;
  });
  (o.events ?? []).forEach(([d, text, row]) => {
    const x = X(day(d)), ty = 12 + row * 12;
    el("line", { x1: x, x2: x, y1: ty + 4, y2: H - B, class: "ev" }, svg);
    el("text", { x: x - 4, y: ty, class: "ev-t" }, svg).textContent = text;
  });
  const pts = data.map(([d, v]) => ({ x: X(day(d)), y: Y(v), d, v }));
  const cross = el("line", { y1: T - 4, y2: H - B, class: "cross" }, svg);
  el("path", { d: "M" + pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join("L"), class: "line" }, svg);
  const dots = pts.map((p) => el("circle", { cx: p.x, cy: p.y, r: 4, class: "pt" }, svg));
  const a = pts[0], z = pts[pts.length - 1];
  el("text", { x: a.x + 2, y: a.y - 10, class: "dl" }, svg).textContent = o.valueLabel(a.v);
  el("text", { x: z.x, y: z.y - 10, class: "dl", "text-anchor": "end" }, svg).textContent = o.valueLabel(z.v);
  const tip = tooltip(box);
  const hit = el("rect", { x: L, y: 0, width: W - L - R, height: H, class: "hit" }, svg);
  hit.addEventListener("pointermove", (e) => {
    const r = svg.getBoundingClientRect(), k = r.width / W, mx = (e.clientX - r.left) / k;
    let best = 0;
    pts.forEach((p, i) => { if (Math.abs(p.x - mx) < Math.abs(pts[best].x - mx)) best = i; });
    const p = pts[best], b = box.getBoundingClientRect();
    cross.setAttribute("x1", String(p.x));
    cross.setAttribute("x2", String(p.x));
    cross.classList.add("on");
    dots.forEach((d, i) => d.classList.toggle("on", i === best));
    tip.show(fmtDate(day(p.d)), o.tipLabel(p.v), r.left - b.left + p.x * k, r.top - b.top + p.y * k - 12);
  });
  hit.addEventListener("pointerleave", () => {
    cross.classList.remove("on");
    dots.forEach((d) => d.classList.remove("on"));
    tip.hide();
  });
  return () => { tip.remove(); svg.remove(); };
}

/** Test files and pipeline time as small multiples on one time axis. */
export function CiFigure() {
  const tests = useRef<HTMLDivElement>(null);
  const pipeline = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const a = drawChart(tests.current!, TESTS, {
      max: 3000, ticks: [0, 1000, 2000, 3000],
      tickLabel: (v) => (v ? `${v / 1000}k` : "0"),
      valueLabel: (v) => v.toLocaleString("en-US"),
      tipLabel: (v) => `${v.toLocaleString("en-US")} files`,
      aria: "Test files grew from 314 in June to 2,718 in November.",
    });
    const b = drawChart(pipeline.current!, PIPELINE, {
      max: 15, ticks: [0, 5, 10, 15],
      tickLabel: (v) => String(v),
      valueLabel: (v) => v.toFixed(1),
      tipLabel: (v) => `${v.toFixed(1)} min`,
      events: [["2026-10-14", "6 shards", 1], ["2026-11-11", "8 shards", 0]],
      aria: "The median PR pipeline rose from 2.8 minutes in mid-August to 12.1 minutes in November.",
    });
    return () => { a(); b(); };
  }, []);

  return (
    <figure>
      <div className="frame"><div className="inner charts">
        <div className="chart-box" ref={tests}><p className="chart-h">Test files in our main service</p></div>
        <div className="chart-box" ref={pipeline}><p className="chart-h">Median PR pipeline, minutes</p></div>
      </div></div>
      <figcaption>Test file counts from PR descriptions on four dates. Pipeline medians from CircleCI for the weeks I sampled. CircleCI keeps 90 days of history, so that line starts in August.</figcaption>
    </figure>
  );
}

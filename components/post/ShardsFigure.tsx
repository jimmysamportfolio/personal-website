"use client";

import { useEffect, useRef } from "react";
import { animateWhileVisible, ease, el, lerp, reducedMotion } from "./util";

const L = 78, R = 592, T = 44, B = 190, GMAX = 4.4;
const Y = (g: number) => B - (g / GMAX) * (B - T);
const OFF = [0, -0.1, -0.04, -0.15, -0.06, -0.12, -0.02, -0.09];
const TOTAL = 15;

/** Shard memory rising toward the limit, then splitting into more shards. Conceptual. */
export function ShardsFigure() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current!;
    const bars = svg.querySelector<SVGGElement>("[data-bars]")!;
    const nT = svg.querySelector<SVGTextElement>("[data-n]")!;
    const jT = svg.querySelector<SVGTextElement>("[data-job]")!;
    const noteT = svg.querySelector<SVGTextElement>("[data-note]")!;
    const trig = svg.querySelector<SVGGElement>("[data-trig]")!;
    const A: SVGRectElement[] = [], Bs: SVGRectElement[] = [];
    for (let i = 0; i < 8; i++) {
      A.push(el("rect", { rx: 3, class: "bar" }, bars));
      Bs.push(el("rect", { rx: 3, class: "bar" }, bars));
    }
    const draw = (set: SVGRectElement[], n: number, h: number, alpha: number, oom: boolean) => {
      const slot = (R - L) / n, bw = Math.min(30, slot * 0.46);
      set.forEach((r, i) => {
        if (i >= n || alpha <= 0 || h <= 0) { r.setAttribute("height", "0"); return; }
        const g = Math.max(0, h + OFF[i] * Math.min(1, h / 1.5)), x = L + slot * (i + 0.5) - bw / 2;
        r.setAttribute("x", x.toFixed(1));
        r.setAttribute("width", bw.toFixed(1));
        r.setAttribute("y", Y(g).toFixed(1));
        r.setAttribute("height", (B - Y(g)).toFixed(1));
        r.style.opacity = alpha.toFixed(2);
        r.classList.toggle("oom", oom && i === 0);
      });
    };
    const frame = (t: number) => {
      let a = [4, 0, 0], b = [8, 0, 0];
      let n = "4 shards", job = "11.3 min", note = "Tests added every day", on = false, oom = false;
      if (t < 4) a = [4, lerp(2.5, 3.96, ease(t / 4)), 1];
      else if (t < 5.2) { a = [4, 3.96, 1]; oom = true; note = "One shard runs out of memory"; }
      else if (t < 6) { const k = ease((t - 5.2) / 0.8); a = [4, 3.96 * (1 - k), 1 - k]; b = [6, 2.64 * k, 1]; n = "6 shards"; job = "8.6 min"; note = "Same tests, split 6 ways"; }
      else if (t < 9.5) { const k = (t - 6) / 3.5, h = lerp(2.64, 3.36, k); b = [6, h, 1]; n = "6 shards"; job = `${lerp(8.6, 11.8, k).toFixed(1)} min`; on = h > 3.2; note = on ? "Past 3.2 GB: time to add shards" : "Tests keep coming"; }
      else if (t < 10.3) { const k = ease((t - 9.5) / 0.8); a = [6, 3.36 * (1 - k), 1 - k]; b = [8, 2.52 * k, 1]; n = "8 shards"; job = "9.0 min"; note = "Same tests, split 8 ways"; }
      else if (t < 14) { const k = (t - 10.3) / 3.7; b = [8, lerp(2.52, 2.8, k), 1]; n = "8 shards"; job = "9.0 min"; note = "Early: about one day of data"; }
      else { b = [8, 2.8, 1 - (t - 14)]; n = "8 shards"; job = "9.0 min"; note = ""; }
      draw(A, a[0], a[1], a[2], oom);
      draw(Bs, b[0], b[1], b[2], false);
      nT.textContent = n;
      jT.textContent = `Unit-test job: ${job}`;
      noteT.textContent = note;
      trig.classList.toggle("on", on);
    };

    let stop = () => {};
    if (reducedMotion()) frame(9.2);
    else {
      let tt = 0;
      stop = animateWhileVisible(svg, (dt) => { tt = (tt + dt) % TOTAL; frame(tt); });
    }
    return () => {
      stop();
      bars.replaceChildren();
    };
  }, []);

  return (
    <figure>
      <div className="frame"><div className="inner">
        <svg ref={ref} viewBox="0 0 600 218" role="img" aria-label="Bars show each shard's peak memory. As tests are added, the bars rise toward the 4 GB limit. Splitting into more shards lowers every bar, and the 3.2 GB rule says when to split again.">
          <text data-n className="sh-n" x="0" y="20">4 shards</text>
          <text data-job className="lbl" x="88" y="20">Unit-test job: 11.3 min</text>
          <text data-note className="small" x="600" y="20" textAnchor="end" />
          <line className="limit" x1="78" x2="592" y1="57.3" y2="57.3" />
          <text className="lbl" x="0" y="61.5">4 GB limit</text>
          <g data-trig className="trigger">
            <line className="trig" x1="78" x2="592" y1="83.8" y2="83.8" />
            <text className="lbl trig-t" x="0" y="88">3.2 GB rule</text>
          </g>
          <g data-bars />
          <line className="axis" x1="78" x2="592" y1="190" y2="190" />
          <text className="small" x="78" y="210">Each bar is one shard&apos;s peak memory</text>
        </svg>
      </div></div>
      <figcaption>Conceptual. Bar heights are illustrative. The 4 GB limit, the 3.2 GB rule, and the job medians come from our CircleCI runs.</figcaption>
    </figure>
  );
}

"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef } from "react";
import advizr from "@/content/previews/advizr.jpg";
import blueprint from "@/content/previews/blueprint.jpg";
import kickstart from "@/content/previews/kickstart.jpg";
import nexus from "@/content/previews/nexus.jpg";
import prd from "@/content/previews/prd.jpg";

const PHOTOS: Record<string, StaticImageData> = { advizr, nexus, blueprint, kickstart, prd };
const GAP = 22;

/**
 * Preview card that sits next to the cursor while a row with data-peek is hovered.
 * It crossfades between rows, follows with a little lag, and tilts slightly with speed.
 * Keyboard focus shows the same preview beside the focused row.
 */
export function Peek() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const peek = ref.current;
    if (!peek) return;
    const panes = Object.fromEntries([...peek.querySelectorAll<HTMLElement>("[data-pane]")].map((p) => [p.dataset.pane!, p]));
    // Mouse previews need a hover-capable pointer; keyboard previews only need room.
    const canHoverPeek = matchMedia("(hover: hover) and (min-width: 700px)");
    const canFocusPeek = matchMedia("(min-width: 700px)");
    const still = matchMedia("(prefers-reduced-motion: reduce)");
    let x = 0, y = 0, tx = 0, ty = 0, tilt = 0, s = 0.94;
    let on = false, placed = false, active: string | null = null;
    let hideT: ReturnType<typeof setTimeout> | undefined;
    let raf = 0;

    const aim = (cx: number, cy: number) => {
      const w = peek.offsetWidth || 240, h = peek.offsetHeight || 180;
      tx = cx + GAP + w > innerWidth - 12 ? cx - GAP - w : cx + GAP;
      ty = cy + GAP + h > innerHeight - 12 ? cy - GAP - h : cy + GAP;
    };
    const loop = () => { if (!raf) raf = requestAnimationFrame(tick); };
    const tick = () => {
      raf = 0;
      const k = still.matches ? 1 : 0.22;
      const px = x;
      x += (tx - x) * k;
      y += (ty - y) * k;
      const vx = x - px;
      tilt += ((still.matches ? 0 : Math.max(-5, Math.min(5, vx * 0.25))) - tilt) * 0.2;
      s += ((on ? 1 : 0.94) - s) * (still.matches ? 1 : 0.22);
      peek.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) rotate(${tilt.toFixed(2)}deg) scale(${s.toFixed(3)})`;
      if (on || Math.abs(vx) > 0.05 || Math.abs(tilt) > 0.02 || Math.abs(s - 0.94) > 0.002) loop();
      else placed = false;
    };
    const show = (id: string, cx: number, cy: number, viaKeyboard = false) => {
      if (!(viaKeyboard ? canFocusPeek : canHoverPeek).matches || !panes[id]) return;
      clearTimeout(hideT);
      if (active !== id) {
        if (active) panes[active].classList.remove("on");
        panes[id].classList.add("on");
        active = id;
      }
      aim(cx, cy);
      if (!placed) { x = tx; y = ty; placed = true; }
      on = true;
      peek.classList.add("on");
      loop();
    };
    const hide = () => {
      clearTimeout(hideT);
      hideT = setTimeout(() => { on = false; peek.classList.remove("on"); loop(); }, 80);
    };

    const rows = [...document.querySelectorAll<HTMLElement>("[data-peek]")];
    const handlers = rows.map((a) => {
      const enter = (e: MouseEvent) => show(a.dataset.peek!, e.clientX, e.clientY);
      const focus = () => {
        if (!a.matches(":focus-visible")) return;
        const r = a.getBoundingClientRect();
        show(a.dataset.peek!, r.right - 120, r.top + r.height / 2, true);
      };
      a.addEventListener("mouseenter", enter);
      a.addEventListener("mouseleave", hide);
      a.addEventListener("focus", focus);
      a.addEventListener("blur", hide);
      return () => {
        a.removeEventListener("mouseenter", enter);
        a.removeEventListener("mouseleave", hide);
        a.removeEventListener("focus", focus);
        a.removeEventListener("blur", hide);
      };
    });
    const move = (e: MouseEvent) => { if (on) { aim(e.clientX, e.clientY); loop(); } };
    const scroll = () => { if (on) hide(); };
    addEventListener("mousemove", move, { passive: true });
    addEventListener("scroll", scroll, { passive: true });

    return () => {
      handlers.forEach((off) => off());
      removeEventListener("mousemove", move);
      removeEventListener("scroll", scroll);
      clearTimeout(hideT);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="peek" ref={ref} aria-hidden="true">
      <div className="pv pv-art pv-cedar" data-pane="cedar">
        <svg viewBox="0 0 240 180">
          <g className="w">
            <path d="M46,38 L118,56" /><path d="M84,22 L118,56" /><path d="M40,80 L118,56" />
            <path d="M40,80 L124,96" /><path d="M58,114 L124,96" /><path d="M58,114 L116,138" />
            <path d="M42,150 L116,138" /><path d="M88,162 L116,138" />
            <path d="M118,56 L176,96" /><path d="M124,96 L176,96" /><path d="M116,138 L176,96" />
          </g>
          <path className="pl" d="M46,38 L118,56 L176,96" pathLength={100} />
          <path className="pl d1" d="M58,114 L124,96 L176,96" pathLength={100} />
          <path className="pl d2" d="M42,150 L116,138 L176,96" pathLength={100} />
          <circle className="o" cx="46" cy="38" r="4" /><circle className="o" cx="84" cy="22" r="4" /><circle className="o" cx="40" cy="80" r="4" />
          <circle className="o" cx="58" cy="114" r="4" /><circle className="o" cx="42" cy="150" r="4" /><circle className="o" cx="88" cy="162" r="4" />
          <circle className="mid" cx="118" cy="56" r="6.5" /><circle className="mid" cx="124" cy="96" r="6.5" /><circle className="mid" cx="116" cy="138" r="6.5" />
          <rect className="hub" x="176" y="84" width="24" height="24" rx="7" />
        </svg>
      </div>
      {Object.entries(PHOTOS).map(([id, src]) => (
        <div className="pv" data-pane={id} key={id}>
          <Image src={src} alt="" fill sizes="240px" loading="eager" />
        </div>
      ))}
      <div className="pv pv-art pv-factory" data-pane="factory">
        <svg viewBox="0 0 240 180">
          <path className="w" d="M0,94 H240" />
          <rect className="st" x="11" y="87" width="14" height="14" rx="4" />
          <rect className="st" x="45" y="87" width="14" height="14" rx="4" />
          <rect className="st" x="79" y="87" width="14" height="14" rx="4" />
          <rect className="chip" x="98.5" y="89.5" width="11" height="9" rx="2.5" />
          <rect className="chip" x="112.5" y="89.5" width="11" height="9" rx="2.5" />
          <rect className="chip" x="126.5" y="89.5" width="11" height="9" rx="2.5" />
          <rect className="ci" x="142" y="80" width="34" height="28" rx="7" />
          <rect className="chip" x="153.5" y="89.5" width="11" height="9" rx="2.5" />
          <rect className="bar" x="148" y="102" width="22" height="2.5" rx="1.25" />
          <rect className="st" x="195" y="87" width="14" height="14" rx="4" />
          <rect className="prod" x="225" y="87" width="14" height="14" rx="4" />
          <text x="118" y="76" textAnchor="middle">3 waiting</text>
          <text x="159" y="126" textAnchor="middle">CI</text>
        </svg>
      </div>
    </div>
  );
}

/** Helpers shared by the post's animated figures. */
export const NS = "http://www.w3.org/2000/svg";

export function el<K extends keyof SVGElementTagNameMap>(tag: K, attrs: Record<string, string | number> = {}, parent?: Element): SVGElementTagNameMap[K] {
  const n = document.createElementNS(NS, tag);
  for (const k in attrs) n.setAttribute(k, String(attrs[k]));
  if (parent) parent.appendChild(n);
  return n;
}

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
export const reducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Runs step(dt) every frame while the node is on screen. Returns a cleanup function. */
export function animateWhileVisible(node: Element, step: (dt: number) => void): () => void {
  let raf = 0;
  let last = 0;
  let on = false;
  const tick = (t: number) => {
    const dt = Math.min(0.05, Math.max(0, (t - last) / 1000));
    last = t;
    step(dt);
    if (on) raf = requestAnimationFrame(tick);
  };
  const start = () => {
    if (on) return;
    on = true;
    last = performance.now();
    raf = requestAnimationFrame(tick);
  };
  const stop = () => {
    on = false;
    cancelAnimationFrame(raf);
  };
  const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { threshold: 0.1 });
  io.observe(node);
  return () => {
    io.disconnect();
    stop();
  };
}

/** A small tooltip positioned inside box. Text only. */
export function tooltip(box: HTMLElement) {
  const t = document.createElement("div");
  const label = document.createElement("span");
  const value = document.createElement("b");
  t.className = "tip";
  t.append(label, value);
  box.appendChild(t);
  return {
    show(l: string, v: string, x: number, y: number) {
      label.textContent = l;
      value.textContent = v;
      t.style.left = `${x}px`;
      t.style.top = `${y}px`;
      t.classList.add("on");
    },
    hide() {
      t.classList.remove("on");
    },
    remove() {
      t.remove();
    },
  };
}

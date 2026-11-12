"use client";

import { useEffect, useRef } from "react";

/**
 * Halftone clouds: a dotted sky drawn in WebGL behind the page.
 * Clouds drift slowly, slide sideways as you scroll, and move slower than the page.
 * They are dense at the top and bottom, light in the side margins, and clear behind the text
 * column (the element marked with data-column).
 */
type Props = { top?: number; bottom?: number; side?: number };

const VS = "attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }";

const FS = `
precision highp float;
uniform vec2 uRes;
uniform float uDpr, uScroll, uTime, uPageH, uMotion, uTop, uBottom, uSide;
uniform vec2 uCol;
uniform vec3 uInkA, uInkB;

float hash(vec2 p){ p = fract(p * vec2(234.34, 435.345)); p += dot(p, p + 34.23); return fract(p.x * p.y); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p), u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++){ v += a * noise(p); p = mat2(1.6, 1.2, -1.2, 1.6) * p + 7.3; a *= 0.5; }
  return v;
}

const float CELL = 5.5;
const float C = 0.70710678;

void main(){
  vec2 css = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y) / uDpr;

  // 45 degree halftone screen, fixed to the viewport
  vec2 r = vec2(C * css.x + C * css.y, -C * css.x + C * css.y) / CELL;
  vec2 id = floor(r) + 0.5;
  vec2 f = r - id;
  vec2 rc = id * CELL;
  vec2 ctr = vec2(C * rc.x - C * rc.y, C * rc.x + C * rc.y);
  float pageY = ctr.y + uScroll;

  // where the sky lives: a band at the top, a band at the end, light margins
  float top = uTop * (1.0 - smoothstep(40.0, 640.0, pageY));
  float bot = uBottom * smoothstep(uPageH - 560.0, uPageH - 20.0, pageY);
  float band = max(top, bot);
  // the clear area around the text gets a cloud-shaped edge that only ever grows outward
  float o = fbm(vec2(ctr.x, pageY) / 150.0 + 3.1) * 170.0;
  float inCol = smoothstep(uCol.x - 200.0 - o, uCol.x + 30.0 - o, ctr.x) * (1.0 - smoothstep(uCol.y - 30.0 + o, uCol.y + 200.0 + o, ctr.x));
  // inside the column: dots only above the first line of text and in the empty space after the last
  float inside = max(top * mix(0.36, 0.0, smoothstep(60.0 - o * 0.3, 190.0 - o * 0.3, pageY)), uBottom * 0.6 * smoothstep(uPageH - 240.0 + o * 0.5, uPageH + o * 0.5, pageY));
  float prof = mix(max(band, uSide), inside, inCol);
  if (prof < 0.004) { gl_FragColor = vec4(0.0); return; }

  // cloud field: drifts with time, slides with scroll, parallax against the page
  vec2 q = vec2(ctr.x + uTime * 7.0 + uScroll * 0.18 * uMotion, ctr.y + uScroll * mix(1.0, 0.55, uMotion)) / 300.0;
  vec2 w = vec2(fbm(q + vec2(0.0, uTime * 0.004)), fbm(q + vec2(5.2, 1.3)));
  float d = fbm(q + 1.5 * w);
  float cloud = smoothstep(0.42, 0.66, d);
  float edge = smoothstep(0.40, 0.52, d) * (1.0 - smoothstep(0.52, 0.72, d));

  // the sky carries the dots; cloud bodies stay paper with shaded edges
  float tone = ((1.0 - cloud) * 0.9 + edge * 0.3) * clamp(prof, 0.0, 1.0);
  float rad = sqrt(tone) * 0.5 * CELL * 0.98;
  float dist = length(f) * CELL;
  float aa = 0.6 / uDpr + 0.25;
  float a = (1.0 - smoothstep(rad - aa, rad + aa, dist)) * step(0.3, rad);
  vec3 ink = mix(uInkA, uInkB, smoothstep(0.0, 900.0, pageY));
  gl_FragColor = vec4(ink * a, a);
}`;

function oklchToSrgb(L: number, C: number, h: number): [number, number, number] {
  const a = C * Math.cos((h * Math.PI) / 180);
  const b = C * Math.sin((h * Math.PI) / 180);
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  const lin = [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
  return lin.map((v) => {
    const c = Math.min(1, Math.max(0, v));
    return c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
  }) as [number, number, number];
}

export function Clouds({ top = 1, bottom = 1, side = 0.26 }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: true, antialias: false });
    if (!gl) {
      canvas.hidden = true;
      return;
    }

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? "shader error");
      return s;
    };
    const prog = gl.createProgram()!;
    try {
      gl.attachShader(prog, compile(gl.VERTEX_SHADER, VS));
      gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FS));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog) ?? "link error");
    } catch (e) {
      console.warn("clouds:", e);
      canvas.hidden = true;
      return;
    }
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const names = ["uRes", "uDpr", "uScroll", "uTime", "uPageH", "uMotion", "uTop", "uBottom", "uSide", "uCol", "uInkA", "uInkB"] as const;
    const U = Object.fromEntries(names.map((n) => [n, gl.getUniformLocation(prog, n)])) as Record<(typeof names)[number], WebGLUniformLocation | null>;
    gl.uniform3fv(U.uInkA, oklchToSrgb(0.64, 0.035, 234));
    gl.uniform3fv(U.uInkB, oklchToSrgb(0.74, 0.025, 228));
    gl.uniform1f(U.uTop, top);
    gl.uniform1f(U.uBottom, bottom);
    gl.uniform1f(U.uSide, side);

    const still = matchMedia("(prefers-reduced-motion: reduce)");
    let t = 0;
    let last = performance.now();
    let raf = 0;

    const measure = () => {
      const dpr = Math.min(devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(innerWidth * dpr);
      canvas.height = Math.round(innerHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      const column = document.querySelector("[data-column]") ?? document.body;
      const r = column.getBoundingClientRect();
      const cs = getComputedStyle(column);
      gl.uniform2f(U.uCol, r.left + parseFloat(cs.paddingLeft), r.right - parseFloat(cs.paddingRight));
      gl.uniform2f(U.uRes, canvas.width, canvas.height);
      gl.uniform1f(U.uDpr, dpr);
      gl.uniform1f(U.uPageH, document.documentElement.scrollHeight);
    };
    const draw = () => {
      gl.uniform1f(U.uScroll, scrollY);
      gl.uniform1f(U.uTime, t);
      gl.uniform1f(U.uMotion, still.matches ? 0 : 1);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!still.matches && !document.hidden) {
        t += dt;
        draw();
      }
      raf = requestAnimationFrame(loop);
    };
    const onResize = () => { measure(); draw(); };
    const onScroll = () => { if (still.matches) draw(); };

    measure();
    draw();
    addEventListener("resize", onResize);
    addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(onResize);
    ro.observe(document.body);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", onResize);
      removeEventListener("scroll", onScroll);
      ro.disconnect();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [top, bottom, side]);

  return <canvas ref={ref} className="clouds" aria-hidden="true" />;
}

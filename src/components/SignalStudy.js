import { useEffect, useRef, useState } from "react";

const studies = ["Trefoil", "Orbit", "Coil"];
const tau = Math.PI * 2;

function spine(t, mode) {
  const p = mode === 2 ? 3 : 2;
  const q = mode === 0 ? 3 : mode === 1 ? 1 : 4;
  const radius = 1.24 + 0.61 * Math.cos(q * t);
  return [
    radius * Math.cos(p * t),
    radius * Math.sin(p * t),
    0.84 * Math.sin(q * t),
  ];
}

function makeCloud(mode) {
  const points = [];
  for (let row = 0; row < 220; row++) {
    const t = (tau * row) / 220;
    const center = spine(t, mode);
    const next = spine(t + 0.001, mode);
    const delta = next.map((n, i) => n - center[i]);
    const [dx, dy, dz] = delta.map((n) => n / Math.hypot(...delta));
    const horizontal = Math.hypot(dx, dy);
    const nx = -dy / horizontal;
    const ny = dx / horizontal;
    for (let col = 0; col < 38; col++) {
      const a = (tau * col) / 38;
      const u = 0.35 * Math.cos(a);
      const v = 0.35 * Math.sin(a);
      points.push([
        center[0] + nx * u - dz * ny * v,
        center[1] + ny * u + dz * nx * v,
        center[2] + horizontal * v,
        col,
      ]);
    }
  }
  return points;
}

export default function SignalStudy() {
  const canvas = useRef(null);
  const [mode, setMode] = useState(0);
  useEffect(() => {
    const node = canvas.current;
    const ctx = node.getContext("2d");
    if (!ctx) return;
    const cloud = makeCloud(mode);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width,
      height,
      frame,
      pointer = 0;
    function draw(now = performance.now()) {
      const phase = reduced.matches ? 1 : Math.min((now - start) / 2200, 1);
      const angle = 0.26 + pointer + 0.28 * Math.pow(1 - phase, 3);
      const ca = Math.cos(angle),
        sa = Math.sin(angle);
      const scale = Math.min(width / 4.55, height / 4.3);
      ctx.clearRect(0, 0, width, height);
      for (const [x, y, z, band] of cloud) {
        const turn = x * ca - y * sa;
        const lift = x * sa + y * ca;
        const depth = 0.71 * lift + 0.7 * z;
        const shade = Math.max(0.12, Math.min(1, 0.53 + depth * 0.24));
        const gold = band > 22 && band < 29;
        ctx.fillStyle = gold
          ? `rgba(255,190,133,${shade})`
          : `rgba(${142 + Math.round(shade * 95)},${108 + Math.round(shade * 90)},255,${shade})`;
        const size = scale * (0.008 + shade * 0.008);
        ctx.fillRect(
          width / 2 + turn * scale,
          height * 0.46 + (0.7 * lift - 0.71 * z) * scale,
          size,
          size,
        );
      }
      if (phase < 1) frame = requestAnimationFrame(draw);
    }
    const start = performance.now();
    function refresh() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(draw);
    }
    function resize() {
      width = node.clientWidth;
      height = node.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      node.width = Math.round(width * dpr);
      node.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      refresh();
    }
    function move(e) {
      if (reduced.matches || e.pointerType === "touch") return;
      pointer = (e.offsetX / width - 0.5) * 0.55;
      refresh();
    }
    const observer = new ResizeObserver(resize);
    observer.observe(node);
    node.addEventListener("pointermove", move);
    reduced.addEventListener("change", refresh);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      node.removeEventListener("pointermove", move);
      reduced.removeEventListener("change", refresh);
    };
  }, [mode]);
  return (
    <figure className="study">
      <canvas
        ref={canvas}
        aria-label={
          studies[mode] + " sculpture rendered from thousands of points"
        }
        role="img"
      />
      <figcaption>
        <span>
          Signal study <b>/</b> {studies[mode]}
        </span>
        <div className="study-controls">
          {studies.map((name, i) => (
            <button
              type="button"
              key={name}
              onClick={() => setMode(i)}
              aria-pressed={mode === i}
              aria-label={"Show " + name}
            >
              <i />
            </button>
          ))}
        </div>
      </figcaption>
    </figure>
  );
}


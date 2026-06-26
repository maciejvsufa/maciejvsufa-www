"use client";

import { useEffect, useRef } from "react";
import { clampDpr } from "@/lib/browser";

/**
 * TŁO TECHNOLOGICZNE — sieć węzłów (plexus): platynowe punkty dryfują po czerni,
 * łącząc się cienkimi liniami gdy są blisko; kursor delikatnie rozjaśnia okoliczne
 * połączenia. Czysty, profesjonalny "neural/AI" efekt (pasuje do portfolio AI-dev),
 * zero "komet"/smug. Rysuje na <canvas> fixed za całą treścią.
 *
 * Wydajność: ~30 fps, DPR clamp, pauza gdy karta w tle, mniej węzłów na mobile,
 * a przy prefers-reduced-motion — statyczna siatka bez animacji.
 * Lokalne (zero CDN), pointer-events: none, aria-hidden.
 */
export function SaltField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = clampDpr(1.5);
    const small = window.matchMedia("(max-width: 720px)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    type N = { x: number; y: number; vx: number; vy: number };
    const COUNT = small ? 38 : 92;
    const LINK = small ? 150 : 168; // dystans łączenia węzłów
    const nodes: N[] = [];
    for (let i = 0; i < COUNT; i++) {
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
      });
    }

    const mouse = { x: -1e9, y: -1e9 };
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = -1e9;
      mouse.y = -1e9;
    };

    const draw = (animate: boolean) => {
      ctx.clearRect(0, 0, w, h);

      // linie
      for (let i = 0; i < COUNT; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < COUNT; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < LINK) {
            const base = (1 - d / LINK) * 0.16;
            // rozjaśnienie połączeń przy kursorze
            const mx = (a.x + b.x) / 2 - mouse.x;
            const my = (a.y + b.y) / 2 - mouse.y;
            const near = Math.max(0, 1 - Math.hypot(mx, my) / 180);
            const alpha = Math.min(0.5, base + near * 0.28);
            ctx.strokeStyle = `rgba(201,192,173,${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // węzły
      for (let i = 0; i < COUNT; i++) {
        const a = nodes[i];
        const near = Math.max(0, 1 - Math.hypot(a.x - mouse.x, a.y - mouse.y) / 160);
        ctx.fillStyle = `rgba(201,192,173,${0.4 + near * 0.5})`;
        ctx.beginPath();
        ctx.arc(a.x, a.y, 1.3 + near * 1.1, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!animate) return;
      for (const a of nodes) {
        a.x += a.vx;
        a.y += a.vy;
        if (a.x < 0 || a.x > w) a.vx *= -1;
        if (a.y < 0 || a.y > h) a.vy *= -1;
      }
    };

    if (reduce) {
      draw(false);
      const onResizeStatic = () => {
        resize();
        draw(false);
      };
      window.addEventListener("resize", onResizeStatic);
      return () => window.removeEventListener("resize", onResizeStatic);
    }

    let raf = 0;
    let last = 0;
    let running = true;
    const tick = (ts: number) => {
      if (!running) return;
      raf = requestAnimationFrame(tick);
      if (ts - last < 33) return; // ~30 fps
      last = ts;
      draw(true);
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    const onVisibility = () => (document.hidden ? stop() : start());
    const onResize = () => resize();

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("resize", onResize);
    raf = requestAnimationFrame(tick);

    return () => {
      stop();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}

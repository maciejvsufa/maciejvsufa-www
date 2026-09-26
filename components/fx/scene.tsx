"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { SplitText } from "@/components/fx/split-text";

/**
 * Scena: jedna sekcja = jeden ekran przypięty na czas przewijania. Punkty (items) pokazują się
 * po kolei — aktywny wjeżdża, poprzedni odjeżdża w górę i gaśnie, następny czeka pod spodem.
 * Każda scena ma własny „klimat” (tone → kolor tła, poświata, duży numer w tle).
 *
 * Tryb przypięty włącza się dopiero po załadowaniu JS i tylko bez prefers-reduced-motion
 * (klasa .scenes-on na <html>). Bez tego wszystkie punkty stoją zwyczajnie jeden pod drugim.
 */
export function Scene({
  id,
  num,
  title,
  intro,
  tone,
  items,
  label,
}: {
  id: string;
  num: string;
  title: string;
  intro?: string;
  tone: "cream" | "sky" | "sage" | "gold" | "rose" | "navy";
  items: ReactNode[];
  /** Podpis licznika, np. „punkt” — dla czytnika ekranu. */
  label?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const n = items.length;

  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    root.classList.add("scenes-on");

    const el = ref.current;
    if (!el) return;
    const itemsEl = Array.from(el.querySelectorAll<HTMLElement>(".scene-item"));
    const countEl = el.querySelector<HTMLElement>(".scene-count-now");
    let raf = 0;
    let last = -1;

    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const total = Math.max(1, r.height - window.innerHeight);
      const p = Math.min(1, Math.max(0, -r.top / total));
      el.style.setProperty("--p", p.toFixed(3));
      const idx = Math.min(n - 1, Math.floor(p * n * 0.999));
      if (idx !== last) {
        last = idx;
        itemsEl.forEach((it, i) => {
          it.dataset.state = i < idx ? "past" : i === idx ? "active" : "next";
        });
        if (countEl) countEl.textContent = String(idx + 1).padStart(2, "0");
      }
      // wejście sceny: tło i numer rozświetlają się, gdy scena wjeżdża na ekran
      const enter = Math.min(1, Math.max(0, 1 - r.top / window.innerHeight));
      el.style.setProperty("--enter", enter.toFixed(3));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [n]);

  return (
    <section id={id} ref={ref} className={`scene tone-${tone}`} style={{ "--n": n } as React.CSSProperties}>
      <div className="scene-pin">
        {/* numer w tle to czysta dekoracja — treść z CSS (content), nie tekst strony */}
        <span className="scene-bignum" data-num={num} aria-hidden="true" />
        <span className="scene-glow" aria-hidden="true" />
        <div className="scene-grid">
          <header className="scene-head">
            <h2 className="scene-title">
              <SplitText text={`${num}.`} by="char" trigger="view" stagger={0.05} blur className="sec-num" />{" "}
              <SplitText text={title} by="char" trigger="view" start={0.1} stagger={0.035} blur />
            </h2>
            {intro ? <p className="scene-intro">{intro}</p> : null}
            {n > 1 ? (
              <div className="scene-count" aria-label={label}>
                <span className="scene-count-now">01</span>
                <span className="scene-count-sep">/</span>
                <span>{String(n).padStart(2, "0")}</span>
                <span className="scene-bar" aria-hidden="true">
                  <span />
                </span>
              </div>
            ) : null}
          </header>
          <div className="scene-stage">
            {items.map((it, i) => (
              <div key={i} className="scene-item" data-state={i === 0 ? "active" : "next"}>
                {it}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

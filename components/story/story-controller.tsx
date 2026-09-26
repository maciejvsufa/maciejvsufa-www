"use client";

import { useEffect } from "react";

/**
 * „Jedna strona”: ramka stoi w miejscu, przewijanie tylko podmienia treść.
 * Pod przypiętą ramką leżą niewidzialne „kroki” (.story-steps > .step) — to one mają wysokość
 * i identyfikatory kotwic (#o-mnie, #kontakt…). Pozycja przewinięcia wybiera aktywną scenę
 * i aktywny punkt w scenie; CSS robi przejścia (nowa scena odsłania się od dołu i najeżdża
 * na poprzednią). Bez JS klasa .story-on się nie pojawia i wszystko stoi jedno pod drugim.
 */
export function StoryController() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("story-on");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) root.classList.add("story-still");

    const frame = document.querySelector<HTMLElement>(".frame");
    const scenes = Array.from(document.querySelectorAll<HTMLElement>(".frame > .scene"));
    const steps = Array.from(document.querySelectorAll<HTMLElement>(".story-steps > .step"));
    const rail = Array.from(document.querySelectorAll<HTMLAnchorElement>(".rail a"));
    if (!frame || scenes.length !== steps.length) return;

    let tops: number[] = [];
    let hs: number[] = [];
    let visible: HTMLElement[][] = [];
    let last = -1;
    let lastItem = -1;
    let raf = 0;

    const measure = () => {
      tops = steps.map((s) => s.getBoundingClientRect().top + window.scrollY);
      hs = steps.map((s) => s.offsetHeight);
      // punkty widoczne na tej szerokości (np. cytat jest punktem tylko na telefonie)
      visible = scenes.map((sc) =>
        Array.from(sc.querySelectorAll<HTMLElement>(".scene-item")).filter((it) => getComputedStyle(it).display !== "none"),
      );
      scenes.forEach((sc, i) => {
        const tot = sc.querySelector(".scene-count-total");
        if (tot) tot.textContent = String(visible[i].length).padStart(2, "0");
        sc.classList.toggle("has-many", visible[i].length > 1);
      });
      lastItem = -1;
    };

    const update = () => {
      raf = 0;
      const y = window.scrollY + 1;
      let k = 0;
      for (let i = 0; i < tops.length; i++) if (tops[i] <= y) k = i;

      if (k !== last) {
        last = k;
        lastItem = -1;
        scenes.forEach((s, i) => {
          s.dataset.state = i < k ? "past" : i === k ? "active" : "next";
        });
        frame.dataset.tone = scenes[k].dataset.tone ?? "";
        frame.dataset.scene = String(k);
        rail.forEach((a) => a.classList.toggle("on", Number(a.dataset.i) === k));
      }

      const sc = scenes[k];
      const p = Math.min(1, Math.max(0, (y - tops[k]) / Math.max(1, hs[k])));
      sc.style.setProperty("--p", p.toFixed(3));
      const items = visible[k];
      if (items.length) {
        const idx = Math.min(items.length - 1, Math.floor(p * items.length));
        if (idx !== lastItem) {
          lastItem = idx;
          items.forEach((it, i) => {
            it.dataset.state = i < idx ? "past" : i === idx ? "active" : "next";
          });
          const now = sc.querySelector(".scene-count-now");
          if (now) now.textContent = String(idx + 1).padStart(2, "0");
        }
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      onScroll();
    };

    // Tab na link w ukrytym punkcie → przewiń do niego, żeby był widoczny
    const onFocus = (e: FocusEvent) => {
      const t = e.target as HTMLElement;
      const sc = t.closest<HTMLElement>(".scene");
      if (!sc) return;
      const k = scenes.indexOf(sc);
      const item = t.closest<HTMLElement>(".scene-item");
      const items = visible[k];
      const idx = item ? Math.max(0, items.indexOf(item)) : 0;
      const target = tops[k] + (hs[k] * (idx + 0.5)) / Math.max(1, items.length || 1);
      if (Math.abs(window.scrollY - target) > hs[k] / Math.max(1, items.length || 1) / 2) {
        window.scrollTo({ top: target, behavior: "instant" as ScrollBehavior });
      }
    };

    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    frame.addEventListener("focusin", onFocus);
    document.fonts?.ready.then(onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      frame.removeEventListener("focusin", onFocus);
      if (raf) cancelAnimationFrame(raf);
      root.classList.remove("story-on", "story-still");
    };
  }, []);

  return null;
}

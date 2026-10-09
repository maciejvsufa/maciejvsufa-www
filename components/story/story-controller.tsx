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
        // punkty niewidoczne na tej szerokości (np. karty tylko na telefon) nie mogą zostać „aktywne”
        sc.querySelectorAll<HTMLElement>(".scene-item").forEach((it) => {
          if (!visible[i].includes(it)) it.dataset.state = "next";
        });
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
        // nagłówek nad zdjęciem pierwszego ekranu — jasne napisy
        document.querySelector(".site-header")?.classList.toggle("on-hero", k === 0);
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
          // infografika: podświetl elementy przypisane do aktywnego punktu. Numeracja hl-N dotyczy
          // punktów treści — karty tylko na telefon (zdjęcie, cytat) stoją przed nimi i się nie liczą.
          const phoneOnly = items.filter((it) => it.classList.contains("only-phone")).length;
          const hIdx = idx - phoneOnly;
          sc.dataset.item = String(hIdx);
          sc.querySelectorAll<HTMLElement>(".hlx").forEach((el) =>
            el.classList.toggle("is-on", hIdx >= 0 && el.classList.contains(`hl-${hIdx}`)),
          );
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
      if (t.closest("dialog")) return;
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

    // ——— jeden gest = jedna karta ———
    // Machnięcie palcem, kółko myszy albo klawisz przesuwa dokładnie o jeden znacznik (.snap),
    // niezależnie od siły gestu; w trakcie przejazdu kolejne gesty są ignorowane.
    let snaps: number[] = [];
    const measureSnaps = () => {
      snaps = Array.from(document.querySelectorAll<HTMLElement>(".story-steps .snap"))
        .filter((el) => el.offsetParent !== null)
        .map((el) => Math.round(el.getBoundingClientRect().top + window.scrollY));
    };
    let lockUntil = 0;
    const nearest = () => {
      const y = window.scrollY;
      let best = 0;
      snaps.forEach((top, i) => {
        if (Math.abs(top - y) < Math.abs(snaps[best] - y)) best = i;
      });
      return best;
    };
    const go = (dir: 1 | -1) => {
      const now = performance.now();
      if (now < lockUntil || !snaps.length) return;
      const target = snaps[Math.min(snaps.length - 1, Math.max(0, nearest() + dir))];
      lockUntil = now + 750;
      window.scrollTo({ top: target, behavior: still ? ("instant" as ScrollBehavior) : "smooth" });
    };
    const still = root.classList.contains("story-still");

    // okno „Doświadczenie aktorskie” ma własne przewijanie — gdy jest otwarte, karty stoją
    const dialogOpen = () => document.querySelector("dialog[open]") !== null;

    const onWheel = (e: WheelEvent) => {
      if (dialogOpen()) return;
      if (e.ctrlKey || Math.abs(e.deltaY) < 4) return; // zoom przeglądarki i drobne drgania — bez zmian
      e.preventDefault();
      go(e.deltaY > 0 ? 1 : -1);
    };
    let touchY = 0;
    let touching = false;
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1 || dialogOpen()) return;
      touching = true;
      touchY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (touching && e.cancelable) e.preventDefault(); // bez natywnego „rozpędzania” strony
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (!touching) return;
      touching = false;
      const dy = touchY - e.changedTouches[0].clientY;
      if (Math.abs(dy) > 40) go(dy > 0 ? 1 : -1);
    };
    const onKey = (e: KeyboardEvent) => {
      if (dialogOpen()) return;
      const t = e.target as HTMLElement;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      if (["ArrowDown", "PageDown", " "].includes(e.key) && !e.shiftKey) {
        e.preventDefault();
        go(1);
      } else if (["ArrowUp", "PageUp"].includes(e.key) || (e.key === " " && e.shiftKey)) {
        e.preventDefault();
        go(-1);
      }
    };

    measure();
    measureSnaps();
    // stare kotwice (sprzed wizytówki) prowadzą do najbliższej karty, nie na górę strony
    const legacy: Record<string, string> = {
      "#uslugi": "co-robie",
      "#korzysci": "co-robie",
      "#jak-pracuje": "co-robie",
      "#wspolpraca": "co-robie",
      "#realizacje": "co-robie",
      "#o-mnie": "kontakt",
      "#faq": "kontakt",
      "#koniec": "kontakt",
    };
    const to = legacy[window.location.hash];
    if (to) {
      history.replaceState(null, "", `#${to}`);
      const el = document.getElementById(to);
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: "instant" as ScrollBehavior });
    }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("resize", measureSnaps);
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKey);
    frame.addEventListener("focusin", onFocus);
    document.fonts?.ready.then(() => {
      onResize();
      measureSnaps();
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("resize", measureSnaps);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKey);
      frame.removeEventListener("focusin", onFocus);
      if (raf) cancelAnimationFrame(raf);
      root.classList.remove("story-on", "story-still");
    };
  }, []);

  return null;
}

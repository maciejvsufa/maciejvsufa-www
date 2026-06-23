/** Helpery przeglądarkowe dla animacji hero (technika: lekkie three.js). */

/** Mobile/wąski ekran — wtedy pomijamy three.js całkowicie (LCP < 1s). */
export function isSmallScreen(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(max-width: 720px)").matches;
}

/** Ogranicz devicePixelRatio (wydajność WebGL na ekranach HiDPI). */
export function clampDpr(max = 1.6): number {
  if (typeof window === "undefined") return 1;
  return Math.min(window.devicePixelRatio || 1, max);
}

/**
 * Wywołuje cb(visible) gdy element wchodzi/wychodzi z ekranu.
 * Pozwala pauzować pętlę animacji poza widokiem. Zwraca funkcję czyszczącą.
 */
export function watchVisibility(
  el: Element,
  cb: (visible: boolean) => void,
): () => void {
  if (typeof IntersectionObserver === "undefined") {
    cb(true);
    return () => {};
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) cb(e.isIntersecting);
    },
    { threshold: 0.01 },
  );
  io.observe(el);
  return () => io.disconnect();
}

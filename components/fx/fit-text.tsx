"use client";

import { useEffect, useRef } from "react";

/**
 * Wielki napis dopasowany do szerokości kontenera — jak tekst w SVG w szablonie Syntax CV
 * (najszersza linia wypełnia całą szerokość). CSS daje przybliżony rozmiar od razu,
 * po załadowaniu fontu JS dociąga go do dokładnej szerokości.
 */
export function FitText({
  lines,
  align = "left",
  as: Tag = "p",
  className = "",
  fitHeightOf,
}: {
  lines: string[];
  align?: "left" | "right";
  as?: "h1" | "p";
  className?: string;
  /** Zmniejsz napis, jeśli sekcja o tej klasie nie mieści się w wysokości ekranu (hero). */
  fitHeightOf?: string;
}) {
  const ref = useRef<HTMLHeadingElement & HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fit = () => {
      const box = el.parentElement;
      if (!box) return;
      el.style.fontSize = "100px";
      const spans = Array.from(el.querySelectorAll<HTMLElement>(".fit-line"));
      const widest = Math.max(...spans.map((s) => s.getBoundingClientRect().width));
      if (widest <= 0) return;
      let size = (box.clientWidth / widest) * 100 * 0.995;
      el.style.fontSize = `${size}px`;
      // hero ma się mieścić na jednym ekranie: nadmiar wysokości zabieramy z napisu
      // (tylko od 810 px — na telefonie hero celowo jest wyższe niż ekran)
      const section = fitHeightOf && window.innerWidth >= 810 ? el.closest<HTMLElement>(fitHeightOf) : null;
      if (section) {
        const over = section.scrollHeight - window.innerHeight;
        if (over > 0) {
          size = Math.max(48, size - over / (lines.length * 0.9));
          el.style.fontSize = `${size}px`;
        }
      }
    };
    fit();
    document.fonts?.ready.then(fit);
    const ro = new ResizeObserver(fit);
    if (el.parentElement) ro.observe(el.parentElement);
    window.addEventListener("resize", fit);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, [fitHeightOf, lines.length]);

  return (
    <Tag ref={ref} className={`fit ${className}`} style={{ textAlign: align }}>
      {lines.map((l, i) => (
        <span key={i} className="block">
          <span className="fit-line">{l}</span>
        </span>
      ))}
    </Tag>
  );
}

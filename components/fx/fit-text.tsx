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
}: {
  lines: string[];
  align?: "left" | "right";
  as?: "h1" | "p";
  className?: string;
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
      if (widest > 0) el.style.fontSize = `${(box.clientWidth / widest) * 100 * 0.995}px`;
    };
    fit();
    document.fonts?.ready.then(fit);
    const ro = new ResizeObserver(fit);
    if (el.parentElement) ro.observe(el.parentElement);
    return () => ro.disconnect();
  }, []);

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

"use client";

import { useEffect, useRef, type ElementType } from "react";

/**
 * Efekt tekstu z szablonu Syntax CV (Framer „appear”):
 * tekst dzielony na litery albo słowa, każda część wjeżdża z opacity .001 → 1 i translateY(10px) → 0,
 * opcjonalnie z blur(10px). Krok (stagger) i opóźnienie startu jak w konfiguracji szablonu.
 * trigger="mount" — animacja CSS od razu; trigger="view" — po wejściu w ekran (IntersectionObserver).
 * Czytnik ekranu dostaje cały tekst (ukryty .sr-only), części są aria-hidden.
 */
export function SplitText({
  text,
  as: Tag = "span",
  by = "word",
  trigger = "view",
  start = 0,
  stagger = 0.075,
  blur = false,
  className = "",
}: {
  text: string;
  as?: ElementType;
  by?: "char" | "word";
  trigger?: "mount" | "view";
  start?: number;
  stagger?: number;
  blur?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (trigger !== "view") return;
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [trigger]);

  const words = text.split(" ");
  let i = 0;
  const part = (content: string, key: string) => {
    const d = start + i++ * stagger;
    return (
      <span key={key} className="sp" style={{ "--d": `${d}s` } as React.CSSProperties}>
        {content}
      </span>
    );
  };

  return (
    <Tag
      ref={ref}
      className={`split split-${trigger}${blur ? " split-blur" : ""} ${className}`}
    >
      <span className="sr-only">{text}</span>
      {words.map((w, wi) => (
        <span key={wi} aria-hidden="true">
          {by === "char" ? (
            <span className="whitespace-nowrap">{Array.from(w).map((ch, ci) => part(ch, `${wi}-${ci}`))}</span>
          ) : (
            part(w, `${wi}`)
          )}
          {wi < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}

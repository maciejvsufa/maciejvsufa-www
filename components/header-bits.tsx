"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { SiteContent } from "@/lib/content";
/** Dolny napis nagłówka: „Przewiń” na hero, „Do góry” po przewinięciu (jak „Scroll” → „Back to Top”). */
export function ScrollLabel({ scroll, top }: { scroll: string; top: string }) {
  const [down, setDown] = useState(false);

  useEffect(() => {
    // tylko przełączenie „Przewiń” ↔ „Do góry”; setState wyłącznie przy zmianie (bez pracy na każdą klatkę)
    let last = false;
    let raf = 0;
    const on = () => {
      raf = 0;
      const d = window.scrollY > window.innerHeight * 0.5;
      if (d !== last) {
        last = d;
        setDown(d);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(on);
    };
    on();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className={`hdr-bottom${down ? " is-down" : ""}`}>
      {down ? (
        <a href="#top" className="hdr-scroll">
          {top}
        </a>
      ) : (
        <a href="#co-robie" className="hdr-scroll">
          {scroll}
        </a>
      )}
    </div>
  );
}

/** Menu na telefonie: „Menu” otwiera panel z CV, kontaktem i przełącznikiem języka. */
export function MobileMenu({ t }: { t: SiteContent }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="hdr-menu">
      <button type="button" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((v) => !v)}>
        {open ? t.ui.menuClose : t.ui.menu}
      </button>
      {open ? (
        <div id="mobile-menu" className="menu-panel">
          {t.ui.nav.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)}>
              {n.label}
            </a>
          ))}
          <a className="hdr-cta" href={t.ui.ctaHref} onClick={() => setOpen(false)}>
            {t.ui.cta}
            <i aria-hidden="true">↗</i>
          </a>
          <span className="menu-lang">
            <Link href="/" hrefLang="pl" lang="pl">
              PL
            </Link>
            {" / "}
            <Link href="/en/" hrefLang="en" lang="en">
              EN
            </Link>
          </span>
        </div>
      ) : null}
    </div>
  );
}

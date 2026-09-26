"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { SiteContent } from "@/lib/content";
import { site } from "@/lib/site";

/** Dolny napis nagłówka: „Przewiń” na hero, „Do góry” po przewinięciu (jak „Scroll” → „Back to Top”). */
export function ScrollLabel({ scroll, top }: { scroll: string; top: string }) {
  const [down, setDown] = useState(false);

  useEffect(() => {
    const root = document.documentElement.style;
    const on = () => {
      const vh = window.innerHeight;
      const d = window.scrollY > vh * 0.5;
      setDown(d);
      // przyciemnienie pod nagłówkiem, gdy treść jedzie pod nim
      root.setProperty("--hdr-shade", d ? "1" : "0");
      // postęp wyjazdu hero 0..1 — treść hero płynnie gaśnie, zamiast wjeżdżać pod nagłówek
      root.setProperty("--hp", Math.min(1, window.scrollY / (vh * 0.6)).toFixed(3));
      // postęp zakrywania pierwszego ekranu 0..1 — zdjęcie gaśnie, gdy taśma na nie najeżdża
      root.setProperty("--hq", Math.min(1, window.scrollY / vh).toFixed(3));
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <div className={`hdr-bottom${down ? " is-down" : ""}`}>
      {down ? (
        <a href="#top" className="hdr-scroll">
          {top}
        </a>
      ) : (
        <a href="#o-mnie" className="hdr-scroll">
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
          <a href={t.ui.cvHref} onClick={() => setOpen(false)}>
            {t.ui.downloadCv}
          </a>
          <a href={`mailto:${site.email}`} onClick={() => setOpen(false)}>
            {t.ui.contactMe}
          </a>
          <a href="#kontakt" onClick={() => setOpen(false)}>
            {t.kontakt.title}
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

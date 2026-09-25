"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { SiteContent } from "@/lib/content";
import { site } from "@/lib/site";

/** Dolny napis nagłówka: „Przewiń” na hero, „Do góry” po przewinięciu (jak „Scroll” → „Back to Top”). */
export function ScrollLabel({ scroll, top }: { scroll: string; top: string }) {
  const [down, setDown] = useState(false);

  useEffect(() => {
    const on = () => {
      const d = window.scrollY > window.innerHeight * 0.5;
      setDown(d);
      // telefon: przyciemnienie pod nagłówkiem, gdy treść jedzie pod nim
      document.documentElement.style.setProperty("--hdr-shade", d ? "1" : "0");
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <div className="hdr-bottom">
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

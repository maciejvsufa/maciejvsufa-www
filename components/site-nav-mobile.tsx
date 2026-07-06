"use client";

import { useEffect, useRef, useState } from "react";

type NavLink = { href: string; label: string };

/**
 * Hamburger dla <=820px (tam gdzie CSS chowa .nav-lnk).
 * Panel z linkami sekcji; zamyka się po kliknięciu linku, Escape i kliknięciu poza.
 */
export function SiteNavMobile({
  links,
  cta,
  menuOpen,
  menuClose,
}: {
  links: NavLink[];
  cta: NavLink;
  menuOpen: string;
  menuClose: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="nav-burger-wrap">
      <button
        type="button"
        className="nav-burger"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? menuClose : menuOpen}
        onClick={() => setOpen((v) => !v)}
      >
        <span aria-hidden="true" className={`burger-ico${open ? " is-open" : ""}`}>
          <span />
          <span />
          <span />
        </span>
      </button>
      {open ? (
        <div id="mobile-menu" className="nav-panel">
          {links.map((l) => (
            <a key={l.href} className="nav-panel-lnk font-mono" href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a className="nav-panel-lnk nav-panel-cta font-mono" href={cta.href} onClick={() => setOpen(false)}>
            {cta.label}
          </a>
        </div>
      ) : null}
    </div>
  );
}

"use client";

import type { CSSProperties } from "react";
import type { SiteContent } from "@/lib/content";

const DIALOG_ID = "aktorstwo";
const i = (n: number) => ({ "--i": n }) as CSSProperties;

/** Przycisk na karcie „Kto za tym stoi” — otwiera okno z pełną listą ról. */
export function ActingButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="btn acting-btn"
      aria-haspopup="dialog"
      aria-controls={DIALOG_ID}
      onClick={() => document.querySelector<HTMLDialogElement>(`#${DIALOG_ID}`)?.showModal()}
    >
      {label}
      <i aria-hidden="true">↗</i>
    </button>
  );
}

/**
 * Okno „Doświadczenie aktorskie” (natywny <dialog>, showModal). Stoi poza ramką (.frame),
 * więc sterownik przewijania kart go nie łapie; lista przewija się w środku okna.
 * Zamyka: Esc, krzyżyk, klik w tło. Fokus wraca na przycisk (zachowanie przeglądarki).
 */
export function ActingDialog({ a }: { a: SiteContent["aktorstwo"] }) {
  return (
    <dialog
      id={DIALOG_ID}
      className="acting-dialog"
      aria-labelledby={`${DIALOG_ID}-h`}
      onClick={(e) => {
        if (e.target === e.currentTarget) e.currentTarget.close();
      }}
    >
      <div className="ad-panel">
        <header className="ad-head">
          <h2 id={`${DIALOG_ID}-h`} className="ad-title">
            {a.button}
          </h2>
          <form method="dialog">
            <button type="submit" className="ad-close" aria-label={a.close}>
              ×
            </button>
          </form>
        </header>
        <div className="ad-body">
          <p className="ad-lead">{a.lead}</p>

          <h3 className="ad-h">{a.filmLabel}</h3>
          <ul className="ad-list">
            {a.film.map((r, n) => (
              <li key={`${r.y}-${r.t}-${r.r}`} className={r.main ? "is-main" : undefined} style={i(n)}>
                <span className="ad-year">{r.y}</span>
                <span className="ad-t">
                  <b>{r.t}</b>
                  {r.main ? <span className="ad-main">{a.mainRole}</span> : null}
                  <small>{r.r}</small>
                </span>
              </li>
            ))}
          </ul>

          <h3 className="ad-h">{a.stageLabel}</h3>
          <ul className="ad-list">
            {a.stage.map((r, n) => (
              <li key={`${r.y}-${r.t}`} style={i(n)}>
                <span className="ad-year">{r.y}</span>
                <span className="ad-t">
                  <b>{r.t}</b>
                  <small>{r.r}</small>
                </span>
              </li>
            ))}
          </ul>

          <p className="ad-links">
            <span className="meta">{a.linksLabel}:</span>
            {a.links.map((l) => (
              <a key={l.href} className="lnk" href={l.href} target="_blank" rel="noopener noreferrer">
                {l.label} ↗
              </a>
            ))}
          </p>
        </div>
      </div>
    </dialog>
  );
}

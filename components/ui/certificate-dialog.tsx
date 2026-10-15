"use client";

import type { SiteContent } from "@/lib/content";

const DIALOG_ID = "certyfikat";

/** Przycisk pod „Doświadczenie aktorskie” — otwiera skan certyfikatu. */
export function CertificateButton({ c }: { c: SiteContent["certyfikat"] }) {
  return (
    <button
      type="button"
      className="btn acting-btn cert-btn"
      aria-haspopup="dialog"
      aria-controls={DIALOG_ID}
      onClick={() => document.querySelector<HTMLDialogElement>(`#${DIALOG_ID}`)?.showModal()}
    >
      <span className="cert-btn-label">
        <b>{c.button}</b>
        {c.name}
      </span>
      <i aria-hidden="true">↗</i>
    </button>
  );
}

/**
 * Okno ze skanem certyfikatu. Stoi poza ramką (.frame), jak okno aktorskie,
 * więc przewijanie kart go nie łapie. Zamyka: Esc, krzyżyk, klik w tło.
 */
export function CertificateDialog({ c }: { c: SiteContent["certyfikat"] }) {
  return (
    <dialog
      id={DIALOG_ID}
      className="acting-dialog cert-dialog"
      aria-labelledby={`${DIALOG_ID}-h`}
      onClick={(e) => {
        if (e.target === e.currentTarget) e.currentTarget.close();
      }}
    >
      <div className="ad-panel">
        <header className="ad-head">
          <div>
            <p className="meta">{c.button}</p>
            <h2 id={`${DIALOG_ID}-h`} className="ad-title">
              {c.name}
            </h2>
            <p className="cert-note">{c.note}</p>
          </div>
          <form method="dialog">
            <button type="submit" className="ad-close" aria-label={c.close}>
              ×
            </button>
          </form>
        </header>
        <div className="ad-body">
          {/* eslint-disable-next-line @next/next/no-img-element -- statyczny eksport, skan już przygotowany */}
          <img className="cert-scan" src={c.image} alt={c.imageAlt} width={1600} height={1088} />
        </div>
      </div>
    </dialog>
  );
}

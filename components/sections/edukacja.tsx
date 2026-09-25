import type { SiteContent } from "@/lib/content";
import { SecHead } from "@/components/ui/sec-head";
import { CertBadge } from "@/components/ui/cert-badge";

/** Edukacja (06) i języki (07) — dwie krótkie sekcje obok siebie na desktopie. */
export function Edukacja({ t }: { t: SiteContent }) {
  const e = t.education;
  const l = t.languages;
  return (
    <div className="grid gap-x-12 md:grid-cols-[1.4fr_1fr]">
      <section id="edukacja" aria-labelledby="edukacja-title" className="cv-section">
        <SecHead id="edukacja-title" num={e.kicker} title={e.title} />
        {e.items.map((it, i) => (
          <div key={it.org} className="row">
            <p className="row-meta">
              <span className="text-text">{it.org}</span>
              <span className="sep">•</span>
              {it.years}
            </p>
            <p className="flex items-start gap-2.5">
              {i === 1 ? <CertBadge className="mt-0.5 h-6 w-6 shrink-0 text-accent" /> : null}
              <span>{it.p}</span>
            </p>
          </div>
        ))}
      </section>
      <section id="jezyki" aria-labelledby="jezyki-title" className="cv-section">
        <SecHead id="jezyki-title" num={l.kicker} title={l.title} />
        <ul className="grid gap-4">
          {l.items.map((it) => (
            <li key={it.name}>
              <span className="text-[17px] font-semibold">{it.name}</span>
              <span className="mt-1 block font-mono text-[12.5px] text-text3">{it.level}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

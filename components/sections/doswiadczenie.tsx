import type { SiteContent } from "@/lib/content";
import { SecHead } from "@/components/ui/sec-head";
import { Reveal } from "@/components/ui/reveal";

/** Doświadczenie: „Firma • opis • lata”, rola, jedno zdanie, linki. */
export function Doswiadczenie({ t }: { t: SiteContent }) {
  const e = t.experience;
  return (
    <section id="doswiadczenie" aria-labelledby="doswiadczenie-title" className="cv-section">
      <SecHead id="doswiadczenie-title" num={e.kicker} title={e.title} />
      <div>
        {e.items.map((job) => (
          <Reveal key={job.org} className="row">
            <p className="row-meta">
              <span className="text-text">{job.org}</span>
              <span className="sep">•</span>
              {job.meta}
              <span className="sep">•</span>
              {job.years}
            </p>
            <h3>{job.role}</h3>
            <p>{job.p}</p>
            {job.links ? (
              <p className="mt-1 flex flex-wrap gap-4">
                {job.links.map((l) => (
                  <a key={l.href} className="lnk" href={l.href} target="_blank" rel="noopener noreferrer">
                    {l.label} <span aria-hidden="true">↗</span>
                  </a>
                ))}
              </p>
            ) : null}
          </Reveal>
        ))}
      </div>
    </section>
  );
}

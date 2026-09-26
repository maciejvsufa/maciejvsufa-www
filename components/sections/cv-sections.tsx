import type { SiteContent } from "@/lib/content";
import { site } from "@/lib/site";
import { Scene } from "@/components/fx/scene";
import { CopyEmail } from "@/components/ui/copy-email";

/*
 * Każda sekcja to scena (components/fx/scene.tsx): przypięty ekran, punkty pojawiają się
 * po kolei, każda scena ma własny klimat (tone). Karty są duże — jeden punkt naraz.
 */

/** 01. O mnie — lead + dwa akapity w jednej karcie. */
export function OMnie({ t }: { t: SiteContent }) {
  const a = t.about;
  const [first, ...rest] = a.body[0].split(/(?<=\.)\s/);
  return (
    <Scene
      id="o-mnie"
      num={a.kicker}
      title={a.title}
      tone="cream"
      items={[
        <article key="a" className="pcard">
          <p className="pcard-lead">{first}</p>
          <p className="pcard-txt">{rest.join(" ")}</p>
          {a.body.slice(1).map((p) => (
            <p key={p.slice(0, 24)} className="pcard-txt">
              {p}
            </p>
          ))}
        </article>,
      ]}
    />
  );
}

/** 02. Doświadczenie — jedna rola na ekran. */
export function Doswiadczenie({ t }: { t: SiteContent }) {
  const e = t.experience;
  return (
    <Scene
      id="doswiadczenie"
      num={e.kicker}
      title={e.title}
      tone="sky"
      label={e.title}
      items={e.items.map((job) => (
        <article key={job.org} className="pcard pcard-line">
          <div className="pcard-top">
            <span className="org">{job.org}</span>
            <span className="badge">{job.years || job.meta}</span>
          </div>
          {job.years ? <p className="meta">{job.meta}</p> : null}
          <h3 className="pcard-h">{job.role}</h3>
          <p className="pcard-txt">{job.p}</p>
          {job.links ? (
            <p className="pcard-links">
              {job.links.map((l) => (
                <a key={l.href} className="lnk" href={l.href} target="_blank" rel="noopener noreferrer">
                  {l.label} ↗
                </a>
              ))}
            </p>
          ) : null}
        </article>
      ))}
    />
  );
}

/** 03. Co robię — granatowe karty, jedna usługa na ekran. */
export function CoRobie({ t }: { t: SiteContent }) {
  const c = t.coRobie;
  return (
    <Scene
      id="co-robie"
      num={c.kicker}
      title={c.title}
      tone="sage"
      label={c.title}
      items={c.items.map((it, i) => (
        <article key={it.h} className="pcard pcard-dark">
          <span className="pcard-kicker">0{i + 1}</span>
          <h3 className="pcard-h">{it.h}</h3>
          <p className="pcard-txt">{it.p}</p>
        </article>
      ))}
    />
  );
}

/** 04. Jak pracuję — wstęp przy tytule, zasady po kolei na złotych kartach. */
export function JakPracuje({ t }: { t: SiteContent }) {
  const j = t.jakPracuje;
  return (
    <Scene
      id="jak-pracuje"
      num={j.kicker}
      title={j.title}
      intro={j.intro}
      tone="gold"
      label={j.title}
      items={j.points.map((p, i) => (
        <article key={p.h} className="pcard pcard-gold">
          <span className="pcard-bignum">0{i + 1}</span>
          <h3 className="pcard-h">{p.h}</h3>
          <p className="pcard-txt">{p.p}</p>
        </article>
      ))}
    />
  );
}

/** 05. Umiejętności — tagi w jednej karcie. */
export function Umiejetnosci({ t }: { t: SiteContent }) {
  const s = t.skills;
  return (
    <Scene
      id="umiejetnosci"
      num={s.kicker}
      title={s.title}
      tone="rose"
      items={[
        <article key="s" className="pcard">
          <ul className="tags">
            {s.items.map((it) => (
              <li key={it} className="tag">
                {it}
              </li>
            ))}
          </ul>
        </article>,
      ]}
    />
  );
}

/** 06. Edukacja — szkoła, potem certyfikat ze zdjęciem. */
export function Edukacja({ t }: { t: SiteContent }) {
  const e = t.education;
  return (
    <Scene
      id="edukacja"
      num={e.kicker}
      title={e.title}
      tone="sky"
      label={e.title}
      items={e.items.map((it) => (
        <article key={it.org} className="pcard pcard-line">
          <div className="pcard-top">
            <span className="org">{it.org}</span>
            <span className="badge">{it.years}</span>
          </div>
          <h3 className="pcard-h">{it.h}</h3>
          <p className="pcard-txt">{it.p}</p>
          {it.cert ? (
            <a className="cert" href={it.cert.full} target="_blank" rel="noopener noreferrer">
              {/* eslint-disable-next-line @next/next/no-img-element -- statyczny eksport, plik już zoptymalizowany (scripts/build-cert.mjs) */}
              <img src={it.cert.src} alt={it.cert.alt} width={640} height={435} loading="lazy" decoding="async" />
              <span className="lnk">{it.cert.open} ↗</span>
            </a>
          ) : null}
        </article>
      ))}
    />
  );
}

/** 07. Języki — dwa kafelki w jednej karcie. */
export function Jezyki({ t }: { t: SiteContent }) {
  const l = t.languages;
  return (
    <Scene
      id="jezyki"
      num={l.kicker}
      title={l.title}
      tone="sage"
      items={[
        <ul key="l" className="grid-2">
          {l.items.map((it) => (
            <li key={it.name} className="pcard lang-card">
              <span className="pcard-h">{it.name}</span>
              <span className="meta">{it.level}</span>
            </li>
          ))}
        </ul>,
      ]}
    />
  );
}

/** 08. Kontakt — e-mail na granatowej karcie, strony i social media obok. */
export function Kontakt({ t }: { t: SiteContent }) {
  const k = t.kontakt;
  const socials = [
    { href: site.socials.instagram, label: "Instagram" },
    { href: site.socials.facebook, label: "Facebook" },
    { href: site.socials.linkedin, label: "LinkedIn" },
    { href: site.socials.github, label: "GitHub" },
  ];
  return (
    <Scene
      id="kontakt"
      num={k.kicker}
      title={k.title}
      tone="cream"
      items={[
        <div key="k" className="contact-grid">
          <div className="pcard pcard-dark contact-mail">
            <span className="pcard-kicker">{k.emailLabel}</span>
            <a className="cval" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            <div className="mt-4">
              <CopyEmail email={site.email} label={t.ui.copyEmail} copied={t.ui.emailCopied} />
            </div>
          </div>
          <div className="pcard">
            <p className="meta mb-2">{k.sitesLabel}</p>
            {k.sites.map((s) => (
              <a key={s.label} className="cval" href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            ))}
          </div>
          <div className="pcard">
            <p className="meta mb-2">{k.socialsLabel}</p>
            {socials.map((s) => (
              <a key={s.label} className="cval" href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            ))}
          </div>
        </div>,
      ]}
    />
  );
}

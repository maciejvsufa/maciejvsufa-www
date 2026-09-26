import type { SiteContent } from "@/lib/content";
import { site } from "@/lib/site";
import { Section } from "@/components/ui/section";
import { FadeIn } from "@/components/fx/fade-in";
import { CopyEmail } from "@/components/ui/copy-email";

/*
 * Każdy punkt to osobna karta (ramka, tło, cień), a sekcje różnią się odcieniem:
 * Doświadczenie — jasne karty ze złotym paskiem, Co robię — granatowe, Jak pracuję — złote,
 * Edukacja i Kontakt — jasne. FadeIn jest opakowaniem, karta w środku (hover nie walczy z wjazdem).
 */

/** 01. O mnie — pierwsze zdanie jako lead (szeryf), reszta zwykłym tekstem. */
export function OMnie({ t }: { t: SiteContent }) {
  const a = t.about;
  const [first, ...rest] = a.body[0].split(/(?<=\.)\s/);
  return (
    <Section id="o-mnie" num={a.kicker} title={a.title}>
      <FadeIn>
        <div className="card card-soft">
          <p className="lead">{first}</p>
          <p className="txt mt-4">{rest.join(" ")}</p>
          {a.body.slice(1).map((p) => (
            <p key={p.slice(0, 24)} className="txt mt-4">
              {p}
            </p>
          ))}
        </div>
      </FadeIn>
    </Section>
  );
}

/** 02. Doświadczenie — firma + plakietka z latami, stanowisko, opis, linki. */
export function Doswiadczenie({ t }: { t: SiteContent }) {
  const e = t.experience;
  return (
    <Section id="doswiadczenie" num={e.kicker} title={e.title}>
      <div className="items">
        {e.items.map((job) => (
          <FadeIn key={job.org}>
            <article className="card card-line">
              <div className="card-top">
                <span className="org">{job.org}</span>
                <span className="badge">{job.years || job.meta}</span>
              </div>
              {job.years ? <p className="meta mt-1">{job.meta}</p> : null}
              <h3 className="h3">{job.role}</h3>
              <p className="txt mt-3">{job.p}</p>
              {job.links ? (
                <p className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                  {job.links.map((l) => (
                    <a key={l.href} className="lnk" href={l.href} target="_blank" rel="noopener noreferrer">
                      {l.label} ↗
                    </a>
                  ))}
                </p>
              ) : null}
            </article>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

/** 03. Co robię — granatowe karty w siatce 2×2. */
export function CoRobie({ t }: { t: SiteContent }) {
  const c = t.coRobie;
  return (
    <Section id="co-robie" num={c.kicker} title={c.title}>
      <div className="grid-2">
        {c.items.map((it, i) => (
          <FadeIn key={it.h}>
            <article className="card card-dark h-full">
              <span className="card-num">0{i + 1}</span>
              <h3 className="h3">{it.h}</h3>
              <p className="txt mt-3">{it.p}</p>
            </article>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

/** 04. Jak pracuję — wstęp + złote karty z dużą cyfrą. */
export function JakPracuje({ t }: { t: SiteContent }) {
  const j = t.jakPracuje;
  return (
    <Section id="jak-pracuje" num={j.kicker} title={j.title}>
      <FadeIn>
        <p className="lead">{j.intro}</p>
      </FadeIn>
      <div className="items mt-8">
        {j.points.map((p, i) => (
          <FadeIn key={p.h}>
            <article className="card card-gold card-row">
              <span className="big-num">0{i + 1}</span>
              <div>
                <h3 className="h3 !mt-0">{p.h}</h3>
                <p className="txt mt-2">{p.p}</p>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

/** 05. Umiejętności — tagi w karcie. */
export function Umiejetnosci({ t }: { t: SiteContent }) {
  const s = t.skills;
  return (
    <Section id="umiejetnosci" num={s.kicker} title={s.title}>
      <FadeIn>
        <div className="card card-soft">
          <ul className="tags">
            {s.items.map((it) => (
              <li key={it} className="tag">
                {it}
              </li>
            ))}
          </ul>
        </div>
      </FadeIn>
    </Section>
  );
}

/** 06. Edukacja — jasne karty; certyfikat w karcie Google & SGH. */
export function Edukacja({ t }: { t: SiteContent }) {
  const e = t.education;
  return (
    <Section id="edukacja" num={e.kicker} title={e.title}>
      <div className="items">
        {e.items.map((it) => (
          <FadeIn key={it.org}>
            <article className="card card-line">
              <div className="card-top">
                <span className="org">{it.org}</span>
                <span className="badge">{it.years}</span>
              </div>
              <h3 className="h3">{it.h}</h3>
              <p className="txt mt-3">{it.p}</p>
              {it.cert ? (
                <a className="cert" href={it.cert.full} target="_blank" rel="noopener noreferrer">
                  {/* eslint-disable-next-line @next/next/no-img-element -- statyczny eksport, plik już zoptymalizowany (scripts/build-cert.mjs) */}
                  <img src={it.cert.src} alt={it.cert.alt} width={640} height={435} loading="lazy" decoding="async" />
                  <span className="lnk">{it.cert.open} ↗</span>
                </a>
              ) : null}
            </article>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

/** 07. Języki — kafelki. */
export function Jezyki({ t }: { t: SiteContent }) {
  const l = t.languages;
  return (
    <Section id="jezyki" num={l.kicker} title={l.title}>
      <FadeIn>
        <ul className="grid-2">
          {l.items.map((it) => (
            <li key={it.name} className="card card-soft lang-card">
              <span className="h3 !mt-0">{it.name}</span>
              <span className="meta">{it.level}</span>
            </li>
          ))}
        </ul>
      </FadeIn>
    </Section>
  );
}

/** 08. Kontakt — trzy karty: e-mail (wyróżniona, granatowa), strony, social media. */
export function Kontakt({ t }: { t: SiteContent }) {
  const k = t.kontakt;
  const socials = [
    { href: site.socials.instagram, label: "Instagram" },
    { href: site.socials.facebook, label: "Facebook" },
    { href: site.socials.linkedin, label: "LinkedIn" },
    { href: site.socials.github, label: "GitHub" },
  ];
  return (
    <Section id="kontakt" num={k.kicker} title={k.title}>
      <div className="items">
        <FadeIn>
          <div className="card card-dark">
            <p className="card-num">{k.emailLabel}</p>
            <a className="cval" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            <div className="mt-4">
              <CopyEmail email={site.email} label={t.ui.copyEmail} copied={t.ui.emailCopied} />
            </div>
          </div>
        </FadeIn>
        <div className="grid-2">
          <FadeIn>
            <div className="card card-soft h-full">
              <p className="meta mb-2">{k.sitesLabel}</p>
              {k.sites.map((s) => (
                <a key={s.label} className="cval" href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              ))}
            </div>
          </FadeIn>
          <FadeIn>
            <div className="card card-soft h-full">
              <p className="meta mb-2">{k.socialsLabel}</p>
              {socials.map((s) => (
                <a key={s.label} className="cval" href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </Section>
  );
}

import type { SiteContent } from "@/lib/content";
import { site } from "@/lib/site";
import { Section } from "@/components/ui/section";
import { FadeIn } from "@/components/fx/fade-in";
import { CopyEmail } from "@/components/ui/copy-email";

/** 01. O mnie */
export function OMnie({ t }: { t: SiteContent }) {
  const a = t.about;
  return (
    <Section id="o-mnie" num={a.kicker} title={a.title}>
      <FadeIn className="stack-16">
        {a.body.map((p) => (
          <p key={p.slice(0, 24)} className="txt">
            {p}
          </p>
        ))}
      </FadeIn>
    </Section>
  );
}

/** 02. Doświadczenie — „Firma • opis • lata”, stanowisko, opis, linki. */
export function Doswiadczenie({ t }: { t: SiteContent }) {
  const e = t.experience;
  return (
    <Section id="doswiadczenie" num={e.kicker} title={e.title}>
      <div className="items">
        {e.items.map((job) => (
          <FadeIn key={job.org} className="item">
            <p className="meta">{[job.org, job.meta, job.years].filter(Boolean).join("  •  ")}</p>
            <h3 className="h3">{job.role}</h3>
            <p className="txt mt-6">{job.p}</p>
            {job.links ? (
              <p className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                {job.links.map((l) => (
                  <a key={l.href} className="lnk" href={l.href} target="_blank" rel="noopener noreferrer">
                    {l.label} ↗
                  </a>
                ))}
              </p>
            ) : null}
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

/** 03. Co robię */
export function CoRobie({ t }: { t: SiteContent }) {
  const c = t.coRobie;
  return (
    <Section id="co-robie" num={c.kicker} title={c.title}>
      <div className="items">
        {c.items.map((it) => (
          <FadeIn key={it.h} className="item">
            <h3 className="h3">{it.h}</h3>
            <p className="txt mt-6">{it.p}</p>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

/** 04. Jak pracuję */
export function JakPracuje({ t }: { t: SiteContent }) {
  const j = t.jakPracuje;
  return (
    <Section id="jak-pracuje" num={j.kicker} title={j.title}>
      <div className="items">
        <FadeIn>
          <p className="txt">{j.intro}</p>
        </FadeIn>
        {j.points.map((p, i) => (
          <FadeIn key={p.h} className="item">
            <p className="meta">0{i + 1}</p>
            <h3 className="h3">{p.h}</h3>
            <p className="txt mt-6">{p.p}</p>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

/** 05. Umiejętności — tagi w ramkach. */
export function Umiejetnosci({ t }: { t: SiteContent }) {
  const s = t.skills;
  return (
    <Section id="umiejetnosci" num={s.kicker} title={s.title}>
      <FadeIn>
        <ul className="tags">
          {s.items.map((it) => (
            <li key={it} className="tag">
              {it}
            </li>
          ))}
        </ul>
      </FadeIn>
    </Section>
  );
}

/** 06. Edukacja */
export function Edukacja({ t }: { t: SiteContent }) {
  const e = t.education;
  return (
    <Section id="edukacja" num={e.kicker} title={e.title}>
      <div className="items">
        {e.items.map((it) => (
          <FadeIn key={it.org} className="item">
            <p className="meta">{`${it.org}  •  ${it.years}`}</p>
            <h3 className="h3">{it.h}</h3>
            <p className="txt mt-6">{it.p}</p>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

/** 07. Języki — kafelki 2×2 w ramkach. */
export function Jezyki({ t }: { t: SiteContent }) {
  const l = t.languages;
  return (
    <Section id="jezyki" num={l.kicker} title={l.title}>
      <FadeIn>
        <ul className="lang-cards">
          {l.items.map((it) => (
            <li key={it.name} className="lang-card">
              <span className="h3">{it.name}</span>
              <span className="meta">{it.level}</span>
            </li>
          ))}
        </ul>
      </FadeIn>
    </Section>
  );
}

/** 08. Kontakt — etykieta szara, wartość biała pogrubiona. */
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
      <FadeIn className="contact">
        <div>
          <p className="meta">{k.emailLabel}</p>
          <a className="cval" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <div className="mt-3">
            <CopyEmail email={site.email} label={t.ui.copyEmail} copied={t.ui.emailCopied} />
          </div>
        </div>
        <div>
          <p className="meta">{k.sitesLabel}</p>
          {k.sites.map((s) => (
            <a key={s.label} className="cval" href={s.href} target="_blank" rel="noopener noreferrer">
              {s.label}
            </a>
          ))}
        </div>
        <div>
          <p className="meta">{k.socialsLabel}</p>
          {socials.map((s) => (
            <a key={s.label} className="cval" href={s.href} target="_blank" rel="noopener noreferrer">
              {s.label}
            </a>
          ))}
        </div>
      </FadeIn>
    </Section>
  );
}

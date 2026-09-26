import type { SiteContent } from "@/lib/content";
import { site } from "@/lib/site";
import { Scene } from "@/components/fx/scene";
import { CopyEmail } from "@/components/ui/copy-email";

/*
 * Sekcje jako infografiki: nad punktami stoi wykres/schemat (visual), a punkty pod nim
 * zmieniają się przy przewijaniu. Element infografiki z klasami `hlx hl-N` podświetla się,
 * gdy aktywny jest punkt N (steruje components/story/story-controller).
 * Wszystkie dane pochodzą z treści (lib/content.ts) — żadnych zmyślonych liczb.
 */

const hl = (list: number[]) => `hlx ${list.map((i) => `hl-${i}`).join(" ")}`;

/** 01. O mnie — trzy wskaźniki + opis. */
export function OMnie({ t }: { t: SiteContent }) {
  const a = t.about;
  const [first, ...rest] = a.body[0].split(/(?<=\.)\s/);
  return (
    <Scene
      num={a.kicker}
      title={a.title}
      tone="white"
      aside={
        <figure className="aside-photo">
          <picture>
            <source media="(max-width: 809px)" srcSet="/photos/plener-480.webp" type="image/webp" />
            <img src="/photos/plener.webp" alt={t.hero.photoAlt} width={900} height={900} loading="lazy" decoding="async" />
          </picture>
        </figure>
      }
      visual={
        <ul className="kpis">
          {a.kpis.map((k) => (
            <li key={k.label} className="kpi">
              <span className="kpi-value">
                {k.value}
                {k.unit ? <span className="kpi-unit"> {k.unit}</span> : null}
              </span>
              <span className="kpi-label">{k.label}</span>
            </li>
          ))}
        </ul>
      }
      phoneItems={[
        <figure key="q" className="pcard pcard-quote">
          <blockquote>{t.hero.quote}</blockquote>
          <figcaption>— {t.hero.quoteBy}</figcaption>
        </figure>,
      ]}
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

/**
 * 02. Doświadczenie — oś czasu z paskami ról; aktywna rola podświetlona, opis pod spodem.
 * Oś z przerwaniem: 2008–2024 ściśnięte (50%), 2024–dziś rozciągnięte (50%) — inaczej
 * role z lat 2025–2026 byłyby niewidocznymi kreskami obok 17 lat aktorstwa.
 */
const T0 = 2008;
const TB = 2024; // punkt przerwania osi
const T1 = 2027; // prawa krawędź osi („dziś”)
const pct = (y: number) => (y <= TB ? ((y - T0) / (TB - T0)) * 50 : 50 + ((y - TB) / (T1 - TB)) * 50);

export function Doswiadczenie({ t }: { t: SiteContent }) {
  const e = t.experience;
  const ticks = [2008, 2016, 2024, 2025, 2026];
  return (
    <Scene
      num={e.kicker}
      title={e.title}
      tone="sky"
      visual={
        <figure className="gantt" aria-hidden="true">
          <span className="gantt-break" />
          <div className="gantt-rows">
            {e.spans.map((s, i) => {
              const to = s.to ?? T1;
              return (
                <div key={s.label} className={`gantt-row ${hl([i])}`}>
                  <span className="gantt-label">{s.label}</span>
                  <span className="gantt-track">
                    <span
                      className={`gantt-bar${s.to === null ? " is-open" : ""}`}
                      style={{ left: `${pct(s.from)}%`, width: `${Math.max(2.5, pct(to) - pct(s.from))}%` }}
                    />
                  </span>
                </div>
              );
            })}
          </div>
          <div className="gantt-axis">
            <span className="gantt-label" />
            <span className="gantt-ticks">
              {ticks.map((y) => (
                <span key={y} style={{ left: `${pct(y)}%` }}>
                  {y}
                </span>
              ))}
              <span className="is-now" style={{ left: "100%" }}>
                {e.now}
              </span>
            </span>
          </div>
        </figure>
      }
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

/** 03. Co robię — schemat linii produkcyjnej treści z warstwą AI; usługa podświetla swój fragment. */
export function CoRobie({ t }: { t: SiteContent }) {
  const c = t.coRobie;
  return (
    <Scene
      num={c.kicker}
      title={c.title}
      tone="peach"
      visual={
        <figure className="flow" aria-hidden="true">
          <ol className="flow-steps">
            {c.flow.map((n, i) => (
              <li key={n.label} className={`flow-node ${hl(n.hl)}`}>
                <span className="flow-i">{String(i + 1).padStart(2, "0")}</span>
                <span className="flow-t">{n.label}</span>
              </li>
            ))}
          </ol>
          <div className={`flow-ai ${hl(c.aiLayer.hl)}`}>
            <span className="flow-ai-mark">AI</span>
            {c.aiLayer.label}
          </div>
          <div className={`flow-extra ${hl(c.extra.hl)}`}>{c.extra.label}</div>
        </figure>
      }
      items={c.items.map((it, i) => (
        <article key={it.h} className="pcard pcard-dark">
          <span className="pcard-kicker">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="pcard-h">{it.h}</h3>
          <p className="pcard-txt">{it.p}</p>
        </article>
      ))}
    />
  );
}

/** 04. Jak pracuję — schemat cyklu plan → budowa → przegląd → wydanie. */
export function JakPracuje({ t }: { t: SiteContent }) {
  const j = t.jakPracuje;
  return (
    <Scene
      num={j.kicker}
      title={j.title}
      intro={j.intro}
      tone="white"
      visual={
        <figure className="cycle" aria-hidden="true">
          <svg className="cycle-ring" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="78" />
            <path d="M100 22 A78 78 0 0 1 178 100" className="cycle-arc" />
          </svg>
          <span className="cycle-center">{j.center}</span>
          {j.cycle.map((n, i) => (
            <span key={n.label} className={`cycle-node cycle-${i} ${hl(n.hl)}`}>
              <span className="cycle-i">{i + 1}</span>
              {n.label}
            </span>
          ))}
        </figure>
      }
      items={j.points.map((p, i) => (
        <article key={p.h} className="pcard">
          <span className="pcard-kicker">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="pcard-h">{p.h}</h3>
          <p className="pcard-txt">{p.p}</p>
        </article>
      ))}
    />
  );
}

/** 05. Umiejętności — rozkład na grupy (pasek proporcji) + mapa narzędzi. */
export function Umiejetnosci({ t }: { t: SiteContent }) {
  const s = t.skills;
  const total = s.groups.reduce((a, g) => a + g.items.length, 0);
  return (
    <Scene
      num={s.kicker}
      title={s.title}
      tone="mist"
      visual={
        <figure className="dist">
          <p className="dist-total">
            <span className="kpi-value">{total}</span>
            <span className="kpi-label">{s.total}</span>
          </p>
          <div className="dist-bar" aria-hidden="true">
            {s.groups.map((g, i) => (
              <span key={g.h} className={`dist-seg dist-${i}`} style={{ flexGrow: g.items.length }} />
            ))}
          </div>
          <ul className="dist-legend">
            {s.groups.map((g, i) => (
              <li key={g.h}>
                <span className={`dist-sw dist-${i}`} aria-hidden="true" />
                {g.h} <b>{g.items.length}</b>
              </li>
            ))}
          </ul>
        </figure>
      }
      items={[
        <article key="s" className="pcard skill-map">
          {s.groups.map((g, i) => (
            <div key={g.h} className="skill-col">
              <p className="skill-h">
                <span className={`dist-sw dist-${i}`} aria-hidden="true" />
                {g.h}
              </p>
              <ul className="tags">
                {g.items.map((it) => (
                  <li key={it} className="tag">
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </article>,
      ]}
    />
  );
}

/** 06. Edukacja — mini oś czasu + karta (certyfikat ze skanem). */
export function Edukacja({ t }: { t: SiteContent }) {
  const e = t.education;
  return (
    <Scene
      num={e.kicker}
      title={e.title}
      tone="sky"
      visual={
        <ol className="edu-line" aria-hidden="true">
          {e.items.map((it, i) => (
            <li key={it.org} className={`edu-pt ${hl([i])}`}>
              <span className="edu-year">{it.years}</span>
              <span className="edu-org">{it.org}</span>
            </li>
          ))}
        </ol>
      }
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

/** 07. Języki — skala europejska A1–C2 z zaznaczonym poziomem. */
export function Jezyki({ t }: { t: SiteContent }) {
  const l = t.languages;
  return (
    <Scene
      num={l.kicker}
      title={l.title}
      tone="peach"
      items={[
        <article key="l" className="pcard cefr">
          {l.items.map((it) => (
            <div key={it.name} className="cefr-row">
              <p className="cefr-head">
                <span className="pcard-h">{it.name}</span>
                <span className="meta">{it.level}</span>
              </p>
              <ol className="cefr-scale" aria-hidden="true">
                {l.scale.map((lv, i) => (
                  <li key={lv} className={i + 1 >= it.from && i + 1 <= it.to ? "on" : i + 1 < it.from ? "past" : ""}>
                    {lv}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </article>,
      ]}
    />
  );
}

/** 08. Kontakt — e-mail wyróżniony, strony i social media obok. */
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
      num={k.kicker}
      title={k.title}
      tone="white"
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

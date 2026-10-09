import type { CSSProperties } from "react";
import type { Card, SiteContent } from "@/lib/content";
import { site } from "@/lib/site";
import { Scene } from "@/components/fx/scene";
import { ActingButton } from "@/components/ui/acting-dialog";
import { CopyEmail } from "@/components/ui/copy-email";
import { Cta } from "@/components/ui/cta";
import { Icon } from "@/components/viz/icon";
import { VizBody } from "@/components/viz/viz";

const i = (n: number) => ({ "--i": n }) as CSSProperties;

/** Kafel bento: etykieta, nagłówek, zdanie i mały widżet, który rusza, gdy karta staje się aktywna. */
function Bt({ c, k }: { c: Card; k: number }) {
  return (
    <article className={`bt${k === 1 ? " is-dark" : ""}`} style={i(k)}>
      <span className="tag">
        <Icon name={c.icon} />
        {c.tag}
      </span>
      <h3 className="bt-h">{c.h}</h3>
      <p className="bt-p">{c.p}</p>
      <div className={`viz bt-viz viz-${c.viz.type}`} aria-hidden="true">
        <VizBody v={c.viz} />
      </div>
    </article>
  );
}

/** Linijka pod kaflami: proces (strzałki zapalają się po kolei) i jeden dowód z linkami. */
function ZakresFoot({ t }: { t: SiteContent }) {
  const z = t.coRobie;
  return (
    <div className="zakres-foot">
      <p className="zakres-proc">
        {z.proces.map((s, k) => (
          <span key={s} className="zp-step" style={i(k)}>
            {k > 0 ? (
              <i className="zp-arrow" aria-hidden="true">
                →
              </i>
            ) : null}
            {s}
          </span>
        ))}
        <span className="zp-note" style={i(z.proces.length)}>
          {z.procesNote}
        </span>
      </p>
      <p className="zakres-proof" style={i(z.proces.length + 1)}>
        <Icon name="check" size={16} />
        {z.dowodLabel}{" "}
        {z.dowod.map((l, k) => (
          <span key={l.href}>
            {k > 0 ? " · " : null}
            <a className="lnk" href={l.href} target="_blank" rel="noopener noreferrer">
              {l.label} ↗
            </a>
          </span>
        ))}
      </p>
      <span className="bento-sample">{t.ui.sample}</span>
    </div>
  );
}

/**
 * Karta 2 — Co robię: trzy kafle naraz (komputer), linijka procesu i dowód.
 * Na telefonie te same kafle w dwóch kartach: 1–2 / 3 + proces + dowód.
 */
export function Zakres({ t }: { t: SiteContent }) {
  const z = t.coRobie;
  const all = z.items.map((c, k) => <Bt key={c.h} c={c} k={k} />);
  return (
    <Scene
      wide
      num={z.kicker}
      title={z.title}
      intro={z.intro}
      tone="sky"
      items={[
        <div key="wide" className="zakres">
          <div className="bento bento-3">{all}</div>
          <ZakresFoot t={t} />
        </div>,
      ]}
      itemsWideOnly
      phoneItems={[
        <div key="p1" className="zakres">
          <div className="bento bento-3">{all.slice(0, 2)}</div>
        </div>,
        <div key="p2" className="zakres">
          <div className="bento bento-3">{all.slice(2)}</div>
          <ZakresFoot t={t} />
        </div>,
      ]}
    />
  );
}

/** O mnie + aktorstwo w jednej linii + przycisk do pełnej listy ról (bez zdjęcia). */
function AboutText({ t }: { t: SiteContent }) {
  const k = t.kontakt;
  const a = t.aktorstwo;
  return (
    <div className="about-text">
      {k.about.map((p) => (
        <p key={p}>{p}</p>
      ))}
      <p className="about-acting">
        <span className="about-acting-line">{a.line}:</span>
        <span className="about-titles">
          {a.titles.map((x, n) => (
            <span key={x} className="about-title" style={i(n)}>
              {x}
            </span>
          ))}
        </span>
      </p>
      <ActingButton label={a.button} />
    </div>
  );
}

function Photo({ t, className }: { t: SiteContent; className: string }) {
  return (
    <div className={className}>
      {/* eslint-disable-next-line @next/next/no-img-element -- statyczny eksport, plik już zoptymalizowany */}
      <img src="/photos/maciej-firma.webp" alt={t.kontakt.photoAlt} width={800} height={702} loading="lazy" decoding="async" />
    </div>
  );
}

/** Telefon: zdjęcie nad tekstem. */
function About({ t }: { t: SiteContent }) {
  return (
    <div className="about">
      <Photo t={t} className="about-photo" />
      <AboutText t={t} />
    </div>
  );
}

const socials = [
  { href: site.socials.instagram, label: "Instagram" },
  { href: site.socials.linkedin, label: "LinkedIn" },
  { href: site.socials.github, label: "GitHub" },
];

function Foot({ t }: { t: SiteContent }) {
  return (
    <footer className="foot">
      <span>© 2026 {site.name}</span>
      <a href="/privacy/">{t.ui.footerPrivacy}</a>
    </footer>
  );
}

/** Telefon: kontakt jako osobna karta. */
function Contact({ t }: { t: SiteContent }) {
  const k = t.kontakt;
  return (
    <div className="contact-wrap">
      <div className="contact-grid">
        <div className="pcard pcard-dark contact-mail">
          <span className="pcard-kicker">{k.emailLabel}</span>
          <a className="cval" href={t.ui.ctaHref}>
            {site.email}
          </a>
          <div className="contact-actions">
            <Cta href={t.ui.ctaHref} label={t.ui.cta} />
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
          <p className="contact-socials">
            {socials.map((s) => (
              <a key={s.label} className="lnk" href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            ))}
          </p>
        </div>
      </div>
      <Foot t={t} />
    </div>
  );
}

/** Komputer: trzy równe panele jak w „Co robię” — duże zdjęcie / o mnie i aktorstwo / kontakt. */
function KtoWide({ t }: { t: SiteContent }) {
  const k = t.kontakt;
  return (
    <div className="kto">
      <div className="kto-grid">
        <Photo t={t} className="kto-panel kto-photo" />
        <div className="kto-panel kto-about">
          <AboutText t={t} />
        </div>
        <div className="kto-panel kto-contact">
          <p className="kto-lead">{k.contactLead}</p>
          <span className="pcard-kicker">{k.emailLabel}</span>
          <a className="cval" href={t.ui.ctaHref}>
            {site.email}
          </a>
          <div className="contact-actions">
            <Cta href={t.ui.ctaHref} label={t.ui.cta} />
            <CopyEmail email={site.email} label={t.ui.copyEmail} copied={t.ui.emailCopied} />
          </div>
          <div className="kto-links">
            <div>
              <p className="meta">{k.sitesLabel}</p>
              {k.sites.map((s) => (
                <a key={s.label} className="lnk" href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              ))}
            </div>
            <div>
              <p className="meta">{k.socialsLabel}</p>
              {socials.map((s) => (
                <a key={s.label} className="lnk" href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Foot t={t} />
    </div>
  );
}

/**
 * Karta 3 — Kto za tym stoi. Komputer: trzy panele (zdjęcie / o mnie / kontakt).
 * Telefon: dwie karty — o mnie ze zdjęciem / kontakt.
 */
export function Kontakt({ t }: { t: SiteContent }) {
  const k = t.kontakt;
  return (
    <Scene
      wide
      num={k.kicker}
      title={k.title}
      intro={k.intro}
      tone="white"
      items={[<KtoWide key="wide" t={t} />]}
      itemsWideOnly
      phoneItems={[<About key="about" t={t} />, <Contact key="contact" t={t} />]}
    />
  );
}

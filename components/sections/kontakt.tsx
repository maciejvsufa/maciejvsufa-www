import type { SiteContent } from "@/lib/content";
import { site } from "@/lib/site";
import { CopyEmail } from "@/components/ui/copy-email";
import { SecHead } from "@/components/ui/sec-head";
import { IconFacebook, IconGitHub, IconInstagram, IconLinkedIn } from "@/components/ui/social-icons";

const socials = [
  { href: site.socials.instagram, label: "Instagram", handle: "@maciejvsufa", Icon: IconInstagram },
  { href: site.socials.facebook, label: "Facebook", handle: "maciejvsufa", Icon: IconFacebook },
  { href: site.socials.linkedin, label: "LinkedIn", handle: "maciej-sufa", Icon: IconLinkedIn },
  { href: site.socials.github, label: "GitHub", handle: "maciejvsufa", Icon: IconGitHub },
];

export function Kontakt({ t }: { t: SiteContent }) {
  const k = t.kontakt;
  return (
    <section id="kontakt" aria-labelledby="kontakt-title" className="cv-section pb-[clamp(64px,8vw,96px)]">
      <SecHead id="kontakt-title" num={k.kicker} title={k.title} />
      <p className="max-w-[20ch] text-[clamp(30px,5vw,52px)] font-semibold leading-[1.05] tracking-[-0.035em]">
        {k.headline} <span className="text-accent">{k.headlineEm}</span>
      </p>
      <p className="mt-5 max-w-[52ch] text-[16px] leading-[1.6] text-text2">{k.lead}</p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <a className="btn btn-primary" href={`mailto:${site.email}`}>
          {site.email} <span className="arr">↗</span>
        </a>
        <CopyEmail email={site.email} label={t.ui.copyEmail} copied={t.ui.emailCopied} />
      </div>

      <div className="mt-12 grid gap-10 sm:grid-cols-2">
        <div>
          <h3 className="font-mono text-[13px] text-text3">{k.socialsTitle}</h3>
          <ul className="mt-4 grid gap-3">
            {socials.map(({ href, label, handle, Icon }) => (
              <li key={label}>
                <a
                  className="group flex items-center gap-3 text-text2 no-underline transition-colors hover:text-accent"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon />
                  <span className="text-text group-hover:text-accent">{label}</span>
                  <span className="font-mono text-[12.5px] text-text3">{handle}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-mono text-[13px] text-text3">{k.sitesTitle}</h3>
          <ul className="mt-4 grid gap-3">
            {k.sites.map((s) => (
              <li key={s.label} className="flex items-baseline gap-3">
                <a className="lnk" href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label} <span aria-hidden="true">↗</span>
                </a>
                <span className="font-mono text-[12.5px] text-text3">{s.note}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

import type { SiteContent } from "@/lib/content";
import { site } from "@/lib/site";

export function SiteFooter({ t }: { t: SiteContent }) {
  return (
    <footer className="cv">
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border py-6 font-mono text-[12.5px] text-text3">
        <span>© 2026 {site.name}</span>
        <span className="flex flex-wrap gap-x-4 gap-y-2">
          <a className="transition-colors hover:text-accent" href={site.socials.instagram} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a className="transition-colors hover:text-accent" href={site.socials.facebook} target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
          <a className="transition-colors hover:text-accent" href="/privacy/">
            {t.ui.footerPrivacy}
          </a>
          <a className="transition-colors hover:text-accent" href="#top">
            {t.ui.footerTop} ↑
          </a>
        </span>
      </div>
    </footer>
  );
}

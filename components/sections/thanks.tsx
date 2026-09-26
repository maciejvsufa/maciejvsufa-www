import type { SiteContent } from "@/lib/content";
import { site } from "@/lib/site";
import { FitText } from "@/components/fx/fit-text";
import { SplitText } from "@/components/fx/split-text";

/** Zakończenie jak w szablonie: wielkie „Dziękuję, że tu jesteś” + miętowe zdanie w prawej kolumnie. */
export function Thanks({ t }: { t: SiteContent }) {
  const th = t.thanks;
  return (
    <section className="thanks" aria-label={th.lines.join(" ")}>
      <div className="thanks-box">
        <FitText lines={th.lines} className="thanks-big" />
      </div>
      <div className="thanks-cta-row">
        <p className="thanks-cta">
          <a href={`mailto:${site.email}`}>
            <SplitText text={th.cta.join(" ")} by="word" trigger="view" start={0.4} stagger={0.075} /> ↗
          </a>
        </p>
      </div>
      <footer className="foot">
        <span>© 2026 {site.name}</span>
        <a href="/privacy/">{t.ui.footerPrivacy}</a>
      </footer>
    </section>
  );
}

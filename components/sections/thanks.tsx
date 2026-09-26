import type { SiteContent } from "@/lib/content";
import { site } from "@/lib/site";
import { FitText } from "@/components/fx/fit-text";
import { SplitText } from "@/components/fx/split-text";

/** Zakończenie jako ostatnia scena: wielkie „Dziękuję, że tu jesteś” + pomarańczowe zaproszenie. */
export function Thanks({ t }: { t: SiteContent }) {
  const th = t.thanks;
  return (
    <section className="scene scene-thanks shape-d" data-tone="sky" data-state="next" aria-label={th.lines.join(" ")}>
      <div className="thanks">
        <div className="thanks-box">
          <FitText lines={th.lines} className="thanks-big" />
        </div>
        <p className="thanks-cta">
          <a href={`mailto:${site.email}`}>
            <SplitText text={th.cta.join(" ")} by="word" trigger="parent" start={0.3} stagger={0.075} /> ↗
          </a>
        </p>
        <footer className="foot">
          <span>© 2026 {site.name}</span>
          <a href="/privacy/">{t.ui.footerPrivacy}</a>
        </footer>
      </div>
    </section>
  );
}

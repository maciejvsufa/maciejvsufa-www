import type { ReactNode } from "react";
import { SplitText } from "@/components/fx/split-text";

/**
 * Sekcja szablonu: linia 0,5 px u góry, po lewej przyklejony tytuł „01. O MNIE”
 * (litery wjeżdżają z rozmyciem), po prawej treść. Obie kolumny równe.
 */
export function Section({
  id,
  num,
  title,
  children,
}: {
  id: string;
  num: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="sec">
      <div className="sec-row">
        <div className="sec-grid">
          <SplitText
            as="h2"
            text={`${num}. ${title}`}
            by="char"
            trigger="view"
            stagger={0.05}
            blur
            className="sec-title"
          />
          <div className="sec-body">{children}</div>
        </div>
      </div>
    </section>
  );
}

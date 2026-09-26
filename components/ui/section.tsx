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
          <h2 className="sec-title">
            <SplitText text={`${num}.`} by="char" trigger="view" stagger={0.05} blur className="sec-num" />{" "}
            <SplitText text={title} by="char" trigger="view" start={0.1} stagger={0.04} blur />
          </h2>
          <div className="sec-body">{children}</div>
        </div>
      </div>
    </section>
  );
}

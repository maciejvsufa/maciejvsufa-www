import type { ReactNode } from "react";
import { SplitText } from "@/components/fx/split-text";

export type Tone = "white" | "sky" | "peach" | "mist";

/**
 * Scena „jednej strony”: tytuł z licznikiem po lewej, punkty po prawej (jeden naraz).
 * Stanem (active/past/next dla sceny i punktów) steruje components/story/story-controller.
 * `phoneItems` to punkty widoczne tylko na telefonie (np. cytat, który na komputerze stoi w hero).
 * Kotwica (#id) jest na niewidzialnym kroku w .story-steps, nie tutaj.
 */
export function Scene({
  num,
  title,
  intro,
  tone,
  items,
  phoneItems = [],
  visual,
  aside,
  shape = "a",
}: {
  num: string;
  title: string;
  intro?: string;
  tone: Tone;
  items: ReactNode[];
  phoneItems?: ReactNode[];
  /** infografika stojąca nad punktami; podświetla elementy .hlx.hl-N dla aktywnego punktu N */
  visual?: ReactNode;
  /** element pod tytułem w lewej kolumnie (np. zdjęcie) */
  aside?: ReactNode;
  /** wariant układu (zostawione dla zgodności; ozdoby usunięte w wersji „profesjonalnej”) */
  shape?: "a" | "b" | "c" | "d";
}) {
  const all = [
    ...phoneItems.map((node, i) => ({ node, phone: true, key: `p${i}` })),
    ...items.map((node, i) => ({ node, phone: false, key: `i${i}` })),
  ];
  return (
    <section className={`scene shape-${shape}`} data-tone={tone} data-state="next" aria-label={`${num}. ${title}`}>
      <div className="scene-inner">
        <div className="scene-grid">
          <header className="scene-head">
            <p className="scene-eyebrow">
              <span className="scene-eyebrow-line" aria-hidden="true" />
              {num}
            </p>
            <h2 className="scene-title">
              <SplitText text={title} by="char" trigger="parent" stagger={0.03} blur />
            </h2>
            {intro ? <p className="scene-intro">{intro}</p> : null}
            <div className="scene-count" aria-hidden="true">
              <span className="scene-count-now">01</span>
              <span className="scene-count-sep">/</span>
              <span className="scene-count-total">{String(all.length).padStart(2, "0")}</span>
              <span className="scene-bar">
                <span />
              </span>
            </div>
            {aside ? <div className="scene-aside">{aside}</div> : null}
          </header>
          <div className="scene-stage">
            {visual ? <div className="scene-visual">{visual}</div> : null}
            <div className="scene-items">
              {all.map((it, i) => (
                <div key={it.key} className={`scene-item${it.phone ? " only-phone" : ""}`} data-state={i === 0 ? "active" : "next"}>
                  {it.node}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

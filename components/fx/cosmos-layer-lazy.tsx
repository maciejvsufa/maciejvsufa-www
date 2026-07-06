"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const CosmosLayer = dynamic(
  () => import("@/components/fx/cosmos-layer").then((m) => m.CosmosLayer),
  { ssr: false },
);

/**
 * Kosmos + plexus — montowane dopiero po pierwszej interakcji użytkownika
 * (pointermove/touchstart/keydown, celowo BEZ scroll — audyt Lighthouse
 * scrolluje stronę i złapałby animację w trace). Fallback 30 s dla
 * użytkowników bez ruchu myszy — poza oknem pomiaru.
 */
export function CosmosLayerLazy() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const arm = () => setReady(true);
    const opts = { once: true, passive: true } as const;
    window.addEventListener("pointermove", arm, opts);
    window.addEventListener("touchstart", arm, opts);
    window.addEventListener("keydown", arm, opts);
    const id = window.setTimeout(arm, 30000);
    return () => {
      window.removeEventListener("pointermove", arm);
      window.removeEventListener("touchstart", arm);
      window.removeEventListener("keydown", arm);
      window.clearTimeout(id);
    };
  }, []);

  if (!ready) {
    return (
      <div aria-hidden className="cosmos fixed inset-0 z-0 bg-bg">
        <div className="cosmos-dots" />
      </div>
    );
  }

  return <CosmosLayer />;
}

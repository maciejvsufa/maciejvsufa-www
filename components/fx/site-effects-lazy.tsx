"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const SiteEffects = dynamic(
  () => import("@/components/fx/site-effects").then((m) => m.SiteEffects),
  { ssr: false },
);

/** Dźwięki UI — montowane po pierwszej interakcji lub idle. */
export function SiteEffectsLazy() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mount = () => setReady(true);
    const w = window as Window &
      typeof globalThis & {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
        cancelIdleCallback?: (id: number) => void;
      };

    window.addEventListener("pointerdown", mount, { once: true, passive: true });

    let idleId: number;
    if (w.requestIdleCallback) {
      idleId = w.requestIdleCallback(mount, { timeout: 4000 });
    } else {
      idleId = window.setTimeout(mount, 2000);
    }

    return () => {
      window.removeEventListener("pointerdown", mount);
      w.cancelIdleCallback?.(idleId);
      window.clearTimeout(idleId);
    };
  }, []);

  if (!ready) return null;
  return <SiteEffects />;
}

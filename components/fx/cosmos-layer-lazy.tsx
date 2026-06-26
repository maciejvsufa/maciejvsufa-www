"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const CosmosLayer = dynamic(
  () => import("@/components/fx/cosmos-layer").then((m) => m.CosmosLayer),
  { ssr: false },
);

/** Kosmos + plexus — montowane po idle, żeby nie blokować LCP. */
export function CosmosLayerLazy() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const w = window as Window &
      typeof globalThis & {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
        cancelIdleCallback?: (id: number) => void;
      };
    let id: number;
    if (w.requestIdleCallback) {
      id = w.requestIdleCallback(() => setReady(true), { timeout: 2500 });
      return () => w.cancelIdleCallback?.(id);
    }
    id = window.setTimeout(() => setReady(true), 400);
    return () => window.clearTimeout(id);
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

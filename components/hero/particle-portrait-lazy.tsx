"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { isSmallScreen } from "@/lib/browser";

const ParticlePortrait = dynamic(
  () => import("@/components/hero/particle-portrait").then((m) => m.ParticlePortrait),
  { ssr: false },
);

/**
 * Montuje portret cząsteczkowy (three.js) tylko na desktopie, gdy przeglądarka
 * jest bezczynna. Na mobile nie ładuje three.js — hero pokazuje statyczne zdjęcie.
 */
export function ParticlePortraitLazy({ src }: { src: string }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (isSmallScreen()) return;
    const w = window as Window &
      typeof globalThis & {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
        cancelIdleCallback?: (id: number) => void;
      };
    let id: number;
    if (w.requestIdleCallback) {
      id = w.requestIdleCallback(() => setReady(true), { timeout: 1500 });
      return () => w.cancelIdleCallback?.(id);
    }
    id = window.setTimeout(() => setReady(true), 200);
    return () => window.clearTimeout(id);
  }, []);

  if (!ready) return null;
  return (
    <div className="absolute inset-0 animate-[fieldIn_0.9s_ease] [animation-fill-mode:both]">
      <ParticlePortrait src={src} />
    </div>
  );
}

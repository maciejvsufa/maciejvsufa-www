"use client";

import { useEffect, useRef, useState } from "react";
import { SaltField } from "@/components/fx/salt-field";

/** Warstwa dolna „kosmos” — kropki, poświaty, kometa + plexus (SaltField). Parallax przy scrollu. */
export function CosmosLayer() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [showPlexus, setShowPlexus] = useState(false);

  useEffect(() => {
    const small = window.matchMedia("(max-width: 720px)").matches;
    if (small) return;
    setShowPlexus(true);
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const el = rootRef.current;
    if (!el) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY || window.pageYOffset;
        el.style.transform = `translate3d(0, ${y * -0.06}px, 0)`;
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={rootRef} aria-hidden className="cosmos fixed inset-0 z-0 bg-bg will-change-transform">
      <div className="cosmos-dots" />
      <div className="cosmos-glow" />
      <div className="cosmos-glow cosmos-glow-b" />
      {showPlexus ? <SaltField /> : null}
      <div className="comet-haze" />
      <div className="comet-trail" />
      <div className="comet-head" />
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { SaltField } from "@/components/fx/salt-field";

/** Warstwa dolna „kosmos” — kropki, poświaty, kometa + plexus (SaltField). */
export function CosmosLayer() {
  const [showPlexus, setShowPlexus] = useState(false);

  useEffect(() => {
    const small = window.matchMedia("(max-width: 720px)").matches;
    if (small) return;
    setShowPlexus(true);
  }, []);

  return (
    <div aria-hidden className="cosmos fixed inset-0 z-0 bg-bg">
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

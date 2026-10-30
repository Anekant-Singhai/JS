"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const Scene = dynamic(() => import("./hero-scene"), { ssr: false });

export function HeroModel() {
  const ref = useRef<HTMLDivElement>(null);
  const pct = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(true);
  const [ready, setReady] = useState(false);
  const [parallax, setParallax] = useState(false);
  const reduce = useReducedMotion() ?? false;

  useEffect(() => {
    setParallax(window.matchMedia("(pointer: fine)").matches);
    const el = ref.current;
    if (!el) return;
    // Stop rendering once the hero has scrolled away.
    const io = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Called by the scene whenever the scan moves a whole percent; written straight to the DOM.
  const onProgress = useCallback((built: number) => {
    if (pct.current) pct.current.textContent = `${Math.round(built * 100)}%`;
    if (bar.current) bar.current.style.transform = `scaleX(${built})`;
  }, []);

  return (
    <div
      ref={ref}
      role="img"
      aria-label="Illustrative digital twin: a point-cloud scan of a small district turning into a 3D model"
      className="relative aspect-square w-full lg:aspect-auto lg:h-[600px]"
    >
      <div
        aria-hidden="true"
        className={cn("absolute inset-0 transition-opacity duration-1000", ready ? "opacity-100" : "opacity-0")}
      >
        <Scene active={active} reduce={reduce} parallax={parallax} onReady={() => setReady(true)} onProgress={onProgress} />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-2 top-2 flex items-center justify-between text-[11px] uppercase tracking-[0.18em]"
      >
        <p className="flex items-center gap-2 font-medium text-ink-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          Digital twin
        </p>
        <p className="text-ink-3">Illustrative</p>
      </div>

      <div aria-hidden="true" className="pointer-events-none absolute inset-x-2 bottom-2 text-xs text-ink-2">
        <div className="flex items-baseline justify-between">
          <span>Point cloud → model</span>
          <span ref={pct} className="font-medium tabular-nums text-ink">
            0%
          </span>
        </div>
        <div className="mt-2 h-px w-full bg-line">
          <span ref={bar} className="block h-px origin-left scale-x-0 bg-accent" />
        </div>
      </div>
    </div>
  );
}

"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

// three.js is only downloaded when this section is about to scroll into view.
const Scene = dynamic(() => import("./site-model-scene"), { ssr: false });

const legend = [
  { label: "Complete", swatch: "h-2.5 w-2.5 border border-ink/60 bg-white" },
  { label: "In progress", swatch: "h-2.5 w-2.5 border border-accent bg-accent/15" },
  { label: "Planned", swatch: "h-2.5 w-2.5 border border-dashed border-ink/50" },
  { label: "Drone survey", swatch: "h-1.5 w-1.5 rounded-full bg-accent" },
];

export function SiteModel() {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [active, setActive] = useState(false);
  const [ready, setReady] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const reduce = useReducedMotion() ?? false;

  useEffect(() => {
    setInteractive(window.matchMedia("(pointer: fine)").matches);
    const el = ref.current;
    if (!el) return;
    // Mount once nearby; pause rendering whenever it is off screen.
    const io = new IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting);
        if (entry.isIntersecting) setNear(true);
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative isolate aspect-square overflow-hidden sm:aspect-[4/3] rounded-3xl border border-line bg-[radial-gradient(ellipse_at_50%_45%,#FDFCF9_0%,#F7F4EE_55%,#ECE7DC_100%)] shadow-[0_30px_60px_-40px_rgba(17,19,21,0.35)] lg:aspect-auto lg:h-[540px]"
    >
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-1000",
          ready ? "opacity-100" : "opacity-0",
          interactive && "cursor-grab active:cursor-grabbing",
        )}
      >
        {near && <Scene active={active} reduce={reduce} interactive={interactive} onReady={() => setReady(true)} />}
      </div>

      <div className="pointer-events-none absolute inset-x-5 top-5 flex items-start justify-between gap-4 text-[11px] uppercase tracking-[0.18em]">
        <p className="font-medium text-ink-2">Site model</p>
        <p className="text-right text-ink-3">Illustrative{interactive && " · drag to rotate"}</p>
      </div>

      <ul className="pointer-events-none absolute inset-x-5 bottom-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-ink-2">
        {legend.map((l) => (
          <li key={l.label} className="flex items-center gap-2">
            <span className={cn("shrink-0", l.swatch)} />
            {l.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

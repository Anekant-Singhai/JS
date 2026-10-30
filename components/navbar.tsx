"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Logo() {
  return (
    <span className="flex items-center gap-2.5 text-ink">
      <span className="grid h-8 w-8 place-items-center rounded-full bg-ink font-serif text-[15px] italic text-paper">
        az
      </span>
      <span className="font-medium tracking-tight">{site.name}</span>
    </span>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.replace(/\/$/, ""));

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" aria-label={`${site.name} home`}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm transition-colors",
                isActive(item.href) ? "text-ink underline decoration-accent decoration-2 underline-offset-8" : "text-ink-3 hover:text-ink"
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact/"
            className="ml-3 rounded-full bg-ink px-5 py-2 text-sm font-medium text-paper transition-colors hover:bg-accent"
          >
            Book a free call
          </Link>
        </nav>

        <button
          type="button"
          className="rounded-lg p-2 text-ink md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-line px-4 py-3 md:hidden" aria-label="Mobile">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn("block rounded-lg px-3 py-2.5 text-sm", isActive(item.href) ? "bg-paper-2 text-ink" : "text-ink-2")}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { categories, groups, type ServiceGroup } from "@/lib/services";
import { cn } from "@/lib/utils";

export function ServiceCatalogue() {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState<ServiceGroup | "All">("All");

  // Static export: read ?group= on the client instead of at build time.
  useEffect(() => {
    const g = new URLSearchParams(window.location.search).get("group");
    if (g && (groups as string[]).includes(g)) setGroup(g as ServiceGroup);
  }, []);

  const q = query.trim().toLowerCase();
  const filtered = useMemo(
    () =>
      categories
        .filter((c) => group === "All" || c.group === group)
        .map((c) => ({
          ...c,
          items: q && !c.title.toLowerCase().includes(q) ? c.items.filter((i) => i.toLowerCase().includes(q)) : c.items,
        }))
        .filter((c) => c.items.length > 0),
    [group, q]
  );
  const shown = filtered.reduce((n, c) => n + c.items.length, 0);

  return (
    <div className="mt-10">
      <div className="sticky top-16 z-20 -mx-4 space-y-3 border-b border-line bg-paper/90 px-4 py-4 backdrop-blur sm:-mx-6 sm:px-6">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search services, e.g. BOQ, dashboard, GIS…"
          aria-label="Search services"
          className="w-full rounded-full border border-line bg-white px-5 py-3 text-ink placeholder:text-ink-3 focus:border-ink focus:outline-none focus:ring-2 focus:ring-accent/20"
        />
        <div className="flex gap-2 overflow-x-auto pb-1">
          {(["All", ...groups] as const).map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGroup(g)}
              className={cn(
                "shrink-0 rounded-full border px-3 py-1.5 text-xs transition-colors",
                group === g
                  ? "border-ink bg-ink text-paper"
                  : "border-line bg-white text-ink-2 hover:border-ink"
              )}
            >
              {g}
            </button>
          ))}
        </div>
        <p className="text-xs text-ink-3">
          Showing {shown} services in {filtered.length} categories
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {filtered.map((c) => (
          <section
            key={c.slug}
            id={c.slug}
            className="scroll-mt-48 rounded-3xl border border-line bg-white p-6 sm:p-7"
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-accent-2">
              {String(c.id).padStart(2, "0")} · {c.group}
            </p>
            <h2 className="mt-2 font-serif text-2xl leading-tight text-ink">{c.title}</h2>
            {c.note && (
              <p className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-relaxed text-amber-900">
                {c.note}
              </p>
            )}
            <ul className="mt-4 grid gap-x-4 gap-y-1.5 text-sm text-ink-2 sm:grid-cols-2">
              {c.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href={`/contact/?service=${encodeURIComponent(c.title)}`}
              className="mt-5 inline-block text-sm font-medium text-accent-2 hover:underline"
            >
              Enquire about this →
            </Link>
          </section>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full py-12 text-center text-ink-2">
            No matching services. <Link href="/contact/" className="text-accent-2 underline">Ask us anyway</Link> — we may still be able to help.
          </p>
        )}
      </div>
    </div>
  );
}

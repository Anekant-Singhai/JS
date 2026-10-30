import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work",
  description: "Completed projects and case studies by A-Z Enterprises.",
};

const deliverables = [
  "Weekly status & MIS reports",
  "Risk, issue & action registers",
  "Tender compliance matrices",
  "BOQs and cost comparisons",
  "Excel dashboards & trackers",
  "SOPs and process maps",
  "DPRs and technical reports",
  "GIS maps & 3D site models",
];

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
      <header className="max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent-2">Our work</p>
        <h1 className="mt-4 font-serif text-5xl leading-[1.02] text-ink sm:text-6xl">
          Work that <em className="text-accent">moved things forward</em>.
        </h1>
        <p className="mt-6 text-lg text-ink-2">The problem, what we did, and what changed for the client.</p>
      </header>

      {projects.length === 0 ? (
        <div className="mt-14 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-3xl border border-line bg-white p-8 sm:p-10">
            <p className="font-serif text-3xl text-ink">Case studies are on their way.</p>
            <p className="mt-3 max-w-md text-ink-2">
              We&apos;re writing up recent engagements now. Ask us and we&apos;ll share examples relevant to your
              project on a call.
            </p>
            <Link
              href="/contact/"
              className="mt-8 inline-block rounded-full bg-ink px-6 py-3 font-medium text-paper transition-colors hover:bg-accent"
            >
              Ask for examples
            </Link>
          </div>
          <div className="rounded-3xl bg-ink p-8 text-paper sm:p-10">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">What you receive</p>
            <ul className="mt-5 grid gap-2.5 text-sm sm:grid-cols-2 lg:grid-cols-1">
              {deliverables.map((d) => (
                <li key={d} className="flex gap-2.5 text-white/80">
                  <span className="text-accent">✦</span>
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <article key={p.title} className="rounded-3xl border border-line bg-white p-7 sm:p-9">
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-accent-2">
                {p.category}
                {p.year && ` · ${p.year}`}
              </p>
              <h2 className="mt-3 font-serif text-3xl leading-tight text-ink">{p.title}</h2>
              {p.client && <p className="mt-1 text-sm text-ink-3">{p.client}</p>}
              <p className="mt-4 leading-relaxed text-ink-2">{p.summary}</p>
              {p.outcomes && (
                <ul className="mt-5 space-y-2 border-t border-line pt-5 text-sm text-ink">
                  {p.outcomes.map((o) => (
                    <li key={o} className="flex gap-2.5">
                      <span className="text-moss">✓</span>
                      {o}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

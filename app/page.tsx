import Link from "next/link";
import { ReportDemo } from "@/components/report-demo";
import { Marquee } from "@/components/ui/marquee";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SiteModel } from "@/components/site-model";
import { audiences, offers } from "@/lib/offers";
import { boundaries, categories, groups, totalServices } from "@/lib/services";

const pillars = [
  {
    title: "Expertise first",
    body: "Real background in project management, operations, civil engineering, GIS, and documentation. We understand the work, not just the tools.",
  },
  {
    title: "AI where it adds value",
    body: "Drafting, summaries, research, data cleanup, and automation run on modern AI tools, so routine work takes hours instead of days.",
  },
  {
    title: "A person signs off",
    body: "Every deliverable is reviewed, fact-checked, and owned by someone accountable. Nothing goes out unchecked.",
  },
  {
    title: "We improve the process",
    body: "We don't just fill trackers. We build the tracker that fills itself and fix the step that keeps slipping.",
  },
];

const comparison = [
  { label: "Traditional back-office", points: ["Manual and slow", "Same process, every time", "Hours billed for routine work"] },
  { label: "DIY AI tools", points: ["Fast but unchecked", "Confident, generic mistakes", "No context, nobody accountable"] },
  { label: "A-Z Enterprises", points: ["AI speed, human review", "Tailored to your process", "One accountable partner"], us: true },
];

const modelPoints = [
  { title: "Photogrammetry", body: "3D models built from site or drone photos, measurable and shareable." },
  { title: "Progress visuals", body: "What's complete, what's underway, and what's next, readable at a glance." },
  { title: "GIS mapping", body: "Contours, boundaries, and location analysis on one clean map." },
];

const steps = [
  { n: "01", title: "Free 30-minute call", body: "We learn what's slowing you down and what good looks like." },
  { n: "02", title: "Clear proposal", body: "Scope, timeline, and price in writing, including anything that needs specialist sign-off." },
  { n: "03", title: "Build at AI speed", body: "Drafts, trackers, and analysis produced fast, with progress you can see." },
  { n: "04", title: "Review & handover", body: "Checked by a person and handed over as editable files you own." },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 pb-16 pt-14 sm:px-6 md:pt-20 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white/60 px-3 py-1 text-xs text-ink-2">
              <span className="h-1.5 w-1.5 rounded-full bg-moss" />
              Human-led · AI-powered
            </p>
            <h1 className="mt-6 font-serif text-[3.25rem] leading-[0.98] tracking-tight text-ink sm:text-7xl">
              Your project office, <em className="text-accent">on demand.</em>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-2">
              Planning, reporting, tenders, documentation, and GIS for construction, infrastructure, and growing
              businesses. Delivered at AI speed and checked by people who know the work.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact/"
                className="rounded-full bg-ink px-6 py-3.5 text-center font-medium text-paper transition-colors hover:bg-accent"
              >
                Book a free 30-min call
              </Link>
              <Link
                href="#offers"
                className="rounded-full border border-ink/20 px-6 py-3.5 text-center font-medium text-ink transition-colors hover:border-ink"
              >
                See how we can help
              </Link>
            </div>
            <p className="mt-6 text-sm text-ink-3">No long contracts. Start with one report, one tender, or one tracker.</p>
          </div>
          <ReportDemo />
        </div>

        <div className="border-y border-line bg-paper-2/60 py-4">
          <Marquee items={["Project tracking", "Tender compliance", "MIS reports", "BOQ & costing", "SOPs", "GIS mapping", "3D photogrammetry", "Meeting minutes", "Excel dashboards", "Research"]} />
        </div>
      </section>

      {/* Who we work with */}
      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <SectionHeading
              eyebrow="Who we work with"
              title={<>Built for teams that are <em>busy building</em>.</>}
              body="We step in where projects get messy: the follow-ups, reports, documents, and deadlines that pull your experts away from their real work."
            />
          </Reveal>
          <div className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2">
            {audiences.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.06} className="bg-paper p-7">
                <span className="font-serif text-3xl text-accent">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-medium text-ink">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{a.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Offers */}
      <section id="offers" className="scroll-mt-16 border-t border-line bg-white/50">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <Reveal>
            <SectionHeading
              eyebrow="How we help"
              title={<>Four ways to <em>work with us</em>.</>}
              body="Clear packages with clear outcomes. Pick one, or we'll combine them around your project."
            />
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {offers.map((o, i) => (
              <Reveal key={o.name} delay={(i % 2) * 0.08}>
                <article className="group flex h-full flex-col rounded-3xl border border-line bg-paper p-7 transition-all duration-300 hover:-translate-y-1 hover:border-ink hover:shadow-[0_24px_50px_-30px_rgba(17,19,21,0.4)] sm:p-9">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-serif text-3xl text-ink">{o.name}</h3>
                    <span className="shrink-0 rounded-full bg-ink px-3 py-1 text-xs text-paper">{o.format}</span>
                  </div>
                  <p className="mt-4 leading-relaxed text-ink-2">{o.pitch}</p>
                  <ul className="mb-7 mt-6 space-y-2.5 text-sm text-ink">
                    {o.includes.map((x) => (
                      <li key={x} className="flex gap-3">
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {x}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex flex-wrap items-end justify-between gap-4 border-t border-line pt-5">
                    <p className="text-xs text-ink-3">
                      <span className="font-medium text-ink-2">Best for:</span> {o.bestFor}
                    </p>
                    <Link
                      href={`/contact/?service=${encodeURIComponent(o.name)}`}
                      className="text-sm font-medium text-accent-2 underline-offset-4 group-hover:underline"
                    >
                      Enquire →
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Site, GIS & 3D showcase */}
      <section className="border-t border-line">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Site, GIS & 3D"
              title={<>See the whole site <em>at a glance</em>.</>}
              body="Drawings, drone photos, and survey data turned into models and maps your whole team can read."
            />
            <ul className="mt-10 space-y-6">
              {modelPoints.map((p, i) => (
                <li key={p.title} className="flex gap-5 border-t border-line pt-5">
                  <span className="font-serif text-xl italic text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-medium text-ink">{p.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-2">{p.body}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Link
              href={`/contact/?service=${encodeURIComponent("Site, GIS & 3D")}`}
              className="mt-10 inline-block rounded-full border border-ink/20 px-6 py-3.5 font-medium text-ink transition-colors hover:border-ink"
            >
              Enquire about 3D & GIS
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <SiteModel />
          </Reveal>
        </div>
      </section>

      {/* Human + AI positioning (dark band) */}
      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <Reveal>
            <SectionHeading
              dark
              eyebrow="Why A-Z"
              title={<>AI won&apos;t replace good work. It makes <em className="text-accent">good people faster</em>.</>}
              body="Anyone can open an AI tool. Knowing what to ask, what to trust, and what to fix takes experience. That's what you hire us for."
            />
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06} className="bg-ink p-7">
                <span className="font-serif text-2xl italic text-accent">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 font-medium">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{p.body}</p>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {comparison.map((c) => (
                <div
                  key={c.label}
                  className={c.us ? "rounded-3xl bg-paper p-7 text-ink" : "rounded-3xl border border-white/10 p-7"}
                >
                  <h3 className={c.us ? "font-serif text-2xl" : "font-serif text-2xl text-white/50"}>{c.label}</h3>
                  <ul className="mt-4 space-y-2 text-sm">
                    {c.points.map((pt) => (
                      <li key={pt} className="flex gap-2.5">
                        <span className={c.us ? "text-moss" : "text-white/30"}>{c.us ? "✓" : "–"}</span>
                        <span className={c.us ? "text-ink" : "text-white/50"}>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="How it works" title={<>Simple to start. <em>Easy to scale.</em></>} />
        </Reveal>
        <ol className="mt-14 grid gap-8 md:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <li className="border-t-2 border-ink pt-5">
                <span className="font-mono text-xs text-accent-2">{s.n}</span>
                <h3 className="mt-2 font-medium text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{s.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Full capability */}
      <section className="border-t border-line bg-white/50">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <SectionHeading
              eyebrow="Full capability"
              title={<>Need something specific? <em>We probably do it.</em></>}
              body={`Beyond our core packages, we cover ${totalServices} services across ${categories.length} categories, from SOPs and SLA tracking to research, training material, and presentations.`}
            />
            <Link
              href="/services/"
              className="mt-8 inline-block rounded-full border border-ink px-6 py-3 font-medium text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              Browse the full catalogue
            </Link>
          </Reveal>
          <div className="divide-y divide-line border-y border-line">
            {groups.map((g) => {
              const count = categories.filter((c) => c.group === g).reduce((n, c) => n + c.items.length, 0);
              return (
                <Link
                  key={g}
                  href={`/services/?group=${encodeURIComponent(g)}`}
                  className="group flex items-center justify-between py-4 transition-colors hover:text-accent-2"
                >
                  <span className="font-serif text-2xl text-ink group-hover:text-accent-2">{g}</span>
                  <span className="flex items-center gap-3 text-sm text-ink-3">
                    {count} services
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Boundaries */}
      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Straight talk"
            title={<>Clear about what we <em>do and don&apos;t</em> do.</>}
            body="Being upfront about scope is part of doing the job well."
          />
        </Reveal>
        <div className="mt-12 grid gap-x-10 gap-y-8 md:grid-cols-2">
          {boundaries.map((b) => (
            <div key={b.title} className="border-l-2 border-accent pl-5">
              <h3 className="font-medium text-ink">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <div className="relative overflow-hidden rounded-[32px] bg-accent px-8 py-14 text-white sm:px-14 sm:py-20">
          <div aria-hidden="true" className="absolute -right-10 -top-16 font-serif text-[16rem] italic leading-none text-white/10 sm:text-[22rem]">
            az
          </div>
          <div className="relative max-w-2xl">
            <h2 className="font-serif text-4xl leading-tight sm:text-6xl">What&apos;s slowing your team down?</h2>
            <p className="mt-5 text-lg text-white/85">
              Tell us in two lines. We&apos;ll reply with a practical way to fix it, free and with no obligation.
            </p>
            <Link
              href="/contact/"
              className="mt-9 inline-block rounded-full bg-ink px-7 py-3.5 font-medium text-paper transition-colors hover:bg-white hover:text-ink"
            >
              Start the conversation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

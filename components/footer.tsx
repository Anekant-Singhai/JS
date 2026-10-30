import Link from "next/link";
import { nav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-4 pt-16 sm:px-6">
        <p className="max-w-3xl font-serif text-4xl leading-tight sm:text-5xl">
          Less chasing, more <em className="text-accent">delivering</em>.
        </p>
        <div className="mt-12 grid gap-8 border-t border-white/10 py-10 md:grid-cols-3">
          <div>
            <p className="font-medium">{site.name}</p>
            <p className="mt-2 max-w-xs text-sm text-white/60">{site.tagline}</p>
          </div>
          <nav aria-label="Footer" className="flex flex-col gap-2 text-sm">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="text-white/60 hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="text-sm text-white/60">
            <a href={`mailto:${site.email}`} className="text-white hover:text-accent">
              {site.email}
            </a>
            <p className="mt-4 text-xs leading-relaxed text-white/40">
              Specialist or regulated outputs (engineering design, statutory assessments, certifications, survey-grade
              deliverables) are delivered with qualified professionals and sign-off where required.
            </p>
          </div>
        </div>
        <p className="border-t border-white/10 py-6 text-xs text-white/40">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

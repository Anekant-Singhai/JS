import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a free 30-minute call or send A-Z Enterprises your requirement.",
};

const promises = [
  "Reply within one business day",
  "Free 30-minute discovery call",
  "Written scope and price before any work",
  "Your data stays confidential",
];

export default function ContactPage() {
  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[1fr_1.3fr]">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent-2">Contact</p>
        <h1 className="mt-4 font-serif text-5xl leading-[1.02] text-ink sm:text-6xl">
          Let&apos;s talk about <em className="text-accent">your project</em>.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-ink-2">
          Tell us what you need, or just what&apos;s slowing you down. We&apos;ll suggest a practical way forward.
        </p>
        <ul className="mt-8 space-y-3">
          {promises.map((p) => (
            <li key={p} className="flex items-center gap-3 text-ink">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-moss text-[11px] text-white">✓</span>
              {p}
            </li>
          ))}
        </ul>
        <p className="mt-10 text-sm text-ink-3">Prefer email?</p>
        <a href={`mailto:${site.email}`} className="font-serif text-2xl text-ink underline decoration-accent decoration-2 underline-offset-4">
          {site.email}
        </a>
      </div>
      <ContactForm />
    </div>
  );
}

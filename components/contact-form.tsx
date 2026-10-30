"use client";

import { useEffect, useState, type FormEvent } from "react";
import { offers } from "@/lib/offers";
import { categories } from "@/lib/services";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "mt-1.5 w-full rounded-xl border border-line bg-paper px-4 py-2.5 text-ink placeholder:text-ink-3 focus:border-ink focus:outline-none focus:ring-2 focus:ring-accent/20";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [service, setService] = useState("");

  // Pre-select a category when arriving from "Enquire about this" on /services.
  useEffect(() => {
    const s = new URLSearchParams(window.location.search).get("service");
    if (s && (offers.some((o) => o.name === s) || categories.some((c) => c.title === s))) setService(s);
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("website")) return; // honeypot filled: silently drop bots

    if (!site.contactEndpoint) {
      setStatus("error");
      setError("The contact form is not connected yet. Please email us directly.");
      return;
    }

    setStatus("sending");
    setError("");
    data.append("submittedAt", new Date().toISOString());
    data.append("page", window.location.href);

    try {
      // URL-encoded body keeps this a "simple" CORS request (no preflight),
      // which Google Apps Script web apps accept.
      const res = await fetch(site.contactEndpoint, {
        method: "POST",
        body: new URLSearchParams(data as unknown as Record<string, string>),
      });
      const json = await res.json().catch(() => ({ ok: res.ok }));
      if (!res.ok || json.ok === false) throw new Error(json.error || "Submission failed");
      setStatus("sent");
      form.reset();
      setService("");
    } catch {
      setStatus("error");
      setError("Something went wrong sending your message. Please try again or email us directly.");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-3xl border border-moss/30 bg-white p-10 text-center">
        <p className="font-serif text-3xl text-ink">Thank you — your query has been received.</p>
        <p className="mt-3 text-ink-2">We will reply to the email you provided shortly.</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-medium text-accent-2 hover:underline"
        >
          Send another query
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 rounded-3xl border border-line bg-white p-6 shadow-[0_30px_60px_-40px_rgba(17,19,21,0.35)] sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm text-ink-2">
          Full name *
          <input name="name" required maxLength={120} autoComplete="name" className={field} />
        </label>
        <label className="block text-sm text-ink-2">
          Email *
          <input name="email" type="email" required maxLength={160} autoComplete="email" className={field} />
        </label>
        <label className="block text-sm text-ink-2">
          Phone
          <input name="phone" type="tel" maxLength={40} autoComplete="tel" className={field} />
        </label>
        <label className="block text-sm text-ink-2">
          Company / organisation
          <input name="company" maxLength={160} autoComplete="organization" className={field} />
        </label>
      </div>

      <label className="block text-sm text-ink-2">
        Service needed
        <select
          name="service"
          value={service}
          onChange={(e) => setService(e.target.value)}
          className={field}
        >
          <option value="">Not sure / multiple</option>
          <optgroup label="Packages">
            {offers.map((o) => (
              <option key={o.name} value={o.name}>
                {o.name}
              </option>
            ))}
          </optgroup>
          <optgroup label="Service categories">
            {categories.map((c) => (
              <option key={c.slug} value={c.title}>
                {c.title}
              </option>
            ))}
          </optgroup>
        </select>
      </label>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm text-ink-2">
          Timeline
          <select name="timeline" className={field} defaultValue="">
            <option value="">Select…</option>
            <option>Urgent (within a week)</option>
            <option>Within a month</option>
            <option>1–3 months</option>
            <option>Ongoing / retainer</option>
          </select>
        </label>
        <label className="block text-sm text-ink-2">
          Approximate budget
          <input name="budget" maxLength={80} placeholder="Optional" className={field} />
        </label>
      </div>

      <label className="block text-sm text-ink-2">
        Your requirement *
        <textarea
          name="message"
          required
          rows={6}
          maxLength={5000}
          placeholder="Describe the work, deliverables, and any deadlines…"
          className={field}
        />
      </label>

      {/* Honeypot: hidden from people, often filled by bots. */}
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status === "error" && (
        <p role="alert" className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-800">
          {error}{" "}
          <a href={`mailto:${site.email}`} className="underline">
            {site.email}
          </a>
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-full bg-ink px-6 py-3.5 font-medium text-paper transition-colors hover:bg-accent disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send query"}
      </button>
      <p className="text-center text-xs text-ink-3">
        Your details are used only to respond to your query.
      </p>
    </form>
  );
}

import type { Metadata } from "next";
import { ServiceCatalogue } from "@/components/service-catalogue";
import { categories, totalServices } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description: `The complete A-Z Enterprises catalogue: ${totalServices} services across ${categories.length} categories.`,
};

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
      <header className="max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent-2">Service catalogue</p>
        <h1 className="mt-4 font-serif text-5xl leading-[1.02] text-ink sm:text-6xl">
          Everything we do, <em className="text-accent">A to Z</em>.
        </h1>
        <p className="mt-6 text-lg text-ink-2">
          {totalServices} services across {categories.length} categories. Search for what you need, or filter by
          practice area. If you can&apos;t find it, ask anyway.
        </p>
      </header>
      <ServiceCatalogue />
    </div>
  );
}

export const site = {
  name: "A-Z Enterprises",
  tagline: "Your project office, on demand. Human-led, AI-powered.",
  description:
    "A-Z Enterprises is an on-demand project and operations office for construction, infrastructure, and growing businesses: planning, reporting, tenders, documentation, and GIS, delivered at AI speed and reviewed by people who know the work.",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@example.com",
  contactEndpoint: process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || "",
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/services/", label: "Services" },
  { href: "/projects/", label: "Work" },
  { href: "/contact/", label: "Contact" },
];

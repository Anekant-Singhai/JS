// The packaged offers the home page leads with. Each bundles catalogue
// categories into one thing a client can buy (see lib/services.ts).
export type Offer = {
  name: string;
  format: string;
  pitch: string;
  includes: string[];
  bestFor: string;
  categories: string[]; // service category slugs
};

export const offers: Offer[] = [
  {
    name: "Project Desk",
    format: "Monthly retainer",
    pitch: "Your outsourced project office. We run the plans, trackers, meetings, and reports so your team can build.",
    includes: [
      "Schedule, WBS & milestone tracking",
      "Risk, issue & change registers",
      "Meeting minutes and action follow-ups",
      "Weekly status and monthly MIS reports",
    ],
    bestFor: "Contractors, consultants, and growing teams without a PMO",
    categories: ["project-management", "meeting-action", "executive-reporting", "ai-automation"],
  },
  {
    name: "Tender & Proposal Desk",
    format: "Per bid or retainer",
    pitch: "Find the right tenders, meet every requirement, and submit on time, without the late-night scramble.",
    includes: [
      "Tender search and eligibility checks",
      "Compliance matrix and document checklist",
      "BOQ, rate analysis & cost compilation",
      "Technical bid and proposal writing",
    ],
    bestFor: "Firms bidding for government and infrastructure work",
    categories: ["tender-bid", "boq-cost", "rfq-vendor", "business-development"],
  },
  {
    name: "Reporting & Automation Sprint",
    format: "Fixed scope · 1–3 weeks",
    pitch: "We replace a manual reporting chore with a tracker or dashboard that updates itself, built once and used every week.",
    includes: [
      "Excel / Sheets dashboards and trackers",
      "Automated reminders and status reports",
      "Data cleanup and consolidation",
      "SOP so your team can run it",
    ],
    bestFor: "Operations teams buried in spreadsheets",
    categories: ["excel-data", "ai-automation", "operations", "programming-databases"],
  },
  {
    name: "Site, GIS & 3D",
    format: "Per project",
    pitch: "Maps, location analysis, and photo-based 3D models that show a site, structure, or progress at a glance.",
    includes: [
      "GIS and site-location mapping",
      "Photogrammetry 3D models from photos",
      "Construction progress visuals",
      "Processing client-supplied drone imagery",
    ],
    bestFor: "Construction, real-estate, and infrastructure projects",
    categories: ["gis-mapping", "photogrammetry-3d", "construction-civil", "zonal-territory"],
  },
];

export const audiences = [
  { title: "Construction & infrastructure", body: "Contractors and PMCs who need tracking, reporting, BOQs, and site documentation." },
  { title: "Consultancies & bid teams", body: "Firms that need tender, proposal, and DPR support during busy cycles." },
  { title: "SMEs & startups", body: "Growing teams that need operations, reporting, and admin in place without full-time hires." },
  { title: "Public-sector projects", body: "Monitoring, compliance, and documentation for government and PPP work." },
];

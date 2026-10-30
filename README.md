# A-Z Enterprises website

Static marketing site built with Next.js (static export), Tailwind CSS, and
Aceternity-style animated components (Framer Motion).

Pages: Home, Services (searchable catalogue of all 604 services), Projects, Contact.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site written to ./out
```

## Editing content

| What | File |
| --- | --- |
| Company name, tagline, email | `lib/site.ts` (email via `NEXT_PUBLIC_CONTACT_EMAIL`) |
| Service catalogue (34 categories) | `lib/services.ts` |
| Completed projects / case studies | `lib/projects.ts` |

## Contact form

Queries are saved to a Google Sheet through a free Google Apps Script endpoint.
Setup: `google-apps-script/README.md`. Until `NEXT_PUBLIC_CONTACT_ENDPOINT` is set,
the form shows the fallback email address instead.

## Hosting (free)

- **GitHub Pages**: `.github/workflows/deploy-az-website.yml` builds and deploys on every
  push to `main` that touches this folder. In the repo, set **Settings → Pages → Source:
  GitHub Actions** once. Free GitHub plans need a public repo for Pages.
- **Any static host** (Cloudflare Pages, Netlify, Vercel, Hostinger shared hosting): run
  `npm run build` and upload the contents of `out/`.

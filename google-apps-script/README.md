# Saving contact-form queries to Google Sheets (free)

The website is static, so it has no server of its own. Contact-form submissions are
sent to a small Google Apps Script that appends each query as a row in a Google Sheet
(and can email you a notification). It is free and needs no database.

1. Create a new Google Sheet (e.g. "A-Z Enterprises – Website Queries").
2. In the sheet: **Extensions → Apps Script**. Delete the sample code and paste in `Code.gs`.
3. Optional: set `NOTIFY_EMAIL` to the address that should receive an email per query.
4. Click **Deploy → New deployment** → type **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Authorise when prompted, then copy the **Web app URL** (ends in `/exec`).
6. Put the URL in the site's config:
   - Local: create `.env.local` with `NEXT_PUBLIC_CONTACT_ENDPOINT=<url>`
   - GitHub Pages: repo **Settings → Secrets and variables → Actions → Variables** →
     add `NEXT_PUBLIC_CONTACT_ENDPOINT` (and `NEXT_PUBLIC_CONTACT_EMAIL`).
7. Rebuild / redeploy the site. Submit a test query and check the "Queries" tab.

If you edit `Code.gs` later, use **Deploy → Manage deployments → Edit → New version**
so the same URL keeps working.

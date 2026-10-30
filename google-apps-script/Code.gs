/**
 * A-Z Enterprises contact form -> Google Sheet.
 * Every submission is appended as a row in the "Queries" sheet, and an
 * email notification is sent to NOTIFY_EMAIL (leave empty to disable).
 * Setup steps: see README.md in this folder.
 */
const SHEET_NAME = "Queries";
const NOTIFY_EMAIL = ""; // e.g. "owner@yourdomain.com"
const FIELDS = ["submittedAt", "name", "email", "phone", "company", "service", "timeline", "budget", "message", "page"];

function doPost(e) {
  try {
    const p = (e && e.parameter) || {};
    if (p.website) return json({ ok: true }); // honeypot
    if (!p.name || !p.email || !p.message) return json({ ok: false, error: "Missing required fields" });

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const sheet = getSheet();
      // Prefix values that start with = + - @ so the sheet never treats them as formulas.
      const row = FIELDS.map((f) => {
        const v = String(p[f] || "").slice(0, 5000);
        return /^[=+\-@]/.test(v) ? "'" + v : v;
      });
      sheet.appendRow(row);
    } finally {
      lock.releaseLock();
    }

    if (NOTIFY_EMAIL) {
      MailApp.sendEmail({
        to: NOTIFY_EMAIL,
        replyTo: p.email,
        subject: "New website query: " + (p.service || "General") + " — " + p.name,
        body: FIELDS.map((f) => f + ": " + (p[f] || "")).join("\n"),
      });
    }
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function doGet() {
  return json({ ok: true, message: "A-Z Enterprises contact endpoint is running." });
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(FIELDS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

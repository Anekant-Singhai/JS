"use client";

import { motion, useReducedMotion } from "framer-motion";

const rows = [
  { task: "Foundation works, Block A", owner: "Contractor", status: "On track", tone: "bg-moss/10 text-moss" },
  { task: "Steel delivery (PO-114)", owner: "Vendor", status: "2 days late", tone: "bg-amber-100 text-amber-800" },
  { task: "Drawing approval, Rev C", owner: "Consultant", status: "At risk", tone: "bg-accent-soft text-accent-2" },
  { task: "Monthly MIS to client", owner: "A-Z", status: "Done", tone: "bg-moss/10 text-moss" },
];

const actions = [
  "Escalate steel delay to procurement head",
  "Chase consultant for Rev C by Thursday",
];

// Illustrative sample (not a client record): shows the "AI drafts, people sign off" workflow.
export function ReportDemo() {
  const reduce = useReducedMotion();
  const appear = (i: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 6 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-80px" },
          transition: { delay: 0.6 + i * 0.35, duration: 0.4 },
        };

  return (
    <div className="relative isolate">
      <div className="absolute -inset-3 -z-10 rotate-2 rounded-[28px] bg-accent/15" aria-hidden="true" />
      <div className="rounded-3xl border border-line bg-white p-5 shadow-[0_30px_60px_-30px_rgba(17,19,21,0.35)] sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-3">Weekly status report · Sample</p>
            <p className="mt-1 font-serif text-2xl text-ink">Warehouse expansion, Week 42</p>
          </div>
          <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-paper px-2.5 py-1 text-[11px] text-ink-2">
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-accent"
              animate={reduce ? undefined : { opacity: [1, 0.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.4 }}
            />
            AI drafting
          </span>
        </div>

        <table className="mt-5 w-full text-left text-sm">
          <thead>
            <tr className="border-b border-line text-[11px] uppercase tracking-wider text-ink-3">
              <th className="pb-2 font-medium">Item</th>
              <th className="hidden pb-2 font-medium sm:table-cell">Owner</th>
              <th className="pb-2 text-right font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <motion.tr key={r.task} className="border-b border-line/60" {...appear(i)}>
                <td className="py-2.5 pr-2 text-ink">{r.task}</td>
                <td className="hidden py-2.5 text-ink-3 sm:table-cell">{r.owner}</td>
                <td className="py-2.5 text-right">
                  <span className={`whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium ${r.tone}`}>{r.status}</span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        <motion.div className="mt-4 rounded-xl bg-paper p-3" {...appear(rows.length)}>
          <p className="text-[11px] font-medium uppercase tracking-wider text-ink-3">Actions extracted from meeting notes</p>
          <ul className="mt-2 space-y-1 text-sm text-ink-2">
            {actions.map((a) => (
              <li key={a} className="flex gap-2">
                <span className="text-accent">→</span>
                {a}
              </li>
            ))}
          </ul>
        </motion.div>

        <div className="mt-4 flex items-center justify-between gap-4">
          <p className="text-xs text-ink-3">Drafted in 4 min · checked line by line</p>
          <motion.span
            className="shrink-0 whitespace-nowrap rotate-[-6deg] rounded-md border-2 border-moss px-2.5 py-1 font-serif text-sm italic text-moss"
            initial={reduce ? undefined : { opacity: 0, scale: 1.6 }}
            whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.6 + (rows.length + 1) * 0.35 + 0.2, type: "spring", stiffness: 300, damping: 15 }}
          >
            Reviewed &amp; signed off
          </motion.span>
        </div>
      </div>
    </div>
  );
}

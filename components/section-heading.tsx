import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left",
  dark,
}: {
  eyebrow: string;
  title: React.ReactNode;
  body?: string;
  align?: "left" | "center";
  dark?: boolean;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <p className={cn("text-xs font-medium uppercase tracking-[0.18em]", dark ? "text-accent" : "text-accent-2")}>
        {eyebrow}
      </p>
      <h2 className={cn("mt-4 font-serif text-4xl leading-[1.05] sm:text-5xl", dark ? "text-paper" : "text-ink")}>
        {title}
      </h2>
      {body && <p className={cn("mt-5 text-lg leading-relaxed", dark ? "text-white/60" : "text-ink-2")}>{body}</p>}
    </div>
  );
}

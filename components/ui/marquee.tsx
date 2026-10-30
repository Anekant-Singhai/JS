import { cn } from "@/lib/utils";

// Infinite scrolling row of tags (similar to Aceternity's Infinite Moving Cards).
export function Marquee({ items, className, reverse }: { items: string[]; className?: string; reverse?: boolean }) {
  return (
    <div className={cn("relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]", className)}>
      <ul
        className={cn(
          "flex w-max animate-marquee items-center gap-8 py-2 hover:[animation-play-state:paused] motion-reduce:animate-none",
          reverse && "[animation-direction:reverse]"
        )}
      >
        {[...items, ...items].map((item, i) => (
          <li key={i} aria-hidden={i >= items.length} className="flex items-center gap-8 whitespace-nowrap font-serif text-2xl text-ink-2">
            {item}
            <span className="text-accent">✦</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

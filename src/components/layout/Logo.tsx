import Link from "next/link";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ChipMark } from "@/components/ui/Chip";

/**
 * The wordmark: the chip glyph, then the name set tight in the display face.
 * Nothing else — no tagline lockup, no gradient, no circle around the mark.
 */
export function Logo({ className, href = "/" }: { className?: string; href?: string }) {
  return (
    <Link
      href={href}
      className={cn("group inline-flex items-center gap-2.5", className)}
      aria-label={`${site.name} home`}
    >
      <ChipMark className="h-7 w-[2.2rem] shrink-0" />
      <span className="font-display text-[1.35rem] font-extrabold leading-none tracking-[-0.05em] text-ink">
        {site.name.toLowerCase()}
      </span>
    </Link>
  );
}

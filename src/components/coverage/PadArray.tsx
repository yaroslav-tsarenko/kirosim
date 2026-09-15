"use client";

import { useState } from "react";
import Link from "next/link";
import type { RegionId } from "@/lib/types";
import { countriesByRegion } from "@/lib/data/countries";
import { SignalTicks } from "@/components/ui/Chip";
import { cn } from "@/lib/utils";

/**
 * Coverage drawn as a contact-pad array: one pad per country in the region,
 * laid out on the chip grid. It is the brand mark at scale rather than a
 * decorative world map — and unlike a map, every pad is a real link.
 */
export function PadArray({ region, className }: { region: RegionId; className?: string }) {
  const list = countriesByRegion(region);
  const [hover, setHover] = useState<string | null>(null);
  const hovered = list.find((c) => c.slug === hover);

  return (
    <div className={cn("band-graphite border border-ink p-5", className)}>
      <div className="flex items-center justify-between border-b border-hairline pb-3">
        <span className="readout text-ink">{list.length} destinations live</span>
        <SignalTicks className="h-3 w-4 text-lime" />
      </div>

      <ul className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(2.25rem,1fr))] gap-1.5">
        {list.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/destinations/${c.slug}`}
              onMouseEnter={() => setHover(c.slug)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(c.slug)}
              onBlur={() => setHover(null)}
              title={c.name}
              className={cn(
                "grid aspect-[4/3] place-items-center rounded-xs font-mono text-[0.6rem] font-semibold",
                "transition-colors duration-[var(--dur-fast)]",
                hover === c.slug
                  ? "bg-lime text-on-lime"
                  : "bg-graphite-soft text-ink-muted hover:bg-lime hover:text-on-lime",
              )}
            >
              {c.iso3}
            </Link>
          </li>
        ))}
      </ul>

      <p className="readout mt-4 h-4 text-ink" aria-live="polite">
        {hovered ? hovered.name : " "}
      </p>
    </div>
  );
}

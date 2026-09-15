"use client";

import { usePreferences } from "@/components/providers/Preferences";
import { formatPrice, cn } from "@/lib/utils";

/** Renders a USD-base price in the user's selected currency. Prices are a
 *  display hero, so they set in the display face with tabular figures. */
export function Price({ usd, className, prefix }: { usd: number; className?: string; prefix?: string }) {
  const { currency } = usePreferences();
  return (
    <span className={cn("font-display tabular-nums", className)}>
      {prefix}
      {formatPrice(usd, currency)}
    </span>
  );
}

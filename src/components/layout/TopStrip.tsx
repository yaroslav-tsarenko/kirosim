"use client";

import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { CurrencySelect } from "./PrefSelects";
import { site } from "@/lib/site";
import { SignalTicks } from "@/components/ui/Chip";

const MESSAGES = [
  "Instant QR delivery",
  `${site.countriesCovered} destinations`,
  "No roaming fees, ever",
  "24/7 human support",
];

/** The slim graphite strip above everything: rotating reassurance on the
 *  left, currency and theme on the right. Graphite with lime ticks — the
 *  brand's voice before the visitor has read a word. */
export function TopStrip() {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((n) => (n + 1) % MESSAGES.length), 3800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="band-graphite">
      <div className="mx-auto flex h-9 w-full max-w-[84rem] items-center justify-between px-5 sm:px-8">
        <p className="flex items-center gap-2.5" aria-live="polite">
          <SignalTicks className="h-2.5 w-3.5 text-lime" />
          <span className="eyebrow text-ink">{MESSAGES[i]}</span>
        </p>
        <div className="flex items-center gap-3 text-ink-muted">
          <CurrencySelect />
          <span className="h-3 w-px bg-hairline-strong" aria-hidden />
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}

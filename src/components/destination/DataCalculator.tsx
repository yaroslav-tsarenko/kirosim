"use client";

import { useMemo, useState } from "react";
import type { Plan } from "@/lib/types";
import { formatData } from "@/lib/data/plans";
import { Price } from "@/components/ui/Price";
import { MicroPlate } from "@/components/ui/Plate";
import { cn } from "@/lib/utils";

const HABITS = [
  { key: "maps", label: "Maps & navigation", perDay: 0.15 },
  { key: "chat", label: "Messaging & email", perDay: 0.1 },
  { key: "social", label: "Social & browsing", perDay: 0.4 },
  { key: "video", label: "Streaming video", perDay: 1.2 },
];

/**
 * "How much data do I need?" — sliders and toggles that snap a plan into the
 * highlighted state. The estimate is a lime bar with a mono readout, not a
 * gauge: this is an instrument, and it should look like one.
 */
export function DataCalculator({ plans, days: initialDays = 7 }: { plans: Plan[]; days?: number }) {
  const [days, setDays] = useState(initialDays);
  const [active, setActive] = useState<Record<string, boolean>>({
    maps: true,
    chat: true,
    social: true,
    video: false,
  });

  const perDay = HABITS.reduce((sum, h) => sum + (active[h.key] ? h.perDay : 0), 0);
  const needGb = Math.max(0.5, Math.round(perDay * days * 10) / 10);

  const recommended = useMemo(() => {
    const sorted = [...plans].sort((a, b) => (a.dataGb ?? 999) - (b.dataGb ?? 999));
    return sorted.find((p) => p.unlimited || (p.dataGb ?? 0) >= needGb) ?? sorted[sorted.length - 1];
  }, [plans, needGb]);

  /** Cap the meter at 20 GB so the bar stays readable on long trips. */
  const fill = Math.min(100, (needGb / 20) * 100);

  return (
    <div className="card-flat p-6">
      <div className="flex items-start justify-between gap-4 border-b border-hairline pb-4">
        <div>
          <p className="eyebrow text-ink">Data calculator</p>
          <h3 className="t-h2 mt-2 text-ink">How much do you need?</h3>
        </div>
        <MicroPlate tone="outline" className="shrink-0">Estimate</MicroPlate>
      </div>

      <div className="mt-6">
        <label htmlFor="trip-days" className="flex items-baseline justify-between">
          <span className="text-sm text-ink">Trip length</span>
          <span className="font-display text-xl font-extrabold tabular-nums text-ink">
            {days} <span className="readout">days</span>
          </span>
        </label>
        <input
          id="trip-days"
          type="range"
          min={1}
          max={30}
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="mt-3 w-full accent-[var(--lime-edge)]"
        />
      </div>

      <fieldset className="mt-6">
        <legend className="text-sm text-ink">What will you do online?</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {HABITS.map((h) => (
            <label
              key={h.key}
              className={cn(
                "flex cursor-pointer items-center gap-2.5 rounded-xs border px-3 py-2.5 text-sm",
                "transition-colors duration-[var(--dur-fast)]",
                active[h.key]
                  ? "border-ink bg-lime-tint text-ink"
                  : "border-hairline text-ink-muted hover:border-hairline-strong",
              )}
            >
              <input
                type="checkbox"
                checked={!!active[h.key]}
                onChange={(e) => setActive((s) => ({ ...s, [h.key]: e.target.checked }))}
                className="accent-[var(--lime-edge)]"
              />
              {h.label}
            </label>
          ))}
        </div>
      </fieldset>

      {/* The readout */}
      <div className="mt-6 border-t-2 border-ink pt-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="readout">Estimated need</p>
            <p className="t-num-md mt-1.5 text-ink">{needGb} GB</p>
          </div>
          {recommended ? (
            <div className="text-right">
              <p className="readout">Recommended plan</p>
              <p className="mt-1.5 font-display text-xl font-extrabold text-ink">
                {formatData(recommended)}
                <span className="readout ml-2">{recommended.validityDays} days</span>
              </p>
              <Price usd={recommended.price} className="text-sm font-bold text-signal" />
            </div>
          ) : null}
        </div>
        <div
          className="mt-4 h-2 overflow-hidden bg-card-sunk"
          role="progressbar"
          aria-valuenow={needGb}
          aria-valuemin={0}
          aria-valuemax={20}
          aria-label="Estimated data need"
        >
          <div
            className="h-full bg-lime transition-[width] duration-[var(--dur-slow)] ease-[var(--ease-snap)]"
            style={{ width: `${fill}%` }}
          />
        </div>
        <p className="readout mt-2 normal-case tracking-normal">
          Rough guide only — actual use depends on video quality and app settings.
        </p>
      </div>
    </div>
  );
}

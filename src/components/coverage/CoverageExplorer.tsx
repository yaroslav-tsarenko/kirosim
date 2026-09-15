"use client";

import { useState } from "react";
import Link from "next/link";
import type { RegionId } from "@/lib/types";
import { regions } from "@/lib/data/regions";
import { countriesByRegion } from "@/lib/data/countries";
import { Price } from "@/components/ui/Price";
import { PadArray } from "./PadArray";
import { cn } from "@/lib/utils";

export function CoverageExplorer() {
  const [region, setRegion] = useState<RegionId>("europe");
  const list = countriesByRegion(region);
  const active = regions.find((r) => r.id === region)!;

  return (
    <div>
      <div className="flex flex-wrap gap-x-6 gap-y-2 border-b border-hairline pb-3" role="tablist" aria-label="Regions">
        {regions.map((r) => (
          <button
            key={r.id}
            role="tab"
            aria-selected={region === r.id}
            onClick={() => setRegion(r.id)}
            className={cn(
              "-mb-[13px] border-b-[3px] pb-2.5 text-sm font-medium transition-colors duration-[var(--dur-fast)]",
              region === r.id
                ? "border-lime text-ink"
                : "border-transparent text-ink-muted hover:text-ink",
            )}
          >
            {r.name}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
        <div>
          <div className="flex items-end justify-between gap-4">
            <h2 className="t-h1 text-ink">{active.name}</h2>
            <span className="shrink-0 text-right">
              <span className="readout block text-[0.6rem]">from</span>
              <Price usd={active.fromPrice} className="text-2xl font-extrabold text-ink" />
            </span>
          </div>
          <p className="mt-3 max-w-[46ch] text-pretty text-ink-muted">{active.blurb}</p>
          <p className="readout mt-4">
            {active.countryCount} countries · one plan across the region
          </p>

          <div className="mt-6">
            <PadArray region={region} />
          </div>
        </div>

        <ul className="border-t border-hairline">
          {list.map((c) => (
            <li key={c.slug} className="border-b border-hairline">
              <Link
                href={`/destinations/${c.slug}`}
                className="flex items-center justify-between gap-4 py-3 transition-colors duration-[var(--dur-fast)] hover:bg-lime-tint"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <span className="text-xl leading-none" aria-hidden>{c.flag}</span>
                  <span className="min-w-0">
                    <span className="block truncate font-medium text-ink">{c.name}</span>
                    <span className="readout">{c.iso3} · {c.speeds.join("/")}</span>
                  </span>
                </span>
                <span className="shrink-0 text-right">
                  <span className="readout block text-[0.6rem]">from</span>
                  <Price usd={c.fromPrice} className="text-base font-bold text-ink" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

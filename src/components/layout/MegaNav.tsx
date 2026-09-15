"use client";

import Link from "next/link";
import { DestinationSearch } from "@/components/search/DestinationSearch";
import { Price } from "@/components/ui/Price";
import { MicroPlate } from "@/components/ui/Plate";
import { SignalTicks } from "@/components/ui/Chip";
import { ArrowRight } from "@/components/ui/icons";
import { getCountry, popularCountries } from "@/lib/data/countries";
import { plansFor, formatData } from "@/lib/data/plans";
import { regions } from "@/lib/data/regions";
import { site } from "@/lib/site";

/** The one plan promoted in the panel. Read from the live catalogue rather
 *  than written into the markup, so the price on show is the price charged. */
const FEATURED_SLUG = "jp";

export function MegaNav({ onClose }: { onClose: () => void }) {
  const popular = popularCountries().slice(0, 8);
  const country = getCountry(FEATURED_SLUG);
  const plan = plansFor(FEATURED_SLUG)[1];

  return (
    <div
      onMouseLeave={onClose}
      className="absolute inset-x-0 top-full border-b-2 border-ink bg-card shadow-[var(--lift-hover)]"
    >
      <div className="mx-auto grid w-full max-w-[84rem] gap-x-10 gap-y-8 px-5 py-8 sm:px-8 lg:grid-cols-[1.5fr_1fr_1fr]">
        {/* Search + popular destinations */}
        <div>
          <DestinationSearch
            className="mb-6"
            placeholder={`Search ${site.countriesCovered} destinations…`}
          />
          <p className="eyebrow mb-3 border-t border-hairline pt-3 text-ink">Most travelled</p>
          <ul className="grid grid-cols-2 gap-x-6">
            {popular.map((c) => (
              <li key={c.slug} className="border-b border-hairline last:border-b-0">
                <Link
                  href={`/destinations/${c.slug}`}
                  className="flex items-center justify-between gap-3 py-2 transition-colors duration-[var(--dur-fast)] hover:text-signal"
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <span aria-hidden className="text-base leading-none">{c.flag}</span>
                    <span className="truncate text-sm font-medium">{c.name}</span>
                  </span>
                  <span className="readout shrink-0 text-[0.65rem] text-ink">
                    <Price usd={c.fromPrice} prefix="from " />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Regions */}
        <div>
          <p className="eyebrow mb-3 border-t border-hairline pt-3 text-ink">Regions</p>
          <ul>
            {regions.map((r) => (
              <li key={r.id} className="border-b border-hairline last:border-b-0">
                <Link
                  href={`/regions/${r.id}`}
                  className="flex items-center justify-between gap-3 py-2.5 transition-colors duration-[var(--dur-fast)] hover:text-signal"
                >
                  <span className="text-sm font-medium">{r.name}</span>
                  <span className="readout text-[0.62rem]">{r.countryCount} countries</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* One featured plan, on the lime plate */}
        {country && plan ? (
          <div>
            <p className="eyebrow mb-3 border-t border-hairline pt-3 text-ink">This week</p>
            <Link href={`/destinations/${country.slug}`} className="group block bg-lime p-5 text-on-lime">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-2xl leading-none" aria-hidden>{country.flag}</span>
                  <h4 className="mt-2 font-display text-2xl font-extrabold leading-none tracking-[-0.04em]">
                    {country.name}
                  </h4>
                  <p className="readout mt-1.5 text-on-lime/70">
                    {country.iso3} · {country.dialCode}
                  </p>
                </div>
                <MicroPlate tone="outline" className="border-none bg-on-lime text-lime">
                  Bestseller
                </MicroPlate>
              </div>

              <div className="mt-6 flex items-end justify-between border-t border-on-lime/25 pt-3">
                <div>
                  <span className="t-num-md block">{formatData(plan)}</span>
                  <span className="readout mt-1 flex items-center gap-1.5 text-on-lime/70">
                    <SignalTicks className="h-2.5 w-3.5" level={3} />
                    {plan.validityDays} days · {plan.speed}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 font-display text-2xl font-extrabold tabular-nums">
                  <Price usd={plan.price} />
                  <ArrowRight className="size-5 transition-transform duration-[var(--dur-base)] group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}

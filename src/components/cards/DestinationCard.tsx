import Link from "next/link";
import type { Country } from "@/lib/types";
import { Price } from "@/components/ui/Price";
import { MicroPlate } from "@/components/ui/Plate";
import { cn } from "@/lib/utils";

/**
 * Destination tile — flat, square-cut, with the from-price set large because
 * that is what the visitor is scanning for. Hover draws a lime rule along the
 * bottom edge rather than lifting a shadow.
 */
export function DestinationCard({ country, className }: { country: Country; className?: string }) {
  return (
    <Link
      href={`/destinations/${country.slug}`}
      className={cn(
        "group card-flat relative flex flex-col justify-between overflow-hidden p-4 sm:p-5",
        "transition-colors duration-[var(--dur-base)] hover:border-hairline-strong",
        className,
      )}
    >
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-lime transition-transform duration-[var(--dur-base)] ease-[var(--ease-snap)] group-hover:scale-x-100"
      />

      <div className="flex items-start justify-between gap-2">
        <span className="text-[1.75rem] leading-none" aria-hidden>{country.flag}</span>
        {country.bestseller ? (
          <MicroPlate tone="lime">Bestseller</MicroPlate>
        ) : country.popular ? (
          <MicroPlate tone="outline">Popular</MicroPlate>
        ) : null}
      </div>

      <div className="mt-5">
        <h3 className="t-h3 text-ink">{country.name}</h3>
        <p className="readout mt-1">
          {country.iso3} · {country.speeds.join("/")}
        </p>
      </div>

      <div className="mt-4 flex items-baseline gap-1.5 border-t border-hairline pt-3">
        <span className="readout text-[0.6rem]">from</span>
        <Price usd={country.fromPrice} className="text-2xl font-extrabold leading-none text-ink" />
      </div>
    </Link>
  );
}

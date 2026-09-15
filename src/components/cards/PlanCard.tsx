import Link from "next/link";
import type { Country, Plan } from "@/lib/types";
import { formatData } from "@/lib/data/plans";
import { Price } from "@/components/ui/Price";
import { MicroPlate } from "@/components/ui/Plate";
import { SignalTicks } from "@/components/ui/Chip";
import { ArrowRight } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

interface PlanCardProps {
  plan: Plan;
  country: Country;
  /** The recommended plan — inverted to graphite, lime accents. */
  featured?: boolean;
}

/**
 * The flagship component: a plan as a spec sheet, not a marketing tile.
 *
 * The data amount is the largest thing on the card by a wide margin, because
 * it is the thing being bought; validity and network sit under it as a mono
 * readout; the price is set in the display face at the foot. The recommended
 * plan inverts to graphite so the eye finds it without a badge doing the work
 * alone.
 */
export function PlanCard({ plan, country, featured }: PlanCardProps) {
  return (
    <article
      className={cn(
        "group card-lift relative flex h-full flex-col",
        featured ? "band-graphite border border-ink" : "card-flat",
      )}
    >
      {/* Header — destination and, at most, one badge */}
      <div className="flex items-start justify-between gap-3 border-b border-hairline px-5 py-4">
        <div className="min-w-0">
          <h3 className="flex items-center gap-2 truncate font-display text-lg font-bold tracking-[-0.03em] text-ink">
            <span aria-hidden>{country.flag}</span>
            {country.name}
          </h3>
          <p className="readout mt-1">
            {country.iso3} · {country.dialCode}
          </p>
        </div>
        {featured ? (
          <MicroPlate tone="lime" className="shrink-0">Most picked</MicroPlate>
        ) : plan.badge ? (
          <MicroPlate tone={plan.badge === "UNLIMITED" ? "signal" : "concrete"} className="shrink-0">
            {plan.badge}
          </MicroPlate>
        ) : null}
      </div>

      {/* The number the card exists for */}
      <div className="px-5 pb-5 pt-6">
        <p className={cn("t-num-lg", featured ? "text-lime" : "text-ink")}>{formatData(plan)}</p>
        <p className="readout mt-3 flex flex-wrap items-center gap-x-2 gap-y-1">
          <SignalTicks className={cn("h-2.5 w-3.5", featured ? "text-lime" : "text-signal")} />
          {plan.validityDays} days · {plan.speed} · {plan.network}
        </p>
      </div>

      {/* Price + action */}
      <div className="mt-auto flex items-center justify-between gap-4 border-t border-hairline px-5 py-4">
        <div>
          <span className="readout block text-[0.6rem]">Total</span>
          <Price usd={plan.price} className="text-[1.75rem] font-extrabold leading-none text-ink" />
        </div>
        <Link
          href={{ pathname: "/checkout", query: { plan: plan.id } }}
          className={cn(
            "inline-flex h-11 items-center gap-2 rounded-xs px-4 text-sm font-medium",
            "transition-colors duration-[var(--dur-base)] focus-visible:outline-2 focus-visible:outline-offset-2",
            featured ? "bg-lime text-on-lime hover:bg-lime-edge" : "bg-ink text-ink-inverse hover:bg-signal",
          )}
        >
          Get plan
          <ArrowRight className="size-4 transition-transform duration-[var(--dur-base)] group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}

/**
 * The dense variant — one plan as a row in a hairline-ruled table. Used
 * where a country has many plans and the comparison matters more than the
 * individual card.
 */
export function PlanRow({ plan, country, featured }: PlanCardProps) {
  return (
    <div
      className={cn(
        "group grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-3 border-b border-hairline py-4",
        "sm:grid-cols-[7rem_1fr_auto_auto]",
        featured && "bg-lime-tint",
      )}
    >
      <p className="t-num-md text-ink">{formatData(plan)}</p>
      <p className="readout col-span-2 flex items-center gap-2 sm:col-span-1">
        <SignalTicks className="h-2.5 w-3.5 text-signal" />
        {plan.validityDays} days · {plan.speed} · {plan.network}
      </p>
      <Price usd={plan.price} className="text-xl font-extrabold text-ink" />
      <Link
        href={{ pathname: "/checkout", query: { plan: plan.id } }}
        className="inline-flex h-10 items-center justify-center rounded-xs bg-ink px-4 text-sm font-medium text-ink-inverse transition-colors hover:bg-signal"
        aria-label={`Get the ${formatData(plan)} plan for ${country.name}`}
      >
        Get plan
      </Link>
    </div>
  );
}

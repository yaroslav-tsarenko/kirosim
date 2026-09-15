import Link from "next/link";
import { DestinationSearch } from "@/components/search/DestinationSearch";
import { Container } from "@/components/ui/Section";
import { Marked, MicroPlate, IndexNum } from "@/components/ui/Plate";
import { ChipMark, SignalTicks } from "@/components/ui/Chip";
import { Price } from "@/components/ui/Price";
import { popularCountries, getCountry } from "@/lib/data/countries";
import { plansFor, formatData } from "@/lib/data/plans";
import { site } from "@/lib/site";

const steps = [
  { label: "Choose destination", detail: "Search by country or region" },
  { label: "Scan the QR", detail: "It arrives by email in seconds" },
  { label: "You're connected", detail: "Before you clear the gate" },
];

/** The specimen plan shown beside the headline. Pulled from the catalogue so
 *  the numbers on the home page are numbers you can actually buy. */
const SPECIMEN_SLUG = "jp";

/**
 * A headline statement, not a scene. The page opens with type: a graphite
 * wall of words with one lime-plated verb, the search bar directly under it
 * as the real call to action, and a single specimen plan on the right to
 * show what "a plan" means before the visitor clicks anything.
 */
export function Hero() {
  const chips = popularCountries().slice(0, 6);
  const country = getCountry(SPECIMEN_SLUG);
  const plan = plansFor(SPECIMEN_SLUG)[1];

  return (
    <section className="relative border-b border-hairline bg-porcelain">
      <Container className="grid gap-x-12 gap-y-12 py-12 sm:py-16 lg:grid-cols-[1.55fr_1fr] lg:items-start lg:py-20">
        {/* ── Left: the statement ── */}
        <div>
          <p className="eyebrow animate-fade-up flex items-center gap-2.5">
            <SignalTicks className="h-3 w-4 text-ink" />
            <span className="text-ink">{site.countriesCovered} destinations</span>
            <span aria-hidden className="text-hairline-strong">/</span>
            <span>Instant QR delivery</span>
          </p>

          <h1 className="t-hero animate-fade-up mt-6 max-w-[13ch] text-ink" data-delay="1">
            Data that <Marked>lands</Marked> before you do.
          </h1>

          <p
            className="animate-fade-up mt-6 max-w-[46ch] text-pretty text-[1.0625rem] leading-relaxed text-ink-muted"
            data-delay="2"
          >
            A travel eSIM for {site.countriesCovered} countries. Pay, scan the QR, and the data is
            live — no roaming bill, no plastic SIM, no queue at the airport.
          </p>

          {/* The real CTA of the business. */}
          <div className="animate-fade-up relative z-30 mt-8" data-delay="3">
            <DestinationSearch size="lg" placeholder="Where are you headed?" />
            <ul
              className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2"
              aria-label="Popular destinations"
            >
              <li className="eyebrow mr-1 hidden sm:block">Popular</li>
              {chips.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/destinations/${c.slug}`}
                    className="inline-flex items-center gap-1.5 border border-hairline bg-card px-2.5 py-1.5 text-[0.8125rem] font-medium text-ink transition-colors duration-[var(--dur-fast)] hover:border-ink hover:bg-lime-tint"
                  >
                    <span aria-hidden className="leading-none">{c.flag}</span>
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Right: one specimen plan, on graphite ── */}
        {country && plan ? (
          <Link
            href={`/destinations/${country.slug}`}
            className="band-graphite animate-fade-up group relative block overflow-hidden p-6 sm:p-8 lg:mt-14"
            data-delay="4"
          >
            <div className="pointer-events-none absolute inset-0 pad-grid opacity-60" aria-hidden />
            <div className="relative">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="eyebrow text-ink">Most picked this week</p>
                  <p className="mt-2 flex items-center gap-2 font-display text-xl font-bold tracking-[-0.03em] text-ink">
                    <span aria-hidden>{country.flag}</span> {country.name}
                  </p>
                </div>
                <ChipMark className="h-12 w-[3.75rem] shrink-0 -rotate-6" animate />
              </div>

              <p className="t-num-xl mt-8 text-lime">{formatData(plan)}</p>
              <p className="readout mt-3 flex items-center gap-2 text-ink-muted">
                <SignalTicks className="h-2.5 w-3.5 text-lime" level={4} />
                {plan.validityDays} days · {plan.speed} · {plan.network}
              </p>

              <div className="mt-6 flex items-end justify-between border-t border-hairline pt-4">
                <span className="readout text-ink-muted">{country.iso3} · {country.dialCode}</span>
                <span className="font-display text-4xl font-extrabold tabular-nums leading-none text-ink">
                  <Price usd={plan.price} />
                </span>
              </div>
            </div>
          </Link>
        ) : null}
      </Container>

      {/* ── The three steps, numbered like a spec sheet ── */}
      <Container>
        <ol className="grid border-t border-hairline sm:grid-cols-3">
          {steps.map((s, i) => (
            <li
              key={s.label}
              className="flex items-start gap-4 border-b border-hairline py-5 sm:border-b-0 sm:border-r sm:pr-6 sm:last:border-r-0 sm:[&:not(:first-child)]:pl-6"
            >
              <IndexNum n={i + 1} className="mt-1" />
              <div>
                <p className="t-h3 text-ink">{s.label}</p>
                <p className="mt-1 text-sm text-ink-muted">{s.detail}</p>
              </div>
            </li>
          ))}
        </ol>

        <ul className="flex flex-wrap items-center gap-x-2 gap-y-2 border-t border-hairline py-5">
          <li><MicroPlate tone="lime">Instant delivery</MicroPlate></li>
          <li><MicroPlate>No roaming fees</MicroPlate></li>
          <li><MicroPlate>Keep your number</MicroPlate></li>
          <li><MicroPlate>24/7 support</MicroPlate></li>
        </ul>
      </Container>
    </section>
  );
}

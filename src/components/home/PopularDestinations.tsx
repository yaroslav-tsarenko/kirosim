import Link from "next/link";
import { Section, Container, SectionHead } from "@/components/ui/Section";
import { DestinationCard } from "@/components/cards/DestinationCard";
import { Reveal } from "@/components/ui/Reveal";
import { TextLink, ButtonLink } from "@/components/ui/Button";
import { Price } from "@/components/ui/Price";
import { MicroPlate, Marked } from "@/components/ui/Plate";
import { SignalTicks } from "@/components/ui/Chip";
import { popularCountries } from "@/lib/data/countries";
import { plansFor, formatData } from "@/lib/data/plans";
import { site } from "@/lib/site";

/**
 * The grid is deliberately uneven: the single most-travelled destination gets
 * a wide feature tile with a real plan on it, the rest are compact tiles.
 * Eight identical cards would say nothing about which one to pick.
 */
export function PopularDestinations() {
  const [lead, ...rest] = popularCountries().slice(0, 9);
  const leadPlan = lead ? plansFor(lead.slug)[1] : undefined;

  return (
    <Section band="porcelain">
      <Container className="py-16 sm:py-20">
        <SectionHead
          index={1}
          eyebrow="Most travelled"
          title={<>Where our SIMs <Marked>land</Marked> most</>}
          aside={<TextLink href="/destinations">All destinations</TextLink>}
        />

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {/* Feature tile — two columns wide, carrying an actual plan. */}
          {lead && leadPlan ? (
            <Reveal className="sm:col-span-2" delay={1}>
              <Link
                href={`/destinations/${lead.slug}`}
                className="group card-lift band-graphite relative flex h-full flex-col justify-between overflow-hidden border border-ink p-6"
              >
                <div className="pointer-events-none absolute inset-0 pad-grid opacity-40" aria-hidden />
                <div className="relative flex items-start justify-between gap-3">
                  <div>
                    <span className="text-3xl leading-none" aria-hidden>{lead.flag}</span>
                    <h3 className="mt-3 font-display text-3xl font-extrabold leading-none tracking-[-0.04em] text-ink">
                      {lead.name}
                    </h3>
                    <p className="readout mt-2">{lead.iso3} · {lead.dialCode}</p>
                  </div>
                  <MicroPlate tone="lime">Most travelled</MicroPlate>
                </div>

                <div className="relative mt-8 flex items-end justify-between gap-4 border-t border-hairline pt-4">
                  <div>
                    <p className="t-num-md text-lime">{formatData(leadPlan)}</p>
                    <p className="readout mt-2 flex items-center gap-2">
                      <SignalTicks className="h-2.5 w-3.5 text-lime" />
                      {leadPlan.validityDays} days · {leadPlan.speed}
                    </p>
                  </div>
                  <Price usd={leadPlan.price} className="text-3xl font-extrabold leading-none text-ink" />
                </div>
              </Link>
            </Reveal>
          ) : null}

          {rest.map((c, i) => (
            <Reveal key={c.slug} delay={(((i + 1) % 4) + 1) as 1 | 2 | 3 | 4}>
              <DestinationCard country={c} className="h-full" />
            </Reveal>
          ))}
        </div>

        <div className="mt-8 flex justify-start">
          <ButtonLink href="/destinations" variant="outline" size="lg">
            Browse all {site.countriesCovered} destinations
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}

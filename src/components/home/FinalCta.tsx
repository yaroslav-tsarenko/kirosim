import { Section, Container } from "@/components/ui/Section";
import { DestinationSearch } from "@/components/search/DestinationSearch";
import { Marked, MicroPlate } from "@/components/ui/Plate";
import { ChipMark } from "@/components/ui/Chip";

/** The closing band: graphite, the pad grid behind it, and the search field
 *  again — the page ends where it started, on the one action that matters. */
export function FinalCta() {
  return (
    <Section band="graphite" padGrid>
      <Container className="py-16 sm:py-24">
        <div className="grid gap-x-12 gap-y-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow text-ink">Your next trip</p>
            <h2 className="t-h1 mt-5 max-w-[15ch] text-balance text-ink">
              Pick a destination. Be online before you <Marked>land.</Marked>
            </h2>
            <div className="relative z-30 mt-8 max-w-xl">
              <DestinationSearch size="lg" placeholder="Where are you headed?" />
            </div>
            <ul className="mt-5 flex flex-wrap gap-2">
              <li><MicroPlate tone="lime">Instant QR</MicroPlate></li>
              <li><MicroPlate tone="outline">No roaming fees</MicroPlate></li>
              <li><MicroPlate tone="outline">24/7 support</MicroPlate></li>
            </ul>
          </div>

          <div className="hidden justify-self-end lg:block">
            <ChipMark className="h-32 w-40 rotate-[-8deg]" animate />
          </div>
        </div>
      </Container>
    </Section>
  );
}

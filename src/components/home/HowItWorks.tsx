import { Section, Container, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Marked } from "@/components/ui/Plate";
import { ChipMark } from "@/components/ui/Chip";
import { Search, QrGlyph, Bolt } from "@/components/ui/icons";

const steps = [
  {
    icon: <Search className="size-5" />,
    title: "Choose your destination",
    body: "Search a country or region and pick the plan that matches the trip — data, days, done.",
  },
  {
    icon: <QrGlyph className="size-5" />,
    title: "Scan the QR",
    body: "One page of checkout. The QR appears immediately and lands in your inbox — nothing ships, nothing waits.",
  },
  {
    icon: <Bolt className="size-5" />,
    title: "You're connected",
    body: "Follow the steps for your handset and step off the plane already online. It takes about a minute.",
  },
];

/**
 * The steps as a numbered grid with the chip glyph provisioning alongside —
 * the pads light in sequence, which is the only animation on the section and
 * the only place it says anything.
 */
export function HowItWorks() {
  return (
    <Section band="concrete" id="how">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-x-12 gap-y-10 lg:grid-cols-[1fr_1.35fr] lg:items-start">
          <div>
            <SectionHead
              index={2}
              eyebrow="How it works"
              title={<>Three steps, about a <Marked>minute.</Marked></>}
              lede="No shipping, no shop, no passport scan at a kiosk. The whole purchase happens on your phone, including the part where the data starts working."
            />
            <div className="mt-8 inline-flex items-center gap-4 border border-hairline bg-card p-4">
              <ChipMark className="h-11 w-14 shrink-0" animate />
              <p className="readout max-w-[22ch] normal-case tracking-normal text-ink-muted">
                Pads light as the profile installs — you see it happen on the success screen.
              </p>
            </div>
          </div>

          <ol className="border-t border-hairline">
            {steps.map((s, i) => (
              <Reveal key={s.title} as="li" delay={(i + 1) as 1 | 2 | 3}>
                <div className="grid grid-cols-[auto_1fr] gap-x-5 border-b border-hairline py-6">
                  <span className="index-num pt-1.5">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="flex items-center gap-2.5 font-display text-2xl font-extrabold tracking-[-0.035em] text-ink">
                      <span className="grid size-8 shrink-0 place-items-center bg-lime text-on-lime">
                        {s.icon}
                      </span>
                      {s.title}
                    </h3>
                    <p className="mt-2.5 max-w-[52ch] text-pretty leading-relaxed text-ink-muted">
                      {s.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}

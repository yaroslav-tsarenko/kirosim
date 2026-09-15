import { Section, Container } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { IndexNum, Marked } from "@/components/ui/Plate";
import { SignalTicks } from "@/components/ui/Chip";
import { site } from "@/lib/site";

/** Only values we can stand behind: the catalogue size and what every plan
 *  actually includes. No invented ratings, review counts or logos. */
const stats = [
  { value: site.countriesCovered, label: "Countries covered" },
  { value: "£0", label: "Roaming fees" },
  { value: "24/7", label: "Human support" },
  { value: "~60s", label: "Typical install" },
];

const included = [
  {
    title: "Instant QR delivery",
    body: "The code appears the moment payment clears, and lands in your inbox as well.",
  },
  {
    title: "Keep your own number",
    body: "The eSIM runs alongside your usual SIM, so calls and messages carry on as normal.",
  },
  {
    title: "Local 4G and 5G",
    body: "Every plan rides a national operator in the country you're visiting — no throttled fallback.",
  },
  {
    title: "No contract, no surprises",
    body: "You pay once for a set amount of data and days. Nothing renews on its own.",
  },
];

/**
 * The graphite band. Four numbers set huge in lime, then what the purchase
 * includes as a numbered list — no icon circles, no repeated feature cards.
 */
export function TrustBand() {
  return (
    <Section band="graphite" padGrid>
      <Container className="py-16 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-hairline pb-8">
          <h2 className="t-h1 max-w-[14ch] text-balance text-ink">
            One purchase. Connected on <Marked>landing.</Marked>
          </h2>
          <p className="readout flex items-center gap-2 text-ink-muted">
            <SignalTicks className="h-2.5 w-3.5 text-lime" />
            Every plan, every destination
          </p>
        </div>

        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 border-b border-hairline py-10 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="t-num-md text-lime">{s.value}</dt>
              <dd className="readout mt-2 text-ink-muted">{s.label}</dd>
            </div>
          ))}
        </dl>

        <ul className="grid gap-x-10 sm:grid-cols-2">
          {included.map((f, i) => (
            <Reveal key={f.title} as="li" delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
              <div className="grid grid-cols-[auto_1fr] gap-x-4 border-b border-hairline py-6">
                <IndexNum n={i + 1} className="pt-1" />
                <div>
                  <h3 className="t-h3 text-ink">{f.title}</h3>
                  <p className="mt-2 text-pretty leading-relaxed text-ink-muted">{f.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

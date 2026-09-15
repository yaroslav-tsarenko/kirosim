import { Section, Container, SectionHead } from "@/components/ui/Section";
import { Marked } from "@/components/ui/Plate";
import { Price } from "@/components/ui/Price";
import { countries } from "@/lib/data/countries";
import { plansFor } from "@/lib/data/plans";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/** The entry price for the 3 GB / 30 day plan, read from the catalogue —
 *  the comparison quotes what the store actually charges, not a round number
 *  chosen because it looked good in a table. */
function lowest3GbPrice(): number {
  return Math.min(
    ...countries.map((c) => {
      const plan = plansFor(c.slug)[1];
      return plan ? plan.price : Infinity;
    }),
  );
}

interface Row {
  label: string;
  us: React.ReactNode;
  roaming: string;
  /** The row the whole comparison exists for. */
  mark?: boolean;
}

/**
 * Roaming versus eSIM as a stark two-column table. The savings row is the
 * only one on a lime plate — everything else is hairlines and type, so the
 * one number that decides the purchase is impossible to miss.
 */
export function WhyUs() {
  const from = lowest3GbPrice();

  const rows: Row[] = [
    {
      label: "3 GB abroad, 30 days",
      us: <Price usd={from} prefix="from " className="font-bold" />,
      roaming: "£45+ in overage",
      mark: true,
    },
    { label: "Delivery", us: "Instant QR", roaming: "Buy a local SIM on arrival" },
    { label: "Setup", us: "About a minute", roaming: "Store queue + passport" },
    { label: "Your own number", us: "Kept, on dual-SIM", roaming: "Swap the card, lose it" },
    { label: "Coverage", us: `${site.countriesCovered} countries`, roaming: "One country per SIM" },
    { label: "Top-ups", us: "In your account, anytime", roaming: "Back to the shop" },
  ];

  return (
    <Section band="porcelain">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-x-12 gap-y-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <SectionHead
            index={3}
            eyebrow="eSIM vs roaming"
            title={<>Same trip. No bill <Marked>shock.</Marked></>}
            lede="A travel eSIM replaces the airport SIM queue and the overage text with a QR code you scan before you leave home."
            watermark
          />

          <div className="border-t-2 border-ink">
            {/* Column heads */}
            <div className="grid grid-cols-[1.2fr_1fr_1fr] border-b border-hairline">
              <span className="eyebrow py-3">Comparison</span>
              <span className="micro-plate micro-plate-lime my-2 justify-center">{site.name}</span>
              <span className="eyebrow py-3 pl-4">Roaming</span>
            </div>

            {rows.map((r) => (
              <div
                key={r.label}
                className={cn(
                  "grid grid-cols-[1.2fr_1fr_1fr] items-center border-b border-hairline text-sm",
                  r.mark && "bg-lime-tint",
                )}
              >
                <span className="py-4 pr-3 text-ink">{r.label}</span>
                <span
                  className={cn(
                    "py-4 text-center font-medium text-ink",
                    r.mark && "font-display text-xl font-extrabold",
                  )}
                >
                  {r.us}
                </span>
                <span className="py-4 pl-4 text-ink-muted">{r.roaming}</span>
              </div>
            ))}

            <p className="readout mt-3 normal-case tracking-normal">
              Roaming figures are typical pay-as-you-go overage rates for a UK carrier outside its
              inclusive zone; check your own tariff.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}

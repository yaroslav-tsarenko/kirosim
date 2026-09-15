import type { Metadata } from "next";
import Link from "next/link";
import { Section, Container, PageHeader } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Price } from "@/components/ui/Price";
import { MicroPlate, Marked } from "@/components/ui/Plate";
import { SignalTicks } from "@/components/ui/Chip";
import { ArrowRight } from "@/components/ui/icons";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Global eSIM plans — one plan, 130+ countries",
  description: `A single ${site.name} global eSIM that works across 130+ countries. Built for multi-country trips. Instant QR delivery.`,
  alternates: { canonical: "/plans/global" },
};

/** Mirrors the GLOBAL catalogue in src/lib/data/summary.ts — the ids here are
 *  the ids checkout resolves, so the two must stay in step. */
const globalPlans = [
  { id: "global-1-7", data: "1 GB", days: 7, price: 9, countries: 130, badge: undefined as string | undefined },
  { id: "global-3-30", data: "3 GB", days: 30, price: 22, countries: 130, badge: "BESTSELLER" },
  { id: "global-10-30", data: "10 GB", days: 30, price: 45, countries: 130, badge: undefined },
  { id: "global-unl-15", data: "Unlimited", days: 15, price: 69, countries: 130, badge: "UNLIMITED" },
];

export default function GlobalPlansPage() {
  const trail = [
    { name: "Home", path: "/" },
    { name: "Global plans", path: "/plans/global" },
  ];
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <PageHeader
        crumbs={<Breadcrumbs trail={trail} />}
        eyebrow="Global plans"
        title={<>One eSIM. The whole <Marked>planet.</Marked></>}
        lede="Built for multi-country trips and nomads — a single plan that follows you across 130+ countries without a single SIM swap."
        aside={
          <p className="text-right">
            <span className="t-num-md block text-ink">130+</span>
            <span className="readout mt-2 block">countries, one plan</span>
          </p>
        }
      />

      <Section band="concrete">
        <Container className="py-12 sm:py-16">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {globalPlans.map((p) => {
              const featured = p.badge === "BESTSELLER";
              return (
                <article
                  key={p.id}
                  className={cn(
                    "group card-lift flex flex-col",
                    featured ? "band-graphite border border-ink" : "card-flat",
                  )}
                >
                  <div className="flex items-start justify-between gap-3 border-b border-hairline px-5 py-4">
                    <p className="readout text-ink">Global · {p.countries}+</p>
                    {featured ? (
                      <MicroPlate tone="lime">Most picked</MicroPlate>
                    ) : p.badge ? (
                      <MicroPlate tone="signal">{p.badge}</MicroPlate>
                    ) : null}
                  </div>

                  <div className="px-5 pb-5 pt-6">
                    <p className={cn("t-num-lg", featured ? "text-lime" : "text-ink")}>{p.data}</p>
                    <p className="readout mt-3 flex items-center gap-2">
                      <SignalTicks
                        className={cn("h-2.5 w-3.5", featured ? "text-lime" : "text-signal")}
                      />
                      {p.days} days · 4G/5G
                    </p>
                  </div>

                  <div className="mt-auto flex items-center justify-between gap-4 border-t border-hairline px-5 py-4">
                    <div>
                      <span className="readout block text-[0.6rem]">Total</span>
                      <Price usd={p.price} className="text-[1.75rem] font-extrabold leading-none text-ink" />
                    </div>
                    <Link
                      href={{ pathname: "/checkout", query: { plan: p.id } }}
                      className={cn(
                        "inline-flex h-11 items-center gap-2 rounded-xs px-4 text-sm font-medium transition-colors duration-[var(--dur-base)]",
                        featured
                          ? "bg-lime text-on-lime hover:bg-lime-edge"
                          : "bg-ink text-ink-inverse hover:bg-signal",
                      )}
                    >
                      Get plan
                      <ArrowRight className="size-4 transition-transform duration-[var(--dur-base)] group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          <ul className="mt-10 flex flex-wrap gap-2">
            {["Works in 130+ countries", "Keep your home number", "Top up anytime", "Instant QR delivery"].map(
              (f) => (
                <li key={f}>
                  <MicroPlate tone="outline">{f}</MicroPlate>
                </li>
              ),
            )}
          </ul>
        </Container>
      </Section>
    </>
  );
}

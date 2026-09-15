import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { regions, getRegion } from "@/lib/data/regions";
import { countriesByRegion } from "@/lib/data/countries";
import { Section, Container } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { DestinationCard } from "@/components/cards/DestinationCard";
import { PadArray } from "@/components/coverage/PadArray";
import { MicroPlate, Marked } from "@/components/ui/Plate";
import { Price } from "@/components/ui/Price";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";

export function generateStaticParams() {
  return regions.map((r) => ({ region: r.id }));
}

export async function generateMetadata({ params }: PageProps<"/regions/[region]">): Promise<Metadata> {
  const { region: id } = await params;
  const region = getRegion(id);
  if (!region) return {};
  return {
    title: `${region.name} eSIM — one plan across ${region.countryCount} countries`,
    description: `${region.name} travel eSIM from $${region.fromPrice.toFixed(2)}. ${region.blurb} Instant QR delivery, no roaming.`,
    alternates: { canonical: `/regions/${region.id}` },
  };
}

export default async function RegionPage({ params }: PageProps<"/regions/[region]">) {
  const { region: id } = await params;
  const region = getRegion(id);
  if (!region) notFound();

  const list = countriesByRegion(region.id);
  const trail = [
    { name: "Home", path: "/" },
    { name: "Regional plans", path: "/plans/regional" },
    { name: region.name, path: `/regions/${region.id}` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />

      <Section band="porcelain" className="border-b border-hairline">
        <Container className="py-10 sm:py-14">
          <Breadcrumbs trail={trail} />
          <div className="mt-6 grid gap-x-12 gap-y-8 lg:grid-cols-[1fr_1fr] lg:items-end">
            <div>
              <p className="eyebrow border-t border-hairline pt-3 text-ink">
                {region.name.toUpperCase()} · {region.countryCount} COUNTRIES
              </p>
              <h1 className="t-hero mt-5 text-ink">
                {region.name} <Marked>eSIM</Marked>
              </h1>
              <p className="mt-5 max-w-[48ch] text-pretty leading-relaxed text-ink-muted">
                {region.blurb} One plan keeps you online across {region.countryCount} countries — no
                swapping SIMs at every border.
              </p>
              <div className="mt-6 flex flex-wrap items-end gap-6">
                <span>
                  <span className="readout block text-[0.6rem]">from</span>
                  <Price usd={region.fromPrice} className="text-3xl font-extrabold leading-none text-ink" />
                </span>
                <MicroPlate tone="lime">Instant QR delivery</MicroPlate>
              </div>
            </div>

            <PadArray region={region.id} />
          </div>
        </Container>
      </Section>

      <Section band="concrete">
        <Container className="py-12 sm:py-16">
          <h2 className="t-h1 text-ink">Countries covered</h2>
          <p className="readout mt-3">
            {region.name.toUpperCase()} · {list.length} DESTINATIONS
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {list.map((c) => (
              <DestinationCard key={c.slug} country={c} className="h-full" />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}

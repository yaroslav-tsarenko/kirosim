import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { countries, getCountry } from "@/lib/data/countries";
import { getRegion } from "@/lib/data/regions";
import { fetchPlans } from "@/lib/api/client";
import { Section, Container, SectionHead } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { MicroPlate, Marked } from "@/components/ui/Plate";
import { SignalTicks } from "@/components/ui/Chip";
import { TextLink } from "@/components/ui/Button";
import { PlanGrid } from "@/components/destination/PlanGrid";
import { DataCalculator } from "@/components/destination/DataCalculator";
import { FaqSection } from "@/components/home/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, destinationSchema } from "@/lib/seo";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return countries.map((c) => ({ country: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/destinations/[country]">): Promise<Metadata> {
  const { country: slug } = await params;
  const country = getCountry(slug);
  if (!country) return {};
  const title = `${country.name} eSIM — instant data from $${country.fromPrice.toFixed(2)}`;
  const description = `Travel eSIM for ${country.name}. ${country.speeds.join("/")} data on ${country.networks.join(" & ")}, delivered as a QR code in seconds. No roaming fees.`;
  return {
    title,
    description,
    alternates: { canonical: `/destinations/${country.slug}` },
    openGraph: { title: `${title} · ${site.name}`, description, type: "website" },
  };
}

export default async function DestinationPage({ params }: PageProps<"/destinations/[country]">) {
  const { country: slug } = await params;
  const country = getCountry(slug);
  if (!country) notFound();

  const plans = await fetchPlans(country.slug);
  const region = getRegion(country.region);
  const trail = [
    { name: "Home", path: "/" },
    { name: "Destinations", path: "/destinations" },
    { name: country.name, path: `/destinations/${country.slug}` },
  ];

  return (
    <>
      <JsonLd data={[destinationSchema(country, plans), breadcrumbSchema(trail)]} />

      {/* Country header — the name set huge, the code on a plate beneath */}
      <Section band="porcelain" className="border-b border-hairline">
        <Container className="py-10 sm:py-14">
          <Breadcrumbs trail={trail} />

          <div className="mt-6 grid gap-x-12 gap-y-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div>
              <span className="text-5xl leading-none" aria-hidden>{country.flag}</span>
              <h1 className="t-hero mt-4 text-ink">
                {country.name} <Marked>eSIM</Marked>
              </h1>
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <MicroPlate>{country.iso3} · {country.dialCode}</MicroPlate>
                <MicroPlate tone="lime">{country.speeds.join(" / ")}</MicroPlate>
                {region ? <MicroPlate tone="outline">{region.name}</MicroPlate> : null}
              </div>
              <p className="mt-5 max-w-[50ch] text-pretty leading-relaxed text-ink-muted">
                Stay online across {country.name} the moment you land. Instant QR delivery,{" "}
                {country.speeds.join("/")} speeds on a local operator, and no roaming bill afterwards.
              </p>
            </div>

            {/* Coverage / network readout */}
            <div className="card-flat p-5">
              <p className="eyebrow flex items-center gap-2 text-ink">
                <SignalTicks className="h-3 w-4 text-signal" />
                Coverage &amp; network
              </p>
              <dl className="mt-4 border-t border-hairline text-sm">
                <Row label="Operators" value={country.networks.join(", ")} />
                <Row label="Speeds" value={country.speeds.join(" / ")} />
                <Row label="Region" value={region?.name ?? "—"} />
                <Row label="Activation" value="Scan QR · no eKYC" />
              </dl>
            </div>
          </div>
        </Container>
      </Section>

      {/* Plans */}
      <Section band="concrete">
        <Container className="py-12 sm:py-16">
          <SectionHead
            index={1}
            eyebrow="Available plans"
            title={<>Choose your {country.name} plan</>}
            lede="Every plan is delivered instantly as a QR code. Data only starts counting once you connect on arrival."
          />

          <div className="mt-10">
            <PlanGrid country={country} plans={plans} />
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <DataCalculator plans={plans} />
            <div className="card-flat flex flex-col justify-between p-6">
              <div>
                <p className="eyebrow text-ink">Compatible devices</p>
                <h3 className="t-h2 mt-3 text-ink">Will it work on my phone?</h3>
                <p className="mt-3 text-pretty leading-relaxed text-ink-muted">
                  Most handsets from 2018 onward support eSIM — iPhone XR and later, recent Samsung
                  Galaxy, Google Pixel and more. The phone also has to be carrier-unlocked.
                </p>
              </div>
              <TextLink href="/compatibility" className="mt-6 self-start">
                Run the compatibility check
              </TextLink>
            </div>
          </div>

          <p className="readout mt-8">
            Prices shown are per plan · <Link href="/legal/refund-cancellation" className="underline-offset-4 hover:underline">refund policy</Link>
          </p>
        </Container>
      </Section>

      <FaqSection title={<>{country.name} — good to <Marked>know</Marked></>} />
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-hairline py-2.5">
      <dt className="readout">{label}</dt>
      <dd className="text-right font-medium text-ink">{value}</dd>
    </div>
  );
}

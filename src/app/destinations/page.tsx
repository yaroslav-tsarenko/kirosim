import type { Metadata } from "next";
import { Section, Container, PageHeader } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Marked } from "@/components/ui/Plate";
import { DestinationsExplorer } from "@/components/destination/DestinationsExplorer";
import { countries } from "@/lib/data/countries";
import { site } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: `All destinations — travel eSIMs for ${site.countriesCovered} countries`,
  description: `Browse ${site.name} travel eSIMs by country and region. Instant QR delivery, no roaming fees.`,
  alternates: { canonical: "/destinations" },
};

export default function DestinationsPage() {
  const trail = [
    { name: "Home", path: "/" },
    { name: "Destinations", path: "/destinations" },
  ];
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <PageHeader
        crumbs={<Breadcrumbs trail={trail} />}
        eyebrow="Full index"
        title={<>Pick where you&apos;re <Marked>going.</Marked></>}
        lede={`${countries.length} destinations and counting — each one delivered as an instant QR code.`}
        aside={
          <p className="text-right">
            <span className="t-num-md block text-ink">{countries.length}</span>
            <span className="readout mt-2 block">countries live</span>
          </p>
        }
      />

      <Section band="porcelain">
        <Container className="py-10 sm:py-14">
          <DestinationsExplorer countries={countries} />
        </Container>
      </Section>
    </>
  );
}

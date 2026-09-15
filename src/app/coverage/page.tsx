import type { Metadata } from "next";
import { Section, Container, PageHeader } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Marked } from "@/components/ui/Plate";
import { CoverageExplorer } from "@/components/coverage/CoverageExplorer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Coverage explorer — where ${site.name} works`,
  description: `Explore ${site.name} eSIM coverage across every region. Pick a continent to see supported countries, networks and starting prices.`,
  alternates: { canonical: "/coverage" },
};

export default function CoveragePage() {
  const trail = [
    { name: "Home", path: "/" },
    { name: "Coverage", path: "/coverage" },
  ];
  return (
    <>
      <PageHeader
        crumbs={<Breadcrumbs trail={trail} />}
        eyebrow="Global network"
        title={<>See where the signal <Marked>reaches.</Marked></>}
        lede="Pick a region to reveal the countries covered, the local networks behind each one, and the price your trip starts at."
      />
      <Section band="porcelain">
        <Container className="py-10 sm:py-14">
          <CoverageExplorer />
        </Container>
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import { Section, Container, SectionHead, PageHeader } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Marked } from "@/components/ui/Plate";
import { HowItWorks } from "@/components/home/HowItWorks";
import { InstallSteps } from "@/components/how/InstallSteps";
import { FaqSection } from "@/components/home/FaqSection";
import { generalFaq } from "@/lib/data/faq";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema, breadcrumbSchema } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "How it works — buy, scan, travel",
  description: `See how a ${site.name} travel eSIM works: choose a destination, get the QR instantly, install in about a minute. iOS and Android guides included.`,
  alternates: { canonical: "/how-it-works" },
};

export default function HowItWorksPage() {
  const trail = [
    { name: "Home", path: "/" },
    { name: "How it works", path: "/how-it-works" },
  ];
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(trail),
          faqSchema(generalFaq.map((f) => ({ q: f.q, a: typeof f.a === "string" ? f.a : "" }))),
        ]}
      />
      <PageHeader
        crumbs={<Breadcrumbs trail={trail} />}
        eyebrow="How it works"
        title={<>From checkout to connected in one <Marked>minute.</Marked></>}
        lede="No plastic SIM, no store queue. Here's the whole journey — and exactly how to install the eSIM on any phone."
      />

      <HowItWorks />

      <Section band="porcelain">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-x-12 gap-y-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <SectionHead
              index={3}
              eyebrow="Install guide"
              title={<>Scan and <Marked>connect.</Marked></>}
              lede="Follow the steps for your device. You can install before you fly — data only starts once you connect at your destination."
            />
            <InstallSteps />
          </div>
        </Container>
      </Section>

      <FaqSection />
    </>
  );
}

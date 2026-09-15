import type { Metadata } from "next";
import { Section, Container, PageHeader } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Marked } from "@/components/ui/Plate";
import { CompatibilityChecker } from "@/components/compatibility/CompatibilityChecker";

export const metadata: Metadata = {
  title: "eSIM compatibility check — is your phone supported?",
  description: "Check whether your phone supports eSIM in seconds. Pick your brand and model for an instant verdict before you buy a travel eSIM.",
  alternates: { canonical: "/compatibility" },
};

export default function CompatibilityPage() {
  const trail = [
    { name: "Home", path: "/" },
    { name: "Compatibility", path: "/compatibility" },
  ];
  return (
    <>
      <PageHeader
        crumbs={<Breadcrumbs trail={trail} />}
        eyebrow="Device check"
        title={<>Does your phone take an <Marked>eSIM</Marked>?</>}
        lede="Most handsets from 2018 onward do. Check yours in two taps — no sign-up, no email."
      />
      <Section band="concrete">
        <Container className="py-12 sm:py-16">
          <CompatibilityChecker />
        </Container>
      </Section>
    </>
  );
}

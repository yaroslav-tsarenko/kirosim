import type { Metadata } from "next";
import Link from "next/link";
import { Section, Container, PageHeader } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Marked, IndexNum } from "@/components/ui/Plate";
import { ArrowRight } from "@/components/ui/icons";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import { policies } from "@/lib/data/policies";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Legal & policies",
  description: `The full ${site.name} policy library — terms, refunds, delivery, privacy, cookies, acceptable use and complaints.`,
  alternates: { canonical: "/legal" },
};

export default function LegalIndexPage() {
  const trail = [
    { name: "Home", path: "/" },
    { name: "Legal", path: "/legal" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <PageHeader
        crumbs={<Breadcrumbs trail={trail} />}
        eyebrow="The fine print"
        title={<>Everything, in plain <Marked>sight.</Marked></>}
        lede={`The policies that govern your purchase and use of ${site.name}. Sold by ${site.company}, reg. no. ${site.regNumber}.`}
      />

      <Section band="porcelain">
        <Container className="py-12 sm:py-16">
          <ul className="border-t-2 border-ink">
            {policies.map((p, i) => (
              <li key={p.slug} className="border-b border-hairline">
                <Link
                  href={`/legal/${p.slug}`}
                  className="group grid grid-cols-[auto_1fr_auto] items-start gap-x-5 py-5 transition-colors duration-[var(--dur-fast)] hover:bg-lime-tint sm:gap-x-8"
                >
                  <IndexNum n={i + 1} className="pt-1.5" />
                  <div>
                    <h2 className="t-h3 text-ink">{p.title}</h2>
                    <p className="mt-1.5 max-w-[60ch] text-pretty text-sm text-ink-muted">{p.summary}</p>
                    <p className="readout mt-2">Updated {p.lastUpdated}</p>
                  </div>
                  <ArrowRight className="mt-1.5 size-4 shrink-0 text-ink-muted transition-transform duration-[var(--dur-base)] group-hover:translate-x-1 group-hover:text-ink" />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}

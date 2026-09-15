import type { Metadata } from "next";
import Link from "next/link";
import { Section, Container, PageHeader } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { regions } from "@/lib/data/regions";
import { Price } from "@/components/ui/Price";
import { IndexNum, Marked } from "@/components/ui/Plate";
import { ArrowRight } from "@/components/ui/icons";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Regional eSIM plans — one plan per continent",
  description: `Cover a whole region with a single ${site.name} eSIM. Europe, Asia, Americas and more. Instant QR delivery.`,
  alternates: { canonical: "/plans/regional" },
};

export default function RegionalPlansPage() {
  const trail = [
    { name: "Home", path: "/" },
    { name: "Regional plans", path: "/plans/regional" },
  ];
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <PageHeader
        crumbs={<Breadcrumbs trail={trail} />}
        eyebrow="Regional plans"
        title={<>One eSIM for the whole <Marked>region.</Marked></>}
        lede="Hopping between countries? A regional plan keeps you connected across an entire continent without swapping a thing."
      />

      <Section band="porcelain">
        <Container className="py-10 sm:py-14">
          {/* Regions as ruled rows, not a grid of identical cards — each row
              carries its index, its country count and its entry price. */}
          <div className="border-t-2 border-ink">
            {regions.map((r, i) => (
              <Link
                key={r.id}
                href={`/regions/${r.id}`}
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-2 border-b border-hairline py-6 transition-colors duration-[var(--dur-fast)] hover:bg-lime-tint sm:gap-x-8"
              >
                <IndexNum n={i + 1} />
                <div className="min-w-0">
                  <h2 className="t-h2 text-ink">{r.name}</h2>
                  <p className="readout mt-2">
                    {r.name.toUpperCase()} · {r.countryCount} COUNTRIES
                  </p>
                  <p className="mt-2 max-w-[46ch] text-pretty text-sm text-ink-muted">{r.blurb}</p>
                </div>
                <div className="text-right">
                  <span className="readout block text-[0.6rem]">from</span>
                  <Price usd={r.fromPrice} className="block text-3xl font-extrabold leading-none text-ink" />
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-signal">
                    View plans
                    <ArrowRight className="size-4 transition-transform duration-[var(--dur-base)] group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}

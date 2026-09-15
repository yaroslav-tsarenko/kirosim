import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section, Container, PageHeader } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import { policies, policyBySlug } from "@/lib/data/policies";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return policies.map((p) => ({ policy: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/legal/[policy]">): Promise<Metadata> {
  const { policy: slug } = await params;
  const policy = policyBySlug(slug);
  if (!policy) return {};
  return {
    title: policy.title,
    description: policy.summary,
    alternates: { canonical: `/legal/${policy.slug}` },
    openGraph: { title: `${policy.title} · ${site.name}`, description: policy.summary, type: "website" },
  };
}

export default async function PolicyPage({ params }: PageProps<"/legal/[policy]">) {
  const { policy: slug } = await params;
  const policy = policyBySlug(slug);
  if (!policy) notFound();

  const trail = [
    { name: "Home", path: "/" },
    { name: "Legal", path: "/legal" },
    { name: policy.shortTitle, path: `/legal/${policy.slug}` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <PageHeader
        crumbs={<Breadcrumbs trail={trail} />}
        eyebrow={`Legal · updated ${policy.lastUpdated}`}
        title={policy.title}
        lede={policy.summary}
      />

      <Section band="porcelain">
        <Container className="py-12 sm:py-16">
          <div className="grid gap-x-12 gap-y-8 lg:grid-cols-[0.3fr_0.7fr]">
            {/* Contents rail */}
            <nav aria-label="On this page" className="lg:sticky lg:top-40 lg:self-start">
              <p className="eyebrow border-t border-hairline pt-3 text-ink">On this page</p>
              <ol className="mt-3">
                {policy.sections.map((s, i) => (
                  <li key={s.heading} className="border-b border-hairline">
                    <a
                      href={`#section-${i + 1}`}
                      className="flex gap-3 py-2.5 text-sm text-ink-muted transition-colors hover:text-ink"
                    >
                      <span className="index-num pt-0.5">{String(i + 1).padStart(2, "0")}</span>
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            {/* Body */}
            <article className="max-w-[68ch]">
              {policy.sections.map((section, i) => (
                <section
                  key={section.heading}
                  id={`section-${i + 1}`}
                  className="scroll-mt-40 border-t border-hairline pt-6 not-first:mt-10"
                >
                  <h2 className="t-h2 flex items-baseline gap-4 text-ink">
                    <span className="index-num">{String(i + 1).padStart(2, "0")}</span>
                    {section.heading}
                  </h2>
                  <div className="mt-4 space-y-4">
                    {section.clauses.map((clause, j) => (
                      <p key={j} className="text-pretty leading-relaxed text-ink-muted">
                        {clause}
                      </p>
                    ))}
                  </div>
                </section>
              ))}

              <p className="mt-12 border-t border-hairline pt-6 text-sm text-ink-muted">
                Questions about this policy? Email{" "}
                <a href={`mailto:${site.supportEmail}`} className="text-signal hover:underline">
                  {site.supportEmail}
                </a>
                . Browse the full{" "}
                <Link href="/legal" className="text-signal hover:underline">
                  policy library
                </Link>
                .
              </p>
            </article>
          </div>
        </Container>
      </Section>
    </>
  );
}

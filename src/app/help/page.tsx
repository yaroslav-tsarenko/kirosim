import type { Metadata } from "next";
import Link from "next/link";
import { Section, Container, PageHeader } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Accordion } from "@/components/ui/Accordion";
import { Marked, IndexNum } from "@/components/ui/Plate";
import { ButtonLink } from "@/components/ui/Button";
import { generalFaq } from "@/lib/data/faq";
import { site } from "@/lib/site";
import { Mail } from "@/components/ui/icons";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Help centre & support",
  description: `${site.name} help centre — installation guides, compatibility, refunds and 24/7 contact.`,
  alternates: { canonical: "/help" },
};

const topics = [
  { title: "Installation guides", body: "Step-by-step setup for iOS and Android.", href: "/how-it-works" },
  { title: "Compatibility", body: "Check your phone supports eSIM in two taps.", href: "/compatibility" },
  { title: "Top-ups", body: "Add more data to an active eSIM anytime.", href: "/account?tab=esims" },
  { title: "Coverage", body: "See supported countries and local networks.", href: "/coverage" },
];

export default function HelpPage() {
  const trail = [
    { name: "Home", path: "/" },
    { name: "Help", path: "/help" },
  ];
  return (
    <>
      <JsonLd data={faqSchema(generalFaq.map((f) => ({ q: f.q, a: typeof f.a === "string" ? f.a : "" })))} />

      <PageHeader
        crumbs={<Breadcrumbs trail={trail} />}
        eyebrow="24/7 support"
        title={<>We&apos;re with you, every time <Marked>zone.</Marked></>}
        lede="Browse the essentials or reach a human at any hour — most issues turn out to be a quick settings fix."
      >
        <ul className="mt-10 grid border-t border-hairline sm:grid-cols-2 lg:grid-cols-4">
          {topics.map((t, i) => (
            <li
              key={t.title}
              className="border-b border-hairline sm:border-r sm:last:border-r-0 lg:[&:nth-child(2)]:border-r"
            >
              <Link
                href={t.href}
                className="flex h-full flex-col gap-1 py-5 pr-6 transition-colors duration-[var(--dur-fast)] hover:bg-lime-tint sm:[&:not(:first-child)]:pl-6"
              >
                <IndexNum n={i + 1} />
                <h2 className="t-h3 mt-1 text-ink">{t.title}</h2>
                <p className="text-sm text-ink-muted">{t.body}</p>
              </Link>
            </li>
          ))}
        </ul>
      </PageHeader>

      <Section band="porcelain" id="contact">
        <Container className="py-12 sm:py-16">
          <div className="grid gap-x-12 gap-y-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <p className="eyebrow border-t border-hairline pt-3 text-ink">Common questions</p>
              <Accordion items={generalFaq} className="mt-6" />
            </div>

            <div>
              <h2 className="t-h1 text-ink">Still need a hand?</h2>
              <p className="mt-3 text-pretty text-ink-muted">
                The team replies within minutes, day or night.
              </p>
              <ButtonLink href={`mailto:${site.supportEmail}`} size="lg" className="mt-5">
                <Mail className="size-4" /> Email support
              </ButtonLink>

              <dl className="mt-10 border-t border-hairline">
                <Entry id="about" term="About">
                  {site.name} is operated by {site.company}, connecting travellers in{" "}
                  {site.countriesCovered} countries. Registered office: {site.address} · Reg. no.{" "}
                  {site.regNumber} ·{" "}
                  <a href={`mailto:${site.supportEmail}`} className="text-signal hover:underline">
                    {site.supportEmail}
                  </a>
                  .
                </Entry>
                <Entry id="refunds" term="Refunds">
                  If we can&apos;t get you online and it&apos;s on us, you&apos;re covered.{" "}
                  <Link href="/legal/refund-cancellation" className="text-signal hover:underline">
                    Read the refund policy
                  </Link>
                  .
                </Entry>
                <Entry id="privacy" term="Privacy">
                  We collect only what&apos;s needed to deliver your eSIM, and never sell your data.{" "}
                  <Link href="/legal/privacy" className="text-signal hover:underline">
                    Read the privacy policy
                  </Link>
                  .
                </Entry>
                <Entry id="terms" term="Terms">
                  Using {site.name} means accepting our terms of service, including activation and
                  fair-use conditions.{" "}
                  <Link href="/legal/terms" className="text-signal hover:underline">
                    Read the terms
                  </Link>
                  .
                </Entry>
                <Entry id="cookies" term="Cookies">
                  Essential cookies run the site; the optional ones are yours to control in the
                  banner.{" "}
                  <Link href="/legal/cookies" className="text-signal hover:underline">
                    Read the cookie policy
                  </Link>
                  .
                </Entry>
              </dl>

              <p className="mt-5 text-sm text-ink-muted">
                See the complete{" "}
                <Link href="/legal" className="text-signal hover:underline">
                  policy library
                </Link>
                , including delivery &amp; activation, acceptable use and complaints handling.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

function Entry({ id, term, children }: { id: string; term: string; children: React.ReactNode }) {
  return (
    <div id={id} className="scroll-mt-40 border-b border-hairline py-4">
      <dt className="eyebrow text-ink">{term}</dt>
      <dd className="mt-2 text-pretty text-sm leading-relaxed text-ink-muted">{children}</dd>
    </div>
  );
}

import type { Metadata } from "next";
import { Section, Container } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Marked, MicroPlate } from "@/components/ui/Plate";
import { CheckoutFlow } from "@/components/checkout/CheckoutFlow";
import { resolvePlanSummary, fallbackSummary } from "@/lib/data/summary";
import { getCurrentUser } from "@/lib/auth/dal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Secure checkout",
  description: `Complete your ${site.name} eSIM order. Guest checkout, instant QR delivery.`,
  robots: { index: false, follow: false },
  alternates: { canonical: "/checkout" },
};

export default async function CheckoutPage({ searchParams }: PageProps<"/checkout">) {
  const sp = await searchParams;
  const planId = typeof sp.plan === "string" ? sp.plan : undefined;
  const plan = resolvePlanSummary(planId) ?? fallbackSummary();

  const user = await getCurrentUser();
  const account = user ? { email: user.email, balanceCents: user.balanceCents } : null;

  return (
    <Section band="porcelain">
      <Container className="py-10 sm:py-14">
        <Breadcrumbs
          trail={[
            { name: "Home", path: "/" },
            { name: "Checkout", path: "/checkout" },
          ]}
        />
        <div className="mt-6 border-t border-hairline pt-3">
          <MicroPlate tone="lime">One page · instant delivery</MicroPlate>
        </div>
        <h1 className="t-h1 mt-5 max-w-[16ch] text-ink">
          Almost there — one tap to <Marked>takeoff.</Marked>
        </h1>
        <div className="mt-10">
          <CheckoutFlow plan={plan} account={account} />
        </div>
      </Container>
    </Section>
  );
}

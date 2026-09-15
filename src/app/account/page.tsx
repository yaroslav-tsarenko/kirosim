import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Section, Container } from "@/components/ui/Section";
import { Marked } from "@/components/ui/Plate";
import { AccountView, type Tab } from "@/components/account/AccountView";
import { getCurrentUser, getTransactions, getEsims } from "@/lib/auth/dal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "My eSIMs & account",
  description: `Manage your ${site.name} eSIMs, view QR codes, track remaining data and top up.`,
  robots: { index: false, follow: false },
  alternates: { canonical: "/account" },
};

export default async function AccountPage({ searchParams }: PageProps<"/account">) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const sp = await searchParams;
  const raw = typeof sp.tab === "string" ? sp.tab : "esims";
  const tab: Tab =
    raw === "saved" || raw === "profile" || raw === "wallet" ? raw : "esims";

  const [transactions, esims] = await Promise.all([
    getTransactions(user.id),
    getEsims(user.id),
  ]);

  return (
    <Section band="porcelain">
      <Container className="py-10 sm:py-14">
        <p className="eyebrow border-t border-hairline pt-3 text-ink">Account</p>
        <h1 className="t-h1 mt-5 text-ink">
          Welcome back, <Marked>{user.firstName}.</Marked>
        </h1>
        <p className="mt-4 max-w-[52ch] text-pretty text-ink-muted">
          Every eSIM you own as a spec card — QR ready to scan, data remaining at a glance, top-ups
          one tap away.
        </p>
        <div className="mt-10">
          <AccountView initialTab={tab} user={user} transactions={transactions} esims={esims} />
        </div>
      </Container>
    </Section>
  );
}

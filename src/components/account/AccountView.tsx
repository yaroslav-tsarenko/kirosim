"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { getCountry } from "@/lib/data/countries";
import { DestinationCard } from "@/components/cards/DestinationCard";
import { MicroPlate } from "@/components/ui/Plate";
import { ChipOutline } from "@/components/ui/Chip";
import { QrCode } from "@/components/checkout/QrCode";
import { Button } from "@/components/ui/Button";
import { topUpAction, logoutAction, type FormState } from "@/lib/auth/actions";
import type { User, Transaction, EsimRecord } from "@/lib/auth/types";
import { usePreferences } from "@/components/providers/Preferences";
import { Bolt } from "@/components/ui/icons";
import { cn, formatCents } from "@/lib/utils";

export type Tab = "esims" | "wallet" | "saved" | "profile";

const savedSlugs: string[] = [];

export function AccountView({
  initialTab,
  user,
  transactions,
  esims,
}: {
  initialTab: Tab;
  user: User;
  transactions: Transaction[];
  esims: EsimRecord[];
}) {
  const [tab, setTab] = useState<Tab>(initialTab);

  return (
    <div>
      <div role="tablist" aria-label="Account sections" className="flex flex-wrap gap-6 border-b border-hairline">
        <TabBtn active={tab === "esims"} onClick={() => setTab("esims")}>My eSIMs</TabBtn>
        <TabBtn active={tab === "wallet"} onClick={() => setTab("wallet")}>Balance</TabBtn>
        <TabBtn active={tab === "saved"} onClick={() => setTab("saved")}>Saved destinations</TabBtn>
        <TabBtn active={tab === "profile"} onClick={() => setTab("profile")}>Profile</TabBtn>
      </div>

      <div className="mt-8">
        {tab === "esims" ? (
          esims.length ? (
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {esims.map((e) => (
                <EsimCard key={e.id} item={e} />
              ))}
            </div>
          ) : (
            <Empty>
              No eSIMs yet.{" "}
              <Link href="/destinations" className="text-signal underline-offset-4 hover:underline">
                Browse destinations
              </Link>{" "}
              to get your first one.
            </Empty>
          )
        ) : null}

        {tab === "wallet" ? <WalletPanel user={user} transactions={transactions} /> : null}

        {tab === "saved" ? (
          savedSlugs.length ? (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
              {savedSlugs.map((s) => {
                const c = getCountry(s);
                return c ? <DestinationCard key={s} country={c} className="h-full" /> : null;
              })}
            </div>
          ) : (
            <Empty>No saved destinations yet.</Empty>
          )
        ) : null}

        {tab === "profile" ? <ProfilePanel user={user} /> : null}
      </div>
    </div>
  );
}

function WalletPanel({ user, transactions }: { user: User; transactions: Transaction[] }) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(topUpAction, {});
  const { currency } = usePreferences();

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="band-graphite relative overflow-hidden border border-ink p-6">
        <div className="pointer-events-none absolute inset-0 pad-grid opacity-50" aria-hidden />
        <div className="relative">
          <p className="eyebrow text-ink">Current balance</p>
          <p className="t-num-lg mt-3 text-lime">{formatCents(user.balanceCents, currency)}</p>

          <form action={formAction} className="mt-8 space-y-3 border-t border-hairline pt-5">
            {state.message ? (
              <p
                className={cn(
                  "border-l-4 px-4 py-3 text-sm",
                  state.ok
                    ? "border-lime bg-lime-tint text-ink"
                    : "border-danger-plate bg-danger-tint text-danger",
                )}
              >
                {state.message}
              </p>
            ) : null}
            <div className="flex flex-wrap gap-2">
              {[10, 25, 50].map((amt) => (
                <button
                  key={amt}
                  type="submit"
                  name="amount"
                  value={amt}
                  disabled={pending}
                  className="inline-flex h-10 items-center rounded-xs border border-hairline-strong px-4 font-mono text-sm font-semibold text-ink transition-colors hover:border-lime hover:text-lime disabled:opacity-50"
                >
                  +${amt}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="number"
                name="amount"
                min={1}
                max={1000}
                step="0.01"
                placeholder="Custom amount"
                aria-label="Custom top-up amount"
                className="field h-12 px-3.5 text-sm focus:border-lime focus:outline-none"
              />
              <button
                type="submit"
                disabled={pending}
                className="inline-flex h-12 shrink-0 items-center gap-2 rounded-xs bg-lime px-5 text-sm font-medium text-on-lime transition-colors hover:bg-lime-edge disabled:opacity-50"
              >
                <Bolt className="size-4" /> {pending ? "…" : "Top up"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="card-flat p-6">
        <h3 className="t-h2 text-ink">Transaction history</h3>
        {transactions.length ? (
          <ul className="mt-5 border-t border-hairline">
            {transactions.map((t) => (
              <li key={t.id} className="flex items-center justify-between gap-4 border-b border-hairline py-3 text-sm">
                <div>
                  <p className="text-ink">{t.description}</p>
                  <p className="readout mt-1">{new Date(t.createdAt).toLocaleDateString()}</p>
                </div>
                <span
                  className={cn(
                    "font-display text-base font-bold tabular-nums",
                    t.amountCents >= 0 ? "text-signal" : "text-ink",
                  )}
                >
                  {t.amountCents >= 0 ? "+" : "−"}
                  {formatCents(Math.abs(t.amountCents), currency)}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm text-ink-muted">No transactions yet. Top up to get started.</p>
        )}
      </div>
    </div>
  );
}

function ProfilePanel({ user }: { user: User }) {
  return (
    <div className="card-flat max-w-lg p-6">
      <h2 className="t-h2 text-ink">Profile</h2>
      <dl className="mt-5 border-t border-hairline text-sm">
        <Row label="Name" value={`${user.firstName} ${user.lastName}`} />
        <Row label="Email" value={user.email} />
        <Row label="Phone" value={user.phone} />
        <Row label="Date of birth" value={user.dob} />
        <Row label="Address" value={`${user.street}, ${user.city}, ${user.postalCode}, ${user.country}`} />
        <Row label="Member since" value={new Date(user.createdAt).getFullYear().toString()} />
      </dl>
      <form action={logoutAction}>
        <Button type="submit" variant="outline" className="mt-6">
          Sign out
        </Button>
      </form>
    </div>
  );
}

/** Days left on a plan, derived from its issue date and validity — the only
 *  "remaining" figure we actually hold, so the only one we show. */
function daysLeft(item: EsimRecord): number {
  const elapsed = (Date.now() - new Date(item.createdAt).getTime()) / 86_400_000;
  return Math.max(0, Math.ceil(item.days - elapsed));
}

function EsimCard({ item }: { item: EsimRecord }) {
  const { currency } = usePreferences();
  const country = item.countrySlug ? getCountry(item.countrySlug) : undefined;
  const topUpHref = country ? `/checkout?plan=${country.slug}-3-30` : "/destinations";
  const detailsHref = country ? `/destinations/${country.slug}` : "/destinations";
  const issued = new Date(item.createdAt).toLocaleDateString();
  const left = daysLeft(item);
  const pct = item.days > 0 ? Math.round((left / item.days) * 100) : 0;

  return (
    <article className="card-flat flex h-full flex-col">
      <div className="flex items-start justify-between gap-3 border-b border-hairline px-5 py-4">
        <div className="min-w-0">
          <h3 className="flex items-center gap-2 truncate font-display text-lg font-bold tracking-[-0.03em] text-ink">
            <span aria-hidden>{item.flag}</span>
            {item.title}
          </h3>
          <p className="readout mt-1">{item.orderRef} · issued {issued}</p>
        </div>
        <MicroPlate tone={left > 0 ? "lime" : "outline"} className="shrink-0">
          {left > 0 ? "Active" : "Expired"}
        </MicroPlate>
      </div>

      <div className="px-5 py-5">
        <p className="t-num-md text-ink">{item.dataLabel}</p>

        {/* Validity bar — the only progress we can measure honestly. */}
        <div className="mt-4">
          <div className="flex items-baseline justify-between">
            <span className="readout">{left} days left</span>
            <span className="readout">of {item.days}</span>
          </div>
          <div
            className="mt-2 h-2 bg-card-sunk"
            role="progressbar"
            aria-valuenow={left}
            aria-valuemin={0}
            aria-valuemax={item.days}
            aria-label="Validity remaining"
          >
            <div className="h-full bg-lime" style={{ width: `${pct}%` }} />
          </div>
        </div>

        <div className="mt-5 flex items-start gap-4">
          <div className="shrink-0">
            <QrCode value={item.activationCode} size={88} />
          </div>
          <dl className="min-w-0 flex-1 border-t border-hairline">
            <MiniRow label="Paid" value={formatCents(item.priceCents, currency)} />
            <MiniRow label="SM-DP+" value={item.smdpAddress} />
          </dl>
        </div>

        <p className="readout mt-4 break-all normal-case tracking-normal text-ink">
          <span className="readout mb-1 block">Activation code</span>
          {item.activationCode}
        </p>
      </div>

      <div className="mt-auto flex gap-2 border-t border-hairline px-5 py-4">
        <Link
          href={topUpHref}
          className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-xs bg-ink text-sm font-medium text-ink-inverse transition-colors hover:bg-signal"
        >
          <Bolt className="size-4" /> Top up
        </Link>
        <Link
          href={detailsHref}
          className="inline-flex h-10 items-center justify-center rounded-xs border border-hairline-strong px-4 text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-lime-tint"
        >
          Details
        </Link>
      </div>
    </article>
  );
}

function TabBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "-mb-px border-b-[3px] pb-2.5 text-sm font-medium transition-colors duration-[var(--dur-fast)]",
        active ? "border-lime text-ink" : "border-transparent text-ink-muted hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-hairline py-2.5">
      <dt className="readout">{label}</dt>
      <dd className="text-right font-medium text-ink">{value}</dd>
    </div>
  );
}

function MiniRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3 border-b border-hairline py-2">
      <dt className="readout">{label}</dt>
      <dd className="truncate font-mono text-xs text-ink">{value}</dd>
    </div>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center border border-dashed border-hairline-strong bg-card p-12 text-center">
      <ChipOutline className="h-9 w-11 text-hairline-strong" />
      <p className="mt-4 text-ink-muted">{children}</p>
    </div>
  );
}

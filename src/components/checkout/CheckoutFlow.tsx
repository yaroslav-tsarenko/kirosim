"use client";

import { useState } from "react";
import Link from "next/link";
import type { PlanSummary } from "@/lib/data/summary";
import type { OrderResult } from "@/lib/api/client";
import { placeOrder, payWithBalance } from "@/app/checkout/actions";
import { Price } from "@/components/ui/Price";
import { PaymentMarks } from "@/components/ui/PaymentMarks";
import { InstallSteps } from "@/components/how/InstallSteps";
import { usePreferences } from "@/components/providers/Preferences";
import { QrCode } from "./QrCode";
import { ChipMark, SignalTicks } from "@/components/ui/Chip";
import { MicroPlate } from "@/components/ui/Plate";
import { ButtonLink } from "@/components/ui/Button";
import { Check, Copy, ArrowRight } from "@/components/ui/icons";
import { site } from "@/lib/site";
import { cn, formatCents } from "@/lib/utils";

type Stage = "form" | "processing" | "done";
type Method = "card" | "balance";

export interface CheckoutAccount {
  email: string;
  balanceCents: number;
}

const inputCls = "field h-12 px-3.5 focus:border-ink focus:outline-none";
const monoInputCls = `${inputCls} font-mono tabular-nums`;

/**
 * One page, one column of decisions: who it's delivered to, how it's paid,
 * and the plate that says what is being bought. Nothing collapses, nothing
 * steps — a traveller on hotel wifi should be able to finish this in one go.
 */
export function CheckoutFlow({ plan, account }: { plan: PlanSummary; account?: CheckoutAccount | null }) {
  const { currency } = usePreferences();
  const [stage, setStage] = useState<Stage>("form");
  const [email, setEmail] = useState(account?.email ?? "");
  const [agreed, setAgreed] = useState(false);
  const [order, setOrder] = useState<OrderResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const priceCents = Math.round(plan.price * 100);
  const balanceCents = account?.balanceCents ?? 0;
  const canPayFromBalance = !!account && balanceCents >= priceCents;
  const [method, setMethod] = useState<Method>("card");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setStage("processing");
    try {
      if (method === "balance") {
        const res = await payWithBalance(plan.id);
        if (res.ok && res.order) {
          setOrder(res.order);
          setStage("done");
        } else {
          setError(res.error ?? "We couldn't charge your balance. Please try again.");
          setStage("form");
        }
        return;
      }
      const result = await placeOrder(plan.id, email);
      setOrder(result);
      setStage("done");
    } catch {
      setError("Something went wrong placing your order. Please try again.");
      setStage("form");
    }
  }

  if (stage === "done" && order) {
    const deliveredTo = method === "balance" ? account?.email ?? email : email;
    return <Delivery plan={plan} order={order} email={deliveredTo} copied={copied} setCopied={setCopied} />;
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
      {/* Form */}
      <form onSubmit={onSubmit} className="card-flat order-2 p-6 sm:p-8 lg:order-1">
        <div className="border-b-2 border-ink pb-4">
          <p className="eyebrow text-ink">{account ? "Checkout" : "Guest checkout"}</p>
          <h2 className="t-h2 mt-2 text-ink">Pay once. Scan once.</h2>
          <p className="mt-2 text-sm text-ink-muted">
            The QR appears on this page the moment payment clears, and by email.
          </p>
        </div>

        {account ? (
          <div className="mt-6" role="radiogroup" aria-label="Payment method">
            <div className="grid grid-cols-2 gap-2">
              <MethodTab active={method === "card"} onClick={() => setMethod("card")}>
                Pay by card
              </MethodTab>
              <MethodTab
                active={method === "balance"}
                disabled={!canPayFromBalance}
                onClick={() => canPayFromBalance && setMethod("balance")}
              >
                Balance · {formatCents(balanceCents, currency)}
              </MethodTab>
            </div>
            {!canPayFromBalance ? (
              <p className="mt-2 text-xs text-ink-muted">
                Your balance is below this plan&apos;s price. Top up in your account to pay from balance.
              </p>
            ) : null}
          </div>
        ) : null}

        {method === "balance" && account ? (
          <fieldset className="mt-6 space-y-3" disabled={stage === "processing"}>
            <div className="border border-hairline p-4">
              <p className="readout">Delivered to</p>
              <p className="mt-1 font-medium text-ink">{account.email}</p>
            </div>
            <div className="flex items-center justify-between border-b border-hairline pb-3 text-sm">
              <span className="text-ink-muted">Paying from balance</span>
              <span className="font-display font-bold tabular-nums text-ink">
                {formatCents(priceCents, currency)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink-muted">Balance after purchase</span>
              <span className="font-mono tabular-nums text-ink">
                {formatCents(balanceCents - priceCents, currency)}
              </span>
            </div>
          </fieldset>
        ) : (
          <fieldset className="mt-6 space-y-4" disabled={stage === "processing"}>
            <Field id="email" label="Email for delivery" hint="We send the QR code here.">
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={inputCls}
              />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="name" label="Cardholder name">
                <input id="name" required placeholder="Alex Traveler" className={inputCls} />
              </Field>
              <Field id="card" label="Card number">
                <input
                  id="card"
                  required
                  inputMode="numeric"
                  placeholder="4242 4242 4242 4242"
                  className={monoInputCls}
                />
              </Field>
              <Field id="exp" label="Expiry">
                <input id="exp" required placeholder="MM/YY" className={monoInputCls} />
              </Field>
              <Field id="cvc" label="CVC">
                <input id="cvc" required inputMode="numeric" placeholder="123" className={monoInputCls} />
              </Field>
            </div>
          </fieldset>
        )}

        {error ? (
          <p className="mt-4 border-l-4 border-danger-plate bg-danger-tint px-4 py-3 text-sm text-danger">
            {error}
          </p>
        ) : null}

        <label htmlFor="terms" className="mt-6 flex items-start gap-2.5 text-sm text-ink-muted">
          <input
            id="terms"
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 size-4 shrink-0 accent-[var(--lime-edge)]"
          />
          <span>
            I read and agree to the{" "}
            <Link href="/legal/terms" className="text-signal underline-offset-4 hover:underline">
              terms and conditions
            </Link>{" "}
            and{" "}
            <Link href="/legal/privacy" className="text-signal underline-offset-4 hover:underline">
              privacy policy
            </Link>
            .
          </span>
        </label>

        <button
          type="submit"
          disabled={stage === "processing" || !agreed}
          className="mt-5 inline-flex h-14 w-full items-center justify-center gap-3 rounded-xs bg-lime font-display text-base font-bold tracking-[-0.01em] text-on-lime transition-colors duration-[var(--dur-base)] hover:bg-lime-edge disabled:cursor-not-allowed disabled:opacity-60"
        >
          {stage === "processing" ? (
            <>
              <ChipMark className="h-6 w-[1.9rem]" animate inverted />
              Issuing your eSIM…
            </>
          ) : method === "balance" ? (
            <>
              Pay {formatCents(priceCents, currency)} from balance <ArrowRight className="size-4" />
            </>
          ) : (
            <>
              Pay <Price usd={plan.price} /> &amp; get the QR <ArrowRight className="size-4" />
            </>
          )}
        </button>

        <ul className="mt-4 flex flex-wrap gap-2">
          <li><MicroPlate tone="outline">SSL secure</MicroPlate></li>
          <li><MicroPlate tone="outline">Instant delivery</MicroPlate></li>
          <li><MicroPlate tone="outline">No hidden fees</MicroPlate></li>
        </ul>

        <div className="mt-6 flex flex-col gap-3 border-t border-hairline pt-5">
          <PaymentMarks />
          <p className="text-[0.7rem] leading-relaxed text-ink-muted">
            Merchant of Record: {site.company} · Reg. no. {site.regNumber} · {site.address}.
          </p>
        </div>
      </form>

      {/* Order summary */}
      <OrderTicket plan={plan} className="order-1 lg:order-2 lg:sticky lg:top-40" />
    </div>
  );
}

function OrderTicket({ plan, className }: { plan: PlanSummary; className?: string }) {
  return (
    <aside className={cn("band-graphite relative overflow-hidden border border-ink", className)}>
      <div className="pointer-events-none absolute inset-0 pad-grid opacity-50" aria-hidden />
      <div className="relative p-6">
        <p className="eyebrow text-ink">Order summary</p>
        <h3 className="mt-2 flex items-center gap-2 font-display text-xl font-bold tracking-[-0.03em] text-ink">
          <span aria-hidden>{plan.flag}</span>
          {plan.title}
        </h3>

        <p className="t-num-lg mt-7 text-lime">{plan.data}</p>
        <p className="readout mt-3 flex items-center gap-2">
          <SignalTicks className="h-2.5 w-3.5 text-lime" />
          {plan.days} days · {plan.speed} · {plan.network}
        </p>

        <div className="mt-7 flex items-end justify-between border-t border-hairline pt-4">
          <span className="readout">Total due</span>
          <Price usd={plan.price} className="text-3xl font-extrabold leading-none text-ink" />
        </div>
      </div>
    </aside>
  );
}

function Delivery({
  plan,
  order,
  email,
  copied,
  setCopied,
}: {
  plan: PlanSummary;
  order: OrderResult;
  email: string;
  copied: boolean;
  setCopied: (v: boolean) => void;
}) {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="border-b-2 border-ink pb-6">
        <ChipMark className="h-14 w-[4.4rem]" animate />
        <h2 className="t-h1 mt-5 text-ink">Your eSIM is ready.</h2>
        <p className="readout mt-3">Order {order.orderId}</p>
        <p className="mt-2 text-ink-muted">
          A copy is on its way to <span className="font-medium text-ink">{email}</span>.
        </p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-[auto_1fr] md:items-start">
        <div className="animate-fade-up justify-self-center md:justify-self-start">
          <QrCode value={order.qrCode} />
        </div>
        <div>
          <p className="eyebrow text-ink">Scan to install</p>
          <h3 className="t-h2 mt-2 flex items-center gap-2 text-ink">
            <span aria-hidden>{plan.flag}</span>
            {plan.title}
          </h3>
          <p className="readout mt-2">
            {plan.data} · {plan.days} days · {plan.speed}
          </p>

          <dl className="mt-5 border-t border-hairline">
            <div className="flex justify-between gap-3 border-b border-hairline py-2.5">
              <dt className="readout">SM-DP+</dt>
              <dd className="font-mono text-xs text-ink">{order.smdpAddress}</dd>
            </div>
            <div className="border-b border-hairline py-2.5">
              <dt className="readout">Activation code</dt>
              <dd className="mt-1.5 break-all font-mono text-xs text-ink">{order.activationCode}</dd>
            </div>
          </dl>

          <button
            onClick={() => {
              navigator.clipboard?.writeText(order.activationCode);
              setCopied(true);
              setTimeout(() => setCopied(false), 1800);
            }}
            className="mt-4 inline-flex h-10 items-center gap-2 rounded-xs border border-hairline-strong bg-card px-3.5 text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-lime-tint"
          >
            {copied ? (
              <>
                <Check className="size-4 text-signal" /> Copied
              </>
            ) : (
              <>
                <Copy className="size-4" /> Copy activation code
              </>
            )}
          </button>
        </div>
      </div>

      <div className="mt-10 border-t border-hairline pt-8">
        <h3 className="t-h2 text-ink">Install in about a minute</h3>
        <p className="mb-5 mt-2 text-sm text-ink-muted">Pick your device below.</p>
        <InstallSteps />
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/account?tab=esims" size="lg">
          View in My eSIMs <ArrowRight className="size-4" />
        </ButtonLink>
        <ButtonLink href="/destinations" variant="outline" size="lg">
          Add another destination
        </ButtonLink>
      </div>
    </div>
  );
}

function MethodTab({
  active,
  disabled,
  onClick,
  children,
}: {
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex h-12 items-center justify-center rounded-xs border px-3 text-sm font-medium transition-colors",
        active
          ? "border-ink bg-lime-tint text-ink"
          : "border-hairline bg-card text-ink-muted hover:border-hairline-strong",
        disabled && "cursor-not-allowed opacity-50 hover:border-hairline",
      )}
    >
      {children}
    </button>
  );
}

function Field({
  id,
  label,
  hint,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="eyebrow mb-2 block">{label}</span>
      {children}
      {hint ? <span className="mt-1.5 block text-xs text-ink-muted">{hint}</span> : null}
    </label>
  );
}

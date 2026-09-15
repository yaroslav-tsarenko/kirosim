"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { registerAction, type FormState } from "@/lib/auth/actions";
import { addressCountries } from "@/lib/auth/countries";
import { Field, FieldError, authInputClass, authLabelClass } from "./AuthField";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const steps = ["Account", "About you", "Address"] as const;

export function RegisterForm() {
  const [state, formAction, pending] = useActionState<FormState, FormData>(registerAction, {});
  const [step, setStep] = useState(0);
  const [terms, setTerms] = useState(false);
  const v = state.values ?? {};
  const e = state.errors ?? {};

  return (
    <form action={formAction} className="space-y-6">
      {/* Progress as numbered segments on a rule — no pills, no circles. */}
      <ol className="grid grid-cols-3 gap-2">
        {steps.map((label, i) => (
          <li key={label}>
            <div
              className={cn(
                "h-1 w-full",
                i <= step ? "bg-lime" : "bg-hairline",
              )}
            />
            <p className="mt-2 flex items-baseline gap-2">
              <span className="index-num">{String(i + 1).padStart(2, "0")}</span>
              <span className={cn("text-xs font-medium", i === step ? "text-ink" : "text-ink-muted")}>
                {label}
              </span>
            </p>
          </li>
        ))}
      </ol>

      {state.message ? (
        <p className="border-l-4 border-danger-plate bg-danger-tint px-4 py-3 text-sm text-danger" role="alert">
          {state.message}
        </p>
      ) : null}

      {/* Step 1 — Account. Hidden steps stay mounted so all values submit together. */}
      <div className={cn("space-y-4", step === 0 ? "" : "hidden")}>
        <Field label="Email" name="email" type="email" autoComplete="email" defaultValue={v.email} placeholder="you@example.com" errors={e.email} />
        <Field label="Password" name="password" type="password" autoComplete="new-password" placeholder="••••••••" errors={e.password} />
        <Field label="Confirm password" name="confirmPassword" type="password" autoComplete="new-password" placeholder="••••••••" errors={e.confirmPassword} />
      </div>

      {/* Step 2 — About you */}
      <div className={cn("space-y-4", step === 1 ? "" : "hidden")}>
        <div className="grid grid-cols-2 gap-3">
          <Field label="First name" name="firstName" autoComplete="given-name" defaultValue={v.firstName} errors={e.firstName} />
          <Field label="Last name" name="lastName" autoComplete="family-name" defaultValue={v.lastName} errors={e.lastName} />
        </div>
        <Field label="Phone" name="phone" type="tel" autoComplete="tel" defaultValue={v.phone} placeholder="+1 555 000 0000" errors={e.phone} />
        <Field label="Date of birth" name="dob" type="date" defaultValue={v.dob} errors={e.dob} />
      </div>

      {/* Step 3 — Address */}
      <div className={cn("space-y-4", step === 2 ? "" : "hidden")}>
        <Field label="Street address" name="street" autoComplete="street-address" defaultValue={v.street} errors={e.street} />
        <div className="grid grid-cols-2 gap-3">
          <Field label="City" name="city" autoComplete="address-level2" defaultValue={v.city} errors={e.city} />
          <Field label="Postal code" name="postalCode" autoComplete="postal-code" defaultValue={v.postalCode} errors={e.postalCode} />
        </div>
        <div>
          <label htmlFor="country" className={authLabelClass}>Country</label>
          <select id="country" name="country" defaultValue={v.country ?? ""} className={authInputClass}>
            <option value="" disabled>Select a country</option>
            {addressCountries.map((c) => (
              <option key={c.code} value={c.code}>{c.name}</option>
            ))}
          </select>
          <FieldError errors={e.country} />
        </div>
        <label className="flex items-start gap-2.5 pt-1 text-sm text-ink-muted">
          <input
            type="checkbox"
            name="terms"
            checked={terms}
            onChange={(ev) => setTerms(ev.target.checked)}
            className="mt-0.5 size-4 accent-[var(--lime-edge)]"
          />
          <span>
            I agree to the{" "}
            <Link href="/legal/terms" className="text-signal underline-offset-4 hover:underline">
              Terms &amp; Conditions
            </Link>{" "}
            and{" "}
            <Link href="/legal/privacy" className="text-signal underline-offset-4 hover:underline">
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        <FieldError errors={e.terms} />
      </div>

      <div className="flex items-center gap-3">
        {step > 0 ? (
          <Button type="button" variant="outline" size="lg" onClick={() => setStep((s) => s - 1)}>
            Back
          </Button>
        ) : null}

        {step < steps.length - 1 ? (
          <Button type="button" size="lg" className="flex-1" onClick={() => setStep((s) => s + 1)}>
            Continue <ArrowRight className="size-4" />
          </Button>
        ) : (
          <Button type="submit" size="lg" className="flex-1" disabled={!terms || pending}>
            {pending ? "Creating account…" : "Create account"} <ArrowRight className="size-4" />
          </Button>
        )}
      </div>

      <p className="text-sm text-ink-muted">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-signal underline-offset-4 hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}

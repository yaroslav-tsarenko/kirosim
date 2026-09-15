"use client";

import { useActionState } from "react";
import Link from "next/link";
import { requestPasswordResetAction, type FormState } from "@/lib/auth/actions";
import { Field } from "./AuthField";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/icons";

export function ForgotPasswordForm() {
  const [state, formAction, pending] = useActionState<FormState, FormData>(requestPasswordResetAction, {});
  const v = state.values ?? {};
  const e = state.errors ?? {};

  if (state.ok) {
    return (
      <div className="space-y-4">
        <p className="border-l-4 border-lime bg-lime-tint px-4 py-3 text-sm text-ink">{state.message}</p>
        <Link href="/login" className="inline-flex text-sm font-medium text-signal underline-offset-4 hover:underline">
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      {state.message ? (
        <p className="border-l-4 border-danger-plate bg-danger-tint px-4 py-3 text-sm text-danger" role="alert">
          {state.message}
        </p>
      ) : null}
      <Field label="Email" name="email" type="email" autoComplete="email" defaultValue={v.email} placeholder="you@example.com" errors={e.email} />
      <Button type="submit" size="lg" disabled={pending} className="w-full">
        {pending ? "Sending…" : "Send reset link"} <ArrowRight className="size-4" />
      </Button>
      <p className="text-sm text-ink-muted">
        Remembered it?{" "}
        <Link href="/login" className="font-medium text-signal underline-offset-4 hover:underline">Sign in</Link>
      </p>
    </form>
  );
}

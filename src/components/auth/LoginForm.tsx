"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginAction, type FormState } from "@/lib/auth/actions";
import { Field } from "./AuthField";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/icons";

export function LoginForm() {
  const [state, formAction, pending] = useActionState<FormState, FormData>(loginAction, {});
  const v = state.values ?? {};
  const e = state.errors ?? {};

  return (
    <form action={formAction} className="space-y-4">
      {state.message ? (
        <p className="border-l-4 border-danger-plate bg-danger-tint px-4 py-3 text-sm text-danger" role="alert">
          {state.message}
        </p>
      ) : null}
      <Field label="Email" name="email" type="email" autoComplete="email" defaultValue={v.email} placeholder="you@example.com" errors={e.email} />
      <div>
        <Field label="Password" name="password" type="password" autoComplete="current-password" placeholder="••••••••" errors={e.password} />
        <div className="mt-2 text-right">
          <Link href="/forgot-password" className="text-xs text-ink-muted underline-offset-4 hover:text-ink hover:underline">
            Forgot password?
          </Link>
        </div>
      </div>
      <Button type="submit" size="lg" disabled={pending} className="w-full">
        {pending ? "Signing in…" : "Sign in"} <ArrowRight className="size-4" />
      </Button>
      <p className="text-sm text-ink-muted">
        New to Kirosim?{" "}
        <Link href="/register" className="font-medium text-signal underline-offset-4 hover:underline">
          Create an account
        </Link>
      </p>
    </form>
  );
}

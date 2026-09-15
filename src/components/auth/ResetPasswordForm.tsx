"use client";

import { useActionState } from "react";
import { resetPasswordAction, type FormState } from "@/lib/auth/actions";
import { Field } from "./AuthField";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/icons";

export function ResetPasswordForm({ token }: { token: string }) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(resetPasswordAction, {});
  const e = state.errors ?? {};

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="token" value={token} />
      {state.message ? (
        <p className="border-l-4 border-danger-plate bg-danger-tint px-4 py-3 text-sm text-danger" role="alert">
          {state.message}
        </p>
      ) : null}
      <Field label="New password" name="password" type="password" autoComplete="new-password" placeholder="••••••••" errors={e.password} />
      <Field label="Confirm password" name="confirmPassword" type="password" autoComplete="new-password" placeholder="••••••••" errors={e.confirmPassword} />
      <Button type="submit" size="lg" disabled={pending} className="w-full">
        {pending ? "Saving…" : "Set new password"} <ArrowRight className="size-4" />
      </Button>
    </form>
  );
}

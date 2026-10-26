"use server";

import { redirect } from "next/navigation";
import { randomBytes, createHash } from "node:crypto";
import { z } from "zod";
import { sql, ensureSchema, hasDatabase } from "./db";
import { hashPassword, verifyPassword } from "./password";
import { createSession, destroySession, readSession, hasSessionSecret } from "./session";
import { getUserByEmail } from "./dal";
import { registerSchema, loginSchema, forgotSchema, resetSchema, topUpSchema } from "./schema";
import { sendMail, welcomeEmail, welcomeBackEmail, resetEmail, topUpEmail } from "./mailer";
import { generateTopUpPdf } from "./invoice";
import {
  toBaseCents,
  formatAmount,
  minTopUp,
  maxTopUp,
  MIN_TOPUP_CENTS,
  MAX_TOPUP_CENTS,
} from "@/lib/utils";

export interface FormState {
  ok?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
  values?: Record<string, string>;
}

function fieldErrors(err: z.ZodError): Record<string, string[]> {
  return z.flattenError(err).fieldErrors as Record<string, string[]>;
}

function keep(data: FormData, keys: string[]): Record<string, string> {
  const out: Record<string, string> = {};
  for (const k of keys) {
    const v = data.get(k);
    if (typeof v === "string" && k !== "password" && k !== "confirmPassword") out[k] = v;
  }
  return out;
}

const NO_DB: FormState = {
  message: "The database is not configured yet. Set DATABASE_URL to enable accounts.",
};

const NO_SESSION_SECRET: FormState = {
  message:
    "Accounts are not configured yet. Set SESSION_SECRET (at least 16 characters) to enable sign-in.",
};

/** Shown when the database is reachable in principle but the write failed. */
const DB_FAILED = "We couldn't complete that right now. Please try again.";

export async function registerAction(_prev: FormState, data: FormData): Promise<FormState> {
  if (!hasDatabase()) return NO_DB;
  if (!hasSessionSecret()) return NO_SESSION_SECRET;
  const parsed = registerSchema.safeParse(Object.fromEntries(data));
  if (!parsed.success) {
    return { errors: fieldErrors(parsed.error), values: keep(data, [...data.keys()]) };
  }
  const v = parsed.data;

  let userId: number;
  try {
    const existing = await getUserByEmail(v.email);
    if (existing) {
      return { errors: { email: ["An account with this email already exists"] }, values: keep(data, [...data.keys()]) };
    }

    const passwordHash = await hashPassword(v.password);
    const rows = await sql()`
      INSERT INTO users (email, password_hash, first_name, last_name, phone, dob, street, city, country, postal_code)
      VALUES (${v.email}, ${passwordHash}, ${v.firstName}, ${v.lastName}, ${v.phone}, ${v.dob}, ${v.street}, ${v.city}, ${v.country}, ${v.postalCode})
      RETURNING id
    `;
    userId = Number(rows[0].id);
  } catch (err) {
    console.error("[register] could not create the account:", err);
    return { message: DB_FAILED, values: keep(data, [...data.keys()]) };
  }

  // Signing in is what makes the account usable. If it fails the row has to
  // go: left behind, it is an account nobody is signed into whose email then
  // answers "already exists" on every retry.
  try {
    await createSession(userId);
  } catch (err) {
    console.error("[register] session creation failed, rolling back the account:", err);
    try {
      await sql()`DELETE FROM users WHERE id = ${userId}`;
    } catch (cleanupErr) {
      console.error("[register] rollback failed — orphan account", userId, cleanupErr);
    }
    return { message: DB_FAILED, values: keep(data, [...data.keys()]) };
  }

  // Secondary to the account itself, and sent only once it is real.
  await sendMail({ to: v.email, ...welcomeEmail(v.firstName) });
  redirect("/account");
}

export async function loginAction(_prev: FormState, data: FormData): Promise<FormState> {
  if (!hasDatabase()) return NO_DB;
  if (!hasSessionSecret()) return NO_SESSION_SECRET;
  const parsed = loginSchema.safeParse(Object.fromEntries(data));
  if (!parsed.success) {
    return { errors: fieldErrors(parsed.error), values: keep(data, ["email"]) };
  }
  const { email, password } = parsed.data;

  let user: Awaited<ReturnType<typeof getUserByEmail>>;
  try {
    user = await getUserByEmail(email);
    const valid = user && (await verifyPassword(password, user.password_hash));
    if (!valid) {
      return { message: "Invalid email or password", values: { email } };
    }
    await createSession(Number(user.id));
  } catch (err) {
    console.error("[login] could not sign the visitor in:", err);
    return { message: DB_FAILED, values: { email } };
  }

  await sendMail({ to: email, ...welcomeBackEmail(user.first_name) });
  redirect("/account");
}

export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect("/");
}

export async function requestPasswordResetAction(_prev: FormState, data: FormData): Promise<FormState> {
  if (!hasDatabase()) return NO_DB;
  const parsed = forgotSchema.safeParse(Object.fromEntries(data));
  if (!parsed.success) {
    return { errors: fieldErrors(parsed.error), values: keep(data, ["email"]) };
  }
  const { email } = parsed.data;
  const user = await getUserByEmail(email);

  // Always report success to avoid leaking which emails are registered.
  if (user) {
    const token = randomBytes(32).toString("hex");
    const tokenHash = createHash("sha256").update(token).digest("hex");
    const expires = new Date(Date.now() + 60 * 60 * 1000);
    await sql()`
      INSERT INTO password_resets (token_hash, user_id, expires_at)
      VALUES (${tokenHash}, ${Number(user.id)}, ${expires.toISOString()})
    `;
    const base = process.env.APP_URL ?? "http://localhost:3000";
    const link = `${base}/reset-password?token=${token}`;
    await sendMail({ to: email, ...resetEmail(link) });
  }

  return { ok: true, message: "If that email is registered, a reset link is on its way." };
}

export async function resetPasswordAction(_prev: FormState, data: FormData): Promise<FormState> {
  if (!hasDatabase()) return NO_DB;
  if (!hasSessionSecret()) return NO_SESSION_SECRET;
  const parsed = resetSchema.safeParse(Object.fromEntries(data));
  if (!parsed.success) {
    return { errors: fieldErrors(parsed.error), values: { token: String(data.get("token") ?? "") } };
  }
  const { token, password } = parsed.data;
  const tokenHash = createHash("sha256").update(token).digest("hex");

  await ensureSchema();
  const rows = await sql()`
    SELECT * FROM password_resets
    WHERE token_hash = ${tokenHash} AND used = false AND expires_at > now()
    LIMIT 1
  `;
  if (!rows.length) {
    return { message: "This reset link is invalid or has expired.", values: { token } };
  }
  const reset = rows[0];
  const passwordHash = await hashPassword(password);
  await sql()`UPDATE users SET password_hash = ${passwordHash} WHERE id = ${Number(reset.user_id)}`;
  await sql()`UPDATE password_resets SET used = true WHERE token_hash = ${tokenHash}`;

  await createSession(Number(reset.user_id));
  redirect("/account");
}

export async function topUpAction(_prev: FormState, data: FormData): Promise<FormState> {
  if (!hasDatabase()) return NO_DB;
  const session = await readSession();
  if (!session) return { message: "Please sign in first." };

  const parsed = topUpSchema.safeParse(Object.fromEntries(data));
  if (!parsed.success) {
    return { message: "Enter an amount to top up." };
  }
  const { amount, currency } = parsed.data;

  const cents = toBaseCents(amount, currency);
  if (cents < MIN_TOPUP_CENTS || cents > MAX_TOPUP_CENTS) {
    return {
      message: `Top up between ${formatAmount(minTopUp(currency), currency)} and ${formatAmount(maxTopUp(currency), currency)}.`,
    };
  }

  await ensureSchema();
  const rows = await sql()`
    UPDATE users SET balance_cents = balance_cents + ${cents}
    WHERE id = ${session.userId}
    RETURNING email, first_name, balance_cents
  `;
  await sql()`
    INSERT INTO transactions (user_id, kind, description, amount_cents)
    VALUES (${session.userId}, 'topup', ${"Wallet top-up"}, ${cents})
  `;

  const row = rows[0];
  if (row) {
    try {
      const newBalance = Number(row.balance_cents);
      const ref = `TOP-${randomBytes(3).toString("hex").toUpperCase()}`;
      const pdf = await generateTopUpPdf({
        ref,
        email: row.email as string,
        amountCents: cents,
        balanceCents: newBalance,
        issuedAt: new Date(),
      });
      await sendMail({
        to: row.email as string,
        ...topUpEmail(row.first_name ?? undefined, cents, newBalance),
        attachments: [{ filename: `topup-${ref}.pdf`, content: pdf }],
      });
    } catch (err) {
      console.error("[topup] receipt email failed:", err);
    }
  }
  return { ok: true, message: "Balance updated." };
}

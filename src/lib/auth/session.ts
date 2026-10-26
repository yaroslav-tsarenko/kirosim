import "server-only";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const COOKIE = "velusim_session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function secret(): Uint8Array {
  const s = process.env.SESSION_SECRET;
  if (!s || s.length < 16) {
    throw new Error("SESSION_SECRET is not set (min 16 chars). Add it to your environment.");
  }
  return new TextEncoder().encode(s);
}

/**
 * Whether a session can actually be signed. Checked before an action writes
 * anything, so a missing secret is reported rather than discovered half-way
 * through — `secret()` throws, and a sign-up that throws after its INSERT
 * leaves an account the visitor can neither use nor register again.
 */
export function hasSessionSecret(): boolean {
  const s = process.env.SESSION_SECRET;
  return Boolean(s && s.length >= 16);
}

export interface SessionPayload {
  userId: number;
}

export async function createSession(userId: number): Promise<void> {
  const expires = new Date(Date.now() + MAX_AGE * 1000);
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret());

  const jar = await cookies();
  jar.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires,
  });
}

export async function readSession(): Promise<SessionPayload | null> {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret(), { algorithms: ["HS256"] });
    const userId = payload.userId;
    if (typeof userId !== "number") return null;
    return { userId };
  } catch {
    return null;
  }
}

export async function destroySession(): Promise<void> {
  const jar = await cookies();
  jar.delete(COOKIE);
}

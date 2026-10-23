import type { CurrencyCode } from "@/lib/types";

export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/** Prices in the catalogue are stored in USD; these are display-only rates. */
const RATES: Record<CurrencyCode, number> = { USD: 1, EUR: 0.92, GBP: 0.79 };
const SYMBOLS: Record<CurrencyCode, string> = { USD: "$", EUR: "€", GBP: "£" };

export function formatPrice(usd: number, currency: CurrencyCode = "USD"): string {
  const value = usd * RATES[currency];
  return `${SYMBOLS[currency]}${value.toFixed(2)}`;
}

/** Format a USD-base amount stored in cents into the selected currency. */
export function formatCents(cents: number, currency: CurrencyCode = "USD"): string {
  return formatPrice(cents / 100, currency);
}

export function currencySymbol(currency: CurrencyCode): string {
  return SYMBOLS[currency];
}

/** Format a value that is already denominated in `currency`. */
export function formatAmount(value: number, currency: CurrencyCode = "USD"): string {
  return `${SYMBOLS[currency]}${value.toFixed(2)}`;
}

/** Convert an amount typed in `currency` back to the USD base, in cents. */
export function toBaseCents(amount: number, currency: CurrencyCode = "USD"): number {
  return Math.round((amount / RATES[currency]) * 100);
}

/** Top-up bounds are set in euro, then held in the USD base everything is stored in. */
export const MIN_TOPUP_EUR = 10;
export const MAX_TOPUP_EUR = 1000;
export const MIN_TOPUP_CENTS = toBaseCents(MIN_TOPUP_EUR, "EUR");
export const MAX_TOPUP_CENTS = toBaseCents(MAX_TOPUP_EUR, "EUR");

/**
 * The bounds as they read in the selected currency. Rounded outwards — the
 * minimum up, the maximum down — so an amount the field advertises always
 * converts back inside the base-currency bounds the server enforces.
 */
export function minTopUp(currency: CurrencyCode): number {
  return Math.ceil((MIN_TOPUP_EUR / RATES.EUR) * RATES[currency] * 100) / 100;
}

export function maxTopUp(currency: CurrencyCode): number {
  return Math.floor((MAX_TOPUP_EUR / RATES.EUR) * RATES[currency] * 100) / 100;
}

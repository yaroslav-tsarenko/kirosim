"use client";

import { usePreferences } from "@/components/providers/Preferences";
import type { CurrencyCode } from "@/lib/types";

/* The currency select keeps the mono readout voice — it is a technical
   control, not a styled dropdown pretending to be a button. */
const selectCls =
  "cursor-pointer rounded-xs bg-transparent py-0.5 font-mono text-[0.68rem] uppercase tracking-[0.14em] " +
  "text-current transition-colors hover:text-ink focus-visible:outline-2";

export function CurrencySelect() {
  const { currency, setCurrency } = usePreferences();
  return (
    <label className="inline-flex items-center gap-1">
      <span className="sr-only">Currency</span>
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
        className={selectCls}
      >
        <option value="GBP">£ GBP</option>
        <option value="USD">$ USD</option>
        <option value="EUR">€ EUR</option>
      </select>
    </label>
  );
}

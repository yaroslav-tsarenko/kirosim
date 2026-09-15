"use client";

import { useState } from "react";
import { Check } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

/** Inline input with a lime subscribe button welded to it — one rectangle,
 *  split by a hairline, not two floating pills. */
export function NewsletterForm({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setDone(true);
  }

  if (done) {
    return (
      <p
        className={cn(
          "inline-flex items-center gap-2 bg-lime px-3 py-2.5 text-sm font-medium text-on-lime",
          className,
        )}
      >
        <Check className="size-4" /> You&apos;re on the list.
      </p>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn("flex w-full max-w-sm items-stretch border border-hairline-strong bg-card", className)}
    >
      <label htmlFor="newsletter" className="sr-only">Email address</label>
      <input
        id="newsletter"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="h-11 min-w-0 flex-1 bg-transparent px-3 text-sm text-ink placeholder:text-ink-muted focus:outline-none"
      />
      <button
        type="submit"
        className="shrink-0 bg-lime px-4 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-on-lime transition-colors duration-[var(--dur-fast)] hover:bg-lime-edge"
      >
        Subscribe
      </button>
    </form>
  );
}

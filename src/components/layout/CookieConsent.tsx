"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const STORAGE_KEY = "kirosim:cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      // Read consent after mount to stay SSR-safe (localStorage is client-only).
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      /* storage unavailable — stay hidden */
    }
  }, []);

  function decide(choice: "accepted" | "rejected") {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      /* ignore */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="band-graphite fixed inset-x-3 bottom-3 z-[70] mx-auto max-w-3xl border border-hairline-strong p-4 sm:inset-x-auto sm:bottom-4 sm:left-auto sm:right-4 sm:p-5"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink-muted">
          We use cookies to run the site and improve your experience. See our{" "}
          <Link href="/legal/cookies" className="text-lime underline-offset-4 hover:underline">
            cookie policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <Button variant="outline" onClick={() => decide("rejected")}>
            Reject
          </Button>
          <Button onClick={() => decide("accepted")}>Accept</Button>
        </div>
      </div>
    </div>
  );
}

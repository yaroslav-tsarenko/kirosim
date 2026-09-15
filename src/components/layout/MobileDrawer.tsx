"use client";

import { useEffect } from "react";
import Link from "next/link";
import { DestinationSearch } from "@/components/search/DestinationSearch";
import { Logo } from "./Logo";
import { CurrencySelect } from "./PrefSelects";
import { ThemeToggle } from "./ThemeToggle";
import { nav } from "@/lib/site";
import { regions } from "@/lib/data/regions";
import { popularCountries } from "@/lib/data/countries";
import { ChevronDown, Close } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className={cn("fixed inset-0 z-[60] lg:hidden", open ? "" : "pointer-events-none")} aria-hidden={!open}>
      <div
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-graphite/70 transition-opacity duration-[var(--dur-slow)]",
          open ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={cn(
          "absolute right-0 top-0 flex h-full w-[88%] max-w-sm flex-col border-l-2 border-ink bg-porcelain",
          "transition-transform duration-[260ms] ease-[var(--ease-snap)]",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-hairline px-4 py-3">
          <Logo />
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="grid size-9 place-items-center rounded-xs text-ink transition-colors hover:bg-concrete"
          >
            <Close className="size-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <DestinationSearch placeholder="Where are you headed?" />
          </div>

          <nav aria-label="Mobile primary" className="border-t border-hairline">
            <ul>
              {nav.primary.map((item) => (
                <li key={item.href} className="border-b border-hairline">
                  <Link
                    href={item.href}
                    className="block px-4 py-3.5 font-display text-lg font-bold tracking-[-0.03em] text-ink transition-colors hover:bg-lime-tint"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <MobileAccordion title="Regions">
            <ul className="pb-2">
              {regions.map((r) => (
                <li key={r.id}>
                  <Link
                    href={`/regions/${r.id}`}
                    className="flex items-center justify-between px-4 py-2.5 text-sm text-ink transition-colors hover:bg-lime-tint"
                  >
                    {r.name}
                    <span className="readout text-[0.62rem]">{r.countryCount}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </MobileAccordion>

          <MobileAccordion title="Most travelled">
            <ul className="grid grid-cols-2 pb-2">
              {popularCountries().slice(0, 8).map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/destinations/${c.slug}`}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-ink transition-colors hover:bg-lime-tint"
                  >
                    <span aria-hidden>{c.flag}</span> {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </MobileAccordion>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-hairline px-4 py-3 text-ink-muted">
          <CurrencySelect />
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}

function MobileAccordion({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className="border-b border-hairline">
      <summary className="eyebrow flex cursor-pointer list-none items-center justify-between px-4 py-3.5 text-ink">
        {title}
        <ChevronDown className="size-4" />
      </summary>
      {children}
    </details>
  );
}

"use client";

import { useId, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { searchCountries } from "@/lib/data/countries";
import { formatPrice, cn } from "@/lib/utils";
import { usePreferences } from "@/components/providers/Preferences";
import { Search } from "@/components/ui/icons";

interface Props {
  size?: "md" | "lg";
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
}

/**
 * The destination search — the true CTA of the business, so it is a
 * rectangle with a graphite border, not a soft pill floating in space.
 * At `lg` it carries a lime search button and sets the hero's baseline.
 *
 * Implemented as an ARIA combobox: the input owns the listbox, results are
 * options, and arrow keys move the active descendant without moving focus.
 */
export function DestinationSearch({
  size = "md",
  placeholder = "Where are you headed?",
  autoFocus,
  className,
}: Props) {
  const router = useRouter();
  const { currency } = usePreferences();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const listId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => searchCountries(query, 6), [query]);

  function choose(slug: string) {
    setOpen(false);
    setQuery("");
    router.push(`/destinations/${slug}`);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results[active]) choose(results[active].slug);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  const big = size === "lg";

  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "relative flex items-stretch bg-card transition-[border-color] duration-[var(--dur-fast)]",
          big ? "h-16 border-2 sm:h-[4.5rem]" : "h-11 border",
          open ? "border-ink" : big ? "border-ink/80 hover:border-ink" : "border-hairline-strong hover:border-ink",
        )}
      >
        <span className={cn("grid shrink-0 place-items-center", big ? "pl-4 pr-1 sm:pl-6" : "pl-3")}>
          <Search className={cn("text-ink", big ? "size-6" : "size-[1.15rem]")} />
        </span>
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-label="Search destinations"
          aria-activedescendant={open && results[active] ? `${listId}-${active}` : undefined}
          autoFocus={autoFocus}
          value={query}
          placeholder={placeholder}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setActive(0);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 120)}
          onKeyDown={onKeyDown}
          className={cn(
            "w-full min-w-0 bg-transparent px-3 text-ink placeholder:text-ink-muted focus:outline-none",
            big
              ? "font-display text-lg font-semibold tracking-[-0.02em] sm:text-2xl"
              : "text-sm",
          )}
        />
        {big ? (
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              if (results[active]) choose(results[active].slug);
              else inputRef.current?.focus();
            }}
            className="m-1.5 hidden shrink-0 items-center gap-2 bg-lime px-6 font-display text-sm font-bold uppercase tracking-[0.08em] text-on-lime transition-colors duration-[var(--dur-fast)] hover:bg-lime-edge sm:flex"
          >
            Search
          </button>
        ) : null}
      </div>

      {open && results.length > 0 ? (
        <ul
          id={listId}
          role="listbox"
          aria-label="Destination results"
          className="overlay-panel absolute z-50 mt-1 w-full overflow-hidden text-left"
        >
          {!query ? (
            <li className="eyebrow border-b border-hairline px-4 pb-2 pt-3">Most travelled</li>
          ) : null}
          {results.map((c, i) => (
            <li
              key={c.slug}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={i === active}
              onMouseDown={(e) => {
                e.preventDefault();
                choose(c.slug);
              }}
              onMouseEnter={() => setActive(i)}
              className={cn(
                "relative flex cursor-pointer items-center gap-3 border-b border-hairline px-4 py-2.5 last:border-b-0",
                "transition-colors duration-[var(--dur-fast)]",
                i === active && "bg-lime-tint",
              )}
            >
              {i === active ? (
                <span aria-hidden className="absolute inset-y-0 left-0 w-1 bg-lime" />
              ) : null}
              <span className="grid size-8 shrink-0 place-items-center bg-concrete text-base leading-none" aria-hidden>
                {c.flag}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-medium text-ink">{c.name}</span>
                <span className="readout text-[0.65rem]">
                  {c.iso3} · {c.dialCode}
                </span>
              </span>
              <span className="shrink-0 text-right">
                <span className="readout block text-[0.6rem]">from</span>
                <span className="font-display text-base font-bold tabular-nums text-ink">
                  {formatPrice(c.fromPrice, currency)}
                </span>
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

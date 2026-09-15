"use client";

import { useMemo, useState } from "react";
import type { Country, RegionId } from "@/lib/types";
import { DestinationCard } from "@/components/cards/DestinationCard";
import { ChipOutline } from "@/components/ui/Chip";
import { regions } from "@/lib/data/regions";
import { cn } from "@/lib/utils";

export function DestinationsExplorer({ countries }: { countries: Country[] }) {
  const [region, setRegion] = useState<RegionId | "all">("all");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return countries.filter(
      (c) =>
        (region === "all" || c.region === region) &&
        (!query || c.name.toLowerCase().includes(query) || c.iso3.toLowerCase().includes(query)),
    );
  }, [countries, region, q]);

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-hairline pb-4 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-wrap gap-x-5 gap-y-2" role="tablist" aria-label="Filter by region">
          <Filter active={region === "all"} onClick={() => setRegion("all")}>All</Filter>
          {regions.map((r) => (
            <Filter key={r.id} active={region === r.id} onClick={() => setRegion(r.id)}>
              {r.name}
            </Filter>
          ))}
        </div>
        <label className="relative">
          <span className="sr-only">Filter destinations</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Filter by name…"
            className="field h-10 px-3 text-sm focus:border-ink focus:outline-none md:w-64"
          />
        </label>
      </div>

      <p className="readout mt-3" aria-live="polite">
        {filtered.length} destination{filtered.length === 1 ? "" : "s"}
      </p>

      {filtered.length ? (
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((c) => (
            <DestinationCard key={c.slug} country={c} className="h-full" />
          ))}
        </div>
      ) : (
        <div className="mt-16 flex flex-col items-center text-center">
          <ChipOutline className="h-10 w-12 text-hairline-strong" />
          <p className="readout mt-4">No destinations match “{q}”</p>
          <button
            onClick={() => {
              setQ("");
              setRegion("all");
            }}
            className="mt-3 border-b-2 border-lime pb-0.5 text-sm font-medium text-signal transition-colors hover:border-ink hover:text-ink"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}

/** Region filters are flat text with a lime underline when active — the same
 *  marker the primary navigation uses, so "selected" means one thing sitewide. */
function Filter({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "border-b-[3px] pb-1.5 text-sm font-medium transition-colors duration-[var(--dur-fast)]",
        active ? "border-lime text-ink" : "border-transparent text-ink-muted hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}

"use client";

import { useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

/**
 * Flat tabs on a hairline rail, active marked by a thick lime bar under the
 * label — the same marker used by the main navigation. Arrow keys move
 * between tabs, per the ARIA tabs pattern.
 */
export function Tabs({ tabs, className }: { tabs: Tab[]; className?: string }) {
  const [active, setActive] = useState(tabs[0]?.id);
  const base = useId();
  const listRef = useRef<HTMLDivElement>(null);

  function onKeyDown(e: React.KeyboardEvent) {
    const i = tabs.findIndex((t) => t.id === active);
    let next = i;
    if (e.key === "ArrowRight") next = (i + 1) % tabs.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    else return;
    e.preventDefault();
    setActive(tabs[next].id);
    listRef.current?.querySelectorAll("button")[next]?.focus();
  }

  return (
    <div className={className}>
      <div
        ref={listRef}
        role="tablist"
        aria-label="Options"
        onKeyDown={onKeyDown}
        className="flex gap-6 border-b border-hairline"
      >
        {tabs.map((t) => {
          const selected = active === t.id;
          return (
            <button
              key={t.id}
              role="tab"
              id={`${base}-${t.id}`}
              aria-selected={selected}
              aria-controls={`${base}-panel-${t.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(t.id)}
              className={cn(
                "-mb-px border-b-[3px] pb-2.5 text-sm font-medium transition-colors duration-[var(--dur-fast)]",
                selected
                  ? "border-lime text-ink"
                  : "border-transparent text-ink-muted hover:border-hairline-strong hover:text-ink",
              )}
            >
              {t.label}
            </button>
          );
        })}
      </div>
      {tabs.map((t) => (
        <div
          key={t.id}
          role="tabpanel"
          id={`${base}-panel-${t.id}`}
          aria-labelledby={`${base}-${t.id}`}
          hidden={active !== t.id}
          className="mt-6"
        >
          {t.content}
        </div>
      ))}
    </div>
  );
}

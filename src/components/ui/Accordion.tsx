"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";
import { Minus, Plus } from "./icons";

export interface AccordionItem {
  q: string;
  a: React.ReactNode;
}

/**
 * FAQ accordion as a numbered spec list: an index numeral, a hairline rule
 * between rows, and a plus/minus rather than a rotating chevron — the state
 * change is the affordance, not an animation.
 */
export function Accordion({ items, className }: { items: AccordionItem[]; className?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();

  return (
    <div className={cn("border-t border-hairline", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${base}-btn-${i}`;
        const panelId = `${base}-panel-${i}`;
        return (
          <div key={i} className="border-b border-hairline">
            <h3 className="m-0">
              <button
                id={btnId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-start gap-4 py-5 text-left sm:gap-6"
              >
                <span className="index-num mt-1.5 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                <span className="t-h3 flex-1 text-ink">{item.q}</span>
                <span
                  aria-hidden
                  className={cn(
                    "mt-0.5 grid size-7 shrink-0 place-items-center rounded-xs transition-colors duration-[var(--dur-fast)]",
                    isOpen ? "bg-lime text-on-lime" : "bg-concrete text-ink group-hover:bg-lime-tint",
                  )}
                >
                  {isOpen ? <Minus className="size-4" /> : <Plus className="size-4" />}
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              hidden={!isOpen}
              className="pb-6 text-pretty leading-relaxed text-ink-muted sm:pl-[4.25rem] sm:pr-12"
            >
              {item.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}

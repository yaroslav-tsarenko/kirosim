import { cn } from "@/lib/utils";

interface FlagChipProps {
  flag: string;
  name: string;
  code?: string;
  className?: string;
  size?: "sm" | "md";
}

/**
 * Country identity chip — a square-cut plate carrying the flag, the name and
 * the mono ISO code. Not a pill: the code needs a corner to sit against.
 */
export function FlagChip({ flag, name, code, className, size = "md" }: FlagChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-xs border border-hairline bg-card",
        size === "sm" ? "py-1 pl-2 pr-1.5 text-xs" : "py-1.5 pl-2.5 pr-2 text-sm",
        className,
      )}
    >
      <span className={cn("leading-none", size === "sm" ? "text-sm" : "text-base")} aria-hidden>
        {flag}
      </span>
      <span className="font-medium text-ink">{name}</span>
      {code ? (
        <span className="bg-concrete px-1.5 py-0.5 font-mono text-[0.68em] font-semibold uppercase tracking-[0.12em] text-ink-muted">
          {code}
        </span>
      ) : null}
    </span>
  );
}

/** Just the flag, on a plate — for dense rows where the name is already set. */
export function FlagPlate({ flag, className }: { flag: string; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid size-9 shrink-0 place-items-center rounded-xs bg-concrete text-lg leading-none",
        className,
      )}
    >
      {flag}
    </span>
  );
}

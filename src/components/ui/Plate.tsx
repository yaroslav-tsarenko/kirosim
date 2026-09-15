import { cn } from "@/lib/utils";

/**
 * The lime marker plate — one word per heading, never two.
 *
 * A flat geometric plate slid in behind a single word. It is the brand's
 * most recognisable trick, which is exactly why it is rationed: a heading
 * that marks three words marks nothing.
 */
export function Marked({
  children,
  className,
  ink,
  animate = true,
}: {
  children: React.ReactNode;
  className?: string;
  /** Graphite plate with porcelain type, for use on a lime or concrete band. */
  ink?: boolean;
  animate?: boolean;
}) {
  return (
    <span className={cn("plate", ink && "plate-ink", animate && "plate-in", className)}>
      {children}
    </span>
  );
}

type Tone = "concrete" | "lime" | "signal" | "warning" | "outline";

const tones: Record<Tone, string> = {
  concrete: "",
  lime: "micro-plate-lime",
  signal: "micro-plate-signal",
  warning: "micro-plate-warning",
  outline: "micro-plate-outline",
};

/**
 * A micro-label on a solid plate — "MOST PICKED", "5G", "INSTANT".
 * Square-cut mono, wide-tracked. Lime is reserved for the single most
 * important label in a block.
 */
export function MicroPlate({
  children,
  tone = "concrete",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return <span className={cn("micro-plate", tones[tone], className)}>{children}</span>;
}

/** The Swiss index numeral — 01 / 02 / 03 on sections, steps and rows. */
export function IndexNum({ n, className }: { n: number; className?: string }) {
  return (
    <span className={cn("index-num", className)} aria-hidden>
      {String(n).padStart(2, "0")}
    </span>
  );
}

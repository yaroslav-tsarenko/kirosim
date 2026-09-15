import { cn } from "@/lib/utils";
import { ChipWatermark } from "./Chip";
import { IndexNum } from "./Plate";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  /** porcelain = page base · concrete = secondary band · graphite = inverted */
  band?: "porcelain" | "concrete" | "graphite";
  /** Faint chip pad-grid — graphite bands only, by design. */
  padGrid?: boolean;
  id?: string;
}

const bands = {
  porcelain: "bg-porcelain text-ink",
  concrete: "bg-concrete text-ink",
  graphite: "band-graphite",
};

export function Section({ children, className, band = "porcelain", padGrid, id }: SectionProps) {
  return (
    <section id={id} className={cn("relative", bands[band], className)}>
      {padGrid && band === "graphite" ? (
        <div className="pointer-events-none absolute inset-0 pad-grid opacity-60" aria-hidden />
      ) : null}
      <div className="relative">{children}</div>
    </section>
  );
}

export function Container({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-[84rem] px-5 sm:px-8", className)}>{children}</div>;
}

interface SectionHeadProps {
  /** The index numeral — sections are numbered, like a spec sheet. */
  index?: number;
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  /** Right-hand slot: a link, a filter, a count. */
  aside?: React.ReactNode;
  /** The oversized chip watermark behind the heading. */
  watermark?: boolean;
  className?: string;
}

/**
 * The standard section opener: a hairline rule, an index numeral and
 * eyebrow on the rule, then the heading. Asymmetric — the aside sits on
 * the baseline of the heading, not centred under it.
 */
export function SectionHead({
  index,
  eyebrow,
  title,
  lede,
  aside,
  watermark,
  className,
}: SectionHeadProps) {
  return (
    <div className={cn("relative isolate", className)}>
      {watermark ? (
        <ChipWatermark className="-top-10 right-0 h-36 w-44 text-ink lg:-right-8 lg:h-52 lg:w-64" />
      ) : null}

      {index !== undefined || eyebrow ? (
        <div className="flex items-center gap-4 border-t border-hairline pt-3">
          {index !== undefined ? <IndexNum n={index} /> : null}
          {eyebrow ? <span className="eyebrow text-ink">{eyebrow}</span> : null}
        </div>
      ) : null}

      <div className="mt-5 flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
        <h2 className="t-h1 max-w-[16ch] text-balance">{title}</h2>
        {aside ? <div className="pb-1">{aside}</div> : null}
      </div>

      {lede ? (
        <p className="mt-4 max-w-[52ch] text-pretty text-[0.95rem] leading-relaxed text-ink-muted">
          {lede}
        </p>
      ) : null}
    </div>
  );
}

interface PageHeaderProps {
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  /** Breadcrumb trail, rendered above the eyebrow. */
  crumbs?: React.ReactNode;
  /** Right-hand slot on wide screens: a stat, a chip, a control. */
  aside?: React.ReactNode;
  children?: React.ReactNode;
}

/**
 * The opener every interior page shares: breadcrumbs, a mono eyebrow on a
 * hairline, the headline, and a short lede. Left-aligned, never centred —
 * the Swiss grid starts at the left margin and everything hangs off it.
 */
export function PageHeader({ eyebrow, title, lede, crumbs, aside, children }: PageHeaderProps) {
  return (
    <Section band="porcelain" className="border-b border-hairline">
      <Container className="py-10 sm:py-14">
        {crumbs}
        <div className={cn("mt-6 flex flex-wrap items-end justify-between gap-x-10 gap-y-6")}>
          <div className="max-w-3xl">
            <p className="eyebrow border-t border-hairline pt-3 text-ink">{eyebrow}</p>
            <h1 className="t-hero mt-5 max-w-[15ch] text-balance text-ink">{title}</h1>
            {lede ? (
              <p className="mt-5 max-w-[52ch] text-pretty leading-relaxed text-ink-muted">{lede}</p>
            ) : null}
          </div>
          {aside ? <div>{aside}</div> : null}
        </div>
        {children}
      </Container>
    </Section>
  );
}

/** A wide-tracked label preceded by a short lime rule. Inline variant of
 *  the section opener, for use inside cards and panels. */
export function Eyebrow({
  children,
  className,
  rule = true,
}: {
  children: React.ReactNode;
  className?: string;
  rule?: boolean;
}) {
  return (
    <div className={cn("eyebrow flex items-center gap-2.5", className)}>
      {rule ? <span className="h-0.5 w-5 bg-lime" aria-hidden /> : null}
      <span className="text-ink">{children}</span>
    </div>
  );
}

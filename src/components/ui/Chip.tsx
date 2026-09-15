import { cn } from "@/lib/utils";

/*
 * The chip glyph — the brand's single recurring mark.
 *
 * It is the ISO-7816 contact pad layout of a SIM card, abstracted: an
 * outer plate with six pads in two columns. It appears as the logo, the
 * favicon, the loading state (pads lighting in sequence), the success
 * icon, and — blown up and faint — as a watermark behind section headings.
 *
 * Geometry is defined once here so every instance is the same drawing.
 */

/** Pad rectangles in the 40×32 chip viewBox, in lighting order. */
const PADS: Array<[x: number, y: number, w: number, h: number]> = [
  [4.5, 4.5, 13, 7],
  [22.5, 4.5, 13, 7],
  [4.5, 13.5, 13, 5],
  [22.5, 13.5, 13, 5],
  [4.5, 20.5, 13, 7],
  [22.5, 20.5, 13, 7],
];

interface ChipMarkProps {
  className?: string;
  /** Pads light up in sequence — the loading and success state. */
  animate?: boolean;
  /** Renders the plate in lime with graphite pads instead of the inverse. */
  inverted?: boolean;
  title?: string;
}

/** The solid mark: a graphite plate carrying lime pads. */
export function ChipMark({ className, animate, inverted, title }: ChipMarkProps) {
  const plate = inverted ? "var(--lime)" : "var(--ink)";
  const pad = inverted ? "var(--ink)" : "var(--lime)";
  return (
    <svg
      viewBox="0 0 40 32"
      className={cn("block", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      <rect width="40" height="32" rx="6" fill={plate} />
      <g fill={pad}>
        {PADS.map(([x, y, w, h], i) => (
          <rect
            key={i}
            x={x}
            y={y}
            width={w}
            height={h}
            rx="1.5"
            data-pad={animate ? i : undefined}
            className={animate ? "animate-pad-blink" : undefined}
          />
        ))}
      </g>
    </svg>
  );
}

/** The outline mark — pads drawn as hairlines. Used where a solid plate
 *  would be too heavy: inline bullets, empty states, the 404. */
export function ChipOutline({ className, animate }: { className?: string; animate?: boolean }) {
  return (
    <svg viewBox="0 0 40 32" className={cn("block", className)} aria-hidden focusable="false">
      <rect x="0.75" y="0.75" width="38.5" height="30.5" rx="5.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <g fill="currentColor">
        {PADS.map(([x, y, w, h], i) => (
          <rect
            key={i}
            x={x}
            y={y}
            width={w}
            height={h}
            rx="1.5"
            opacity="0.85"
            data-pad={animate ? i : undefined}
            className={animate ? "animate-pad-blink" : undefined}
          />
        ))}
      </g>
    </svg>
  );
}

/**
 * The loader. Pads light in sequence, left to right, top to bottom — the
 * same rhythm as the chip provisioning. Reduced motion holds every pad lit.
 */
export function ChipLoader({ className, label = "Loading" }: { className?: string; label?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)} role="status">
      <ChipMark className="h-8 w-10" animate />
      <span className="readout">{label}</span>
    </span>
  );
}

/**
 * The oversized watermark behind a section heading. Deliberately faint —
 * it is felt as structure, not seen as decoration — and hidden from
 * assistive tech and from narrow screens where it would crowd the type.
 */
export function ChipWatermark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("pointer-events-none absolute -z-10 hidden select-none opacity-[0.09] md:block", className)}
    >
      <svg viewBox="0 0 40 32" className="h-full w-full" focusable="false">
        <rect
          x="1"
          y="1"
          width="38"
          height="30"
          rx="5.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.75"
          opacity="0.5"
        />
        <g fill="currentColor" opacity="0.4">
          {PADS.map(([x, y, w, h], i) => (
            <rect key={i} x={x} y={y} width={w} height={h} rx="1.5" />
          ))}
        </g>
      </svg>
    </span>
  );
}

/**
 * Signal ticks — a four-bar strength glyph. Used for coverage quality,
 * as the list bullet throughout the site, and as a micro-decoration on
 * the step strip. `level` is 1–4; bars above the level stay hairline.
 */
export function SignalTicks({
  level = 4,
  className,
  label,
}: {
  level?: 1 | 2 | 3 | 4;
  className?: string;
  label?: string;
}) {
  const heights = [3, 5.5, 8, 10.5];
  return (
    <svg
      viewBox="0 0 16 12"
      className={cn("block", className)}
      role={label ? "img" : undefined}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      {label ? <title>{label}</title> : null}
      {heights.map((h, i) => (
        <rect
          key={i}
          x={i * 4}
          y={12 - h}
          width="2.6"
          height={h}
          fill="currentColor"
          opacity={i < level ? 1 : 0.22}
        />
      ))}
    </svg>
  );
}

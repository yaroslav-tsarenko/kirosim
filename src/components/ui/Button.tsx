import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "graphite";
type Size = "sm" | "md" | "lg";

/* Buttons are rectangles with a 2px corner — never pills. The lime fill is
   the single primary action per view; everything else steps down to a
   hairline or to plain type. */
const base =
  "relative inline-flex items-center justify-center gap-2 rounded-xs font-medium " +
  "transition-[background-color,color,box-shadow,border-color,transform] " +
  "duration-[var(--dur-base)] ease-[var(--ease-snap)] active:translate-y-px " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-lime text-on-lime hover:bg-lime-edge",
  secondary: "bg-signal text-on-signal hover:brightness-110",
  outline: "border border-hairline-strong bg-card text-ink hover:border-ink hover:bg-lime-tint",
  ghost: "text-ink-muted hover:bg-concrete hover:text-ink",
  graphite: "bg-ink text-ink-inverse hover:bg-ink/90",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-[0.8125rem]",
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-7 text-[0.9375rem]",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: CommonProps & ComponentProps<"button">) {
  return <button className={cn(base, variants[variant], sizes[size], className)} {...props} />;
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  ...props
}: CommonProps & ComponentProps<typeof Link>) {
  return <Link className={cn(base, variants[variant], sizes[size], className)} {...props} />;
}

/**
 * A text link that reads as a link: signal green, with a lime underline
 * that thickens on hover. Used inline and as the "see all" aside.
 */
export function TextLink({
  className,
  children,
  ...props
}: ComponentProps<typeof Link> & { children: ReactNode }) {
  return (
    <Link
      className={cn(
        "inline-flex items-center gap-1.5 border-b-2 border-lime pb-0.5 text-sm font-medium text-signal",
        "transition-colors duration-[var(--dur-fast)] hover:border-ink hover:text-ink",
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}

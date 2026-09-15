import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

/*
 * One icon system, drawn to one spec: a 24px grid, 1.75 stroke, square caps
 * and mitred joins. Square caps are the deliberate departure from the usual
 * rounded sets — they match the hairlines and cut plates the rest of the
 * interface is built from. Icons are never put in circles and never used as
 * decoration; if an icon is not labelling something, it is not on the page.
 */
const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "square",
  strokeLinejoin: "miter",
} as const;

export function Search(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.8-3.8" />
    </svg>
  );
}

export function Cart(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden {...props}>
      <path d="M3 4h2.2l2.3 11.5h10L20 7.5H6" />
      <path d="M8.5 19.5h1.2M16.5 19.5h1.2" />
    </svg>
  );
}

export function Bookmark(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden {...props}>
      <path d="M6 3.5h12v17l-6-4.4-6 4.4v-17Z" />
    </svg>
  );
}

export function User(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden {...props}>
      <circle cx="12" cy="8" r="3.8" />
      <path d="M4.5 20.5c0-3.7 3.4-6 7.5-6s7.5 2.3 7.5 6" />
    </svg>
  );
}

export function Sun(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.2 5.2l1.6 1.6M17.2 17.2l1.6 1.6M18.8 5.2l-1.6 1.6M6.8 17.2l-1.6 1.6" />
    </svg>
  );
}

export function Moon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden {...props}>
      <path d="M20 14.6A8.2 8.2 0 0 1 9.4 4 8.2 8.2 0 1 0 20 14.6Z" />
    </svg>
  );
}

export function Check(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} strokeWidth={2.2} aria-hidden {...props}>
      <path d="m4 12.5 5 5L20 6.5" />
    </svg>
  );
}

export function Bolt(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M13.5 2 4 13.5h6L9.5 22 20 10.5h-6.5L13.5 2Z" />
    </svg>
  );
}

export function QrGlyph(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M3 3h7v7H3V3Zm2 2v3h3V5H5Zm9-2h7v7h-7V3Zm2 2v3h3V5h-3ZM3 14h7v7H3v-7Zm2 2v3h3v-3H5Zm9 0h2v2h-2v-2Zm2 2h2v2h-2v-2Zm-2 2h2v1h-2v-1Zm4-4h2v2h-2v-2Zm0 4h2v1h-2v-1Z" />
    </svg>
  );
}

export function ChevronDown(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} strokeWidth={2} aria-hidden {...props}>
      <path d="m5.5 9 6.5 6.5L18.5 9" />
    </svg>
  );
}

export function ChevronRight(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} strokeWidth={2} aria-hidden {...props}>
      <path d="m9 5.5 6.5 6.5L9 18.5" />
    </svg>
  );
}

export function ArrowRight(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} strokeWidth={2} aria-hidden {...props}>
      <path d="M4 12h15M13.5 6.5 19 12l-5.5 5.5" />
    </svg>
  );
}

export function ArrowUpRight(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} strokeWidth={2} aria-hidden {...props}>
      <path d="M7 17 17 7M8.5 7H17v8.5" />
    </svg>
  );
}

export function Globe(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.6 2.7 2.6 14.3 0 17M12 3.5c-2.6 2.7-2.6 14.3 0 17" />
    </svg>
  );
}

export function Shield(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden {...props}>
      <path d="M12 3 5 6v6c0 4.2 2.9 7.6 7 9 4.1-1.4 7-4.8 7-9V6l-7-3Z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </svg>
  );
}

export function Device(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden {...props}>
      <rect x="7" y="2.5" width="10" height="19" rx="1.5" />
      <path d="M10.5 5.5h3" />
    </svg>
  );
}

export function Mail(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden {...props}>
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <path d="m3.5 6 8.5 6.2L20.5 6" />
    </svg>
  );
}

export function Close(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} strokeWidth={2} aria-hidden {...props}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

export function Menu(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} strokeWidth={2} aria-hidden {...props}>
      <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />
    </svg>
  );
}

export function Minus(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} strokeWidth={2} aria-hidden {...props}>
      <path d="M5 12h14" />
    </svg>
  );
}

export function Plus(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} strokeWidth={2} aria-hidden {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function Clock(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5.2l3.4 2" />
    </svg>
  );
}

export function Download(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden {...props}>
      <path d="M12 3.5v11M7.5 10.5 12 15l4.5-4.5M4.5 19.5h15" />
    </svg>
  );
}

export function Copy(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...stroke} aria-hidden {...props}>
      <rect x="8.5" y="8.5" width="12" height="12" rx="1" />
      <path d="M15.5 5.5h-12v12" />
    </svg>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TopStrip } from "./TopStrip";
import { Logo } from "./Logo";
import { DestinationSearch } from "@/components/search/DestinationSearch";
import { MegaNav } from "./MegaNav";
import { MobileDrawer } from "./MobileDrawer";
import { AccountButton } from "./AccountButton";
import { usePreferences } from "@/components/providers/Preferences";
import { nav } from "@/lib/site";
import { cn, formatCents } from "@/lib/utils";
import { Cart, Bookmark, ChevronDown, Menu } from "@/components/ui/icons";

export interface AccountSummary {
  firstName: string;
  balanceCents: number;
}

export function Header({ account }: { account: AccountSummary | null }) {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
  const { currency } = usePreferences();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMegaOpen(false);
    setDrawerOpen(false);
  }, [pathname]);

  // Escape closes the mega-panel wherever focus currently sits.
  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMegaOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [megaOpen]);

  return (
    <header className="sticky top-0 z-50">
      <div className="hidden md:block">
        <TopStrip />
      </div>

      <div
        className="relative border-b border-hairline bg-porcelain"
        onMouseLeave={() => setMegaOpen(false)}
      >
        {/* Main bar */}
        <div className="mx-auto flex w-full max-w-[84rem] items-center gap-4 px-5 sm:px-8">
          <div
            className={cn(
              "flex items-center transition-[padding] duration-[var(--dur-slow)] ease-[var(--ease-snap)]",
              scrolled ? "py-2.5" : "py-4",
            )}
          >
            <Logo href="/" />
          </div>

          <div className="hidden flex-1 justify-center lg:flex">
            <DestinationSearch className="w-full max-w-lg" placeholder="Where are you headed?" />
          </div>

          <div className="ml-auto flex items-center gap-0.5">
            {account ? (
              <Link
                href="/account?tab=wallet"
                className="mr-2 hidden items-center gap-2 border border-hairline px-2.5 py-1.5 transition-colors hover:border-ink sm:inline-flex"
                title="Balance"
              >
                <span className="readout text-[0.6rem]">Balance</span>
                <span className="font-display text-sm font-bold tabular-nums text-ink">
                  {formatCents(account.balanceCents, currency)}
                </span>
              </Link>
            ) : null}
            <AccountButton account={account} />
            <IconLink
              href="/account?tab=saved"
              label="Saved destinations"
              icon={<Bookmark className="size-[1.15rem]" />}
            />
            <IconLink
              href="/account?tab=esims"
              label="My eSIMs"
              icon={<Cart className="size-[1.15rem]" />}
            />
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen(true)}
              className="ml-1 grid size-9 place-items-center rounded-xs text-ink transition-colors hover:bg-concrete lg:hidden"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>

        {/* Nav row — flat tabs on the bar's own rule, active marked by a
            thick lime bar sitting on that rule. */}
        <nav
          aria-label="Primary"
          className={cn(
            "mx-auto hidden w-full max-w-[84rem] items-center gap-7 px-5 sm:px-8 lg:flex",
            scrolled ? "pb-0" : "pb-0",
          )}
        >
          {nav.primary.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const isMega = "mega" in item && item.mega;
            const marked = isMega ? megaOpen || active : active;
            return isMega ? (
              <button
                key={item.href}
                onClick={() => setMegaOpen((o) => !o)}
                onMouseEnter={() => setMegaOpen(true)}
                aria-expanded={megaOpen}
                aria-haspopup="true"
                className={cn(
                  "-mb-px inline-flex items-center gap-1.5 border-b-[3px] pb-2.5 text-sm font-medium",
                  "transition-colors duration-[var(--dur-fast)]",
                  marked ? "border-lime text-ink" : "border-transparent text-ink-muted hover:text-ink",
                )}
              >
                {item.label}
                <ChevronDown
                  className={cn(
                    "size-3.5 transition-transform duration-[var(--dur-base)]",
                    megaOpen && "rotate-180",
                  )}
                />
              </button>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "-mb-px border-b-[3px] pb-2.5 text-sm font-medium transition-colors duration-[var(--dur-fast)]",
                  marked ? "border-lime text-ink" : "border-transparent text-ink-muted hover:text-ink",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {megaOpen ? <MegaNav onClose={() => setMegaOpen(false)} /> : null}
      </div>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </header>
  );
}

function IconLink({
  href,
  label,
  icon,
  count,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  count?: number;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      title={label}
      className="relative grid size-9 place-items-center rounded-xs text-ink transition-colors duration-[var(--dur-fast)] hover:bg-concrete"
    >
      {icon}
      {count ? (
        <span className="absolute -right-0.5 -top-0.5 grid min-w-4 place-items-center bg-ink px-1 font-mono text-[0.55rem] font-bold leading-4 text-ink-inverse">
          {count}
        </span>
      ) : null}
    </Link>
  );
}

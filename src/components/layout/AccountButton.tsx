import Link from "next/link";
import { User } from "@/components/ui/icons";
import type { AccountSummary } from "./Header";

export function AccountButton({ account }: { account: AccountSummary | null }) {
  return (
    <Link
      href={account ? "/account" : "/login"}
      aria-label={account ? "Account" : "Sign in"}
      title={account ? "Account" : "Sign in"}
      className="relative grid size-9 place-items-center rounded-xs text-ink transition-colors duration-[var(--dur-fast)] hover:bg-concrete"
    >
      <User className="size-[1.15rem]" />
      {account ? (
        <span
          aria-hidden
          className="absolute right-1 top-1 size-1.5 bg-lime ring-2 ring-porcelain"
        />
      ) : null}
    </Link>
  );
}

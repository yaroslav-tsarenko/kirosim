"use client";

import { usePreferences } from "@/components/providers/Preferences";
import { Sun, Moon } from "@/components/ui/icons";

export function ThemeToggle() {
  const { toggleTheme } = usePreferences();
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle colour theme"
      title="Toggle colour theme"
      className="inline-flex size-7 items-center justify-center rounded-xs text-current transition-colors duration-[var(--dur-fast)] hover:bg-concrete hover:text-ink"
    >
      <Moon className="size-4 dark:hidden" />
      <Sun className="hidden size-4 dark:block" />
    </button>
  );
}

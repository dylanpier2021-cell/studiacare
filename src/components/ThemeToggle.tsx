"use client";

import { useEffect, useState } from "react";
import { IconMoon, IconSun } from "./Icons";

/** Light/dark toggle. Persists to localStorage; initial theme set in layout. */
export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const current = (document.documentElement.getAttribute("data-theme") as
      | "light"
      | "dark") || "light";
    setTheme(current);
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("sc-theme", next);
    } catch {
      /* ignore */
    }
    setTheme(next);
  }

  return (
    <button
      onClick={toggle}
      className="w-10 h-10 rounded-full border border-line bg-soft flex items-center justify-center text-ink-soft hover:text-brand hover:border-brand transition-colors"
      aria-label="Toggle dark mode"
    >
      {theme === "dark" ? (
        <IconSun className="w-[18px] h-[18px]" />
      ) : (
        <IconMoon className="w-[18px] h-[18px]" />
      )}
    </button>
  );
}

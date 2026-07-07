import type { Config } from "tailwindcss";

// Dark mode is driven by data-theme="dark" on <html> (persisted, toggled in-app).
const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      // Colors map to CSS variables defined in globals.css so both themes
      // share one palette source of truth (matches Rough Draft 1).
      colors: {
        bg: "var(--bg)",
        card: "var(--bg-card)",
        soft: "var(--bg-soft)",
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        "ink-faint": "var(--ink-faint)",
        brand: "var(--brand)",
        "brand-dark": "var(--brand-dark)",
        "brand-soft": "var(--brand-soft)",
        accent: "var(--accent)",
        good: "var(--good)",
        bad: "var(--bad)",
        line: "var(--line)",
      },
      borderRadius: {
        card: "20px",
      },
      boxShadow: {
        card: "var(--shadow)",
        soft: "var(--shadow-soft)",
      },
      maxWidth: {
        wrap: "1120px",
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

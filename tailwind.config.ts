import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          violet: "#8b5cf6",
          blue: "#3b82f6",
          "bg-purple": "#faf5ff",
          "bg-blue": "#f0f9ff",
          "text-primary": "#1e1b4b",
          "text-secondary": "#64748b",
          success: "#10b981",
          warning: "#f59e0b",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["'Plus Jakarta Sans'", "Inter", "system-ui", "sans-serif"],
      },
      // Override Tailwind's default line-height: 1 on display sizes
      // so leading-tight / leading-snug actually work on hero headlines.
      fontSize: {
        "4xl": ["2.25rem", { lineHeight: "1.15" }],
        "5xl": ["3rem", { lineHeight: "1.1" }],
        "6xl": ["3.75rem", { lineHeight: "1.05" }],
        "7xl": ["4.5rem", { lineHeight: "1.05" }],
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #8b5cf6, #3b82f6)",
        "brand-gradient-light":
          "linear-gradient(135deg, #faf5ff, #f0f9ff)",
      },
    },
  },
  plugins: [typography],
};
export default config;

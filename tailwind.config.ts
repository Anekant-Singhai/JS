import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      colors: {
        paper: { DEFAULT: "#F5F2EB", 2: "#ECE7DC" },
        ink: { DEFAULT: "#111315", 2: "#3B3F45", 3: "#6B7078" },
        line: "#DCD5C7",
        accent: { DEFAULT: "#E4572E", 2: "#C2410C", soft: "#FBE3D9" },
        moss: "#2F6B4F",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 50s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;

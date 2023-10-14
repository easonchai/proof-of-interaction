import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        brand: {
          primary: "#2563eb",
          primaryDark: "#1f3b8a",
          secondary: "#64748b",
        },
      },
      gridTemplateColumns: {
        hexagon: "repeat(5, 5fr 1fr) 5fr",
      },
    },
  },
  plugins: [],
};
export default config;

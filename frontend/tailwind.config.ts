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
      backgroundColor: {
        "primary": "#B9B8B8",
        "secondary": "#34495E",
        "tertiary": "#4A4A4A",
        "quaternary": "#1E1E1E",
      },
      textColor: {
        "primary": "#000000",
        "secondary": "#34495E"
      },
    },
  },
  plugins: [],
};
export default config;

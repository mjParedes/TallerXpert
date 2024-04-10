import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "primary": "#6264D5",
        "secondary": "#DBDCF7",
        "black": "#2E353A",
        "white": "#F4F4F4",
      },
      textColor: {
        "primary": "#6264D5",
        "secondary": "#DBDCF7",
        "black": "#2E353A",
        "white": "#F4F4F4",
      },
    },
  },
  plugins: [],
};
export default config;

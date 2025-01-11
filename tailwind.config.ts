import type { Config } from "tailwindcss";
import daisyui from "daisyui"

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/*/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        blacky : "var(--blacky)",
        gray1 : 'var(--gray1)',
        gray2 : 'var(--gray2)',
        green : 'var(--green)'
      },
      backgroundColor :{
        green : 'var(--green)',
        gray1 : 'var(--gray1)',
        gray2 : 'var(--gray2)',
      }
    },
  },
  plugins: [
    daisyui,
  ],
} satisfies Config;

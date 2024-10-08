import type { Config } from "tailwindcss"
import tailwindTypo from "@tailwindcss/typography"

const round = (num: number) =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, "$1")
    .replace(/\.0$/, "")
const em = (px: number, base: number) => `${round(px / base)}em`

export default {
  content: [
    "./astro.config.ts",
    "./src/**/*.{astro,vue,html,js,jsx,md,mdx,ts,tsx}",
    "./src/content/**/*.{md,mdx}",
  ],
  plugins: [ tailwindTypo ],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        xs: "400px",
      },
      boxShadow: {
        toggle: "0 0 2px 3px rgba(255, 55, 74, var(--tw-text-opacity))",
      },
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
      },
      typography(theme: any) {
        return {
          DEFAULT: {
            css: {
              blockquote: {
                borderLeftColor: theme("colors.primary"),
              },
              ".image-float": {
                marginRight: em(32, 16),
              },
            },
          },
          sm: {
            css: {
              ".image-float": {
                marginRight: em(24, 14),
              },
            },
          },
          lg: {
            css: {
              ".image-float": {
                marginRight: em(32, 18),
              },
            },
          },
          xl: {
            css: {
              ".image-float": {
                marginRight: em(40, 20),
              },
            },
          },
          "2xl": {
            css: {
              ".image-float": {
                marginRight: em(48, 24),
              },
            },
          },
          dark: {
            css: {
              color: theme("colors.gray.300"),
              "[class~=lead]": { color: theme("colors.gray.400") },
              a: { color: theme("colors.gray.100") },
              strong: { color: theme("colors.gray.100") },
              "ul > li::before": { backgroundColor: theme("colors.gray.700") },
              hr: { borderColor: theme("colors.gray.800") },
              blockquote: {
                color: theme("colors.gray.100"),
                borderLeftColor: theme("colors.primary"),
              },
              h1: { color: theme("colors.gray.100") },
              h2: { color: theme("colors.gray.100") },
              h3: { color: theme("colors.gray.100") },
              h4: { color: theme("colors.gray.100") },
              code: { color: theme("colors.gray.100") },
              "a code": { color: theme("colors.gray.100") },
              pre: {
                color: theme("colors.gray.200"),
                backgroundColor: theme("colors.gray.800"),
              },
              thead: {
                color: theme("colors.gray.100"),
                borderBottomColor: theme("colors.gray.700"),
              },
              "tbody tr": { borderBottomColor: theme("colors.gray.800") },
            },
          },
        }
      },
    },
  },
  variants: {
    extend: {
      typography: ["dark"],
      shaddow: ["group-hover"],
    },
  },
} satisfies Config

const colors = require("tailwindcss/colors");
const { spacing, fontFamily } = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "blue-opaque": "rgb(13 42 148 / 18%)",
        gray: colors.neutral,
        green: colors.teal,
        inherit: "inherit",
      },
      transitionProperty: {
        backgroundColor: "backgroundColor",
      },
      height: {
        "screen-35": "35vh",
      },
      minHeight: {
        14: "3.5rem",
        36: "9rem",
      },
      minWidth: {
        sm: "24rem",
        sidebar: "28rem",
        "1/5": "20%",
      },
      maxWidth: {
        "60-ch": "60ch",
        "1/4": "25%",
      },
      translate: {
        "screen-1/4": "25%",
      },
      transitionDuration: {
        325: "325ms",
      },

      fontSize: {
        xxs: ".625rem",
      },
      spacing: {
        "2px": "2px",
      },
      strokeWidth: {
        1.5: "1.5",
        2.5: "2.5",
      },
      zIndex: {
        "-1": -1,
      },
      lineClamp: {
        10: 10,
      },
      fontFamily: {
        mono: ["JetBrains", ...fontFamily.mono],
        sans: ["Franklin", ...fontFamily.sans],
        serif: ['"Source Serif"', ...fontFamily.serif],
        noEmoji: [
          '"IBM Plex Sans"',
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.700"),
            a: {
              color: theme("colors.teal.600"),
              "&:hover": {
                color: theme("colors.blue.700"),
              },
              code: { color: theme("colors.blue.400") },
            },
            "h2,h3,h4": {
              "scroll-margin-top": spacing[32],
            },
            thead: {
              borderBottomColor: theme("colors.gray.200"),
            },
            code: { color: theme("colors.pink.500") },
            "blockquote p:first-of-type::before": false,
            "blockquote p:last-of-type::after": false,
          },
        },
        dark: {
          css: {
            color: theme("colors.gray.200"),
            a: {
              color: theme("colors.teal.500"),
              "&:hover": {
                color: theme("colors.blue.600"),
              },
              code: { color: theme("colors.blue.400") },
            },
            blockquote: {
              borderLeftColor: theme("colors.gray.700"),
              color: theme("colors.gray.300"),
            },
            "h2,h3,h4": {
              color: theme("colors.gray.100"),
              "scroll-margin-top": spacing[32],
            },
            hr: { borderColor: theme("colors.gray.700") },
            ol: {
              li: {
                "&:before": { color: theme("colors.gray.500") },
              },
            },
            ul: {
              li: {
                "&:before": { backgroundColor: theme("colors.gray.500") },
              },
            },
            strong: { color: theme("colors.gray.100") },
            thead: {
              color: theme("colors.gray.100"),
              borderBottomColor: theme("colors.gray.600"),
            },
            tbody: {
              tr: {
                borderBottomColor: theme("colors.gray.700"),
              },
            },
          },
        },
      }),
    },
  },
  variants: {
    typography: ["dark"],
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
  ],
};

// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
       
        movement_login: {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
      animation: {
        "fade-left": "movement_login 0.5s ease-in-out forwards", // Animación de movimiento a la izquierda
      },
      colors: {
        primary_dark: "#201f20",
        primary_white: "#f9f9f9",
        secondary_dark: "#262426",
        secondary_white: "#f1f1f1",
        background: "#F3F4F6",
        text: "#2D2D2D",
        blue_personalizado: "#0574b0",
      },
      width: {
        '0.70/12': '4.50%',
        '2.50/12': '17%',
        '3.50/12': '20%',
        '4.50/12': '32%',
        '0.50/12': '1%',
      },
    },
  },
  plugins: [],
};

export default config;
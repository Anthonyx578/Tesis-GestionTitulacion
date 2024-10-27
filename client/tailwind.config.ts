import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#d9ced0",   // Azul oscuro para uso principal
        primary_sencodary: "#0d203e",   
        secondary: "#F76C5E", // Naranja para resaltar
        background: "#F3F4F6", // Fondo claro
        text: "#2D2D2D",      // Texto oscuro
      },
      width: { // Define tu valor personalizado aquí
        '0.70/12': '4.50%', 
        '3.50/12': '20%', 
        '4.50/12': '28%', 

      }
    },
  },
  plugins: [],
};
export default config;

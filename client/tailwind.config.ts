import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class', // Habilita el modo oscuro basado en la clase
  theme: {
    extend: {
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
        '4.50/12': '28%', 
        '0.50/12': '1%', 
      }
    },
  },
  plugins: [],
};
export default config;

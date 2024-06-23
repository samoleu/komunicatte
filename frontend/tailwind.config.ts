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
        'text': '#040316',
        'background': '#fbfbfe',
        'background-2': '#dbdbde',
        'primary': '#6258bb',
        'secondary': '#dddbff',
        'accent': '#5a4aed',
        'onlineActivity': '#00c800',
        'offlineActivity': '#808080',
        'dndActivity': '#ff0000',
       },       
    },
  },
  plugins: [],
};
export default config;

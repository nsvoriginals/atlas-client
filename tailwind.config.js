/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "index.html","src/**/*.{jsx,js,tsx,ts}"
  ],
  theme: {
    extend: {
      fontFamily:{
        satoshi:["Satoshi","sans-serif"],
        Nue:["Nue","sans-serif"]
      }
    },
  },
  plugins: [],
}


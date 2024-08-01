/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'comp': "url('https://d3orlcfe999ser.cloudfront.net/images/welcome/header/slide/screens_01_en.png')",
        "body-bg": "url('https://d3orlcfe999ser.cloudfront.net/assets/nuvens_5-4952856305598c36cc250e1435f16fe0.png')"
      },
    },
  },
  plugins: [],
}


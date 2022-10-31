/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bg_light' : "url('../public/background_light.png')",
        'bg_dark' : "url('../public/background_dark.png')",
        'illustrator_l': "url('../public/illustrator_l.png')",
        'illustrator_s': "url('../public/illustrator_s.png')"
      }
    },
  },
  plugins: [],
}

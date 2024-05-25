/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}",
  "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      colors: {
        'purple-heart': {
          '50': '#eef0ff',
          '100': '#e1e4fe',
          '200': '#c8cdfd',
          '300': '#a7acfa',
          '400': '#8684f5',
          '500': '#7266ee',
          '600': '#634ae1',
          '700': '#5a41c8',
          '800': '#4533a0',
          '900': '#3c307f',
          '950': '#241c4a',
      },  
        "lavender-rose": {
          50: "#fef1fa",
          100: "#fee5f6",
          200: "#feccee",
          300: "#ffade4",
          400: "#fe68c9",
          500: "#f83cb1",
          600: "#e81a90",
          700: "#ca0c73",
          800: "#a70d5f",
          900: "#8b1051",
          950: "#55022e",
        },
        'light-apricot': {
          '50': '#fef6ee',
          '100': '#fdead7',
          '200': '#f9d0ae',
          '300': '#f5b07c',
          '400': '#f08547',
          '500': '#ec6423',
          '600': '#dd4c19',
          '700': '#b73817',
          '800': '#922e1a',
          '900': '#762818',
          '950': '#3f120b',
      },
      
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};

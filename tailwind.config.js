/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'mountains':" url('/images/mountain.jpg')",
        
      },
      fontFamily:{
        BGsans: [ "Bricolage Grotesque", "sans-serif"]
      },
     screens: {
'xs': {'max': '500px'},
'xss': {'max': '400px'},
's': {'max': '760px'},

     }
    },
  },
  plugins: [],
}


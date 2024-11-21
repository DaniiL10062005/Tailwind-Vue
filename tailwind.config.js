/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js}",
  ],
  theme: {
    extend: {
      colors: {
          back: '#F0F0F0', // фон
          DMY:'#6F7171',// dy mounth year
          refColor:'#854DFF',//--
          error:'#FF5757',
          buttonOnHover:'#141414'
        },
        fontFamily: {
          Poppins:'Poppins'
        },
    },
  },
  plugins: [],
}


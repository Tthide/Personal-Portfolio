module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      minHeight: {
        'hero': 'calc(100dvh - 14rem)',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%, 60%': { transform: 'translateX(-6px)' },
          '40%, 80%': { transform: 'translateX(6px)' },
        },
      },
      animation: {
        shake: 'shake 0.3s ease-in-out',
      },
      colors: {
        primary: "#113F67",         // background
        accent_blue: "#91C8E4",     // highlight blue
        accent_purple: "#483AA0",   // highlight purple
        light: "#F9F5EE",           // text beige
        smooth_dark: "#1A1A1A",     // text lighter dark
        error_red: "#cc0000",       // error text red

      },
      fontFamily: {
        konkhmer: ["Konkhmer Sleokchher", "sans-serif"],
        spartan: ["League Spartan", "sans-serif"],
        montserrat: ["Montserrat"],
      },
    },
  },
  plugins: [],
};



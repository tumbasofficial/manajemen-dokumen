/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        krem: {
          50: "#FDFBF7",
          100: "#FAF6F0",
          200: "#F2EAD8",
        },
        kayu: {
          700: "#5C4632",
          800: "#3E2F22",
          900: "#2A2018",
        },
        biru: {
          100: "#DCE8F7",
          400: "#5A8FCB",
          600: "#3866A0",
          800: "#1F3D63",
        },
        teal: {
          100: "#D9F0E8",
          400: "#4FB196",
          600: "#2E8870",
          800: "#1A5B49",
        },
        oranye: {
          100: "#FBE7D2",
          400: "#E8965A",
          600: "#C26B2C",
          800: "#7E441B",
        },
        merahmuda: {
          100: "#F8DDE3",
          400: "#D9728C",
          600: "#B4475F",
          800: "#732C3C",
        },
      },
      fontSize: {
        base: ["18px", "1.6"],
        lg: ["20px", "1.6"],
        xl: ["24px", "1.5"],
        "2xl": ["28px", "1.4"],
        "3xl": ["34px", "1.3"],
      },
      borderRadius: {
        kotak: "20px",
      },
    },
  },
  plugins: [],
};

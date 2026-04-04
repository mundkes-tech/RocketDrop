export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2b7a86',
        secondary: '#4f95a1',
        accent: '#84b8c1',
        dark: '#0f2634',
        light: '#eef6f8',
        ink: '#162331',
        mist: '#edf5f7',
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 20px 42px -24px rgba(43, 122, 134, 0.52)',
        soft: '0 16px 38px -24px rgba(15, 38, 52, 0.45)',
      },
      animation: {
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        countdown: 'countdown 1s ease-in-out',
        float: 'float 4s ease-in-out infinite',
        slideIn: 'slideIn 0.35s ease-out',
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'petuno-purple': '#6C4CE8',
        'petuno-purple-dark': '#4F36B8',
        'petuno-purple-light': '#8B72F2',
        'petuno-purple-50': '#F5F3FF',
        
        'petuno-sky': '#4DA8DA',
        'petuno-sky-light': '#EAF7FD',
        
        'petuno-mint': '#35B779',
        'petuno-mint-light': '#EAF9F2',
        
        'petuno-amber': '#F4B942',
        'petuno-amber-light': '#FFF8E7',
        
        'petuno-coral': '#E85D5D',
        'petuno-coral-light': '#FDEEEE',
        
        'petuno-text': '#1F2937',
        'petuno-secondary-text': '#667085',
        'petuno-muted': '#98A2B3',
        'petuno-border': '#E4E7EC',
        'petuno-background': '#F8FAFC',
        'petuno-surface': '#FFFFFF',
        
        // Dark mode colors
        'dark-background': '#0F1020',
        'dark-surface': '#18192B',
        'dark-surface-elevated': '#202238',
        'dark-text': '#F8FAFC',
        'dark-secondary-text': '#B5B8C9',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

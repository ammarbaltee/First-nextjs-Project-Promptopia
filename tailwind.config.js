/** @type {import('tailwindcss').Config} */
export const content = [
  './pages/**/*.{js,ts,jsx,tsx,mdx}',
  './components/**/*.{js,ts,jsx,tsx,mdx}',
  './app/**/*.{js,ts,jsx,tsx,mdx}',
];
export const theme = {
  extend: {
    fontFamily: {
      satoshi: ['Satoshi', 'sans-serif'],
      inter: ['Inter', 'sans-serif'],
    },
    colors: {
      'primary-orange': '#FF5722',
      'nav-border': '#EBEAEA',
      'light-white': '#FAFAFB',
      'light-white-100': '#F1F4F5',
      'light-white-200': '#d7d7d7',
      'light-white-300': '#F3F3F4',
      'light-white-400': '#E2E5F1',
      'light-white-500': '#E4E4E4',
      gray: '#4D4A4A',
      'gray-50': '#D9D9D9',
      'gray-100': '#3d3d4e',
      'black-100': '#252525',
      'primary-purple': '#9747FF',
      // Adding gray-200 for border color
      'gray-200': '#E5E7EB', // This is the default Tailwind gray-200 color
      'gray-300': '#D1D5DB', 
      'gray-400': '#9CA3AF', 
      'gray-500': '#6B7280', // added to match text-gray-500
      // Adding gray-600 to the custom colors
      'gray-600': '#4B5563', // This is the default Tailwind gray-600 color
      'gray-700': '#374151', // added to match text-gray-700
    },
    boxShadow: {
      menu: '0px 159px 95px rgba(13,12,34,0.01), 0px 71px 71px rgba(13,12,34,0.02), 0px 18px 39px rgba(13,12,34,0.02), 0px 0px 0px rgba(13,12,34,0.02)',
    },
    screens: {
      'xs': '400px',
    },
    maxWidth: {
      '10xl': '1680px',
    },
  },
};
export const plugins = [];

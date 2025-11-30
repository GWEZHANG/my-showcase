/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 自定义深色背景系
        dark: {
          900: '#0a0a0a', // 页面背景
          800: '#171717', // 卡片背景
          700: '#262626', // 边框颜色
        }
      },
      animation: {
        'blob': 'blob 7s infinite', // 背景光球动画
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        shimmer: {
                '100%': { transform: 'translateX(100%)' },
        }
      }
    },
  },
  plugins: [],
}
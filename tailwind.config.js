// 10px 단위를 1rem으로 변환하여 계산
const generateRemTable = (max) => {
  const result = {};
  for (let i = 0; i <= max; i++) {
    result[i] = `${i / 10}rem`;
  }
  return result;
};

const rem1000 = generateRemTable(1000);

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: rem1000,
      fontSize: rem1000,
      lineHeight: rem1000,
      borderRadius: rem1000,
      borderWidth: rem1000,
      minWidth: rem1000,
      maxWidth: rem1000,
      minHeight: rem1000,
      maxHeight: rem1000,
      boxShadow: {
        basic: 'var(--shadow-primary)',
      },
      colors: {
        black: 'var(--color-black)',
        white: 'var(--color-white)',
        gray: {
          50: 'var(--color-gray-50)',
          100: 'var(--color-gray-100)',
          150: 'var(--color-gray-150)',
          200: 'var(--color-gray-200)',
          300: 'var(--color-gray-300)',
          400: 'var(--color-gray-400)',
          500: 'var(--color-gray-500)',
          600: 'var(--color-gray-600)',
          700: 'var(--color-gray-700)',
          800: 'var(--color-gray-800)',
          900: 'var(--color-gray-900)',
        },
        primary: {
          0: 'var(--color-primary-0)',
          50: 'var(--color-primary-50)',
          200: 'var(--color-primary-200)',
          400: 'var(--color-primary-400)',
          main: 'var(--color-primary-main)',
          800: 'var(--color-primary-800)',
        },
        secondary: {
          50: 'var(--color-secondary-50)',
          100: 'var(--color-secondary-100)',
          200: 'var(--color-secondary-200)',
          300: 'var(--color-secondary-300)',
          500: 'var(--color-secondary-500)',
          700: 'var(--color-secondary-700)',
        },
        btn: {
          gray: {
            base: 'var(--color-gray-300)',
            hover: 'var(--color-gray-500)',
            active: 'var(--color-gray-100)',
          },
          blue: {
            base: 'var(--color-primary-400)',
            hover: 'var(--color-primary-main)',
            active: 'var(--color-white)',
          },
        },
      },
    },
  },
  plugins: [],
};

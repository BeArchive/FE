// 10px 단위를 1rem으로 변환하여 계산
const generateRemTable = (max) => {
  const result = {};
  for (let i = 0; i <= max; i++) {
    result[i] = `${i / 10}rem`;
  }
  return result;
};

const rem1440 = generateRemTable(1440);

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: rem1440,
      fontSize: rem1440,
      lineHeight: rem1440,
      borderRadius: rem1440,
      borderWidth: rem1440,
      minWidth: rem1440,
      maxWidth: rem1440,
      minHeight: rem1440,
      maxHeight: rem1440,
      boxShadow: {
        basic: 'var(--shadow-primary)',
        sub: 'var(--shadow-second)',
        icon: 'var(--shadow-icon)',
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

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
    },
  },
  plugins: [],
};

import { useState, useEffect } from 'react';

// AI의 응답이 오기 전 "생각 퍼즐 맞추는 중..."의 "..."
const useThinkingDots = (active) => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    if (!active) return;

    const interval = setInterval(() => {
      setDots((prev) => (prev === '...' ? '' : prev + '.'));
    }, 500);

    return () => clearInterval(interval);
  }, [active]);

  return dots;
};

export default useThinkingDots;

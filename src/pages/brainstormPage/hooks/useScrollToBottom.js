import { useEffect, useRef } from 'react';

// 요소의 스크롤을 하단으로 자동 이동시키는 훅
export const useScrollToBottom = (dependency) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [dependency]);

  return scrollRef;
};

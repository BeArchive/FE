import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export const useInfiniteScroll = ({ hasNextPage, fetchNextPage }) => {
  const { ref, inView } = useInView({
    threshold: 0, // 요소가 조금이라도 보이면 감지
  });

  useEffect(() => {
    // 요소가 화면에 보이고, 다음 페이지가 있을 때만 호출
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return ref;
};

import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import * as noteApi from '../../../../apis/noteApi';
import { useNoteStore } from '../../../../store/useNoteStore';

export const useNoteQuery = () => {
  const { selectedNote } = useNoteStore();
  const selectedId = selectedNote?.data?.id;

  // 노트 목록 조회 (무한 스크롤)
  const listQuery = useInfiniteQuery({
    queryKey: ['notes'],
    queryFn: ({ pageParam = null }) => noteApi.getNoteList({ cursor: pageParam, limit: 10 }),
    getNextPageParam: (lastPage) => (lastPage.data.hasNext ? lastPage.data.nextCursor : undefined),
  });

  // 노트 상세 조회
  const detailQuery = useQuery({
    queryKey: ['note', selectedId],
    queryFn: () => noteApi.getNoteDetail(selectedId),
    enabled: !!selectedId, // ID가 없으면 실행하지 않음
  });

  return {
    notes: listQuery.data?.pages.flatMap((page) => page.data.notes) || [],
    hasNext: listQuery.hasNextPage,
    getNextPage: listQuery.fetchNextPage,
    isLoading: listQuery.isLoading,

    noteDetail: detailQuery.data?.data,
    isDetailLoading: detailQuery.isLoading,
  };
};

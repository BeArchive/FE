import { create } from 'zustand';

export const VIEW_TYPE = {
  LIST: 'list',
  DETAIL: 'detail',
};

// 브레인스토밍 노트 전역 상태 관리
export const useNoteStore = create((set) => ({
  notes: [
    {
      data: {
        id: 1,
        title: '가나다라마바사가나다라마바사가나',
        category: '개발',
        memo: '테스트 내용입니다',
        updatedAt: '2026-01-15',
      },
    },
  ], // 전체 노트
  view: VIEW_TYPE.LIST, // 현재 화면
  selectedNote: null, // 상세 페이지에서 보여줄 선택된 노트 데이터

  // 화면 전환
  setView: (view) => set({ view }),

  // 상세 페이지에서 보여줄 노트 데이터 설정
  setSelectedNote: (note) => set({ selectedNote: note }),

  // 노트 삭제
  deleteNote: (id) =>
    set((state) => ({
      notes: state.notes.filter((n) => n.data.id !== id),
    })),

  // 초기화
  resetSelectedNote: () => set({ selectedNote: null }),

  // 초기 데이터 로드
  setNotes: (notes) => set({ notes }),
}));

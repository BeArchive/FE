import { create } from 'zustand';

export const VIEW_TYPE = {
  LIST: 'list',
  DETAIL: 'detail',
};

// 브레인스토밍 노트 전역 상태 관리
export const useNoteStore = create((set) => ({
  view: VIEW_TYPE.LIST, // 현재 화면
  selectedNote: null, // 상세 페이지에서 보여줄 선택된 노트 데이터
  tempNote: { title: '', category: '', content: '' }, // 입력 중인 임시 데이터

  // 화면 전환
  setView: (view) => set({ view }),

  // 상세 페이지에서 보여줄 노트 데이터 설정
  setSelectedNote: (note) =>
    set({
      selectedNote: note,
      tempNote: {
        title: note?.data?.title || '',
        category: note?.data?.category || '',
        content: note?.data?.memo || '',
      },
    }),

  // 임시 데이터 업데이트
  setTempNote: (field, value) =>
    set((state) => ({
      tempNote: { ...state.tempNote, [field]: value },
    })),

  // 초기화
  resetSelectedNote: () =>
    set({
      selectedNote: null,
      tempNote: { title: '', category: '', content: '' },
    }),
}));

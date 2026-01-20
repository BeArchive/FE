import { create } from 'zustand';
import * as noteApi from '../apis/noteApi';

export const VIEW_TYPE = {
  LIST: 'list',
  DETAIL: 'detail',
};

// 브레인스토밍 노트 전역 상태 관리
export const useNoteStore = create((set, get) => ({
  notes: [], // 전체 노트
  view: VIEW_TYPE.LIST, // 현재 화면
  selectedNote: null, // 상세 페이지에서 보여줄 선택된 노트 데이터

  // 화면 전환
  setView: (view) => set({ view }),

  // 상세 페이지에서 보여줄 노트 데이터 설정
  setSelectedNote: (note) => set({ selectedNote: note }),

  // 초기화
  resetSelectedNote: () => set({ selectedNote: null }),

  // 초기 데이터 로드
  fetchNotes: async () => {
    try {
      const response = await noteApi.getNoteList({ limit: 10 });
      if (response.isSuccess) {
        const formattedNotes = response.data.notes.map((n) => ({ data: n }));
        set({ notes: formattedNotes });
      }
    } catch (error) {
      console.error('노트 목록 로드 실패:', error);
    }
  },

  // 노트 삭제
  deleteNote: async (id) => {
    try {
      const response = await noteApi.deleteNote(id);
      if (response.isSuccess) {
        set((state) => ({
          notes: state.notes.filter((n) => n.data.id !== id),
        }));
      }
    } catch (error) {
      console.error('노트 삭제 실패:', error);
    }
  },

  // 노트 저장/수정
  saveNote: async (saveData) => {
    const currentId = saveData.id;

    try {
      let response;
      if (currentId) {
        // 수정 모드 (PATCH)
        response = await noteApi.updateNote(currentId, {
          title: saveData.title,
          category: saveData.category,
          memo: saveData.memo,
        });
      } else {
        // 생성 모드 (POST)
        response = await noteApi.createNote({
          title: saveData.title,
          category: saveData.category,
          memo: saveData.memo,
        });
      }

      if (response.isSuccess) {
        // 저장 성공 후 목록 최신화
        await get().fetchNotes();
        set({ selectedNote: null });
      }
    } catch (error) {
      console.error('노트 저장 실패:', error);
    }
  },
}));

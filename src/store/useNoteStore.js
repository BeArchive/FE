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

  // 초기 데이터 로드
  fetchNotes: async (cursor = null) => {
    const { isLoading, notes } = get();

    if (isLoading) return;

    set({ isLoading: true });
    try {
      const response = await noteApi.getNoteList({
        cursor: cursor,
        limit: 10,
      });

      if (response.isSuccess) {
        const newNotes = response.data.notes.map((n) => ({ data: n }));

        set({
          notes: cursor ? [...notes, ...newNotes] : newNotes,
          nextCursor: response.data.nextCursor,
          hasNext: response.data.hasNext,
        });
      }
    } catch (error) {
      console.error('노트 목록 로드 실패:', error);
    } finally {
      set({ isLoading: false });
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
  saveNote: async () => {
    const { tempNote, selectedNote, fetchNotes } = get();
    const currentId = selectedNote?.data?.id;

    // 변경사항 및 내용 유무 체크
    const hasContent = tempNote.title.trim() || tempNote.category.trim() || tempNote.content.trim();
    if (!hasContent) {
      set({ view: VIEW_TYPE.LIST, selectedNote: null });
      return;
    }

    try {
      let response;
      if (currentId) {
        // 수정 모드 (PATCH)
        response = await noteApi.updateNote(currentId, {
          title: tempNote.title.trim() || '제목 없음',
          category: tempNote.category.trim() || '미분류',
          memo: tempNote.content,
        });
      } else {
        // 생성 모드 (POST)
        response = await noteApi.createNote({
          title: tempNote.title.trim() || '제목 없음',
          category: tempNote.category.trim() || '미분류',
          memo: tempNote.content,
        });
      }

      if (response.isSuccess) {
        // 저장 성공 후 목록 최신화 및 리스트로 이동
        await fetchNotes();
        set({ selectedNote: null, view: VIEW_TYPE.LIST });
      }
    } catch (error) {
      if (error.response?.status === 409) {
        alert('이미 존재하는 제목입니다.');
      } else {
        console.error('노트 저장 실패:', error);
      }
    }
  },
}));

import { create } from 'zustand';

export const useNoteStore = create((set, get) => ({
  // 폴더별 노트 상태
  notesByFolder: {}, // { [folderId]: [{ id, name, url, date }...] }

  // 노트 조회
  getNotes: (folderId) => {
    const state = get();
    return state.notesByFolder[folderId] || [];
  },

  // 노트 추가
  addNotes: (folderId, notes) => {
    const state = get();
    const existing = state.notesByFolder[folderId] || [];
    // notes는 이미 { id, name, url, date } 형태로 전달됨
    set({
      notesByFolder: {
        ...state.notesByFolder,
        [folderId]: [...existing, ...notes],
      },
    });
  },

  // 노트 삭제
  deleteNote: (folderId, noteId) => {
    const state = get();
    const existing = state.notesByFolder[folderId] || [];
    set({
      notesByFolder: {
        ...state.notesByFolder,
        [folderId]: existing.filter((n) => n.id !== noteId),
      },
    });
  },

  // 폴더 삭제 시 해당 폴더의 노트도 삭제
  clearFolderNotes: (folderId) => {
    const state = get();
    const { [folderId]: _, ...rest } = state.notesByFolder;
    set({ notesByFolder: rest });
  },
}));

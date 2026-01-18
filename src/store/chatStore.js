import { create } from 'zustand';

const EMPTY_CHATS = []; // 빈 배열 고정 참조

export const useChatStore = create((set, get) => ({
  // 폴더별 채팅 상태
  chatsByFolder: {}, // { [folderId]: [{ id, name, url, date }...] }

  // 채팅 조회
  getChats: (folderId) => {
    const state = get();
    return state.chatsByFolder[folderId] ?? EMPTY_CHATS;
  },

  // 채팅 추가
  addChats: (folderId, chats) => {
    const state = get();
    const existing = state.chatsByFolder[folderId] ?? EMPTY_CHATS;
    // chats는 이미 { id, name, url, date } 형태로 전달됨
    set({
      chatsByFolder: {
        ...state.chatsByFolder,
        [folderId]: [...existing, ...chats],
      },
    });
  },

  // 채팅 삭제
  deleteChat: (folderId, chatId) => {
    const state = get();
    const existing = state.chatsByFolder[folderId] ?? EMPTY_CHATS;
    set({
      chatsByFolder: {
        ...state.chatsByFolder,
        [folderId]: existing.filter((c) => c.id !== chatId),
      },
    });
  },

  // 폴더 삭제 시 해당 폴더의 채팅도 삭제
  clearFolderChats: (folderId) => {
    const state = get();
    const { [folderId]: _, ...rest } = state.chatsByFolder;
    set({ chatsByFolder: rest });
  },
}));

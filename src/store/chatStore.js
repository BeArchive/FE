import { create } from 'zustand';
import { getChatRoomsByFolder } from '../apis/chatApi';
import { getFormattedDate } from '../utils/date';

const EMPTY_CHATS = []; // 빈 배열 고정 참조

export const useChatStore = create((set, get) => ({
  // 폴더별 채팅 상태
  chatsByFolder: {},

  // 채팅 조회
  getChats: (folderId) => get().chatsByFolder[folderId] ?? EMPTY_CHATS,

  // 분류된 채팅방 폴더별 조회
  fetchChatsByFolder: async (folderId) => {
    if (folderId == null || Number.isNaN(folderId)) return;

    try {
      const data = await getChatRoomsByFolder(folderId);
      const formatted = data.map((chat) => ({
        id: chat.chatRoomId,
        name: chat.title,
        date: getFormattedDate(chat.updatedAt),
      }));

      set((state) => ({
        chatsByFolder: {
          ...state.chatsByFolder,
          [folderId]: formatted,
        },
      }));
    } catch (e) {
      console.error('폴더별 채팅방 조회 실패:', e);
    }
  },

  // 채팅 추가
  addChats: (folderId, chats) => {
    const state = get();
    const existing = state.chatsByFolder[folderId] ?? EMPTY_CHATS;
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

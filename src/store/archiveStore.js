import { create } from 'zustand';

const initialFolders = [];

const getNextFolderNumber = (folderNames) => {
  let count = 0;
  let newName = '새폴더';

  while (folderNames.includes(newName)) {
    count++;
    newName = `새폴더(${count})`;
  }

  return newName;
};

export const useArchiveStore = create((set, get) => ({
  // 폴더 상태
  folders: initialFolders,
  activeFolderId: null,
  hoveredFolderId: null,
  editingFolderId: null,
  // isLoading: false, // 필요 시 로딩 상태 관리용

  // 모달 상태
  modal: {
    isOpen: false,
    variant: 'default', // 'default', 'delete', 'duplicate'
    data: null,
  },

  // 폴더 상태 설정자
  setFolders: (folders) => set({ folders }),
  setActiveFolderId: (id) => set({ activeFolderId: id }),
  setHoveredFolderId: (id) => set({ hoveredFolderId: id }),
  setEditingFolderId: (id) => set({ editingFolderId: id }),
  // setIsLoading: (isLoading) => set({ isLoading }), // 필요 시 로딩 상태 관리용

  // 폴더 액션
  deleteFolder: (folderId) => {
    const state = get();
    set({
      folders: state.folders.filter((f) => f.id !== folderId),
    });
  },

  updateFolderName: (folderId, newName) => {
    const state = get();
    set({
      folders: state.folders.map((f) => (f.id === folderId ? { ...f, name: newName } : f)),
    });
  },

  isDuplicateName: (name) => {
    const state = get();
    return state.folders.some((f) => f.name === name);
  },

  getNewFolderName: () => {
    const state = get();
    const folderNames = state.folders.map((f) => f.name);
    return getNextFolderNumber(folderNames);
  },

  getFolderStyle: (folderId) => {
    const state = get();
    if (state.editingFolderId === folderId) {
      return 'bg-gray-50';
    }
    if (state.activeFolderId === folderId) {
      return 'bg-primary-50';
    }
    if (state.hoveredFolderId === folderId) {
      return 'bg-primary-0';
    }
    return 'bg-transparent';
  },

  // 모달 액션
  openModal: (variant, data) =>
    set({
      modal: {
        isOpen: true,
        variant,
        data,
      },
    }),

  closeModal: () =>
    set({
      modal: {
        isOpen: false,
        variant: 'default',
        data: null,
      },
    }),
}));

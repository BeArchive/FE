import { useState } from 'react';
import { useNoteStore } from '../../../store/noteStore';

export function useChatActions(folderId, onAfterDelete) {
  const addNotes = useNoteStore((state) => state.addNotes);
  const deleteNote = useNoteStore((state) => state.deleteNote);

  const [openUpload, setOpenUpload] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [chatToDelete, setChatToDelete] = useState(null);

  // 업로드 시 채팅 추가
  const handleUpload = (chats) => {
    addNotes(folderId, chats);
    setOpenUpload(false);
  };

  // 삭제 모달 열기
  const openDeleteModal = (chat) => {
    setChatToDelete(chat);
    setDeleteModalOpen(true);
  };

  // 채팅 삭제
  const confirmDelete = () => {
    if (chatToDelete) {
      deleteNote(folderId, chatToDelete.id);
      if (onAfterDelete) onAfterDelete(chatToDelete.id);
      closeDeleteModal();
    }
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setChatToDelete(null);
  };

  return {
    modals: {
      upload: { open: openUpload, setOpen: setOpenUpload, handle: handleUpload },
      delete: {
        open: deleteModalOpen,
        chat: chatToDelete,
        openModal: openDeleteModal,
        confirm: confirmDelete,
        close: closeDeleteModal,
      },
    },
  };
}

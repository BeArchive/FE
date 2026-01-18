import { useState } from 'react';
import { useChatStore } from '../../../store/chatStore';

export function useChatActions(folderId, onAfterDelete) {
  const addChats = useChatStore((state) => state.addChats);
  const deleteChat = useChatStore((state) => state.deleteChat);

  const [openUpload, setOpenUpload] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [chatToDelete, setChatToDelete] = useState(null);

  // 업로드 시 채팅 추가
  const handleUpload = (chats) => {
    addChats(folderId, chats);
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
      deleteChat(folderId, chatToDelete.id);
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

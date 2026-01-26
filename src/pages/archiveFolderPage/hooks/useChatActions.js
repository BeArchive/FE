import { useState } from 'react';
import { useChatStore } from '../../../store/chatStore';
import { deleteChatRoom } from '../../../apis/chatApi';

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
  const confirmDelete = async () => {
    if (chatToDelete) {
      try {
        await deleteChatRoom(chatToDelete.id);
        deleteChat(folderId, chatToDelete.id);
        if (onAfterDelete) onAfterDelete(chatToDelete.id);
      } catch (error) {
        console.error('채팅방 삭제 실패:', error);
        alert('채팅방 삭제에 실패했습니다. 다시 시도해주세요.');
      } finally {
        closeDeleteModal();
      }
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

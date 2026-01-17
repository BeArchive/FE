import { useState } from 'react';
import { useNoteStore } from '../../../store/noteStore';

export function useNoteActions(folderId, onAfterDelete) {
  const addNotes = useNoteStore((state) => state.addNotes);
  const deleteNote = useNoteStore((state) => state.deleteNote);

  const [openUpload, setOpenUpload] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);

  // 업로드 시 노트 추가
  const handleUpload = (notes) => {
    addNotes(folderId, notes);
    setOpenUpload(false);
  };

  // 삭제 모달 열기
  const openDeleteModal = (note) => {
    setNoteToDelete(note);
    setDeleteModalOpen(true);
  };

  // 노트 삭제
  const confirmDelete = () => {
    if (noteToDelete) {
      deleteNote(folderId, noteToDelete.id);
      if (onAfterDelete) onAfterDelete(noteToDelete.id);
      closeDeleteModal();
    }
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setNoteToDelete(null);
  };

  return {
    modals: {
      upload: { open: openUpload, setOpen: setOpenUpload, handle: handleUpload },
      delete: {
        open: deleteModalOpen,
        note: noteToDelete,
        openModal: openDeleteModal,
        confirm: confirmDelete,
        close: closeDeleteModal,
      },
    },
  };
}

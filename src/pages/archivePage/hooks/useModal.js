import { useShallow } from 'zustand/react/shallow';
import { useArchiveStore } from '../store/archiveStore';

export const useModal = () =>
  useArchiveStore(
    useShallow((state) => ({
      isOpen: state.modal.isOpen,
      variant: state.modal.variant,
      data: state.modal.data,
      openModal: state.openModal,
      closeModal: state.closeModal,
    })),
  );

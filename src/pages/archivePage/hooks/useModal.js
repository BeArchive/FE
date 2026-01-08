import { useState } from 'react';

export const useModal = () => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    variant: 'default', // 'delete' | 'duplicate'
    data: '', // 폴더 이름 등 전달할 데이터
  });

  const openModal = (variant, data = '') => {
    setModalState({ isOpen: true, variant, data });
  };

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  return { ...modalState, openModal, closeModal };
};

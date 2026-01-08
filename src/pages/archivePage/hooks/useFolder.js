import { useState } from 'react';

export const useFolder = (initialFolders = []) => {
  // 데이터 상태
  const [folders, setFolders] = useState(initialFolders);

  // UI 상태
  const [activeFolderId, setActiveFolderId] = useState(null);
  const [hoveredFolderId, setHoveredFolderId] = useState(null);
  const [editingFolderId, setEditingFolderId] = useState(null);

  // 스타일 계산 로직
  const getFolderStyle = (folderId) => {
    if (editingFolderId === folderId) return 'bg-gray-50';
    if (activeFolderId === folderId) return 'bg-primary-50';
    if (hoveredFolderId === folderId) return 'bg-primary-0';
    return 'bg-transparent';
  };

  // 폴더 삭제 로직
  const deleteFolder = (folderName) => {
    setFolders((prev) => prev.filter((f) => f.name !== folderName));
  };

  // 중복 체크 로직
  const isDuplicateName = (name) => {
    return folders.some((f) => f.name === name);
  };

  return {
    // 상태 값
    folders,
    activeFolderId,
    hoveredFolderId,
    editingFolderId,

    // 상태 변경 함수
    setFolders,
    setActiveFolderId,
    setHoveredFolderId,
    setEditingFolderId,

    // 비즈니스 로직
    getFolderStyle,
    deleteFolder,
    isDuplicateName,
  };
};

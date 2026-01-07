import { useState } from 'react';

// 폴더 상태 관리 커스텀 훅
export const useFolderState = () => {
  const [activeFolderId, setActiveFolderId] = useState(null);
  const [hoveredFolderId, setHoveredFolderId] = useState(null);
  const [editingFolderId, setEditingFolderId] = useState(null);

  const getStyles = (folder, isEditing) => {
    const isActive = activeFolderId === folder.id;
    const isHovered = hoveredFolderId === folder.id;

    if (isEditing) return 'bg-gray-50';
    if (isActive) return 'bg-primary-50';
    if (isHovered) return 'bg-primary-0';
    return 'bg-transparent';
  };

  return {
    activeFolderId,
    setActiveFolderId,
    hoveredFolderId,
    setHoveredFolderId,
    editingFolderId,
    setEditingFolderId,
    getStyles,
  };
};

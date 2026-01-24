import { arrayMove } from '@dnd-kit/sortable';
import { useArchiveStore } from '../../../store/archiveStore';
import { reorderFolders } from '../../../apis/folderApi';

// 폴더 드래그 앤 드롭 훅
export const useFolderDnd = () => {
  const { folders, setFolders } = useArchiveStore();

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = folders.findIndex((f) => f.id === active.id);
    const newIndex = folders.findIndex((f) => f.id === over.id);
    const prev = folders;

    const updatedFolders = arrayMove(prev, oldIndex, newIndex).map((folder, index) => ({
      ...folder,
      folderOrder: index,
    }));
    setFolders(updatedFolders);

    try {
      await reorderFolders(active.id, newIndex);
    } catch (e) {
      setFolders(prev);
      console.error('폴더 순서 변경 실패:', e);
    }
  };

  return { handleDragEnd };
};

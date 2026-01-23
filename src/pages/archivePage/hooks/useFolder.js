import { useShallow } from 'zustand/react/shallow';
import { useArchiveStore } from '../../../store/archiveStore';

export const useFolder = () =>
  useArchiveStore(
    useShallow((state) => ({
      folders: state.folders,
      activeFolderId: state.activeFolderId,
      hoveredFolderId: state.hoveredFolderId,
      editingFolderId: state.editingFolderId,
      setFolders: state.setFolders,
      setActiveFolderId: state.setActiveFolderId,
      setHoveredFolderId: state.setHoveredFolderId,
      setEditingFolderId: state.setEditingFolderId,
      getFolderStyle: state.getFolderStyle,
      deleteFolder: state.deleteFolder,
      isDuplicateName: state.isDuplicateName,
      getNewFolderName: state.getNewFolderName,
      updateFolderName: state.updateFolderName,
    })),
  );

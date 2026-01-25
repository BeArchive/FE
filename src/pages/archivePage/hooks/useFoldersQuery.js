import { useEffect } from 'react';
import { useArchiveStore } from '../../../store/archiveStore';
import { getFolders } from '../../../apis/folderApi';

export const useFoldersQuery = () => {
  const { folders, setFolders } = useArchiveStore();

  useEffect(() => {
    const loadFolders = async () => {
      try {
        const folderList = await getFolders();

        const formattedFolders = folderList.map((folder) => ({
          id: folder.folderId,
          name: folder.folderName,
          folderOrder: folder.folderOrder,
        }));

        setFolders(formattedFolders);
      } catch (error) {
        console.error('폴더 조회 실패:', error);
      }
    };

    loadFolders();
  }, [setFolders]);

  return { folders };
};

import { defaultInstance } from './utils/instance';

const FOLDER_PATH = '/folders';

// 폴더 생성 (POST)
export const createFolder = async (folderName) => {
  const response = await defaultInstance.post(FOLDER_PATH, { folderName });
  return response.data.data;
};

// 폴더 조회 (GET)
export const getFolders = async () => {
  const response = await defaultInstance.get(FOLDER_PATH);
  return response.data.data;
};

// 폴더명 수정 (PATCH)
export const updateFolderName = async (folderId, folderName) => {
  const response = await defaultInstance.patch(`${FOLDER_PATH}/${folderId}/name`, { folderName });
  return response.data;
};

// 폴더 순서 변경 (PATCH)
export const reorderFolders = async (folderId, folderOrderAfter) => {
  const response = await defaultInstance.patch(`${FOLDER_PATH}/${folderId}/order`, {
    folderOrderAfter,
  });
  return response.data;
};

// 폴더 삭제 (DELETE)
export const deleteFolder = async (folderId) => {
  const response = await defaultInstance.delete(`${FOLDER_PATH}/${folderId}`);
  return response.data;
};

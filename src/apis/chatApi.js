import { defaultInstance, multiInstance } from './utils/instance';

const CHAT_PATH = '/chat-rooms';

// ===== 첫 대화 시작 및 채팅방 생성 (POST)
export const createChatRoom = async (initialPrompt, files = []) => {
  // 1. 파일이 있는 경우: multiInstance
  if (files.length > 0) {
    const formData = new FormData();
    formData.append('initialPrompt', initialPrompt);

    files.forEach((fileObj) => {
      formData.append('files', fileObj.file);
    });

    const response = await multiInstance.post(CHAT_PATH, formData);
    return response.data;
  }

  // 2. 파일이 없는 경우: defaultInstance
  const response = await defaultInstance.post(CHAT_PATH, {
    initialPrompt,
  });

  return response.data;
};

// ===== 메시지 전송 (POST)
export const sendChatMessage = async (chatRoomId, content, files = []) => {
  const id = Number(chatRoomId);
  const path = `${CHAT_PATH}/${id}/messages`;

  // 1. 파일이 있는 경우: multiInstance
  if (files.length > 0) {
    const formData = new FormData();
    formData.append('content', content);

    files.forEach((fileObj) => {
      formData.append('files', fileObj.file);
    });

    const response = await multiInstance.post(path, formData);
    return response.data;
  }

  // 2. 파일이 없는 경우: defaultInstance
  const response = await defaultInstance.post(path, { content });
  return response.data;
};

// ===== 대화 모드 변경 (POST)
export const changeChatMode = async (chatRoomId, mode) => {
  const response = await defaultInstance.patch(`${CHAT_PATH}/${chatRoomId}/mode`, {
    mode,
  });
  return response.data;
};

// ===== 분류된 채팅방 폴더별 조회 (GET)
export const getChatRoomsByFolder = async (folderId) => {
  const response = await defaultInstance.get(`${CHAT_PATH}/folder/${folderId}`);
  return response.data.data;
};

// ===== 분류되지 않은 채팅방 조회 (GET)
export const getUnassignedChatRooms = async () => {
  const response = await defaultInstance.get(`${CHAT_PATH}/unassigned`);
  return response.data.data;
};
// ===== 대화 내역 조회 (GET)
export const getChatMessages = async (chatRoomId) => {
  const response = await defaultInstance.get(`${CHAT_PATH}/${chatRoomId}/messages`);
  return response.data.data;
};

// ===== 채팅방을 폴더에 업로드 (PATCH)
export const assignChatRoomToFolder = async (chatRoomId, folderId) => {
  const response = await defaultInstance.patch(`${CHAT_PATH}/${chatRoomId}/folder`, {
    folderId,
  });
  return response.data;
};

// ===== 채팅방 삭제 (DELETE)
export const deleteChatRoom = async (chatRoomId) => {
  const response = await defaultInstance.delete(`${CHAT_PATH}/${chatRoomId}`);
  return response.data;
};

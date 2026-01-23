import { defaultInstance, multiInstance } from './utils/instance';

const CHAT_PATH = '/chat-rooms';

// 첫 대화 시작 및 채팅방 생성 (POST)
export const createChatRoom = async (initialPrompt, files = []) => {
  // 1. 파일이 있는 경우: multiInstance
  if (files.length > 0) {
    const formData = new FormData();
    formData.append('initialPrompt', initialPrompt);

    files.forEach((fileObj) => {
      console.log('Sending file:', fileObj.file);
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

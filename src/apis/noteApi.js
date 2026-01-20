import { defaultInstance } from './utils/instance';

const NOTE_PATH = '/notes';

// 노트 생성 (POST)
export const createNote = async (data) => {
  const response = await defaultInstance.post(NOTE_PATH, data);
  return response.data;
};

// 모든 노트 조회 (GET): cursor 기반 페이지네이션
export const getNoteList = async ({ cursor, limit } = {}) => {
  const response = await defaultInstance.get(NOTE_PATH, {
    params: {
      cursor, // undefined나 null이면 자동으로 쿼리에서 제외
      limit,
    },
  });
  return response.data;
};

// 노트 상세 조회 (GET)
export const getNoteDetail = async (noteId) => {
  const response = await defaultInstance.get(`${NOTE_PATH}/${noteId}`);
  return response.data;
};

// 노트 수정 (PATCH)
export const updateNote = async (noteId, data) => {
  const response = await defaultInstance.patch(`${NOTE_PATH}/${noteId}`, data);
  return response.data;
};

// 노트 삭제 (DELETE)
export const deleteNote = async (noteId) => {
  const response = await defaultInstance.delete(`${NOTE_PATH}/${noteId}`);
  return response.data;
};

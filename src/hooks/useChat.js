import { useState, useCallback, useReducer } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createChatRoom } from '../apis/chatApi';

// 메시지 상태 변화 로직 Reducer
const messageReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return [
        ...state,
        {
          type: action.payload.type,
          content: action.payload.content,
          files: action.payload.files || [],
        },
      ];
    case 'SET_MESSAGES':
      return action.payload;
    case 'CLEAR_MESSAGES':
      return [];
    default:
      return state;
  }
};

export const useChat = () => {
  const [messages, dispatch] = useReducer(messageReducer, []);
  const [, /*chatRoomId*/ setChatRoomId] = useState(null);
  const [isThinking, setIsThinking] = useState(false);

  // 채팅방 초기 생성
  const createRoomMutation = useMutation({
    mutationFn: ({ prompt, files }) => createChatRoom(prompt, files),
    onSuccess: (response) => {
      const { data } = response;
      setChatRoomId(data.chatRoomId);

      const aiAnswer = data.firstMessage.answer;
      dispatch({
        type: 'ADD_MESSAGE',
        payload: { type: 'ai', content: aiAnswer },
      });
      setIsThinking(false);
    },
    onError: (error) => {
      console.error('채팅방 생성 실패:', error);
      setIsThinking(false);
    },
  });

  const addMessage = useCallback((type, content, files = []) => {
    dispatch({
      type: 'ADD_MESSAGE',
      payload: { type, content, files },
    });
  }, []);

  // 페이지 진입 시 최초 실행 함수
  const mutateCreateRoom = createRoomMutation.mutate;
  const startNewChat = useCallback(
    (prompt, files) => {
      setIsThinking(true);
      addMessage('user', prompt, files);
      mutateCreateRoom({ prompt, files });
    },
    [addMessage, mutateCreateRoom],
  );

  // 메시지 전송 함수
  const sendNextMessage = useCallback(
    (text, files) => {
      setIsThinking(true);
      addMessage('user', text, files);
      // 구현 예정
    },
    [addMessage],
  );

  return {
    messages,
    isThinking,
    startNewChat,
    sendNextMessage,
  };
};

import { useState, useCallback, useReducer } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createChatRoom, sendChatMessage, changeChatMode, getChatMessages } from '../apis/chatApi';

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
          actionType: action.payload.actionType || 'EXECUTE',
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
  const [chatRoomId, setChatRoomId] = useState(null);
  const [isThinking, setIsThinking] = useState(false);

  // 기존 채팅 내역 조회
  const loadChatHistory = useCallback(async (chatRoomId) => {
    chatRoomId = Number(chatRoomId);
    try {
      setIsThinking(true);
      const list = await getChatMessages(chatRoomId);

      setChatRoomId(chatRoomId);

      const formattedMessages = list.map((msg) => ({
        type: msg.role === 'USER' ? 'user' : 'ai',
        content: msg.content,
        files: msg.hasFiles ? msg.attachments : [],
        actionType: 'EXECUTE',
      }));

      dispatch({ type: 'SET_MESSAGES', payload: formattedMessages });
    } catch (error) {
      console.error('채팅 내역 조회 실패:', error);
    } finally {
      setIsThinking(false);
    }
  }, []);

  // 채팅방 초기 생성
  const createRoomMutation = useMutation({
    mutationFn: ({ prompt, files }) => createChatRoom(prompt, files),
    onSuccess: (response) => {
      const { data } = response;
      setChatRoomId(data.chatRoomId); // 채팅방 ID 저장

      const aiAnswer = data.firstMessage.answer;
      const aiActionType = data.firstMessage.actionType;

      dispatch({
        type: 'ADD_MESSAGE',
        payload: {
          type: 'ai',
          content: aiAnswer,
          actionType: aiActionType,
        },
      });
      setIsThinking(false);
    },
    onError: (error) => {
      console.error('채팅방 생성 실패:', error);
      setIsThinking(false);
    },
  });

  // 메시지 추가 전송
  const sendMessageMutation = useMutation({
    mutationFn: ({ roomId, text, files }) => sendChatMessage(roomId, text, files),
    onSuccess: (response) => {
      const { data } = response;

      dispatch({
        type: 'ADD_MESSAGE',
        payload: {
          type: 'ai',
          content: data.answer,
          actionType: data.actionType,
        },
      });
      setIsThinking(false);
    },
    onError: (error) => {
      console.error('메시지 전송 실패:', error);
      setIsThinking(false);
    },
  });

  // 대화 모드 변경
  const changeModeMutation = useMutation({
    mutationFn: ({ roomId, mode }) => changeChatMode(roomId, mode),
    onSuccess: () => {
      setIsThinking(false);
    },
    onError: (error) => {
      console.error('모드 변경 실패:', error);
      setIsThinking(false);
    },
  });

  const addMessage = useCallback((type, content, files = [], actionType = 'EXECUTE') => {
    dispatch({
      type: 'ADD_MESSAGE',
      payload: { type, content, files, actionType },
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
  const mutateSendMessage = sendMessageMutation.mutate;
  const sendNextMessage = useCallback(
    (text, files) => {
      if (!chatRoomId) return console.error('채팅방 ID가 없습니다.');

      setIsThinking(true);
      if (text !== '') {
        addMessage('user', text, files);
      }

      mutateSendMessage({ roomId: chatRoomId, text, files });
    },
    [addMessage, chatRoomId, mutateSendMessage],
  );

  // 모드 변경 함수
  const mutateChangeMode = changeModeMutation.mutateAsync;
  const selectMode = useCallback(
    async (mode) => {
      if (!chatRoomId) return console.error('채팅방 ID가 없습니다.');
      setIsThinking(true);
      return mutateChangeMode({ roomId: chatRoomId, mode });
    },
    [chatRoomId, mutateChangeMode],
  );

  return {
    messages,
    isThinking,
    startNewChat,
    sendNextMessage,
    selectMode,
    addMessage,
    loadChatHistory,
  };
};

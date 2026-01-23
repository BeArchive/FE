import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import MainInput from '../../components/MainInput';
import ChatBubble from './components/ChatBubble';
import useThinkingDots from './hooks/useThinkingDots';
import { createChatRoom } from '../../apis/chatApi';

const BrainstormPage = () => {
  const location = useLocation();
  const { initialPrompt, initialFiles } = location.state || {};

  // 대화 내역 상태 관리
  const [messages, setMessages] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const dots = useThinkingDots(isThinking);

  const isFirstRender = useRef(true); // 초기 API 호출 중복 방지용 플래그

  // 초기 데이터 세팅 및 API 호출
  useEffect(() => {
    if (initialPrompt && isFirstRender.current) {
      isFirstRender.current = false;

      setMessages([
        {
          type: 'user',
          content: initialPrompt,
          files: initialFiles || [],
        },
      ]);
      setIsThinking(true);

      // 채팅방 생성 API 호출
      const initChat = async () => {
        try {
          const response = await createChatRoom(initialPrompt, initialFiles);

          setMessages((prev) => [
            ...prev,
            {
              type: 'ai',
              content: response.data.firstMessage.answer,
            },
          ]);
        } catch (error) {
          console.error('초기 대화 생성 실패:', error);
        } finally {
          setIsThinking(false);
        }
      };

      initChat();
    }
  }, [initialPrompt, initialFiles]);

  // 대화 전송 핸들러
  const handleChatSend = async (text, files) => {
    const userMsg = { type: 'user', content: text, files: files || [] };
    setMessages((prev) => [...prev, userMsg]);

    setIsThinking(true);

    try {
      // 대화 이어가기 API 호출 예정
    } catch (error) {
      console.error('대화 전송 실패:', error);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="relative flex flex-col w-full h-full bg-primary-0">
      <div className="flex-1 flex flex-col gap-50 overflow-y-auto px-85 pt-50 pb-200 custom-scrollbar">
        {messages.map((msg, index) => (
          <ChatBubble key={index} type={msg.type} content={msg.content} files={msg.files} />
        ))}

        {/* AI 로딩 말풍선 */}
        {isThinking && <ChatBubble content={`생각 퍼즐 맞추는 중${dots}`} />}
      </div>

      {/* 입력창 (하단 고정) */}
      <div className="fixed bottom-38 left-0 right-0 flex justify-center z-50 pointer-events-none">
        <div className="pointer-events-auto">
          <MainInput onSend={handleChatSend} />
        </div>
      </div>
    </div>
  );
};

export default BrainstormPage;

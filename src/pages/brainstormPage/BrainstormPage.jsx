import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import MainInput from '../../components/MainInput';
import ChatBubble from './components/ChatBubble';
import useThinkingDots from './hooks/useThinkingDots';
import { useChat } from '../../hooks/useChat';
import { useScrollToBottom } from './hooks/useScrollToBottom';

const BrainstormPage = () => {
  const location = useLocation();
  const { initialPrompt, initialFiles } = location.state || {};

  const { messages, isThinking, startNewChat, sendNextMessage } = useChat();
  const dots = useThinkingDots(isThinking);

  // 자동 스크롤 훅 적용
  const scrollRef = useScrollToBottom(messages);
  const isFirstRender = useRef(true);

  // 초기 데이터 세팅 및 API 호출
  useEffect(() => {
    if (initialPrompt && isFirstRender.current) {
      isFirstRender.current = false;
      startNewChat(initialPrompt, initialFiles);
    }
  }, []);

  return (
    <div className="relative flex flex-col w-full h-full bg-primary-0">
      <div
        ref={scrollRef}
        className="flex-1 flex flex-col gap-50 overflow-y-auto px-85 pt-50 pb-200 custom-scrollbar"
      >
        {messages.map((msg, index) => (
          <ChatBubble key={index} type={msg.type} content={msg.content} files={msg.files} />
        ))}

        {/* AI 로딩 말풍선 */}
        {isThinking && <ChatBubble content={`생각 퍼즐 맞추는 중${dots}`} />}
      </div>

      {/* 입력창 (하단 고정) */}
      <div className="fixed bottom-38 left-0 right-0 flex justify-center z-50 pointer-events-none">
        <div className="pointer-events-auto">
          <MainInput onSend={sendNextMessage} />
        </div>
      </div>
    </div>
  );
};

export default BrainstormPage;

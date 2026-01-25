import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MainInput from '../../components/MainInput';
import ChatBubble from './components/ChatBubble';
import useThinkingDots from './hooks/useThinkingDots';
import { useChat } from '../../hooks/useChat';
import { useScrollToBottom } from './hooks/useScrollToBottom';
import ModeSelector from './components/ModeSelector';
import StepController from './components/StepController';
import { CHAT_STEPS, CHAT_MESSAGES, CHAT_ACTION_TYPES } from '../../constants/chat';

const BrainstormPage = () => {
  const location = useLocation();
  const { initialPrompt, initialFiles } = location.state || {};

  const { messages, isThinking, startNewChat, sendNextMessage, selectMode } = useChat();
  const dots = useThinkingDots(isThinking);

  const [modeStep, setModeStep] = useState(CHAT_STEPS.SELECT);
  const [selectedModeId, setSelectedModeId] = useState(null);

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

  // 모드 선택 핸들러
  const handleModeSelect = async (modeValue) => {
    try {
      console.log('1. 모드 변경 시작:', modeValue);
      await selectMode(modeValue);
      console.log('2. 모드 변경 성공!'); // 이 로그가 찍히는지 확인

      setSelectedModeId(modeValue);
      setModeStep(CHAT_STEPS.CONFIRM);
    } catch (error) {
      console.error('모드 변경 중 에러 발생:', error);
    }
  };

  // "준비 됐어요" 클릭
  const handleConfirm = () => {
    setModeStep(CHAT_STEPS.SELECT);
    sendNextMessage('');
  };

  // "다음에 할게요" 클릭
  const handleCancel = () => {
    setSelectedModeId(null);
    setModeStep(CHAT_STEPS.SELECT);
  };

  return (
    <div className="relative flex flex-col w-full h-full bg-primary-0">
      <div
        ref={scrollRef}
        className="flex-1 flex flex-col gap-50 overflow-y-auto px-85 pt-50 pb-200 custom-scrollbar"
      >
        {messages.map((msg, index) => {
          if (msg.type === 'ai' && msg.actionType === CHAT_ACTION_TYPES.MODE_SELECT) {
            console.log('현재 모드 단계:', modeStep);
            return (
              <div key={index} className="flex flex-col gap-50">
                {/* 단계별 UI 분기 */}
                {modeStep === CHAT_STEPS.SELECT ? (
                  <ModeSelector content={msg.content} onSelect={handleModeSelect} />
                ) : (
                  <StepController
                    modeId={selectedModeId}
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                  />
                )}
              </div>
            );
          }

          // 일반 메시지
          return <ChatBubble key={index} type={msg.type} content={msg.content} files={msg.files} />;
        })}

        {/* AI 로딩 말풍선 */}
        {isThinking && <ChatBubble content={`${CHAT_MESSAGES.THINKING}${dots}`} />}
      </div>

      {/* 입력창 (하단 고정) */}
      <div className="fixed bottom-38 left-0 right-0 flex justify-center z-50 pointer-events-none">
        <div className="pointer-events-auto">
          <MainInput onSend={sendNextMessage} disabled={isThinking} />
        </div>
      </div>
    </div>
  );
};

export default BrainstormPage;

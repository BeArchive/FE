import { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import MainInput from '../../components/MainInput';
import ChatBubble from './components/ChatBubble';
import useThinkingDots from './hooks/useThinkingDots';
import { useChat } from '../../hooks/useChat';
import { useScrollToBottom } from './hooks/useScrollToBottom';
import ModeSelector from './components/ModeSelector';
import StepController from './components/StepController';
import { CHAT_STEPS, CHAT_MESSAGES, CHAT_ACTION_TYPES, CHAT_COMMANDS } from '../../constants/chat';

const BrainstormPage = () => {
  const location = useLocation();
  const { chatId } = useParams();
  const { initialPrompt, initialFiles } = location.state || {};

  const {
    messages,
    isThinking,
    startNewChat,
    sendNextMessage,
    selectMode,
    addMessage,
    loadChatHistory,
  } = useChat();
  const dots = useThinkingDots(isThinking);

  const [modeStep, setModeStep] = useState(CHAT_STEPS.SELECT);
  const [selectedModeId, setSelectedModeId] = useState(null);

  // 자동 스크롤 훅 적용
  const { scrollRef, scrollToBottom } = useScrollToBottom(messages);
  const isFirstRender = useRef(true);

  // 초기 데이터 세팅 및 API 호출
  useEffect(() => {
    if (!isFirstRender.current) return;

    // URL에 chatId가 있으면 기존 채팅 로드
    if (chatId) {
      isFirstRender.current = false;
      loadChatHistory(chatId);
    } else if (initialPrompt) {
      isFirstRender.current = false;
      startNewChat(initialPrompt, initialFiles);
    }
  }, []);

  // 메시지 전송 핸들러
  const handleSendMessage = (text, files) => {
    // '/돌아가기'를 입력했을 경우
    if (text.trim() === CHAT_COMMANDS.RESET_MODE) {
      setSelectedModeId(null);
      setModeStep(CHAT_STEPS.SELECT);

      // 명령어로 돌아갈 때만 새로운 모드 선택 메시지 추가
      addMessage(
        'ai',
        '어떤 방식으로 브레인스토밍을 다시 시작해볼까요?',
        [],
        CHAT_ACTION_TYPES.MODE_SELECT,
      );

      setTimeout(() => scrollToBottom('auto'), 0);
      return;
    }

    sendNextMessage(text, files);
    setTimeout(() => scrollToBottom('auto'), 0);
  };

  // 모드 선택 핸들러
  const handleModeSelect = async (modeValue) => {
    try {
      await selectMode(modeValue);

      setSelectedModeId(modeValue);
      setModeStep(CHAT_STEPS.CONFIRM);

      setTimeout(() => scrollToBottom('auto'), 0);
    } catch (error) {
      console.error('모드 변경 중 에러 발생:', error);
    }
  };

  // "준비 됐어요" 클릭
  const handleConfirm = () => {
    setModeStep(CHAT_STEPS.SELECT);
    sendNextMessage('');
    setTimeout(() => scrollToBottom('auto'), 0);
  };

  // "다음에 할게요" 클릭
  const handleCancel = () => {
    setSelectedModeId(null);
    setModeStep(CHAT_STEPS.SELECT);
  };

  // 가이드 노출 조건
  const lastMessage = messages[messages.length - 1];
  const isGeneralChatting =
    messages.length > 0 && lastMessage?.actionType !== CHAT_ACTION_TYPES.MODE_SELECT && !isThinking;

  return (
    <div className="relative flex flex-col w-full h-full bg-primary-0">
      <div
        ref={scrollRef}
        className="flex-1 flex flex-col gap-50 overflow-y-auto px-85 pt-50 pb-200 custom-scrollbar"
      >
        {messages.map((msg, index) => {
          if (msg.type === 'ai' && msg.actionType === CHAT_ACTION_TYPES.MODE_SELECT) {
            const isLastAction =
              index ===
              messages.findLastIndex((m) => m.actionType === CHAT_ACTION_TYPES.MODE_SELECT);

            if (!isLastAction) {
              return <ChatBubble key={index} type="ai" content={msg.content} />;
            }

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
      <div className="fixed bottom-38 left-0 right-0 flex flex-col items-center z-50 pointer-events-none">
        {isGeneralChatting && (
          <div className="w-[90vw] lg:w-[73.8vw] max-w-1064 pl-40 mb-10 text-left">
            <span className="text-18 font-medium text-secondary-300">
              * 대화중 돌아가고 싶다면, {CHAT_COMMANDS.RESET_MODE}를 입력해주세요.
            </span>
          </div>
        )}
        <div className="pointer-events-auto">
          <MainInput onSend={handleSendMessage} disabled={isThinking} />
        </div>
      </div>
    </div>
  );
};

export default BrainstormPage;

import { useState } from 'react';
import MainInput from '../../components/MainInput';
import ChatBubble from './components/ChatBubble';
import ModeSelector from './components/ModeSelector';
import StepController from './components/StepController';
import useThinkingDots from './hooks/useThinkingDots';

const BrainstormPage = () => {
  const [isThinking /*setIsThinking*/] = useState(true); // AI 답변 로딩 중
  const dots = useThinkingDots(isThinking);

  return (
    <div className="relative flex flex-col w-full h-full bg-primary-0">
      <div className="flex-1 flex flex-col gap-50 overflow-y-auto px-85 pt-50 pb-200">
        {/* AI 로딩 말풍선 */}
        {isThinking && <ChatBubble content={`생각 퍼즐 맞추는 중${dots}`} />}

        {/* AI 질문 예시 */}
        <ChatBubble content={`Q2. 타겟 고객을 한 문장으로 표현한다면?`} />

        {/* 사용자 답변 예시 */}
        <ChatBubble
          type="user"
          content={`나는 화장품 브랜드 콘텐츠 마케터야. 친환경 화장품 캠페인 아이디어 좀 도와줘.\n(상품설명) 내가 첨부한 레퍼런스와 자료를 바탕으로 부탁할게.`}
        />

        {/* 모드 선택 */}
        <ModeSelector onSelect={(id) => console.log('선택된 모드:', id)} />

        {/* 모드 시작 여부 선택 */}
        <StepController modeId="theory" onConfirm={() => console.log('대화 시작!')} />
      </div>

      {/* 입력창 (하단 고정) */}
      <div className="fixed bottom-38 left-0 right-0 flex justify-center z-50 pointer-events-none">
        <div className="pointer-events-auto">
          <MainInput isChat={true} />
        </div>
      </div>
    </div>
  );
};

export default BrainstormPage;

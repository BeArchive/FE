import ChatBubble from './ChatBubble';
import { MODES } from '../../../mocks/modeData';

const StepController = ({ modeId, onConfirm, onCancel }) => {
  const selectedMode = MODES.find((m) => m.id === modeId);

  if (!selectedMode) return null;

  // 말풍선 안에 들어갈 전체 텍스트
  const bubbleContent = `${selectedMode.emoji} ${selectedMode.label}을 선택하셨군요!\n\n${selectedMode.confirm}\n\n준비됐나요? 지금 바로 시작할까요?`;

  return (
    <ChatBubble type="confirm" content={bubbleContent}>
      <div className="flex-row-center gap-45 mt-20">
        <button onClick={onConfirm} className="btn-confirm-yes">
          준비 됐어요!
        </button>
        <button onClick={onCancel} className="btn-confirm-no">
          다음에 할게요
        </button>
      </div>
    </ChatBubble>
  );
};

export default StepController;

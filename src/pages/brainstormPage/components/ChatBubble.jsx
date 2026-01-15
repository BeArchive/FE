import BOT from '@assets/images/bot.svg';

const ChatBubble = ({ type, content, children, className }) => {
  const isUser = type === 'user';

  // 말풍선 배치: AI(왼)/ User(오)
  const alignmentClass = isUser ? 'justify-end' : 'justify-start';
  // 폰트 색상: AI(500) / User(300)
  const textColorClass = isUser ? 'text-secondary-300' : 'text-secondary-500';

  return (
    <div className={`flex w-full ${alignmentClass} ${className}`}>
      <div className={`flex ${isUser ? '' : 'flex-row'} max-w-820`}>
        {/* AI 봇 아이콘 */}
        {!isUser && <img src={BOT} alt="bot" className="w-120 h-120 shrink-0 self-start" />}
        <div className="flex flex-col items-center max-w-700">
          <div
            className={`shadow-sub rounded-20 px-50 py-29 bg-white text-18 font-medium ${textColorClass}`}
          >
            {/* 일반 텍스트 */}
            <p className="whitespace-pre-line">{content}</p>

            {/* 모드 선택 단계 */}
            {!isUser && type === 'mode' && children && <div>{children}</div>}
          </div>

          {/* 확인 단계 */}
          {!isUser && type === 'confirm' && children && <div>{children}</div>}
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;

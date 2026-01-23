import BOT from '@assets/images/bot.svg';

const ChatBubble = ({ type, content, files = [], children, className }) => {
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

        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-center'} max-w-700`}>
          {/* 첨부한 파일 목록 */}
          {isUser && files.length > 0 && (
            <div className="flex gap-20 mb-20 flex-wrap justify-end">
              {files.map((fileObj, idx) => (
                <div
                  key={idx}
                  className="w-120 h-120 rounded-6 overflow-hidden shadow-sub shrink-0"
                >
                  {fileObj.preview ? (
                    <img
                      src={fileObj.preview}
                      alt="upload-preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex-row-center text-12 text-gray-500">
                      PDF
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* 말풍선 본체 */}
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

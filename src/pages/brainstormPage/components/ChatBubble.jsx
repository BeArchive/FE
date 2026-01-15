const ChatBubble = ({ type = 'text', content, children, className }) => {
  return (
    <div className={`flex w-full ${className}`}>
      <div className="flex flex-col items-center max-w-700">
        <div className="max-w-700 shadow-sub rounded-20 px-50 py-29 bg-white text-18 font-medium text-secondary-500">
          <p className="whitespace-pre-line">{content}</p>

          {/* 모드 선택 */}
          {type === 'mode' && children && <div>{children}</div>}
        </div>

        {/* 시작 확인/취소 */}
        {type === 'confirm' && children && <div>{children}</div>}
      </div>
    </div>
  );
};

export default ChatBubble;

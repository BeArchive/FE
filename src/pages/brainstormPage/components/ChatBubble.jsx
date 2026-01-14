const ChatBubble = ({ type = 'text', content, children, className }) => {
  return (
    <div className={`flex w-full ${className}`}>
      <div className="max-w-700 shadow-sub rounded-20 px-50 py-29 bg-white text-18 font-medium text-secondary-500">
        <p className="whitespace-pre-line">{content}</p>

        {type === 'mode' && <div className="mt-10">{children}</div>}
      </div>
    </div>
  );
};

export default ChatBubble;

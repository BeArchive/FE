import { useState, useRef, useEffect } from 'react';
import { cn } from '../lib/utils';
import { LinkIcon, SendIcon } from './iconButton/Icons';
import IconButton from './iconButton/IconButton';

const MainInput = ({ isChat = false }) => {
  const [text, setText] = useState('');
  const [isMultiLine, setIsMultiLine] = useState(false); // 높이 상태
  const textareaRef = useRef(null);

  const LINE_HEIGHT = 36;
  const MAX_HEIGHT = LINE_HEIGHT * 2; // 2줄까지 늘어남

  useEffect(() => {
    if (!isChat && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;

      const targetHeight = scrollHeight > MAX_HEIGHT ? MAX_HEIGHT : scrollHeight;
      textareaRef.current.style.height = `${targetHeight}px`;

      setIsMultiLine(scrollHeight > 45);
    }
  }, [text, isChat, MAX_HEIGHT]);

  return (
    <div
      className={cn(
        'flex-row-center w-1064 bg-white px-50 shadow-sub transition-all duration-300 shrink-0 items-center',
        isChat ? 'h-94 rounded-100' : 'min-h-94 h-auto py-28',
        !isChat && (isMultiLine ? 'rounded-20' : 'rounded-100'),
      )}
    >
      <textarea
        ref={textareaRef}
        rows={1}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="새로운 30초 광고 영상을 기획하고 싶은데?"
        className={cn(
          'flex-1 bg-transparent outline-none resize-none font-medium text-secondary-500 mr-50 placeholder:text-gray-400',
          'text-24 leading-36 self-center',
          isChat ? 'h-36 overflow-hidden' : 'min-h-36 max-h-72 overflow-y-auto custom-scrollbar',
        )}
      />

      {/* 링크, 전송 버튼 */}
      <div className="flex-row-center justify-between w-108 h-35 shrink-0">
        <IconButton Icon={LinkIcon} theme="basic" />
        <IconButton Icon={SendIcon} theme="basic" />
      </div>
    </div>
  );
};

export default MainInput;

import { useState, useRef, useEffect } from 'react';
import { cn } from '../lib/utils';
import { LinkIcon, SendIcon } from './iconButton/Icons';
import IconButton from './iconButton/IconButton';
import FilePreview from './FilePreview';

const MainInput = ({ onSend }) => {
  const [text, setText] = useState('');
  const [isMultiLine, setIsMultiLine] = useState(false); // 높이 상태
  const [files, setFiles] = useState([]); // 첨부 파일

  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);
  const LINE_HEIGHT = 36;
  const MAX_HEIGHT = LINE_HEIGHT * 2; // 2줄까지 늘어남

  // 메세지 전송 핸들러
  const handleSend = async () => {
    if (!text.trim()) return;

    if (onSend) {
      await onSend(text, files);

      setText('');
      setFiles([]);
    }
  };

  // 엔터 키 핸들러
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // 파일 선택 핸들러
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    // 허용할 확장자 목록
    const ALLOWED_EXTENSIONS = ['png', 'jpg', 'jpeg', 'pdf'];

    // 확장자 검증
    const isAllAllowed = selectedFiles.every((file) => {
      const extension = file.name.split('.').pop().toLowerCase();
      return ALLOWED_EXTENSIONS.includes(extension);
    });

    if (!isAllAllowed) {
      alert('png, jpg, jpeg, pdf 파일만 첨부할 수 있습니다.');
      e.target.value = '';
      return;
    }

    // 개수 제한 체크
    if (files.length + selectedFiles.length > 5) {
      alert('파일은 최대 5개까지 첨부할 수 있습니다.');
      return;
    }

    const newFiles = selectedFiles.map((file) => ({
      id: Date.now() + Math.random(),
      file,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
      name: file.name,
    }));

    setFiles((prev) => [...prev, ...newFiles]);
    e.target.value = '';
  };

  // 파일 삭제 핸들러
  const removeFile = (id) => {
    setFiles((prev) => {
      const target = prev.find((f) => f.id === id);
      if (target?.preview) URL.revokeObjectURL(target.preview);
      return prev.filter((f) => f.id !== id);
    });
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;

      const targetHeight = scrollHeight > MAX_HEIGHT ? MAX_HEIGHT : scrollHeight;
      textareaRef.current.style.height = `${targetHeight}px`;

      setIsMultiLine(scrollHeight > 45);
    }
  }, [text, MAX_HEIGHT]);

  return (
    <div
      className={cn(
        'flex flex-col w-[90vw] lg:w-[73.8vw] max-w-1064 bg-white transition-all duration-300 shrink-0 shadow-sub px-[3%]',
        'min-h-94 h-auto py-28',
        isMultiLine || files.length > 0 ? 'rounded-20' : 'rounded-100',
      )}
    >
      {/* 파일 미리보기 */}
      <FilePreview files={files} onRemove={removeFile} />

      <div className="flex items-center w-full">
        <textarea
          ref={textareaRef}
          rows={1}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="새로운 30초 광고 영상을 기획하고 싶은데?"
          className={cn(
            'flex-1 bg-transparent outline-none resize-none font-medium text-secondary-500 placeholder:text-gray-400',
            'text-24 leading-36 self-center mr-20 lg:mr-50',
            'min-h-36 max-h-72 overflow-y-auto',
          )}
        />

        {/* 링크, 전송 버튼 */}
        <div className="flex-row-center justify-between w-90 lg:w-108 h-35 shrink-0">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            multiple
            accept=".png,.jpg,.jpeg,.pdf"
          />
          <IconButton Icon={LinkIcon} theme="basic" onClick={() => fileInputRef.current?.click()} />
          <IconButton Icon={SendIcon} theme="basic" onClick={handleSend} />
        </div>
      </div>
    </div>
  );
};

export default MainInput;

import { cn } from '../../../lib/utils';

const NoteItem = ({ title, date, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'group flex items-center justify-between w-full h-53 px-10 shrink-0 transition-all duration-200 cursor-pointer',
        'border-b border-gray-50',
        'hover:border-transparent hover:bg-gray-50 hover:shadow-basic hover:rounded-100',
        'active:border-transparent active:bg-gray-100 active:shadow-basic active:rounded-100',
      )}
    >
      {/* 텍스트 영역 */}
      <div className="flex-row-center gap-10 overflow-hidden ml-10">
        <span className="text-14 font-medium text-black truncate max-w-194">{title}</span>
        <div className="flex gap-5 shrink-0 text-14 font-regular text-secondary-500">
          <span>수정날짜</span>
          <span>{date}</span>
        </div>
      </div>

      {/* 삭제 버튼 */}
      <button
        className="w-92 h-35 rounded-100 text-14 bg-primary-0 btn-confirm-no"
        onClick={(e) => {
          e.stopPropagation();
          console.log('NoteItem 삭제');
        }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <span>삭제</span>
      </button>
    </div>
  );
};

export default NoteItem;

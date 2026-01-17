import { cn } from '../../lib/utils';
import { FaCircleExclamation } from 'react-icons/fa6';

export default function NoteDeleteModal({
  open = false,
  note = null,
  onConfirm = () => {},
  onCancel = () => {},
  className,
}) {
  if (!open || !note) return null;

  const overlayStyles = cn(
    'absolute inset-0 z-40',
    'bg-overlay-bg',
    'flex items-center justify-center',
    'rounded-20',
  );

  const modalStyles = cn(
    'bg-white rounded-20 shadow-basic',
    'w-390 h-219',
    'relative flex flex-col items-center',
  );

  const buttonRowStyles = cn('flex items-center mt-14 mb-14 gap-40');

  const cancelBtnStyles = `bg-primary-0 rounded-100 w-117 h-28 flex items-center justify-center text-14 leading-22 text-secondary-300`;

  const deleteBtnStyles = `bg-error-2 rounded-100 w-117 h-28 flex items-center justify-center text-14 leading-22 text-secondary-700`;

  return (
    <div className={overlayStyles}>
      <div className={cn(modalStyles, className)}>
        <div className="mt-16 flex items-center justify-center">
          <FaCircleExclamation className="w-29 h-29 text-error-1" />
        </div>

        {/* 제목 */}
        <p className="mt-10 text-14 leading-22 font-medium text-black">삭제하시겠습니까?</p>

        {/* 설명 */}
        <p className="text-12 leading-20 text-black text-center">
          삭제할 경우 복구하실 수 없습니다.
        </p>

        {/* 노트 정보 */}
        <div className="mt-12 w-358 h-54 px-9 py-5 bg-gray-50 rounded-10">
          <p className="font-medium text-14 leading-22 text-black truncate">{note.name}</p>
          <div className="flex items-center gap-5 font-normal text-12 leading-20 text-secondary-500">
            <span>수정날짜</span>
            <span>{note.date}</span>
          </div>
        </div>

        {/* 버튼 */}
        <div className={buttonRowStyles}>
          <button className={cancelBtnStyles} onClick={onCancel}>
            취소하기
          </button>
          <button className={deleteBtnStyles} onClick={onConfirm}>
            삭제하기
          </button>
        </div>
      </div>
    </div>
  );
}

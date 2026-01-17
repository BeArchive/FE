import { cn } from '../../lib/utils';
import { FaCircleExclamation } from 'react-icons/fa6';

export default function ConfirmModal({
  open = false,
  title = '',
  description = [],
  confirmLabel = '확인',
  cancelLabel = '취소하기',
  onConfirm = () => {},
  onCancel = () => {},
  hideCancel = false,
  className,
}) {
  if (!open) return null;

  const overlayStyles = cn(
    'absolute inset-0 z-40',
    'bg-[rgba(217,217,217,0.5)]',
    'flex items-center justify-center',
    'rounded-20',
  );

  const modalStyles = cn(
    'bg-white rounded-20 shadow-basic',
    'w-390 h-219',
    'relative flex flex-col items-center',
  );

  const buttonRowStyles = cn(
    'flex items-center mt-auto mb-21',
    hideCancel ? 'justify-center' : 'gap-40',
  );

  const cancelBtnStyles = `bg-primary-0 rounded-100 w-117 h-28 flex items-center justify-center text-14 leading-22 text-secondary-300`;

  const confirmBtnStyles = `bg-[#FF6E6E] rounded-100 w-117 h-28 flex items-center justify-center text-14 leading-22 text-secondary-700`;

  return (
    <div className={overlayStyles}>
      <div className={cn(modalStyles, className)}>
        <div className="mt-31 flex items-center justify-center">
          <FaCircleExclamation className="w-29 h-29 text-[#FF6E6E99]" />
        </div>

        {/* 제목 */}
        {title && <p className="mt-10 text-14 leading-22 font-medium text-black">{title}</p>}

        {/* 설명 */}
        <div className="mt-10 flex flex-col items-center">
          {description.map((line, idx) => (
            <p key={idx} className="text-12 leading-20 text-black text-center">
              {line}
            </p>
          ))}
        </div>

        {/* 버튼 */}
        <div className={buttonRowStyles}>
          {!hideCancel && (
            <button className={cancelBtnStyles} onClick={onCancel}>
              {cancelLabel}
            </button>
          )}
          <button className={confirmBtnStyles} onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

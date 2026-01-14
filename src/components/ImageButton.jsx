import { cn } from '../lib/utils';

const ImageButton = ({ src, alt = 'button-icon', onClick, className }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex-row-center p-0 bg-transparent border-none outline-none cursor-pointer',
        'transition-transform duration-150 active:scale-95 shrink-0',
        className,
      )}
    >
      <img src={src} alt={alt} className="w-full h-full object-contain pointer-events-none" />
    </button>
  );
};

export default ImageButton;

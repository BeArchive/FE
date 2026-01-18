import { cn } from '../../lib/utils';

const AuthButton = ({ isLoggedIn, onClick, className }) => {
  const layoutStyles = 'flex-row-center w-127 py-10 px-12 gap-10 rounded-8 active:scale-95';
  const transitionStyles = 'transition-colors duration-200';
  const colorStyles = `
    bg-primary-50 hover:bg-primary-200 active:bg-primary-200 
    text-secondary-300 active:text-white
  `;

  return (
    <button
      onClick={onClick}
      className={cn(layoutStyles, transitionStyles, colorStyles, className)}
    >
      <span className="font-medium text-16">{isLoggedIn ? '로그아웃' : '로그인'}</span>
    </button>
  );
};

export default AuthButton;

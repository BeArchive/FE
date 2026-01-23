const THEMES = {
  basic: {
    icon: 'text-secondary-300 hover:text-primary-400 active:text-primary-main',
    button: 'bg-primary-0 hover:bg-white hover:shadow-icon active:bg-white active:shadow-icon',
  },
  note: {
    icon: 'text-secondary-300 hover:text-primary-500 active:text-gray-100',
    button:
      'bg-primary-0 hover:bg-gray-100 hover:shadow-basic active:bg-gray-300 active:shadow-basic',
  },
};

const IconButton = ({ Icon, onClick, theme = 'basic', className = '' }) => {
  const hasSize = className.includes('w-') || className.includes('h-');

  return (
    <button
      onClick={onClick}
      className={`
        ${hasSize ? '' : 'w-35 h-35'} shrink-0 flex-row-center rounded-100 transition-all outline-none border-none active:scale-95 
        ${THEMES[theme].button} ${className}
      `}
    >
      {Icon && <Icon className={`w-[65%] h-[65%] ${THEMES[theme].icon} transition-colors`} />}
    </button>
  );
};

export default IconButton;

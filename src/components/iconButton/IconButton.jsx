const THEMES = {
  basic: {
    icon: 'text-secondary-300 hover:text-primary-400 active:text-primary-main',
    button: 'bg-primary-0 hover:bg-white hover:shadow-icon active:bg-white active:shadow-icon',
  },
};

const IconButton = ({ Icon, onClick, theme = 'basic', className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-35 h-35 shrink-0 flex-row-center rounded-100 transition-all outline-none border-none active:scale-95 
        ${THEMES[theme].button} ${className}
      `}
    >
      {Icon && <Icon className={`w-23 h-23 ${THEMES[theme].icon} transition-colors`} />}
    </button>
  );
};

export default IconButton;

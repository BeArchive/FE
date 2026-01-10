import LOGO from '@assets/images/logo.svg';
import LONG_LOGO from '@assets/images/long_logo.svg';
import useNavigation from '../../hooks/useNavigation';

const Logo = ({ long = false, className = 'w-178 h-47' }) => {
  const { goTo } = useNavigation();

  return (
    <div
      className={`flex items-center justify-center cursor-pointer active:scale-95 ${className}`}
      onClick={() => goTo('/')}
    >
      <img src={long ? LONG_LOGO : LOGO} alt="Logo" className="object-contain w-full h-full" />
    </div>
  );
};

export default Logo;

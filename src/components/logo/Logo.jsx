import LOGO from '@assets/images/logo.svg';
import useNavigation from '../../hooks/useNavigation';

const Logo = ({ className = 'w-178 h-47' }) => {
  const { goTo } = useNavigation();

  return (
    <div
      className={`flex items-center justify-center cursor-pointer ${className}`}
      onClick={() => goTo('/')}
    >
      <img src={LOGO} alt="Logo" className="object-contain w-full h-full" />
    </div>
  );
};

export default Logo;

import { MoonLoader } from 'react-spinners';
import LOADING from '@assets/images/loading.svg';

const Spinner = ({ showDimmer = true }) => {
  return (
    <div
      className={`fixed inset-0 z-[9999] flex-row-center
      ${showDimmer ? 'bg-black/40 backdrop-blur-[2px]' : ''}`}
    >
      <div className="relative w-150 h-150">
        <img src={LOADING} alt="loading" className="w-full h-full object-contain" />

        <div className="absolute" style={{ top: '5rem', left: '5.5rem' }}>
          <MoonLoader size={35} color="#007BFF" speedMultiplier={0.7} />
        </div>
      </div>
    </div>
  );
};

export default Spinner;

import ImageButton from './ImageButton';
import LINK from '@assets/icons/link_icon.svg';
import SEND from '@assets/icons/send_icon.svg';

const MainInput = () => {
  return (
    <div className="flex-row-center shrink-0 w-1064 h-[94px] bg-white rounded-100 px-50 shadow-sub">
      <input
        placeholder="새로운 30초 광고 영상을 기획하고 싶은데?"
        className="flex-1 bg-transparent outline-none h-36 text-24 font-medium text-secondary-500 mr-50 placeholder:text-gray-400"
      />
      <div className="flex-row-center justify-between w-108 h-35 shrink-0">
        <ImageButton src={LINK} className="w-35 h-35" />
        <ImageButton src={SEND} className="w-35 h-35" />
      </div>
    </div>
  );
};

export default MainInput;

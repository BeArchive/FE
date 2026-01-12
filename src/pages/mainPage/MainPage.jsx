import MainInput from '../../components/input/MainInput';
import FEAT1 from '@assets/images/feature_1.webp';
import FEAT2 from '@assets/images/feature_2.webp';
import FeatureCard from './components/FeatureCard';

const features = [
  {
    src: FEAT1,
    alt: '기능1',
    title: '기존과 다른 브레인스토밍 도구',
    description: '루미와 대화를 통해\n아이디어를 확장시켜요.',
  },
  {
    src: FEAT2,
    alt: '기능2',
    title: '빠르게 생각나는 것을 기록',
    description: '브레인스토밍 과정에서\n생각나는 것을 빠르게 기록하고 정리해요.',
  },
];

const MainPage = () => {
  return (
    <div className="w-full h-full flex-col-center gap-50 bg-primary-0 p-50 pt-159">
      <p className="text-42 font-bold text-secondary-500 text-center mb-14 whitespace-pre-line">{`브레인스토밍 주제를 입력하고,\n작은 아이디어를 확장시켜요.`}</p>

      {/* 입력창 */}
      <MainInput />

      {/* 사용 가이드 */}
      <div className="peer flex-row-center rounded-8 w-178 h-44 bg-primary-400 text-white text-20 font-medium hover:bg-primary-200 duration-150 cursor-default">
        어떻게 사용하나요?
      </div>
      <div className="flex-row-center invisible opacity-0 peer-hover:visible peer-hover:opacity-100 transition-all duration-300 w-1064 h-245 bg-white rounded-20 gap-277">
        {features.map((feat, index) => (
          <FeatureCard
            key={index}
            src={feat.src}
            alt={feat.alt}
            title={feat.title}
            description={feat.description}
          />
        ))}
      </div>
    </div>
  );
};

export default MainPage;

import { useState } from 'react';
import ModeTooltip from './ModeTooltip';

const MODES = [
  {
    id: 'question',
    label: '질문으로 시작하는 브레인스토밍',
    emoji: '⚡️',
    desc: `AI가 연속으로 질문을 던져 생각을 확장시켜요.\n"왜?", "만약 ~라면?", "반대로 하면?" 같은\n다양한 각도의 질문으로 아이디어를 깊고 넓게 만들어요.`,
    rec: ['막연한 아이디어를 구체화하고 싶을 때', '여러 가능성을 탐색하고 싶을 때'],
  },
  {
    id: 'keyword',
    label: '키워드 믹스로 시작하는 브레인스토밍',
    emoji: '🎲',
    desc: `전혀 관련 없는 키워드들을 무작위로 조합해요.\n예상치 못한 연결에서 창의적인 아이디어가 탄생해요.`,
    rec: [
      '참신한 아이디어가 필요할 때',
      '기존 관점에서 벗어나고 싶을 때',
      '재미있게 브레인스토밍하고 싶을 때',
    ],
  },
  {
    id: 'perspective',
    label: '관점의 전환으로 시작하는 브레인스토밍',
    emoji: '👥',
    desc: `다양한 페르소나의 시각으로 문제를 바라봐요.\nCEO, 어린이, 예술가 등 여러 관점에서\n새로운 인사이트를 발견할 수 있어요.`,
    rec: ['한 가지 관점에 갇혀있다고 느낄 때', '다양한 타겟의 반응을 예상하고 싶을 때'],
  },
  {
    id: 'theory',
    label: '이론으로 시작하는 브레인스토밍',
    emoji: '📚',
    desc: `검증된 마케팅·기획 이론을 실전에 바로 적용해요.\nAARRR, SCAMPER 등 프레임워크로\n체계적이고 설득력 있는 아이디어를 만들어요.`,
    rec: [
      '전략적인 기획이 필요할 때',
      '이론을 실무에 적용하고 싶을 때',
      '체계적으로 접근하고 싶을 때',
    ],
  },
];

const ModeSelector = ({ onSelect }) => {
  const [hoveredMode, setHoveredMode] = useState(null);

  const buttonStyle = `group flex items-center w-full h-58 px-20 py-18 rounded-10 border-1 transition-all duration-200
                       bg-white border-transparent text-18 font-medium text-secondary-500
                       hover:border-primary-50 hover:bg-primary-0 hover:shadow-basic
                       active:border-transparent active:bg-primary-50`;

  return (
    <div className="relative flex flex-col gap-15 mt-30">
      {MODES.map((mode) => (
        <div key={mode.id} className="relative flex items-center">
          <button
            onMouseEnter={() => setHoveredMode(mode.id)}
            onMouseLeave={() => setHoveredMode(null)}
            onClick={() => onSelect(mode.id)}
            className={buttonStyle}
          >
            <span className="mr-8">{mode.emoji}</span>
            <span>{mode.label}</span>
          </button>

          {/* hover 시 툴팁 표시 */}
          {hoveredMode === mode.id && (
            <div className="absolute left-full ml-[-1.5rem] z-10 w-max">
              <ModeTooltip title={mode.label} emoji={mode.emoji} desc={mode.desc} rec={mode.rec} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ModeSelector;

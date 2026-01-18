import TRIANGLE from '@assets/icons/tooltip_triangle.svg';

const ModeTooltip = ({ title, emoji, desc, rec = [] }) => {
  return (
    <div className="relative flex items-center ">
      <img src={TRIANGLE} alt="말풍선 꼬리" className="shrink-0 w-26 h-23 -mr-4" />

      <div className="flex max-w-600 gap-15 bg-gray-50 rounded-10 px-20 py-16">
        {/* 설명 섹션 */}
        <section className="flex-1 text-14 font-medium text-secondary-300">
          <div className="flex items-center gap-6 mb-9">
            <span>{emoji}</span>
            <p>{title}</p>
          </div>
          <p className="whitespace-pre-line">{desc}</p>
        </section>

        {/* 추천 섹션 */}
        <section className="shrink-0 text-14 font-medium text-secondary-500">
          <div className="flex items-center gap-6 mb-9">
            <span>💡</span>
            <p>추천</p>
          </div>
          <ul>
            {rec.map((item, idx) => (
              <li key={idx} className="flex gap-6">
                <span className="shrink-0">-</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default ModeTooltip;

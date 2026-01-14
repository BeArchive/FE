import { useState } from 'react';
import ModeTooltip from './ModeTooltip';
import { MODES } from '../../../mocks/modeData';

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

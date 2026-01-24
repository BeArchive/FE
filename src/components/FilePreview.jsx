import IconButton from './iconButton/IconButton';
import { CancelIcon } from './iconButton/Icons';

const FilePreview = ({ files, onRemove }) => {
  if (files.length === 0) return null;

  return (
    <div className="flex items-center gap-15 mb-12 overflow-x-auto">
      {files.map((file) => (
        <div key={file.id} className="relative w-65 h-65 shrink-0">
          <div className="w-full h-full bg-gray-150 rounded-6 overflow-hidden flex-row-center">
            {file.preview ? (
              // 이미지 미리보기
              <img src={file.preview} alt="preview" className="w-full h-full object-cover" />
            ) : (
              // 문서(PDF 등) 표시
              <div className="flex-col-center">
                <span className="text-12 font-bold text-secondary-400 uppercase">
                  {file.name.split('.').pop()}
                </span>
              </div>
            )}
          </div>

          {/* 삭제 버튼 */}
          <div className="absolute top-2 right-2 z-2">
            <IconButton
              Icon={CancelIcon}
              theme="note"
              onClick={() => onRemove(file.id)}
              className="w-25 h-25"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilePreview;

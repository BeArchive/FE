export const ALLOWED_EXTENSIONS = ['png', 'jpg', 'jpeg', 'pdf'];

// 확장자 및 개수 검증
export const validateFiles = (selectedFiles, currentFilesCount) => {
  const isAllAllowed = selectedFiles.every((file) => {
    const extension = file.name.split('.').pop().toLowerCase();
    return ALLOWED_EXTENSIONS.includes(extension);
  });

  if (!isAllAllowed) {
    return { isValid: false, msg: 'png, jpg, jpeg, pdf 파일만 첨부할 수 있습니다.' };
  }

  if (currentFilesCount + selectedFiles.length > 5) {
    return { isValid: false, msg: '파일은 최대 5개까지 첨부할 수 있습니다.' };
  }

  return { isValid: true };
};

// 파일 객체 포맷팅 및 프리뷰 생성
export const formatFileSelection = (selectedFiles) => {
  return selectedFiles.map((file) => ({
    id: Date.now() + Math.random(),
    file,
    preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
    name: file.name,
  }));
};

// 메모리 해제
export const revokeFiles = (files) => {
  files.forEach((f) => {
    if (f.preview) URL.revokeObjectURL(f.preview);
  });
};

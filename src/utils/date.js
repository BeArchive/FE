// yyyy. mm. dd 형식으로 포맷팅 (데이터 없으면 오늘 날짜)
export const getFormattedDate = (dateStr) => {
  const date = dateStr ? new Date(dateStr) : new Date();
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}. ${mm}. ${dd}`;
};

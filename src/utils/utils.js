export const dateToString = (timestamp) => {
  const time = timestamp.split('T');
  const date = {
    year: time[0].split('-')[0],
    month: time[0].split('-')[1],
    day: time[0].split('-')[2],
  };

  return `${date.year}년 ${date.month}월 ${date.day}일`;
};

export const recommendKeyword = [
  '시부야',
  '도쿄',
  '오타루',
  '가마쿠라',
  '후지산',
  '벚꽃',
  '코엔지',
];

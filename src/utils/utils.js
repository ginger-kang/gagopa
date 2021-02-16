import { AWS_S3_PREFIX } from './constant';

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

export const backgroundImage = [
  AWS_S3_PREFIX + 'TokyoTowerSakura.jpg',
  AWS_S3_PREFIX + 'FujiSakura.jpg',
  AWS_S3_PREFIX + 'Otaru.jpg',
  AWS_S3_PREFIX + 'Fuji.jpg',
  AWS_S3_PREFIX + 'SkyTree.jpg',
];

export function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

export const sortByLikes = (a, b) => {
  return b.likes.items.length - a.likes.items.length;
};

export const sortByComments = (a, b) => {
  return b.comments.items.length - a.comments.items.length;
};

export const sortByPopular = (a, b) => {
  return (
    b.comments.items.length +
    b.likes.items.length -
    (a.comments.items.length + a.likes.items.length)
  );
};

export const sortByName = (a, b) => {
  return a.localeCompare(b);
};

export const getRandomIndex = (n) => {
  return Math.floor(Math.random() * n);
};

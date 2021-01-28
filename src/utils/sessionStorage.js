export const setSessionLikeSort = (value) => {
  window.sessionStorage.setItem('likesort', value);
};

export const getSessionLikeSort = () => {
  return window.sessionStorage.getItem('likesort');
};

export const setSessionCommentSort = (value) => {
  window.sessionStorage.setItem('commentSort', value);
};

export const getSessionCommentSort = () => {
  return window.sessionStorage.getItem('commentSort');
};

export const setSessionNext = (value) => {
  window.sessionStorage.setItem('next', value);
};

export const getSessionNext = () => {
  return window.sessionStorage.getItem('next');
};

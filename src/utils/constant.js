import config from '../aws-exports';

const {
  aws_user_files_s3_bucket_region: region,
  aws_user_files_s3_bucket: bucket,
} = config;

export const AWS_S3_PREFIX = `https://${bucket}.s3.${region}.amazonaws.com/public/`;
export const POST_COUNT = 18;
export const NAV_SCROLL_OFFSET = 70;
export const PICTURE_MAX_COUNT = 6;
export const EMPTY_COMMENT = '댓글을 작성해주세요.';
export const AUTH_ALERT_MESSAGE = {
  GOOGLE_CANNOT_EDIT_PASSWORD: '구글 계정은 비밀번호를 변경 할 수 없습니다.',
  COMPLETE_EDIT_PASSWORD: '비밀번호 변경이 완료되었습니다.',
  NOT_SIGN_IN: '로그인이 필요합니다.',
  CONFIRM_SIGN_OUT: '로그아웃 하시겠습니까?',
  PASSWORD_INCORRECT: '비밀번호를 확인해주세요.',
  SIGN_IN_FAILED: '사용자명 혹은 비밀번호를 확인해 주세요.',
};

export const UPLOAD_ALERT_MESSAGE = {
  LACK_REQUIRED_FIELD: '필수 항목들을 빠짐없이 입력해주세요.',
  COMPLETE_UPLOAD_PICTURE: '사진을 성공적으로 업로드했습니다 🙆',
  OVER_PICTURE_MAX_COUNT: '사진은 최대 6장 까지 올릴 수 있습니다.',
  COMPLETE_UPDATE_PICTURE: '사진 정보를 수정했습니다.',
};

export const REACTIONS = [
  '😍',
  '🤭',
  '😎',
  '🙊',
  '👍',
  '👎',
  '👏',
  '👀',
  '✨',
  '🔥',
  '❤️',
  '💜',
];

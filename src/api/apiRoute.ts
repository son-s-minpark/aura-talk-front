const API = "https://api.auratalk.kro.kr";
const USER = `${API}/api/users`;
const USER_IMAGE = `${USER}/me/profile-image`;
const INTEREST = `${API}/api/interests`;

export const apiRoute = {
  BASE: API,

  // 유저 기능
  USER: USER,
  USER_VERIFY_EMAIL: `${USER}/verify-email`,
  USER_RESEND_EMAIL: `${USER}/resend-verification`,
  USER_LOGIN: `${USER}/login`,
  USER_LOGOUT: `${USER}/logout`,
  USER_DELETE_ACCOUNT: (id: number) => `${USER}/${id}`,
  USER_PROFILE: (id: number) => `${USER}/${id}/profile`,
  USER_GET_PROFILE: (id: number) => `${USER}/${id}`,
  USER_RANDOM_CHAT_TOGGLE: (id: number) => `${USER}/${id}/chat-settings`,

  // 유저 프로필 이미지
  USER_IMAGE_PRESIGN: `${USER_IMAGE}/presigned-url`,
  USER_IMAGE_COMPLETE: `${USER_IMAGE}/upload-complete`,
  USER_IMAGE_PROFILE_DELETE: `${USER_IMAGE}/profile-image`,
  USER_IMAGE_PROFILE_GET: (id: number) => `${USER}/${id}/profile-image`,

  // 관심사
  INTEREST_TOTAL: INTEREST,
  INTEREST_USERS: (category: string) => `${INTEREST}/${category}/users`,
  INTEREST_CATEGORY: (category: string) => `${INTEREST}/category/${category}`,
};

const API = "https://api.auratalk.kro.kr";
const USER = `${API}/api/users`;
const USER_IMAGE = `${USER}/me/profile-image`;
const INTEREST = `${API}/api/interests`;
const CHAT = `${API}/api/chatrooms`;

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

  // 채팅
  CHAT_CREATE: CHAT,
  CHAT_GET_LIST: CHAT,
  CHAT_NOTIFICATION: (id: number) => `${CHAT}/${id}/notification`,
  CHAT_FRIEND_INVITE: (id: number) => `${CHAT}/${id}/invite`,
  CHAT_FRIEND_INVITE_LINK: (id: number) => `${CHAT}/${id}/invite-link`,
  CHAT_INVITE_LINK_REJECT: `${CHAT}/invite/reject`,
  CHAT_INVITE_LINK_ACCEPT: `${CHAT}/invite/accept`,
  CHAT_INVITATION_REJECT: (id: number) => `${CHAT}/invitations/${id}/reject`,
  CHAT_INVITATION_ACCEPT: (id: number) => `${CHAT}/invitations/${id}/accept`,
  CHAT_INVITATION_PENDING: `${CHAT}/invitations/pending`,
  CHAT_EXIT: (id: number) => `${CHAT}/${id}`,
};

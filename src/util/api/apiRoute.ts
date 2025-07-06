const API = "https://api.auratalk.kro.kr";
const USER = `${API}/api/users`;
const USER_IMAGE = `${USER}/me/profile-image`;
const INTEREST = `${API}/api/interests`;
const CHATROOM = `${API}/api/chatrooms`;
const RANDOMCHAT = `${API}/api/random-chat`;
const CHAT = `${API}/api/chats`;
const FRIEND = `${API}/api/friends`;

export const apiRoute = {
  BASE: API,

  // 유저 기능
  USER_SIGNIN: USER,
  USER_VERIFY_EMAIL: `${USER}/verify-email`,
  USER_RESEND_EMAIL: `${USER}/resend-verification`,
  USER_LOGIN: `${USER}/login`,
  USER_LOGOUT: `${USER}/logout`,
  USER_DELETE_ACCOUNT: USER,
  USER_PUT_PROFILE: `${USER}/profile`,
  USER_MY_PROFILE: `${USER}/me/profile`,
  USER_GET_PROFILE: (id: number) => `${USER}/${id}/profile`,
  USER_RANDOM_CHAT_TOGGLE: (id: number) => `${USER}/${id}/chat-settings`,

  // 유저 프로필 이미지
  USER_IMAGE_PRESIGN: `${USER_IMAGE}/presigned-url`,
  USER_IMAGE_COMPLETE: `${USER_IMAGE}/upload-complete`,
  USER_IMAGE_PROFILE_DELETE: `${USER_IMAGE}/profile-image`,
  USER_IMAGE_PROFILE_GET: (id: number) => `${USER}/${id}/profile-image`,

  // 관심사
  INTEREST_TOTAL: INTEREST,
  INTEREST_USERS: (interest: string) => `${INTEREST}/${interest}/users`,
  INTEREST_CATEGORY: (category: string) => `${INTEREST}/category/${category}`,

  // 채팅방
  CHATROOM_CREATE: CHATROOM,
  CHATROOM_CREATE_ONE_TO_ONE: `${CHATROOM}/one-to-one`,
  CHATROOM_GET_LIST: CHATROOM,
  CHATROOM_GET_ROOM: (id: number) => `${CHATROOM}/${id}`,
  CHATROOM_PUT_ROOM: (id: number) => `${CHATROOM}/${id}`,
  CHATROOM_EXIT_ROOM: (id: number) => `${CHATROOM}/${id}`,
  CHATROOM_NOTIFICATION: (id: number) => `${CHATROOM}/${id}/notification`,
  CHATROOM_FRIEND_INVITE: (id: number) => `${CHATROOM}/${id}/invite`,
  CHATROOM_CREATE_INVITE_LINK: (id: number) => `${CHATROOM}/${id}/invite-link`,
  CHATROOM_KICK_USER: (chatId: number, userId: number) =>
    `${CHATROOM}/${chatId}/kick/${userId}`,

  CHATROOM_UNBAN_USER: (chatId: number, userId: number) =>
    `${CHATROOM}/${chatId}/unban/${userId}`,
  CHATROOM_DELETE: (id: number) => `${CHATROOM}/${id}/delete`,
  CHATROOM_JOIN: `${CHATROOM}/join`,
  CHATROOM_SEARCH: `${CHATROOM}/search`,

  // 랜덤채팅방
  RANDOMCHAT_START: `${RANDOMCHAT}/start`,

  // 채팅
  CHAT_GET: (roomId: number) => `${CHAT}/${roomId}`,
  CHAT_DELETE: (roomId: number) => `${CHAT}/${roomId}`,

  // 친구
  FRIEND_GET_LIST: FRIEND,
  FRIEND_DELETE: (id: number) => `${FRIEND}/${id}`,
  FRIEND_REQUEST: (id: number) => `${FRIEND}/requests/${id}`,
  FRIEND_REQUEST_ACCEPT: (id: number) => `${FRIEND}/requests/${id}/accept`,
  FREIND_REQUEST_SENT_LIST: `${FRIEND}/requests/sent`,
  FREIND_REQUEST_RECEIVED_LIST: `${FRIEND}/requests/received`,
  FRIEND_REQUEST_SENT_CANCEL: (id: number) => `${FRIEND}/requests/${id}/cancel`,
  FRIEND_REQUEST_REJECT: (id: number) => `${FRIEND}/requests/${id}/reject`,
  FRIEND_BLOCK: (id: number) => `${FRIEND}/blocks/${id}`,
  FRIEND_BLOCK_LIST: `${FRIEND}/blocks`,
  FRIEND_BLOCK_CANCEL: (id: number) => `${FRIEND}/blocks/${id}`,
};

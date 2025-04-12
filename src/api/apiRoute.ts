const API = "https://api.auratalk.kro.kr";
const USER = `${API}/api/users`;

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
};

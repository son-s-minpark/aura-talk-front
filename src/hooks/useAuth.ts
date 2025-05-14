import { useMutation } from "@tanstack/react-query";
import { signType } from "@/type/sign/signType";
import axiosInstance from "@/util/api/axiosInstance";
import { apiRoute } from "@/util/api/apiRoute";
import axios from "axios";
import useUserStore from "@/state/user/useUserStore";
import useProfileStore from "@/state/user/useProfileStore";

export const useAuth = () => {
  const { userData, setUserData } = useUserStore();
  const { setProfileData } = useProfileStore();

  // 회원가입 요청
  const useSignupMutation = useMutation({
    mutationFn: async (signupData: signType) => {
      return axios
        .post(apiRoute.USER, signupData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          const { data } = res;

          if (data.success) {
            const token = data.data.token;
            const userId = data.data.userId;

            if (token) {
              localStorage.setItem("accessToken", token);
              localStorage.setItem("userId", userId);
              setUserData({ userId });
              return { success: true };
            } else {
              throw new Error("토큰을 받지 못 했습니다.");
            }
          } else {
            throw new Error(data.message || "회원가입 실패");
          }
        })
        .catch((err) => {
          console.error("signup error:", err);
          throw err;
        });
    },
  });

  // 로그인 요청
  const useSigninMutation = useMutation({
    mutationFn: async (signinData: signType) => {
      return await axios
        .post(apiRoute.USER_LOGIN, signinData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          const { data } = res;

          if (data.success) {
            const token = data.data.token;
            const userData = data.data.user;

            if (token) {
              localStorage.setItem("accessToken", token);
              localStorage.setItem("userId", userData.id);
            } else {
              alert("토큰을 받지 못 했습니다.");
              throw new Error(data);
            }

            setUserData({
              userId: userData.id,
              createdAt: userData.createdAt,
              randomChatEnabled: userData.randomChatEnabled,
              status: userData.status,
            });
            setProfileData({
              description: userData.description,
              nickname: userData.nickname,
              username: userData.username,
              interests: userData.interests,
            });
            console.error(userData);

            return {
              success: true,
              profileSet:
                userData.username == "임시 사용자명" &&
                userData.nickname == "임시 닉네임",
            };
          } else {
            throw new Error("로그인 오류");
          }
        })
        .catch((err) => {
          console.error("signup error:", err);
          throw err;
        });
    },
  });

  // 로그아웃 요청
  const useLogoutMutation = useMutation({
    mutationFn: async () => {
      try {
        const res = await axiosInstance.post(apiRoute.USER_LOGOUT);
        const { data } = res;

        if (data.success) {
          localStorage.clear();
          return { success: true };
        } else {
          throw new Error("Logout failed");
        }
      } catch (err) {
        console.error(err);
        throw new Error("Logout error");
      }
    },
  });

  // 회원탈퇴 요청
  const useDeleteAccoutMutation = useMutation({
    mutationFn: async (pwData: string) => {
      return await axiosInstance
        .delete(apiRoute.USER_DELETE_ACCOUNT(userData.userId), { data: pwData })
        .then((res) => {
          console.error("signout ERror", res);
          const { data } = res;
          if (data.success) {
            return { success: true };
          } else {
            throw Error("회원탈퇴 에러");
          }
        })
        .catch((err) => {
          console.error(err);
          throw err;
        });
    },
  });

  return {
    useSigninMutation,
    useSignupMutation,
    useLogoutMutation,
    useDeleteAccoutMutation,
  };
};

// 메일 인증 관련 요청
export const useMailAuth = () => {
  const token = localStorage.getItem("accessToken") || "";

  // 인증 요청 메일 보내기
  const useMailValidateMutation = useMutation({
    mutationFn: async (mail: string) => {
      return await axios.post(apiRoute.USER_VERIFY_EMAIL, {
        email: mail,
        token: token,
      });
    },
  });

  // 인증 요청 매일 다시 보내기기
  const useMailResendMutation = useMutation({
    mutationFn: async (mail: string) => {
      return await axios.post(apiRoute.USER_RESEND_EMAIL, {
        email: mail,
        token: token,
      });
    },
  });

  return { useMailValidateMutation, useMailResendMutation };
};

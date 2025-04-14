import { useMutation } from "@tanstack/react-query";
import { signType } from "@/type/sign/signType";
import axiosInstance from "@/api/axiosInstance";
import { apiRoute } from "@/api/apiRoute";
import axios from "axios";
import { pwType } from "@/type/sign/pwType";
import { profileType, randomChatType } from "@/type/user/profileType";
import useUserState from "@/state/user/useUserStore";
import { mailType } from "@/type/sign/mailType";

export const useAuth = () => {
  const { userData } = useUserState();
  // 회원가입 요청
  const useSignupMutation = useMutation({
    mutationFn: (signupData: signType) => {
      return axios.post(apiRoute.USER, signupData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
  });

  // 로그인 요청
  const useSigninMutation = useMutation({
    mutationFn: async (signinData: signType) => {
      console.error(signinData);
      return axios.post(apiRoute.USER_LOGIN, signinData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
  });

  // 로그아웃 요청
  const useLogoutMutation = useMutation({
    mutationFn: async () => {
      return axiosInstance.post(apiRoute.USER_LOGOUT);
    },
  });

  // 회원탈퇴 요청
  const useDeleteAccoutMutation = useMutation({
    mutationFn: async (pwData: pwType) => {
      console.error(userData.userId);
      return axiosInstance.delete(
        apiRoute.USER_DELETE_ACCOUNT(userData.userId),
        { data: pwData }
      );
    },
  });

  // 프로필 설정 요청
  const useProfileMutation = useMutation({
    mutationFn: async (profileData: profileType) => {
      return axiosInstance.put(
        apiRoute.USER_PROFILE(userData.userId),
        profileData
      );
    },
  });

  // 랜덤 채팅 설정 변경 요청
  const useRandomChatToggleMutation = useMutation({
    mutationFn: async (randomData: randomChatType) => {
      return axiosInstance.put(
        apiRoute.USER_RANDOM_CHAT_TOGGLE(userData.userId),
        randomData
      );
    },
  });

  return {
    useSigninMutation,
    useSignupMutation,
    useLogoutMutation,
    useDeleteAccoutMutation,
    useProfileMutation,
    useRandomChatToggleMutation,
  };
};

export const useMailAuth = () => {
  const useMailValidateMutation = useMutation({
    mutationFn: async (mailData: mailType) => {
      return axios.post(apiRoute.USER_VERIFY_EMAIL, mailData);
    },
  });

  const useMailResendMutation = useMutation({
    mutationFn: async (mailData: mailType) => {
      return axios.post(apiRoute.USER_RESEND_EMAIL, mailData);
    },
  });

  return { useMailValidateMutation, useMailResendMutation };
};

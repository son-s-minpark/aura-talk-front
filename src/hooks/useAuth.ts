import { useMutation } from "@tanstack/react-query";
import { signType } from "@/type/sign/signType";
import axiosInstance from "@/api/axiosInstance";
import { apiRoute } from "@/api/apiRoute";
import axios from "axios";
import { pwType } from "@/type/sign/pwType";

export const useAuth = () => {
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
      return axios.post(apiRoute.USER_LOGIN, JSON.stringify(signinData));
    },
    onSuccess: (res) => {
      const data = res.data;
      const token = data.token;
      if (token) {
        localStorage.setItem("accessToken", token);
      } else {
        alert("토큰을 받지 못 했습니다.");
      }
      console.log("로그인 완료");
      return data;
    },
    onError: (err) => console.error(err),
  });

  // 로그아웃 요청
  const useLogoutMutation = useMutation({
    mutationFn: async () => {
      return axiosInstance.delete(apiRoute.USER_LOGOUT);
    },
    onSuccess: (res) => {
      const data = res.data;
      if (data.success) {
        localStorage.removeItem("accessToken");
      }
      console.error("로그아웃 상공");
      return data;
    },
    onError: (err) => console.error(err),
  });

  const useDeleteAccoutMutation = (id: string) =>
    useMutation({
      mutationFn: async (pwData: pwType) => {
        return axiosInstance.delete(apiRoute.USER_DELETE_ACCOUNT(id), {
          data: JSON.stringify(pwData),
        });
      },
      onSuccess: (res) => {
        const data = res.data;
        if (data.success) {
          localStorage.removeItem("accessToken");
        }
        console.error("회원탈퇴 상공");
        return data;
      },
      onError: (err) => console.error(err),
    });

  return {
    useSigninMutation,
    useSignupMutation,
    useLogoutMutation,
    useDeleteAccoutMutation,
  };
};

export const useMailAuth = () => {
  const useMailValidateMutation = useMutation({
    mutationFn: async (mailData: string) => {
      const token = localStorage.getItem("accessToken");
      return axios.post(
        apiRoute.USER_VERIFY_EMAIL,
        JSON.stringify({
          email: mailData,
          token: token,
        })
      );
    },
    onSuccess: (res) => {
      const data = res.data;
      console.log("메일 요청 완료");
      return data;
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const useMailResendMutation = useMutation({
    mutationFn: async (mailData: string) => {
      const token = localStorage.getItem("accessToken");
      return axios.post(
        apiRoute.USER_RESEND_EMAIL,
        JSON.stringify({
          email: mailData,
          token: token,
        })
      );
    },
    onSuccess: (res) => {
      const data = res.data;
      console.log("메일 재전송 요청 완료");
      return data;
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return { useMailValidateMutation, useMailResendMutation };
};

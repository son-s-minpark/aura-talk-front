import { useMutation } from "@tanstack/react-query";
import { signType } from "@/type/sign/signType";
import axiosInstance from "@/api/axiosInstance";
import { apiRoute } from "@/api/apiRoute";
import axios from "axios";
import { pwType } from "@/type/sign/pwType";

const useAuth = () => {
  // 회원가입 요청
  const useSignupMutation = useMutation({
    mutationFn: (signupData: signType) => {
      return axios.post(apiRoute.USER, JSON.stringify(signupData));
    },
    onSuccess: (res) => {
      const data = JSON.parse(res.data);
      const token = data.token;
      if (token) {
        localStorage.setItem("accessToken", token);
      } else {
        alert("토큰을 받지 못 했습니다.");
      }
      console.log("회원가입 완료");
      return res.data.success;
    },
    onError: (err) => console.error(err),
  });

  // 로그인 요청
  const useSigninMutation = useMutation({
    mutationFn: async (signinData: signType) => {
      console.error(signinData);
      return axios.post(apiRoute.USER_LOGIN, JSON.stringify(signinData));
    },
    onSuccess: (res) => {
      const data = JSON.parse(res.data);
      const token = data.token;
      if (token) {
        localStorage.setItem("accessToken", token);
      } else {
        alert("토큰을 받지 못 했습니다.");
      }
      console.log("로그인 완료");
      return res.data.success;
    },
    onError: (err) => console.error(err),
  });

  // 로그아웃 요청
  const useLogoutMutation = useMutation({
    mutationFn: async () => {
      return axiosInstance.delete(apiRoute.USER_LOGOUT);
    },
    onSuccess: (res) => {
      const data = JSON.parse(res.data);
      if (data.success) {
        localStorage.removeItem("accessToken");
      }
      alert("로그아웃 상공");
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
        const data = JSON.parse(res.data);
        if (data.success) {
          localStorage.removeItem("accessToken");
        }
        alert("회원탈퇴 상공");
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
export default useAuth;

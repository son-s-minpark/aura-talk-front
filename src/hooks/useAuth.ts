import { useMutation } from "@tanstack/react-query";
import { signupType } from "@/type/sign/signupType";
import { signinType } from "@/type/sign/signinType";
import axiosInstance from "@/api/axiosInstance";
import { apiRoute } from "@/api/apiRoute";
import axios from "axios";

const useAuth = () => {
  // 회원가입 요청
  const useSignupMutation = useMutation({
    mutationFn: (signupData: signupType) => {
      return axios.post(apiRoute.USER, JSON.stringify(signupData));
    },
    onSuccess: (res) => {
      return res;
    },
    onError: (err) => console.error(err),
  });

  // 로그인 요청
  const useSigninMutation = useMutation({
    mutationFn: async (signinData: signinType) => {
      return axios.post(apiRoute.USER_LOGIN, signinData);
    },
    onSuccess: (res) => {
      return res;
    },
    onError: (err) => console.error(err),
  });
  return { useSigninMutation, useSignupMutation };
};
export default useAuth;

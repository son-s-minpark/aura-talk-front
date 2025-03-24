import { useMutation } from "@tanstack/react-query";
import { signupType } from "@/type/sign/signupType";
import { signinType } from "@/type/sign/signiniType";
import axiosInstance from "@/api/axiosInstance";

const API = "/api/users";

const useAuth = () => {
  // 회원가입 요청
  const useSignupMutation = useMutation({
    mutationFn: (signupData: signupType) => {
      return axiosInstance.post(API, signupData);
    },
    onSuccess: (res) => {
      return res;
    },
    onError: (err) => console.error(err),
  });

  // 로그인 요청
  const useSigninMutation = useMutation({
    mutationFn: async (signinData: signinType) => {
      return axiosInstance.post(`${API}/login`, signinData);
    },
    onSuccess: (res) => {
      return res;
    },
    onError: (err) => console.error(err),
  });
  return { useSigninMutation, useSignupMutation };
};
export default useAuth;

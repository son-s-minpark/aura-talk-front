import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { signupType } from "@/type/sign/signupType";
import { signinType } from "@/type/sign/signiniType";
// import React from 'react';

const API = "/api/users";

const useAuth = () => {
  // 회원가입 요청
  const useSignupMutation = useMutation({
    mutationFn: (signupData: signupType) => {
      return axios.post(API, signupData);
    },
    onSuccess: (res) => {
      if (res.status == 201) {
        return res.data;
      } else {
        return res;
      }
    },
    onError: (err) => {
      return err;
    },
  });

  // 로그인 요청
  const useSigninMutation = useMutation({
    mutationFn: async (signinData: signinType) => {
      return axios.post(`${API}/login`, signinData);
    },
    onSuccess: (res) => {
      if (res.status == 201) {
        return res.data;
      } else {
        return res;
      }
    },
    onError: (err) => {
      return err;
    },
  });
  return { useSigninMutation, useSignupMutation };
};
export default useAuth;

import { useMutation } from "@tanstack/react-query";
import { signType } from "@/type/sign/signType";
import axiosInstance from "@/util/api/axiosInstance";
import { apiRoute } from "@/util/api/apiRoute";
import axios from "axios";
import { useDispatch } from "react-redux";
import { persistor } from "@/store/store";
import { setUser } from "@/store/user/setUser";

export const useAuth = () => {
  const dispatch = useDispatch();

  // 회원가입 요청
  const useSignup = useMutation({
    mutationFn: async (signupData: signType) => {
      return await axios
        .post(apiRoute.USER_SIGNIN, signupData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          const data = res.data;
          console.error(res);

          if (data.success) {
            const token = data.data.token;

            if (token) {
              localStorage.setItem("accessToken", token);
              dispatch(setUser(data.data));

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
  const useSignin = useMutation({
    mutationFn: async (signinData: signType) => {
      return await axios
        .post(apiRoute.USER_LOGIN, signinData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          const data = res.data;

          if (data.success) {
            const token = data.data.token;
            const user = data.data.user;

            if (token) {
              localStorage.setItem("accessToken", token);
              dispatch(setUser(user));
            } else {
              alert("토큰을 받지 못 했습니다.");
              throw new Error(data);
            }

            return {
              success: true,
              profileSet:
                user.username == "임시 사용자명" &&
                user.nickname == "임시 닉네임",
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
  const useLogout = useMutation({
    mutationFn: async () => {
      return await axiosInstance
        .post(apiRoute.USER_LOGOUT)

        .then((res) => {
          const { data } = res;
          if (data.success) {
            persistor.purge();
            return { success: true };
          } else {
            throw new Error("Logout failed");
          }
        })
        .catch((err) => {
          console.error("signup error:", err);
          throw err;
        });
    },
  });

  // 회원탈퇴 요청
  const useDeleteAccout = useMutation({
    mutationFn: async (pwData: string) => {
      return await axiosInstance
        .delete(apiRoute.USER_DELETE_ACCOUNT, { data: pwData })
        .then((res) => {
          console.error("signout ERror", res);
          const { data } = res;
          if (data.success) {
            persistor.purge();
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
    useSignin,
    useSignup,
    useLogout,
    useDeleteAccout,
  };
};

// 메일 인증 관련 요청
export const useMailAuth = () => {
  const token = localStorage.getItem("accessToken") || "";

  // 인증 요청 메일 보내기
  const useMailValidate = useMutation({
    mutationFn: async (mail: string) => {
      return await axios.post(apiRoute.USER_VERIFY_EMAIL, {
        email: mail,
        token: token,
      });
    },
  });

  // 인증 요청 매일 다시 보내기
  const useMailResend = useMutation({
    mutationFn: async (mail: string) => {
      return await axios.post(apiRoute.USER_RESEND_EMAIL, {
        email: mail,
        token: token,
      });
    },
  });

  return { useMailValidate, useMailResend };
};

"use client";
import React, { useState } from "react";
import { ProfileInput, PwInput } from "@/components/common/ProfileInput";
import SignBtn from "@/components/onboarding/SignBtn";
import Back from "@/components/onboarding/Back";
import { validateMail, validatePw } from "@/util/validate/signValidate";
import { useAuth } from "@/hooks/useAuth";
import ErrorMessage from "@/components/common/ErrorMessage";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import useUserStore from "@/state/user/useUserStore";
import useProfileStore from "@/state/sign/useProfileStore";
import { useSetPageStore } from "@/state/sign/usetSetPageStore";
const Signin = () => {
  const [mail, setMail] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const [isMailValid, setIsMailValid] = useState<boolean>(true);
  const [isPwValid, setIsPwValid] = useState<boolean>(true);
  const [errMsg, setErrMsg] = useState<string>("");
  const { useSigninMutation } = useAuth();
  const { setUserData } = useUserStore();
  const { setProfileData } = useProfileStore();
  const { setPage } = useSetPageStore();
  const router = useRouter();

  function onChageMail(e: React.ChangeEvent<HTMLInputElement>) {
    setMail(e.target.value);
  }

  function onChagePw(e: React.ChangeEvent<HTMLInputElement>) {
    setPw(e.target.value);
  }

  function validateEmail() {
    const mailError = validateMail(mail);
    setIsMailValid(!mailError);
    if (mailError) {
      setErrMsg(mailError);
    }
    return !mailError;
  }

  function validatePassword() {
    const pwError = validatePw(pw);
    setIsPwValid(!pwError);
    if (pwError) {
      setErrMsg(pwError);
      return false;
    }
    return true;
  }

  function isFull() {
    return mail !== "" && pw !== "";
  }

  function isSigninValid() {
    const isPasswordValid = validatePassword();
    const isEmailValid = validateEmail();
    if (isEmailValid && isPasswordValid) {
      setErrMsg("");
    }
    return isEmailValid && isPasswordValid;
  }

  async function onSubmit() {
    if (!isFull()) {
      return; // 이메일과 비밀번호가 모두 입력되지 않으면 아무 작업도 하지 않음
    }
    if (isSigninValid()) {
      try {
        const res = await useSigninMutation.mutateAsync({
          email: mail,
          password: pw,
        });
        const data = res.data;
        console.error(data);
        if (data.success) {
          const token = data.data.token;
          const userData = data.data.user;
          if (token) {
            localStorage.setItem("accessToken", token);
            localStorage.setItem("userId", userData.id);
          } else {
            alert("토큰을 받지 못 했습니다.");
            return;
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
          if (
            userData.username == "임시 사용자명" &&
            userData.nickname == "임시 닉네임"
          ) {
            const answer = confirm(
              "프로필이 설정되어 있지 않습니다. 설정하러 가시겠습니까?"
            );
            if (answer) {
              setPage("profile");
            } else {
              router.push("/home");
            }
          } else {
            router.push("/home");
          }
        }
      } catch (error: unknown) {
        const err = error as AxiosError;
        console.error(err);
      }
    }
  }

  return (
    <div className="w-full h-full">
      <Back backComponent={"onBoarding"} />
      <div className="flex flex-col items-center mt-[69px]">
        <div className="text-center">
          <p className="text-[20px] font-bold text-white leading-[20px]">
            로그인하기
          </p>
          <div className="text-[#DBDBDB] text-[14px] mt-[19px] leading-[20px]">
            <p>다시 만나서 반가워요!</p>
            <p>친구들의 소식을 확인하러 가볼까요?</p>
          </div>
        </div>

        <div className="mt-[40px] text-white">
          <ProfileInput
            label="이메일"
            value={mail}
            onChange={onChageMail}
            isValid={isMailValid}
          />

          <PwInput
            label="비밀번호"
            value={pw}
            onChange={onChagePw}
            isValid={isPwValid}
          />

          <div className="flex justify-center">
            {errMsg != "" && <ErrorMessage msg={errMsg} />}
          </div>
        </div>

        <div className="mt-[277px]">
          <SignBtn value="로그인" isFull={isFull()} onClick={onSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Signin;

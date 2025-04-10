"use client";
import React, { useState } from "react";
import { ProfileInput, PwInput } from "@/components/common/ProfileInput";
import SignBtn from "@/components/onboarding/SignBtn";
import Back from "@/components/onboarding/Back";
import { validateMail, validatePw } from "@/util/validate/signValidate";
import useAuth from "@/hooks/useAuth";
import ErrorMessage from "@/components/common/ErrorMessage";

const Signin = () => {
  const [mail, setMail] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const [isMailValid, setIsMailValid] = useState<boolean>(true);
  const [isPwValid, setIsPwValid] = useState<boolean>(true);
  const [errMsg, setErrMsg] = useState<string>("");
  const { useSigninMutation } = useAuth();

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
      const res = await useSigninMutation.mutateAsync({ mail, pw });
      console.error(res);
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
            isValid={isMailValid} // 이메일 유효성 상태 전달
          />

          <PwInput
            label="비밀번호"
            value={pw}
            onChange={onChagePw}
            isValid={isPwValid} // 비밀번호 유효성 상태 전달
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

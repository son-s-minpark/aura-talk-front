"use client";
import React, { useState } from "react";
import Input from "@/components/sign/Input";
import SignBtn from "@/components/sign/SignBtn";
import Back from "@/components/sign/Back";
import { mailSchema, pwSchema } from "@/schema/signSchema";
import { setPageType } from "@/type/onboarding/setPageType";
import useAuth from "@/hooks/useAuth";

const Signin = ({ setPage }: setPageType) => {
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

  function validateMail() {
    const result = mailSchema.shape.mail.safeParse(mail);
    if (!result.success) {
      setIsMailValid(false);
      return result.error.errors[0].message;
    }
    setIsMailValid(true);
    return "";
  }

  function validatePw() {
    const result = pwSchema.shape.pw.safeParse(pw);
    if (!result.success) {
      setIsPwValid(false);
      return result.error.errors[0].message;
    }
    setIsPwValid(true);
    return "";
  }

  function isFull() {
    return mail !== "" && pw !== "";
  }

  function isSigninValid() {
    const mailError = validateMail();
    const pwError = validatePw();
    if (mailError || pwError) {
      setErrMsg(
        mailError && pwError
          ? "이메일과 비밀번호의 양식이 올바르지 않습니다."
          : mailError || pwError
      );
      return false;
    }
    setErrMsg("");
    return true;
  }

  async function onSubmit() {
    if (!isFull()) {
      return;
    }
    if (isSigninValid()) {
      const res = await useSigninMutation.mutate({ mail, pw });
    }
  }

  return (
    <div className="w-full h-full">
      <Back setPage={setPage} backComponent={"onBoarding"} />
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
          <Input
            label="이메일"
            value={mail}
            onChange={onChageMail}
            type="text"
            isValid={isMailValid}
          />

          <Input
            label="비밀번호"
            value={pw}
            onChange={onChagePw}
            type="password"
            isValid={isPwValid}
          />

          <div className="flex justify-center">
            {errMsg == "" ? null : (
              <p className="text-[#C81919] text-[12px] mt-[10px]"> {errMsg}</p>
            )}
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

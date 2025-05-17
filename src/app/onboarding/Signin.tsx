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
import { useSetPageStore } from "@/state/sign/usetSetPageStore";
import Introduction from "@/components/onboarding/Introduction";

const Signin = () => {
  const [mail, setMail] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const [isMailValid, setIsMailValid] = useState<boolean>(true);
  const [isPwValid, setIsPwValid] = useState<boolean>(true);
  const [errMsg, setErrMsg] = useState<string>("");
  const { useSigninMutation } = useAuth();
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
        if (res.success) {
          if (res.profileSet) {
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
        const status = err.response?.status;

        // 예외 처리
        switch (status) {
          case 401:
            setErrMsg("아이디나 비밀번호가 다릅니다.");
            break;
          case 404:
            setErrMsg("존재하지 않는 계정입니다.");
            break;
          default:
            setErrMsg("알 수 없는 오류가 발생했습니다.");
            break;
        }
        setIsMailValid(false);
        setIsPwValid(false);
      }
    }
  }

  return (
    <div className="w-full h-full flex flex-col">
      <Back backComponent={"onBoarding"} />

      <div className="flex-1 flex flex-col pt-[69px]">
        <Introduction page="signin" />

        <div className="flex-grow flex flex-col justify-between px-[24px] text-white pt-[70px]">
          <div className="flex flex-col">
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

          <SignBtn value="로그인" isFull={isFull()} onClick={onSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Signin;

"use client";
import React, { useState } from "react";
import { ProfileInput, PwInput } from "@/components/common/ProfileInput";
import SignBtn from "@/components/onboarding/SignBtn";
import Back from "@/components/onboarding/Back";
import useSignupStore from "@/state/sign/useSignupStore";
import { useAuth } from "@/hooks/useAuth";
import ValidateModal from "@/components/onboarding/modal/ValidateModal";
import { validateMail, validatePw } from "@/util/validate/signValidate";
import ErrorMessage from "@/components/common/ErrorMessage";
import { AxiosError } from "axios";
import Introduction from "@/components/onboarding/Introduction";

const Signup = () => {
  const { setSignupData, signupData } = useSignupStore();
  const { useSignupMutation } = useAuth();
  const [mail, setMail] = useState<string>(signupData.email);
  const [pw, setPw] = useState<string>(signupData.password);
  const [checkPw, setCheckPw] = useState<string>(signupData.password);
  const [isMailValid, setIsMailValid] = useState<boolean>(true);
  const [isPwValid, setIsPwValid] = useState<boolean>(true);
  const [errMsg, setErrMsg] = useState<string>("");
  const [isValidateModalDown, setIsValidateModalDown] =
    useState<boolean>(false);

  function onChangeMail(e: React.ChangeEvent<HTMLInputElement>) {
    setMail(e.target.value);
  }

  function onChangePw(e: React.ChangeEvent<HTMLInputElement>) {
    setPw(e.target.value);
  }

  function onChangeCheckPw(e: React.ChangeEvent<HTMLInputElement>) {
    setCheckPw(e.target.value);
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

    if (pw !== checkPw) {
      setIsPwValid(false);
      setErrMsg("비밀번호가 일치하지 않습니다.");
      return false;
    }

    return true;
  }

  function isFull() {
    return mail !== "" && pw !== "" && checkPw !== "";
  }

  function isSignupValid() {
    const isPasswordValid = validatePassword();
    const isEmailValid = validateEmail();
    return isEmailValid && isPasswordValid;
  }

  async function onSubmit() {
    if (!isFull()) {
      return; // 빈 칸이 있으면 아무 작업도 하지 않음
    }
    if (isSignupValid()) {
      setSignupData({
        email: mail,
        password: pw,
      });

      try {
        const res = await useSignupMutation.mutateAsync({
          email: mail,
          password: pw,
        });
        if (res.success) {
          setIsValidateModalDown(true);
        } else {
          console.error("sign up page Error", res);
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
          case 409:
            setErrMsg("이미 존재하는 메일 계정입니다.");
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
      {isValidateModalDown && (
        <div className="modal" onClick={() => setIsValidateModalDown(false)}>
          <ValidateModal />
        </div>
      )}
      <Back backComponent={"onBoarding"} />

      <div className="flex-1 flex flex-col pt-[69px]">
        <Introduction page="signup" />

        <div className="flex-grow flex flex-col justify-between px-[24px] text-white pt-[37px]">
          <div className="flex flex-col">
            <ProfileInput
              label="이메일"
              value={mail}
              onChange={onChangeMail}
              isValid={isMailValid}
            />

            <>
              <PwInput
                label="비밀번호"
                value={pw}
                onChange={onChangePw}
                isValid={isPwValid}
              />
              <p className="text-[10px] mt-[6px]">
                * 비밀번호는 대소문자, 특수문자, 숫자를 포함해 6자 이상이어야
                합니다
              </p>
            </>

            <PwInput
              label="비밀번호 확인"
              value={checkPw}
              onChange={onChangeCheckPw}
              isValid={isPwValid}
            />

            <div className="flex justify-center">
              {errMsg != "" && <ErrorMessage msg={errMsg} />}
            </div>
          </div>
          <SignBtn value="완료" isFull={isFull()} onClick={onSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Signup;

"use client";
import React, { useState } from "react";
import { ProfileInput, PwInput } from "@/components/common/ProfileInput";
import SignBtn from "@/components/onboarding/SignBtn";
import Back from "@/components/onboarding/Back";
import useSignupState from "@/state/signState/useSignupState";
import { useAuth } from "@/hooks/useAuth";
import ValidateModal from "@/components/onboarding/modal/ValidateModal";
import { validateMail, validatePw } from "@/util/validate/signValidate";
import ErrorMessage from "@/components/common/ErrorMessage";
import { AxiosError } from "axios";

const Signup = () => {
  const { updateSignupState, signupData } = useSignupState();
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
      // 모든 유효성 검사를 통과했을 때
      updateSignupState({
        email: mail,
        password: pw,
      });

      try {
        const res = await useSignupMutation.mutateAsync({
          email: mail,
          password: pw,
        });
        if (res.data.success) {
          const token = res.data.data.token;
          if (token) {
            localStorage.setItem("accesToken", token);
          } else {
            alert("토큰을 받지 못 했습니다.");
          }
          localStorage.setItem("userId", res.data.data.userId);
          setIsValidateModalDown(true);
        }
      } catch (error: unknown) {
        const err = error as AxiosError;
        if (err.response?.status == 409) {
          setErrMsg("이미 존재하는 이메일입니다.");
        }
      }
    }
  }

  return (
    <div className="w-full h-full">
      {isValidateModalDown && (
        <div className="modal" onClick={() => setIsValidateModalDown(false)}>
          <ValidateModal />
        </div>
      )}
      <Back backComponent={"onBoarding"} />
      <div className="flex flex-col items-center mt-[69px]">
        <p className="text-[20px] font-bold text-white leading-[20px]">
          회원가입하기
        </p>
        <div className="text-[#DBDBDB] text-[14px] text-center mt-[19px] leading-[20px]">
          <p>만나서 반가워요!</p>
          <p>새로운 친구들을 만들러 가볼까요?</p>
        </div>
      </div>
      <div className="flex flex-col mt-[37px] text-white items-center">
        <div className="w-[327px]">
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
        <div className="mt-[192px] flex items-center">
          <SignBtn value="완료" isFull={isFull()} onClick={onSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Signup;

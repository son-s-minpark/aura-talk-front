import React, { useState } from "react";
import Input from "@/components/onboarding/Input";
import SignBtn from "@/components/onboarding/SignBtn";
import Back from "@/components/onboarding/Back";
import useSignupState from "@/state/signState/useSignupState";
import { mailSchema, pwSchema } from "@/schema/signSchema";
import useAuth from "@/hooks/useAuth";
import ValidateModal from "@/components/onboarding/modal/ValidateModal";
import { redirect } from "next/navigation";

const Signup = () => {
  const { updateSignupState, signupData } = useSignupState();
  const { useSignupMutation } = useAuth();
  const [mail, setMail] = useState<string>(signupData.mail);
  const [pw, setPw] = useState<string>(signupData.pw);
  const [checkPw, setCheckPw] = useState<string>(signupData.pw);
  const [isMailValid, setIsMailValid] = useState<boolean>(true);
  const [isPwValid, setIsPwValid] = useState<boolean>(true);
  const [isCheckPwValid, setIsCheckPwValid] = useState<boolean>(true);

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

  function validateCheckPw() {
    if (checkPw !== pw) {
      setIsCheckPwValid(false);
      return "비밀번호와 비밀번호 확인이 일치하지 않습니다.";
    }
    setIsCheckPwValid(true);
    return "";
  }

  function isFull() {
    return checkPw !== "" && pw !== "" && mail !== "";
  }

  function isSignupValid() {
    const mailError = validateMail();
    const pwError = validatePw();

    if (mailError || pwError) {
      setErrMsg(
        mailError && pwError
          ? "이메일과 비밀번호의 양식이 올바르지 않습니다."
          : mailError || pwError
      );
      validateCheckPw();
      return false;
    }

    const checkPwError = validateCheckPw();
    if (checkPwError) {
      setErrMsg(checkPwError);
      return false;
    }

    setErrMsg("");
    return true;
  }

  function onSubmit() {
    if (!isFull()) {
      // 값이 빈 곳이 있을 때 아무것도 하지 않음
      return;
    } else {
      if (isSignupValid()) {
        // 모든 유효성 검사를 통과했을 때
        updateSignupState({
          mail: mail,
          pw: pw,
        });
        setIsValidateModalDown(true);
        useSignupMutation.mutate({ mail: mail, pw: pw });
        redirect("/home");
      }
    }
  }

  return (
    <div className="w-full h-full">
      {isValidateModalDown && (
        <div className="modal" onClick={() => setIsValidateModalDown(false)}>
          <ValidateModal mail={mail} />
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
        <div>
          <Input
            label="이메일"
            value={mail}
            onChange={onChangeMail}
            type="text"
            isValid={isMailValid}
          />

          <div>
            <Input
              label="비밀번호"
              value={pw}
              onChange={onChangePw}
              type="password"
              isValid={isPwValid}
            />
            <p className="text-[10px] mt-[6px]">
              * 비밀번호는 대소문자, 특수문자를 포함해 6자 이상이어야 합니다
            </p>
          </div>

          <Input
            label="비밀번호 확인"
            value={checkPw}
            onChange={onChangeCheckPw}
            type="password"
            isValid={isCheckPwValid}
          />

          <div className="flex justify-center">
            {errMsg === "" ? null : (
              <p className="text-[#C81919] text-[12px] mt-[10px]"> {errMsg}</p>
            )}
          </div>
        </div>
        <div className="mt-[192px]">
          <SignBtn value="완료" isFull={isFull()} onClick={onSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Signup;

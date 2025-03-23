import React, { useState } from "react";
import Input from "@/components/sign/Input";
import SignBtn from "@/components/sign/SignBtn";
import Back from "@/components/common/Back";
import useSignupState from "@/state/useSignupState";
import z from "zod";

type SignupProps = {
  setPage: React.Dispatch<
    React.SetStateAction<
      "onBoarding" | "signin" | "signup" | "profile" | "profileImg"
    >
  >;
};

const SignupSchema = z.object({
  mail: z
    .string()
    .nonempty({ message: "메일을 입력해주세요." })
    .email({ message: "올바르지 않은 메일 형식입니다." }),
  pw: z
    .string()
    .min(6, { message: "비밀번호는 최소 6자 이상이어야 합니다." })
    .nonempty({ message: "비밀번호를 입력해주세요." })
    .regex(
      /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/,
      "비밀번호는 특수문자, 대문자, 숫자가 포함되어야 합니다."
    ),
  checkPw: z
    .string()
    .nonempty({ message: "비밀번호 확인 창에 다시 입력해주세요." }),
});

const Signup = ({ setPage }: SignupProps) => {
  const { updateSignupState, signupData } = useSignupState();
  const [mail, setMail] = useState<string>(signupData.mail);
  const [pw, setPw] = useState<string>(signupData.pw);
  const [checkPw, setCheckPw] = useState<string>(signupData.pw);
  const [isMailValid, setIsMailValid] = useState<boolean>(true);
  const [isPwValid, setIsPwValid] = useState<boolean>(true);
  const [isCheckPwValid, setIsCheckPwValid] = useState<boolean>(true);

  const [errMsg, setErrMsg] = useState<string>("");

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
    const result = SignupSchema.shape.mail.safeParse(mail);
    if (!result.success) {
      setIsMailValid(false);
      return result.error.errors[0].message;
    }
    setIsMailValid(true);
    return "";
  }

  function validatePw() {
    const result = SignupSchema.shape.pw.safeParse(pw);
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
        setPage("profile");
      }
    }
  }

  return (
    <div className="w-full h-full">
      <Back setPage={setPage} backComponent={"onBoarding"} />
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

          <Input
            label="비밀번호"
            value={pw}
            onChange={onChangePw}
            type="password"
            isValid={isPwValid}
          />

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

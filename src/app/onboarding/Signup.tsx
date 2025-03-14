"use client";
import React, { useState } from "react";
import Input from "@/components/sign/Input";
import SignBtn from "@/components/sign/SignBtn";
import Back from "@/components/sign/Back";
import useSignupState from "@/state/useSignupState";

type SignupProps = {
  setPage: React.Dispatch<
    React.SetStateAction<
      "onBoarding" | "signin" | "signup" | "profile" | "profileImg"
    >
  >;
};

const Signup = ({ setPage }: SignupProps) => {
  const { updateSignupState, signupData } = useSignupState();
  const [mail, setMail] = useState<string>(signupData.mail);
  const [pw, setPw] = useState<string>(signupData.pw);
  const [checkPw, setCheckPw] = useState<string>(signupData.pw);

  function onChangeMail(e: React.ChangeEvent<HTMLInputElement>) {
    setMail(e.target.value);
  }

  function onChangePw(e: React.ChangeEvent<HTMLInputElement>) {
    setPw(e.target.value);
  }

  function onChangeCheckPw(e: React.ChangeEvent<HTMLInputElement>) {
    setCheckPw(e.target.value);
  }

  function isFull() {
    return checkPw != signupData && pw != signupData && mail != signupData;
  }

  function isSignupValid() {
    // const emailRegEx =
    //   /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
    // const pwRegEx = /^[A-Za-z0-9]{8,20}$/;

    // return emailRegEx.test(mail) && pwRegEx.test(pw) && pw == checkPw;
    return true;
  }

  function onSubmit() {
    if (!isFull) {
    } else {
      if (!isSignupValid()) {
        console.log(isSignupValid());
      } else {
        console.log(isSignupValid());
        updateSignupState({
          mail: mail,
          pw: pw,
        });
        console.log(useSignupState.getState().signupData);
        setPage("profile");
      }
    }
  }

  return (
    <div className="w-full h-full">
      <Back setPage={setPage} backComponent={"onBoarding"} />
      <div className="flex flex-col items-center">
        <div>
          <p className="text-[20px] font-bold text-white">회원가입하기</p>
        </div>
        <div className="text-[#DBDBDB] text-[14px] text-center mt-[19px]">
          <p>만나서 반가워요!</p>
          <p>새로운 친구들을 만들러 가볼까요?</p>
        </div>
      </div>
      <div className="flex flex-col mt-[70px] text-white items-center">
        <div className="mb-[192px]">
          <Input
            label="이메일"
            value={mail}
            onChange={onChangeMail}
            type="text"
          />

          <Input
            label="비밀번호"
            value={pw}
            onChange={onChangePw}
            type="password"
          />

          <Input
            label="비밀번호 확인"
            value={checkPw}
            onChange={onChangeCheckPw}
            type="password"
          />
        </div>
        <SignBtn value="완료" isFull={isFull()} onClick={onSubmit} />
      </div>
    </div>
  );
};

export default Signup;

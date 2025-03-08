"use client";
import React, { useState } from "react";
import Input from "@/components/sign/Input";
import { IoArrowBackOutline } from "react-icons/io5";
import SignBtn from "@/components/sign/SignBtn";

interface SignupProps {
  setPage: React.Dispatch<
    React.SetStateAction<"onBoarding" | "signin" | "signup" | "profile">
  >;
}

const Signup = ({ setPage }: SignupProps) => {
  const [mail, setMail] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const [checkPw, setCheckPw] = useState<string>("");

  function onChageMail(e: React.ChangeEvent<HTMLInputElement>) {
    setMail(e.target.value);
  }

  function onChagePw(e: React.ChangeEvent<HTMLInputElement>) {
    setPw(e.target.value);
  }

  function onChageCheckPw(e: React.ChangeEvent<HTMLInputElement>) {
    setCheckPw(e.target.value);
  }

  function isFull() {
    return checkPw != "" && pw != "" && mail != "";
  }

  // function onSubmit(e: React.MouseEvent<HTMLButtonElement>) {
  //   e.preventDefault();
  //   // 대충 회원가입 요청 코드
  // }

  return (
    <div>
      <div className="h-[76px] w-full">
        <button onClick={() => setPage("onBoarding")}>
          <IoArrowBackOutline width={24} height={24} className="text-white" />
        </button>
      </div>
      <div>
        <div className="">
          <p className="text-[20px] font-bold text-white">회원가입하기</p>
        </div>
        <div className="text-[#DBDBDB] text-[14px]">
          <p>만나서 반가워요!</p>
          <p>새로운 친구들을 만들러 가볼까요?</p>
        </div>
      </div>
      <div className="flex flex-col mt-[70px] text-white">
        <div className="mb-[192px]">
          <Input
            label="이메일"
            value={mail}
            onChange={onChageMail}
            type="text"
          />

          <Input
            label="비밀번호"
            value={pw}
            onChange={onChagePw}
            type="password"
          />

          <Input
            label="비밀번호 확인"
            value={checkPw}
            onChange={onChageCheckPw}
            type="password"
          />
        </div>

        <SignBtn
          value="완료"
          isFull={isFull()}
          onClick={() => setPage("profile")}
        />
      </div>
    </div>
  );
};

export default Signup;

"use client";
import React, { useState } from "react";
import Input from "@/components/sign/Input";
import { IoArrowBackOutline } from "react-icons/io5";
import SignBtn from "@/components/sign/SignBtn";

interface SigninProps {
  setPage: React.Dispatch<
    React.SetStateAction<"onBoarding" | "signin" | "signup" | "profile">
  >;
}

const Signin = ({ setPage }: SigninProps) => {
  const [mail, setMail] = useState<string>("");
  const [pw, setPw] = useState<string>("");

  function onChageMail(e: React.ChangeEvent<HTMLInputElement>) {
    setMail(e.target.value);
  }

  function onChagePw(e: React.ChangeEvent<HTMLInputElement>) {
    setPw(e.target.value);
  }

  function isFull() {
    return mail != "" && pw != "";
  }

  function onSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    // 대충 로그인 요청 코드
  }

  return (
    <div className="w-full h-full">
      <div className="h-[76px] w-full">
        <button onClick={() => setPage("onBoarding")}>
          <IoArrowBackOutline width={24} height={24} className="text-white" />
        </button>
      </div>
      <div className="mt-[69px] flex flex-col items-center">
        <div>
          <div className="">
            <p className="text-[20px] font-bold text-white">로그인하기</p>
          </div>
          <div className="text-[#DBDBDB] text-[14px]">
            <p>다시 만나서 반가워요!</p>
            <p>친구들의 소식을 확인하러 가볼까요?</p>
          </div>
        </div>
        <div className="mt-[70px] mb-[148px] text-white">
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
        </div>
        <SignBtn value="로그인" isFull={isFull()} onClick={() => onSubmit} />
      </div>
    </div>
  );
};

export default Signin;

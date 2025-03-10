"use client";
import React, { useState } from "react";
import Input from "@/components/sign/Input";
import SignBtn from "@/components/sign/SignBtn";
import Back from "@/components/sign/Back";

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
      <Back setPage={setPage} backComponent={"onBoarding"} />
      <div className="mt-[69px] flex flex-col items-center">
        <div>
          <div>
            <p className="text-[20px] font-bold text-white">로그인하기</p>
          </div>
          <div className="text-[#DBDBDB] text-[14px] text-center mt-[19px]">
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

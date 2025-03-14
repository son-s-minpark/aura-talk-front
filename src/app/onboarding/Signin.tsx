"use client";
import React, { useState } from "react";
import Input from "@/components/sign/Input";
import SignBtn from "@/components/sign/SignBtn";
import Back from "@/components/sign/Back";

type SigninProps = {
  setPage: React.Dispatch<
    React.SetStateAction<
      "onBoarding" | "signin" | "signup" | "profile" | "profileImg"
    >
  >;
};

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

  function onSubmit() {
    // 대충 로그인 요청 코드
  }

  return (
    <div className="w-full h-full">
      <Back setPage={setPage} backComponent={"onBoarding"} />
      <div className="flex flex-col items-center">
        <div className="text-center">
          <p className="text-[20px] font-bold text-white ">로그인하기</p>
          <div className="text-[#DBDBDB] text-[14px] mt-[19px]">
            <p>다시 만나서 반가워요!</p>
            <p>친구들의 소식을 확인하러 가볼까요?</p>
          </div>
        </div>

        <div className="mt-[70px] text-white">
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

        <div className="mt-[277px]">
          <SignBtn value="로그인" isFull={isFull()} onClick={onSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Signin;

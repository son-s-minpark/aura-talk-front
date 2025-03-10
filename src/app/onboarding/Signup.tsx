"use client";
import React, { useState } from "react";
import Input from "@/components/sign/Input";
import SignBtn from "@/components/sign/SignBtn";
import Back from "@/components/sign/Back";

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
    <div className="w-full h-full">
      <Back setPage={setPage} backComponent={"onBoarding"} />
      <div className="mt-[69px] flex flex-col items-center">
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

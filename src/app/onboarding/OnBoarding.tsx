import React from "react";
// import Image from "next/image";
import SignBtn from "@/components/sign/SignBtn";

type OnBoardingProps = {
  setPage: React.Dispatch<
    React.SetStateAction<
      "onBoarding" | "signin" | "signup" | "profile" | "profileImg"
    >
  >;
};

const OnBoarding = ({ setPage }: OnBoardingProps) => {
  return (
    <div>
      {/* <Image src={Logo-white}/> */}
      <div className="text-white text-[68px] font-extrabold">
        <p>Let&apos;s</p>
        <p>Keep</p>
        <p>In</p>
        <p>Touch!</p>
      </div>
      <div className="text-[#999999] font-semibold">
        <p>관심사를 토대로 새로운 친구들과 소통하고</p>
        <p>새로운 친구들도 사귀어서</p>
        <p>자신의 범위를 넓혀보세요!</p>
      </div>
      <div className="flex">
        <SignBtn
          value="로그인하기"
          isFull={true}
          onClick={() => setPage("signin")}
        />
      </div>
      <div className="w-[315px] h-[14px] text-white">
        <div className="flex w-[132px] bg-[#CDD1D0] h-[1px]" />
        <span> or </span>
        <div />
      </div>
      <div className="text-[14px] mt-[28px]">
        <span className="text-[#B9C1BE]"> 계정이 없으신가요? </span>
        <span
          className="text-white underline"
          onClick={() => setPage("signup")}
        >
          회원가입
        </span>
      </div>
    </div>
  );
};

export default OnBoarding;

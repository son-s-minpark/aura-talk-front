import React from "react";
import Image from "next/image";
import logoWhite from "../../../public/images/logo-white.png";
import SignBtn from "@/components/onboarding/SignBtn";
import { setPageType } from "@/type/sign/setPageType";

const OnBoarding = ({ setPage }: setPageType) => {
  return (
    <div className="w-full h-full pt-[25px] px-[24px] overflow-scroll">
      <div className="-ml-[16px]">
        <Image src={logoWhite} alt="로고 이미지" className="w-[147px]" />
      </div>
      <div className="text-white text-[68px] font-extrabold leading-[78px] mt-[73px]">
        <p>Let&apos;s</p>
        <p>Keep</p>
        <p>In</p>
        <p>Touch!</p>
      </div>
      <div className="text-[#999999] font-semibold mt-[16px]">
        <p>관심사를 토대로 친구들과 소통하고</p>
        <p>새로운 친구들도 사귀어서</p>
        <p>자신의 범위를 넓혀보세요!</p>
      </div>
      <div className="mt-[69px]">
        <SignBtn
          value="로그인하기"
          isFull={true}
          onClick={() => setPage("signin")}
        />
      </div>
      <div className="flex items-center justify-center w-[315px] h-[14px]">
        <div className="flex w-[132px] bg-[#CDD1D0] h-[1px]" />
        <span className="mx-[7px]  text-white"> or </span>
        <div className="flex w-[132px] bg-[#CDD1D0] h-[1px]" />
      </div>
      <div className="flex justify-center text-[14px] mt-[28px] mb-[60px]">
        <span className="text-[#B9C1BE] mr-[10px]"> 계정이 없으신가요? </span>
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

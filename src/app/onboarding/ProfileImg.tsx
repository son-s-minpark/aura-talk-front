"use client";
import React from "react";
import Back from "@/components/onboarding/Back";
import SignBtn from "@/components/onboarding/SignBtn";
import useSignupState from "@/state/signState/useSignupState";
import InterestBtnList from "@/components/onboarding/InterestBtnList";
import { setPageType } from "@/type/sign/setPageType";
import AddImage from "@/components/common/AddImage";

const ProfileImg = ({ setPage }: setPageType) => {
  const { signupData } = useSignupState();

  return (
    <div className="w-full h-full overflow-scroll text-white">
      <Back setPage={setPage} backComponent={"profile"} />
      <div className="mt-[24px]">
        <p className="text-[20px] font-bold text-white mt-[12px] text-center leading-[20px]">
          프로필 확인
        </p>
        <div className="text-[#DBDBDB] text-[14px] text-center mt-[19px]">
          <p>마지막으로 확인할게요!</p>
          <p>다 맞게 작성했나요?</p>
        </div>
      </div>
      <div className="mt-[35px] mb-[15px]">
        <AddImage imgSize={100} btnHeight={24} btnWidth={54} />
      </div>
      <div className="flex flex-col mt-[55px] ml-[37px] gap-[22px]">
        <div>
          <p className="text-lightGray text-[14px] leading-[14px]">
            사용자 이름
          </p>
          <p className="text-white text-[18px] font-semibold mt-[12px]">
            {signupData.nickname}
          </p>
        </div>
        <div>
          <p className="text-lightGray text-[14px] leading-[14px]">아이디</p>
          <p className="text-white text-[18px] font-semibold mt-[12px]">
            {signupData.username}
          </p>
        </div>
        <div>
          <p className="text-lightGray text-[14px] leading-[14px]">
            한 줄 소개
          </p>
          <p className="text-white text-[18px] font-semibold mt-[12px]">
            {signupData.description}
          </p>
        </div>
        <div>
          <p className="text-lightGray text-[14px] leading-[14px]">관심사</p>
          <div className="w-[300px] mb-[6px] flex-none flex gap-[5px] flex-wrap text-white text-[18px] font-semibold mt-[12px]">
            <InterestBtnList isScrollable={true} />
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-[56px]">
        <SignBtn value="가입하기" isFull={true} />
      </div>
    </div>
  );
};

export default ProfileImg;

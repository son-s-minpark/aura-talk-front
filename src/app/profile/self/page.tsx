"use client";
import React from "react";
import Back from "@/components/common/Back";
import { InterestBtnSml } from "@/components/onboarding/InterestBtn";
import useProfileStore from "@/state/sign/useProfileStore";

const Page = () => {
  const { profileData } = useProfileStore();
  return (
    <div className="w-full h-full bg-[var(--color-point)] flex flex-col justify-between">
      <Back />
      <div className="text-white flex flex-col items-center">
        <div className="y-[139px] flex flex-col items-center">
          <div className="w-[82px] h-[82px] border-1 border-[var(--color-background)] rounded-full">
            {/* 사진 */}
          </div>
          <div className="mt-[20px] flex flex-col items-center">
            <p className="text-[20px] font-bold">{profileData.nickname}</p>
            <p className="text-[12px]">{profileData.username}</p>
          </div>
        </div>
      </div>
      <div className="rounded-t-[20px] bg-[var(--color-background)] h-[502px] flex flex-col gap-[26px] pt-[41px] px-[24px]">
        <div className="flex flex-col gap-[9px]">
          <p className="text-[var(--color-commonGray)]">사용자 이름</p>
          <p className="text-[18px] font-semibold">{profileData.nickname}</p>
        </div>
        <div className="flex flex-col gap-[9px]">
          <p className="text-[var(--color-commonGray)]">한 줄 소개</p>
          <p className="text-[18px] font-semibold">
            {profileData.description
              ? profileData.description
              : "한 줄 소개가 없습니다."}
          </p>
        </div>
        <div className="flex flex-col gap-[9px]">
          <p className="text-[var(--color-commonGray)]">관심사</p>
          <div className="flex w-full gap-[5px]">
            {profileData.interests.map((label, index) => (
              <div key={index}>
                <InterestBtnSml label={label} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

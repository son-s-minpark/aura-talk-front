"use client";
import React, { useState } from "react";
import Back from "@/components/common/Back";
import { InterestBtnSml } from "@/components/onboarding/InterestBtn";
import useProfileStore from "@/state/sign/useProfileStore";
import ProfileEditModal from "@/components/profile/modal/ProfileEditModal";

const Page = () => {
  const [isEditModalDown, setIsEditModalDown] = useState<boolean>(false);
  const { profileData } = useProfileStore();

  console.error(profileData);
  return (
    <div className="w-full h-full bg-[var(--color-point)] flex flex-col justify-between">
      {isEditModalDown && (
        <div className="modal" onClick={() => setIsEditModalDown(false)}>
          <ProfileEditModal setIsModalDown={setIsEditModalDown} />
        </div>
      )}
      <Back />
      <div className="flex flex-col items-center">
        <div className="h-[139px] flex flex-col items-center text-white">
          <div className="w-[82px] h-[82px] border-1 border-[var(--color-background)] rounded-full">
            {/* 사진 */}
          </div>
          <div className="mt-[20px] flex flex-col items-center">
            <p className="text-[20px] font-bold">{profileData.nickname}</p>
            <p className="text-[12px]">{profileData.username}</p>
          </div>
        </div>
        <div>
          <button
            className="bg-[#F3F6F6] rounded-[20px] flex items-center justify-center w-[54px] h-[24px] text-[12px] mb-[25px] mt-[19px]"
            onClick={() => setIsEditModalDown(true)}
          >
            <span className="text-[var(--color-commonGray)] text-[12px]">
              편집
            </span>
          </button>
        </div>
        <div className="rounded-t-[20px] bg-[var(--color-background)] h-[502px] w-full flex flex-col gap-[26px] pt-[41px] px-[24px] overflow-y-scroll">
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
            <div className="flex w-full gap-[10px]">
              {profileData.interests?.map((interest: string, index: number) => (
                <InterestBtnSml label={interest} key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

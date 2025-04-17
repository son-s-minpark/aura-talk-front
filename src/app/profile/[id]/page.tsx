"use client";
import React from "react";
import Back from "@/components/common/Back";
import useProfileStore from "@/state/sign/useProfileStore";
import {
  IoChatbubbleEllipsesSharp,
  IoCall,
  IoPersonAdd,
  IoPersonRemoveSharp,
} from "react-icons/io5";
import { MdBlock } from "react-icons/md";
import { usePathname } from "next/navigation";
import InterestBtnList from "@/components/onboarding/InterestBtnList";

const Page = () => {
  const { profileData } = useProfileStore();
  const { id } = usePathname();
  const isFriend = true;
  return (
    <div className="w-full h-full bg-[var(--color-point)] flex flex-col justify-between">
      <Back />
      <div className="text-white flex flex-col items-center">
        <div className="w-[83px] y-[139px] flex flex-col items-center">
          <div className="w-[82px] h-[82px] border-1 border-[var(--color-background)] rounded-full">
            {/* 사진 */}
          </div>
          <div className="mt-[20px] flex flex-col items-center">
            <p className="text-[20px] font-bold">{profileData.nickname}</p>
            <p className="text-[12px]">{profileData.username}</p>
          </div>
        </div>
        <div className="flex gap-[14px] mt-[9px]">
          <IoChatbubbleEllipsesSharp className="w-[28px] h-[28px]" />
          <IoCall className="w-[28px] h-[28px]" />
          {isFriend ? (
            <IoPersonRemoveSharp className="w-[28px] h-[28px]" />
          ) : (
            <IoPersonAdd className="w-[28px] h-[28px]" />
          )}
          <MdBlock className="w-[28px] h-[28px]" />
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
          <InterestBtnList isScrollable={false} />
        </div>
      </div>
    </div>
  );
};

export default Page;

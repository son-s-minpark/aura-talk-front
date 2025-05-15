"use client";
import React, { useState } from "react";
import Back from "@/components/common/Back";
import useProfileStore from "@/state/user/useProfileStore";
import ProfileEditModal from "@/components/profile/modal/ProfileEditModal";
import InterestBtn from "@/components/profile/InterestBtn";
import Container from "@/components/common/Container";
import useProfileImgStore from "@/state/user/useProfileImgStore";
import Image from "next/image";

const Page = () => {
  const { profileImgData } = useProfileImgStore();
  const [isEditModalDown, setIsEditModalDown] = useState<boolean>(false);
  const { profileData } = useProfileStore();

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
          <div className="w-[82px] h-[82px] border-1 border-[var(--color-background)] rounded-full relative overflow-hidden">
            {profileImgData.thumbnailImgUrl && (
              <Image
                src={profileImgData.thumbnailImgUrl}
                alt="Profile"
                fill
                className="rounded-full object-cover"
              />
            )}
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
        <Container height={502}>
          <div className="w-full flex flex-col gap-[26px] pt-[41px] px-[24px] overflow-y-scroll">
            <div className="flex flex-col gap-[9px]">
              <p className="text-[var(--color-commonGray)]">사용자 이름</p>
              <p className="text-[18px] font-semibold">
                {profileData.nickname}
              </p>
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
              <div className="flex w-full gap-[10px] flex-wrap">
                {profileData.interests?.map(
                  (interest: string, index: number) => (
                    <InterestBtn label={interest} key={index} />
                  )
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Page;

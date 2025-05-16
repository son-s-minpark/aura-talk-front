"use client";
import React from "react";
import { useParams } from "next/navigation";
import Back from "@/components/common/Back";
import {
  IoChatbubbleEllipsesSharp,
  IoCall,
  IoPersonAdd,
  IoPersonRemoveSharp,
} from "react-icons/io5";
import { MdBlock } from "react-icons/md";
import { useProfile } from "@/hooks/useProfile";
import { AxiosError } from "axios";
import ErrorMessage from "@/components/common/ErrorMessage";
import InterestBtn from "@/components/profile/InterestBtn";
import Container from "@/components/common/Container";

const Page = () => {
  const { useGetUserProfile } = useProfile();
  const params = useParams();
  const id = params.id;
  const profileId = Number(id);

  const { data, isLoading, isError, error } = useGetUserProfile(profileId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (isError) {
    const err = error as AxiosError;
    return (
      <>
        <p>Error!</p>
        <ErrorMessage msg={err.message} />
      </>
    );
  }

  const isFriend = false;
  const userData = data?.data;

  return (
    <div className="w-full h-full bg-[var(--color-point)] flex flex-col justify-between">
      <Back />
      <div className="flex flex-col items-center">
        <div className="h-[139px] flex flex-col items-center text-white ">
          <div className="w-[82px] h-[82px] border-1 border-[var(--color-background)] rounded-full">
            {/* 사진 */}
          </div>
          <div className="mt-[20px] flex flex-col items-center">
            <p className="text-[20px] font-bold">{userData?.nickname}</p>
            <p className="text-[12px]">{userData?.username}</p>
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

      <Container height={502}>
        <div className="flex flex-col gap-[26px] pt-[41px] px-[24px]">
          <div className="flex flex-col gap-[9px]">
            <p className="text-[var(--color-commonGray)]">사용자 이름</p>
            <p className="text-[18px] font-semibold">{userData?.nickname}</p>
          </div>
          <div className="flex flex-col gap-[9px]">
            <p className="text-[var(--color-commonGray)]">한 줄 소개</p>
            <p className="text-[18px] font-semibold">
              {userData?.description
                ? userData?.description
                : "한 줄 소개가 없습니다."}
            </p>
          </div>
          <div className="flex flex-col gap-[9px]">
            <p className="text-[var(--color-commonGray)]">관심사</p>
            <div className="flex w-full gap-[10px] flex-wrap">
              {userData.interests?.map((interest: string, index: number) => (
                <InterestBtn label={interest} key={index} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Page;

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
import { MdPersonOff } from "react-icons/md";

const Page = () => {
  const { profileData } = useProfileStore();
  const isFriend = true;
  return (
    <div>
      <Back />
      <div className="text-white flex flex-col items-center">
        <div className="w-[82px] h-[82px] border-1 border-[var(--color-commonGray)] rounded-full">
          {/* 사진 */}
        </div>
        <p className="text-[20px] font-bold">{profileData.nickname}</p>
        <p className="text-[12px]">{profileData.username}</p>
        <div>
          <IoChatbubbleEllipsesSharp />
          <IoCall />
          {isFriend ? <IoPersonRemoveSharp /> : <IoPersonAdd />}
          <MdPersonOff />
        </div>
      </div>
    </div>
  );
};

export default Page;

"use client";
import Back from "@/components/common/Back";
import Search from "@/components/common/Search";
import FriendComponent from "@/components/friend/FriendComponent";
import React from "react";

const page = () => {
  return (
    <div>
      <Back />
      <div className="h-[76px] w-full flex items-center justify-center ">
        <div className="w-[327px] h-[39px]">
          <Search />
        </div>
      </div>
      <div className="flex flex-col gap-[25px] mt-[9px] px-[24px]">
        <div className="flex flex-col gap-[20px]">
          <p> 친구 </p>
          <FriendComponent />
        </div>
        <div className="flex flex-col gap-[20px]">
          <p> 그룹 </p>
          <FriendComponent />
        </div>
      </div>
    </div>
  );
};

export default page;

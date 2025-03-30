"use client";
import React from "react";
import { redirect } from "next/navigation";
import { IoArrowBackOutline, IoMenu } from "react-icons/io5";

// type chatType = "friend" | "group";

const ChatHeader = () => {
  // if (type == "friend") {
  // } else if (type == "group") {
  // }
  return (
    <div className="w-full h-[76px] pl-[24px] pr-[18px] flex justify-between text-white items-center">
      <div className="flex items-center gap-[12px]">
        <button onClick={() => redirect("/home")}>
          <IoArrowBackOutline className="w-[24px] h-[24px]" />
        </button>
        <div className="flex gap-[12px]">
          <div className="w-[44px] h-[44px] rounded-full"></div>
          <p className="text-[20px] font-bold"> 채팅방 이름</p>
        </div>
      </div>
      <button>
        <IoMenu className="w-[32px] h-[32px]" />
      </button>
    </div>
  );
};

export default ChatHeader;

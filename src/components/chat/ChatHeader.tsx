"use client";
import React, { useState } from "react";
import { redirect } from "next/navigation";
import { IoArrowBackOutline, IoMenu } from "react-icons/io5";
import ChatSideBar from "./modal/ChatSideBar";
import ChatSetting from "./modal/ChatSetting";
import ChatShare from "./modal/ChatShare";
import ChatExit from "./modal/ChatExit";

// type chatType = "friend" | "group";

type setModalType = "none" | "sidebar" | "setting" | "share" | "exit";

const ChatHeader = () => {
  const [modalDown, setModalDown] = useState<setModalType>("none");
  return (
    <div className="bg-[var(--color-point)]">
      {modalDown !== "none" ? (
        <div
          className="modal flex justify-end items-start"
          onClick={() => setModalDown("none")}
        >
          <div onClick={(e) => e.stopPropagation()}>
            {modalDown === "sidebar" && (
              <ChatSideBar setModalDown={setModalDown} />
            )}
            {modalDown == "setting" && (
              <ChatSetting setModalDown={setModalDown} />
            )}
            {modalDown == "share" && <ChatShare setModalDown={setModalDown} />}
            {modalDown == "exit" && <ChatExit />}
          </div>
        </div>
      ) : null}
      <div className="w-full h-[76px] pl-[24px] pr-[18px] flex justify-between text-white items-center">
        <div className="flex items-center gap-[12px]">
          <button onClick={() => redirect("/home")}>
            <IoArrowBackOutline className="w-[24px] h-[24px]" />
          </button>
          <div className="flex gap-[12px] items-center">
            <div className="w-[44px] h-[44px] rounded-full"></div>
            <p className="text-[20px] font-bold"> 채팅방 이름</p>
          </div>
        </div>
        <button>
          <IoMenu
            className="w-[32px] h-[32px]"
            onClick={() => setModalDown("sidebar")}
          />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;

"use client";
import React, { useState } from "react";
import { redirect } from "next/navigation";
import { IoArrowBackOutline, IoMenu } from "react-icons/io5";
import ChatSideBar from "./modal/ChatSideBar";
import ChatSetting from "./modal/ChatSetting";
import ChatShare from "./modal/ChatShare";
import ChatExit from "./modal/ChatExit";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { chatModalType } from "@/type/chat/setModalDownType";
import InviteFriendModal from "./modal/InviteFriendModal";
import ImageComponent from "@/components/common/ImageComponent";

const ChatHeader = () => {
  const [modalDown, setModalDown] = useState<chatModalType>("none");
  const currChat = useSelector((state: RootState) => state.currChat);

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
            {modalDown == "exit" && <ChatExit setModalDown={setModalDown} />}
            {modalDown == "invite" && (
              <InviteFriendModal setModalDown={setModalDown} />
            )}
          </div>
        </div>
      ) : null}
      <div className="w-full h-[76px] pl-[24px] pr-[18px] flex justify-between text-white items-center">
        <div className="flex items-center gap-[12px]">
          <button onClick={() => redirect("/home")}>
            <IoArrowBackOutline className="w-[24px] h-[24px]" />
          </button>
          <div className="flex gap-[12px] items-center">
            <ImageComponent size={44} img={currChat.roomImageUrl} />
            <p className="text-[20px] font-bold"> {currChat.name}</p>
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

"use client";
import React, { useState } from "react";
import CreateChatModal from "@/components/chat/modal/CreateChatModal";

const ChatList = () => {
  const [isModalDown, setIsModalDown] = useState<boolean>(false);
  return (
    <div className="pt-[46px] h-full">
      {isModalDown && (
        <div className="modal" onClick={() => setIsModalDown(false)}>
          <CreateChatModal />
        </div>
      )}
      <div className="relative">
        <div className="absolute bottom-[15px] right-[21px]">
          <button
            className="w-[50px] h-[50px] bg-[var(--color-point)] rounded-full flex items-center justify-center"
            onClick={() => setIsModalDown(true)}
          >
            <span className="text-white text-[30px] font-bold">+</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatList;

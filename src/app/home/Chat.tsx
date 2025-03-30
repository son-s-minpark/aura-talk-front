"use client";
import React, { useState } from "react";
import CreateChatModal from "@/components/chat/modal/CreateChatModal";

const ChatList = () => {
  const [isModalDown, setIsModalDown] = useState<boolean>(false);
  return (
    <div>
      {isModalDown ? (
        <div className="modal" onClick={() => setIsModalDown(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <CreateChatModal />
          </div>
        </div>
      ) : null}
      <div className="relative h-[500px]">
        <div></div>
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

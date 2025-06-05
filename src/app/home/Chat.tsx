"use client";
import React, { useState } from "react";
import CreateChatModal from "@/components/chat/chatroom/modal/CreateChatModal";
import useChatRoom from "@/hooks/useChatRoom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const ChatList = () => {
  const [isModalDown, setIsModalDown] = useState<boolean>(false);
  const { useGetChatList, useGetPendingList } = useChatRoom();
  useGetChatList();
  useGetPendingList();

  const chattingList = useSelector(
    (state: RootState) => state.chatList.chattingList
  );
  const pendingList = useSelector(
    (state: RootState) => state.chatList.pendingList
  );

  return (
    <div className="pt-[46px] h-full">
      {isModalDown && (
        <div className="modal" onClick={() => setIsModalDown(false)}>
          <CreateChatModal />
        </div>
      )}
      <div className="relative h-full">
        {pendingList.length != 0 && (
          <div className="w-full">
            <p>수락 대기 중</p>
            {pendingList.map((chat, index) => (
              <p key={index}>{chat.name}</p>
            ))}
          </div>
        )}
        {chattingList.map((chat, index) => (
          <p key={index}>{chat.name}</p>
        ))}
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

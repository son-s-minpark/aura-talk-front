"use client";
import React, { useState } from "react";
import CreateChatModal from "@/components/chat/chatroom/modal/CreateChatModal";
import useChatRoom from "@/hooks/chatRoom/useChatRoom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ChatComponent from "@/components/chat/chatroom/ChatComponent";

const ChatList = () => {
  const [isModalDown, setIsModalDown] = useState<boolean>(false);
  const { useGetChatList } = useChatRoom();
  const { isLoading } = useGetChatList();
  const chattingList = useSelector((state: RootState) => state.chatList);

  if (isLoading) {
    return <p>Loading</p>;
  }

  return (
    <div className="pt-[46px] h-full">
      {isModalDown && (
        <div className="modal" onClick={() => setIsModalDown(false)}>
          <CreateChatModal />
        </div>
      )}
      <div className="relative h-full px-[21px]">
        <p className="font-semibold">채팅</p>
        <div className="h-full mt-[9px]  overflow-y-scroll whitespace-nowrap">
          <div className="w-full flex flex-col gap-[22px]">
            {chattingList.map((chatroom, index) => (
              <ChatComponent chatroom={chatroom} key={index} />
            ))}
          </div>
        </div>

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

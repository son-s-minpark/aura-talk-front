"use client";
import React from "react";
import ChatList from "@/components/chat/chat/ChatList";
import ChatHeader from "@/components/chat/chat/ChatHeader";
import ChatInput from "@/components/chat/chat/ChatInput";
import useChatRoom from "@/hooks/useChatRoom";
import { useParams } from "next/navigation";

const Page = () => {
  const param = useParams();
  const id = param.id;
  const { useGetChatRoom } = useChatRoom();
  const { isLoading } = useGetChatRoom(Number(id));

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="w-full h-full flex flex-col justify-between">
      <ChatHeader />
      <div className="flex-1">
        <ChatList />
      </div>
      <ChatInput />
    </div>
  );
};

export default Page;

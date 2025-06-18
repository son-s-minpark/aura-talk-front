import React from "react";
import ChatList from "@/components/chat/chat/ChatList";
import ChatHeader from "@/components/chat/chat/ChatHeader";
import ChatInput from "@/components/chat/chat/ChatInput";

const Page = () => {
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

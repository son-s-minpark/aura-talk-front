import ChatList from "@/components/chat/ChatList";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatInput from "@/components/chat/ChatInput";
import React from "react";

const page = () => {
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

export default page;

import ChatHeader from "@/components/chat/ChatHeader";
import ChatInput from "@/components/chat/ChatInput";
import React from "react";

const page = () => {
  return (
    <div className="w-full h-full flex flex-col justify-between">
      <ChatHeader />
      <ChatInput />
    </div>
  );
};

export default page;

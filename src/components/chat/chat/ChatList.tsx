import React from "react";
import ChatBubble from "./ChatBubble";
import useChatRoom from "@/hooks/chatRoom/useChatRoom";

const ChatList = () => {
  return (
    <div className="pl-[24px] pr-[40px] bg-[var(--color-background)] h-full">
      <div>{/* <ChatBubble /> */}</div>
    </div>
  );
};

export default ChatList;

import React from "react";
import ChatBubble from "./ChatBubble";

const list = [
  {
    name: "이름",
    text: "내용",
    time: "2025-1-2",
  },
  {
    name: "me",
    text: "내가 보냇슈슈",
    time: "2025-1-2",
  },
];

const ChatList = () => {
  return (
    <div className="pl-[24px] pr-[40px] bg-[var(--color-background)] h-full">
      {list.map((chat, index) => (
        <div key={index}>
          <ChatBubble chat={chat} />
        </div>
      ))}
    </div>
  );
};

export default ChatList;

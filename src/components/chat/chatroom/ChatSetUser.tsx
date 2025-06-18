import { chatUserType } from "@/type/chat/chatUserType";
import React from "react";

const ChatSetUser = ({ user }: { user: chatUserType }) => {
  return (
    <div className="flex items-center flex-col gap-[5px] w-[52px]">
      <div className="w-[52px] h-[52px] rounded-full border-1 border-[var(--color-gray)]"></div>
      <p className="text-[12px]">{user.nickname}</p>
    </div>
  );
};

export default ChatSetUser;

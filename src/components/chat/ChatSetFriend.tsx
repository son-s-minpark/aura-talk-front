import { FriendType } from "@/type/chat/friendType";
import React from "react";

const ChatSetFriend = ({ friend }: FriendType) => {
  return (
    <div className="flex items-center flex-col gap-[5px] w-[52px]">
      <div className="w-[52px] h-[52px] rounded-full border-1 border-[var(--color-gray)]"></div>
      <p className="text-[12px]">{friend.name}</p>
    </div>
  );
};

export default ChatSetFriend;

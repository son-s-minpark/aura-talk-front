import React from "react";
import { FaCrown } from "react-icons/fa";

type FriendType = {
  friend: {
    name: string;
    isLeader: boolean;
  };
};

const ChatFriend = ({ friend }: FriendType) => {
  return (
    <div className="h-[35px] w-full flex items-center gap-[7px]">
      <div className="w-[35px] h-[35px] rounded-full border-1 border-[var(--color-gray)]"></div>
      <p className="text-[14px] font-bold">{friend.name}</p>
      {friend.isLeader && (
        <FaCrown className="text-[#FFE8A3] w-[20px] h-[18px]" />
      )}
    </div>
  );
};

export default ChatFriend;

import { chatUserType } from "@/type/chat/chatUserType";
import Image from "next/image";
import React from "react";

const ChatSetUser = ({ user }: { user: chatUserType }) => {
  return (
    <div className="flex items-center flex-col gap-[5px] w-[52px]">
      <div className="w-[52px] h-[52px] rounded-full border-1 border-[var(--color-gray)]">
        {user.thumbnailImg ? (
          <div className="w-[52px] h-[52px] relative overflow-hidden rounded-full border-1 border-[var(--color-commonGray)]">
            <Image src={user.thumbnailImg} alt="프로필 이미지" fill />
          </div>
        ) : (
          <div className="bg-[var(--color-commonGray)]"> </div>
        )}
      </div>
      <p className="text-[12px]">{user.nickname}</p>
    </div>
  );
};

export default ChatSetUser;

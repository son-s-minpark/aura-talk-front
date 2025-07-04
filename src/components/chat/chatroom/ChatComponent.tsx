import { chatRoomType } from "@/type/chat/chatRoomType";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const ChatComponent = ({ chatroom }: { chatroom: chatRoomType }) => {
  const router = useRouter();
  return (
    <div
      className="w-full flex"
      onClick={() => router.push(`chat/${chatroom.id}`)}
    >
      <div className="flex gap-[12px]">
        <div className="w-[52px] h-[52px] rounded-full relative overflow-hidden border-1 border-[var(--color-commonGray)]">
          {chatroom.roomImageUrl ? (
            <Image
              src={chatroom.roomImageUrl}
              alt="채팅방 이미지"
              fill
              className=" object-cover"
            />
          ) : (
            <div className="bg-[var(--color-commonGray)]" />
          )}
        </div>
        <div className="flex items-center">
          <p className="font-bold text-[18px] leading-[20px]">
            {chatroom.name}
          </p>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default ChatComponent;

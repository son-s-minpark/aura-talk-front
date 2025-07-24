import ImageComponent from "@/components/common/ImageComponent";
import { chatRoomType } from "@/type/chat/chatRoomType";
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
        <ImageComponent size={52} img={chatroom.roomImageUrl} />
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

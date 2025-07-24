import ImageComponent from "@/components/common/ImageComponent";
import { chatUserType } from "@/type/chat/chatUserType";
import React from "react";

const ChatSetUser = ({ user }: { user: chatUserType }) => {
  return (
    <div className="flex items-center flex-col gap-[5px] w-[52px]">
      <ImageComponent size={52} img={user.thumbnailImageUrl} />
      <p className="text-[12px]">{user.nickname}</p>
    </div>
  );
};

export default ChatSetUser;

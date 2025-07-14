import { chatUserType } from "@/type/chat/chatUserType";
import { useRouter } from "next/navigation";
import React from "react";
import { FaCrown } from "react-icons/fa";
import ImageComponent from "@/components/common/ImageComponent";

const ChatRoomUser = ({
  user,
  isLeader,
}: {
  user: chatUserType;
  isLeader: boolean;
}) => {
  const router = useRouter();
  function goProfile() {
    router.push(`profile/${user.id}`);
  }
  return (
    <div className="h-[35px] w-full flex justify-between" onClick={goProfile}>
      <div className="flex items-center gap-[7px]">
        <ImageComponent size={35} img={user.thumbnailImageUrl} />
        <p className="text-[14px] font-bold w-[140px]">{user.nickname}</p>
        {isLeader && <FaCrown className="text-[#FFE8A3] w-[20px] h-[18px]" />}
      </div>
    </div>
  );
};

export default ChatRoomUser;

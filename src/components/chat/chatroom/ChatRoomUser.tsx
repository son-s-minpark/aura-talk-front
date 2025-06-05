import { chatUserType } from "@/type/chat/chatUserType";
import { useRouter } from "next/navigation";
import React from "react";
import { FaCrown } from "react-icons/fa";
import { FaBan } from "react-icons/fa";

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
        <div className="w-[35px] h-[35px] rounded-full border-1 border-[var(--color-gray)]"></div>
        <p className="text-[14px] font-bold w-[140px]">{user.nickname}</p>
        {isLeader ? (
          <FaCrown className="text-[#FFE8A3] w-[20px] h-[18px]" />
        ) : (
          <button>
            <FaBan className="w-[24px] h-[24px] text-[#EA3736]" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatRoomUser;

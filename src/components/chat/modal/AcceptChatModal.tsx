import React from "react";
import { chatRoomType } from "@/type/chat/chatRoomType";
import ChatRoomUser from "../ChatRoomUser";
import SelectBtn from "@/components/common/SelectBtn";
import { useRouter } from "next/navigation";

const AcceptChatModal = ({ id, name, owner, users }: chatRoomType) => {
  const router = useRouter();
  function onAccept() {
    router.push(`chat/${id}`);
  }
  function onReject() {}
  return (
    <div
      className="modal-content w-[303px] h-[318px] pt-[28px] pl-[17px]"
      onClick={(e) => e.stopPropagation()}
    >
      <div>
        <h1>채팅 초대</h1>
        <div className="flex flex-col gap-[16px]">
          <div className="w-[55px] h-[55px] border-1 border-[var(--commonGray)] rounded-full"></div>
          <p className="font-bold text-[20px] mt-[10px]">{name}</p>
        </div>
        <div className="flex flex-col gap-[17px] mt-[32px]">
          <h1>참여 중인 멤버</h1>
          <div className="no-scrollbar flex overflow-x-scroll gap-[11px]">
            <ChatRoomUser user={owner} isLeader={true} />
            {users.map((user, index) => (
              <ChatRoomUser user={user} isLeader={false} key={index} />
            ))}
          </div>
        </div>
        <div className="flex gap-[21px] mt-[27px] justify-end pr-[7px]">
          <SelectBtn label="수락" onClick={onAccept} />
          <SelectBtn label="거절" onClick={onReject} isRejected={true} />
        </div>
      </div>
    </div>
  );
};

export default AcceptChatModal;

import { setModalDownType } from "@/type/chat/setModalDownType";
import React from "react";
import { IoPersonAdd, IoSettings, IoShareSocial } from "react-icons/io5";
import { BsDoorOpenFill } from "react-icons/bs";
import ChatFriend from "../ChatRoomFriend";

const data = [
  {
    name: "팀원팀원팀원팀원팀원팀원팀",
    isLeader: true,
  },
  {
    name: "ㅎㅎ",
    isLeader: false,
  },
];

const ChatSideBar = ({ setModalDown }: setModalDownType) => {
  return (
    <div
      className="modal-content h-[358px] w-[271px] flex flex-col"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="h-[70px] w-full border-b-1 border-commonGray flex justify-between px-[22px] py-[15px]">
        <div className="flex gap-[15px] items-center">
          <div className="w-[44px] h-[44px] rounded-full border-[var(--color-gray)] border-1"></div>
          <p className="text-[18px] font-bold">채팅방 이름</p>
        </div>
      </div>

      <div className="px-[19px] mt-[17px]">
        <p className="text-[15px] font-semibold text-[var(--color-gray)]">
          멤버(3)
        </p>
        <div className="h-[130px] px-[7px] mt-[17px] overflow-scroll flex flex-col gap-[10px]">
          {data.map((friend, index) => (
            <ChatFriend friend={friend} key={index} />
          ))}
        </div>
        <button className="text-[var(--color-gray)] flex items-center gap-[14px]">
          <IoPersonAdd className="h-[28px] w-[28px]" />
          <p className="text-[14px] font-bold"> 친구 추가하기</p>
        </button>
      </div>
      <div className="text-[var(--color-gray)] flex gap-[5px] items-center justify-end mt-[20px] mr-[22px]">
        <IoSettings
          onClick={() => setModalDown("setting")}
          className="w-[20px] h-[20px]"
        />
        <IoShareSocial
          className="w-[20px] h-[20px]"
          onClick={() => setModalDown("share")}
        />
        <BsDoorOpenFill
          className="w-[20px] h-[20px]"
          onClick={() => setModalDown("exit")}
        />
      </div>
    </div>
  );
};

export default ChatSideBar;

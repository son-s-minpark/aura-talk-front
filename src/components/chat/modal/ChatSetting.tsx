"use client";
import { setModalDownType } from "@/type/chat/setModalDownType";
import AddImage from "@/components/common/AddImage";
import SelectBtn from "@/components/common/SelectBtn";
import React, { useRef } from "react";
import ChatSetFriend from "../ChatSetFriend";

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

const ChatSetting = ({ setModalDown }: setModalDownType) => {
  const roomNameRef = useRef<HTMLInputElement>(null);

  function onSubmit() {
    const roomname = roomNameRef.current?.value || "";
    // 이름이랑 사진이랑 친구 목록 전송하기
    setModalDown("none");
  }
  return (
    <div className="model-content px-[21px] pt-[25px]">
      <div className="flex flex-col gap-[17px]">
        <div>
          <p className="font-semibold">대표 사진</p>
          <AddImage imgSize={70} btnHeight={15} btnWidth={42} />
        </div>
        <div>
          <p className="font-semibold">채팅방 이름</p>
          <div>
            <div className="bg-[#F3F6F6] dark:bg-[#787878] rounded-[20px] w-[253px] h-[32px] mt-[11px]">
              <input className="w-full h-full" ref={roomNameRef} type="text" />
            </div>
          </div>
        </div>
        <div>
          <p className="font-semibold">친구 목록</p>
          <div className="flex gap-[11px] mt-[9px]">
            {data.map((friend, index) => (
              <ChatSetFriend friend={friend} key={index} />
            ))}
          </div>
        </div>
        <div className="mt-[7px] mb-[14px] flex justify-end">
          <SelectBtn label="수정" onClick={onSubmit} />
        </div>
      </div>
    </div>
  );
};

export default ChatSetting;

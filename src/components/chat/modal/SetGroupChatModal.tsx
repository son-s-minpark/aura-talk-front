"use client";
import AddImage from "@/components/common/AddImage";
import SelectBtn from "@/components/common/SelectBtn";
import ChatSetFriend from "../ChatSetFriend";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";

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

const SetChatModal = () => {
  const roomNameRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  function onSubmit() {
    const roomname = roomNameRef.current?.value || "";
    // 이름이랑 사진이랑 친구 목록 전송하기
    router.push("/chat/1");
  }
  return (
    <div className="modal-content w-[303px] px-[21px] pt-[25px]">
      <div className="flex flex-col gap-[17px]">
        <div>
          <p className="font-semibold">대표 사진</p>
          <AddImage imgSize={70} btnHeight={15} btnWidth={42} />
        </div>
        <div>
          <p className="font-semibold">채팅방 이름</p>
          <div>
            <div className="bg-[#F3F6F6] dark:bg-[#787878] rounded-[20px] w-[253px] h-[32px] mt-[11px]">
              <input className="h-full w-full" />
            </div>
          </div>
        </div>
        <div>
          <p className="font-semibold">초대할 친구</p>
          <div>
            <p className="font-semibold">친구 목록</p>
            <div className="flex gap-[11px] mt-[9px]">
              {data.map((friend, index) => (
                <ChatSetFriend friend={friend} key={index} />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-[7px] mb-[14px] flex justify-end">
          <SelectBtn label="생성" onClick={onSubmit} />
        </div>
      </div>
    </div>
  );
};

export default SetChatModal;

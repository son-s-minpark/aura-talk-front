"use client";
import { setModalDownType } from "@/type/chat/setModalDownType";
import AddImage from "@/components/common/AddImage";
import SelectBtn from "@/components/common/SelectBtn";
import React, { useRef } from "react";
import ChatSetUser from "../../chatroom/ChatSetUser";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

// 채팅방 정보 수정 모달
const ChatSetting = ({ setModalDown }: setModalDownType) => {
  const roomNameRef = useRef<HTMLInputElement>(null);
  const currChat = useSelector((state: RootState) => state.currChat);

  function onSubmit() {
    const roomname = roomNameRef.current?.value || "";
    if (roomname == "") {
      return;
    }
    // 채팅방 정보 수정 요청
    setModalDown("none");
  }
  return (
    <div className="model-content px-[21px] pt-[25px]">
      <div className="flex flex-col gap-[17px]">
        <div>
          <h1>대표 사진</h1>
          <AddImage imgSize={70} btnHeight={15} btnWidth={42} />
        </div>
        <div>
          <h1>채팅방 이름</h1>
          <div>
            <div className="bg-[#F3F6F6] dark:bg-[#787878] rounded-[20px] w-[253px] h-[32px] mt-[11px]">
              <input className="w-full h-full" ref={roomNameRef} type="text" />
            </div>
          </div>
        </div>
        <div>
          <h1>친구 목록</h1>
          <div className="flex gap-[11px] mt-[9px]">
            {currChat.users.map((friend, index) => (
              <ChatSetUser
                user={{
                  id: friend.id,
                  thumbnailImg: friend.thumbnailImg,
                  nickname: friend.nickname,
                }}
                key={index}
              />
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

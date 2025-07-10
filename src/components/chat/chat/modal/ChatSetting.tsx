"use client";
import { setModalDownType } from "@/type/chat/setModalDownType";
import AddImage from "@/components/common/AddImage";
import SelectBtn from "@/components/common/SelectBtn";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import useChatRoom from "@/hooks/chatRoom/useChatRoom";
import ChatUserList from "../../chatroom/ChatUserList";

// 채팅방 정보 수정 모달
const ChatSetting = ({ setModalDown }: setModalDownType) => {
  const roomNameRef = useRef<HTMLInputElement>(null);
  const currChat = useSelector((state: RootState) => state.currChat);
  const [img, setImg] = useState<string>(currChat.roomImageUrl);
  const [listType, setListType] = useState<"User" | "Blocked">("User");
  const { usePutChatRoom } = useChatRoom();

  useEffect(() => {
    if (roomNameRef.current) {
      roomNameRef.current.value = currChat.name;
    }
  }, [currChat.name]);

  function onSubmit() {
    const roomname = roomNameRef.current?.value || "";
    if (roomname == "") {
      return;
    } else {
      usePutChatRoom.mutateAsync({
        id: currChat.id,
        name: roomname,
        imageUrl: img,
      });
    }

    setModalDown("none");
  }

  function onCLickList() {
    if (listType == "User") setListType("Blocked");
    else if (listType == "Blocked") setListType("User");
  }

  return (
    <div className="modal-content px-[21px] pt-[25px]">
      <div className="flex flex-col gap-[17px]">
        <div>
          <h1>대표 사진</h1>
          <AddImage
            imgSize={70}
            btnHeight={15}
            btnWidth={42}
            img={img}
            setImg={() => setImg}
          />
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
          <div className="flex justify-between">
            <h1>{listType == "User" ? "친구 목록" : "차단한 목록"}</h1>
            <p onClick={onCLickList} className="font-semibold text-[14px]">
              {listType == "User" ? "차단한 친구" : "친구 목록"}
            </p>
          </div>
          <ChatUserList userList={currChat.users} listType={listType} />
        </div>
        <div className="mt-[7px] mb-[14px] flex justify-end">
          <SelectBtn label="수정" onClick={onSubmit} />
        </div>
      </div>
    </div>
  );
};

export default ChatSetting;

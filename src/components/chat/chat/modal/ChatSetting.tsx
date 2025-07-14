"use client";
import { setModalDownType } from "@/type/chat/setModalDownType";
import AddImage from "@/components/common/AddImage";
import SelectBtn from "@/components/common/SelectBtn";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import useChatRoom from "@/hooks/chatRoom/useChatRoom";
import ChatUserList from "../../chatroom/ChatUserList";
import useChatRoomLeader from "@/hooks/chatRoom/useChatRoomLeader";
import { chatUserType } from "@/type/chat/chatUserType";

// 채팅방 정보 수정 모달
const ChatSetting = ({ setModalDown }: setModalDownType) => {
  const currChat = useSelector((state: RootState) => state.currChat);
  const [img, setImg] = useState<string>(currChat.roomImageUrl);
  const [name, setName] = useState<string>(currChat.name);
  const [listType, setListType] = useState<"User" | "Blocked">("User");
  const [list, setList] = useState<chatUserType[]>(currChat.users);
  const { usePutChatRoom } = useChatRoom();
  const { useGetBlockedChatUserList } = useChatRoomLeader();
  const { isLoading, data } = useGetBlockedChatUserList(currChat.id);

  useEffect(() => {
    if (listType === "User") {
      setList(currChat.users);
    } else if (listType === "Blocked" && data) {
      setList(data);
    }
  }, [listType, currChat.users, data]);

  function onSubmit() {
    if (name == "") {
      return;
    } else {
      usePutChatRoom.mutateAsync({
        id: currChat.id,
        name: name,
        imageUrl: img,
      });
    }

    setModalDown("none");
  }

  function onCLickList() {
    if (listType == "User") setListType("Blocked");
    else if (listType == "Blocked") setListType("User");
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="modal-content px-[21px] pt-[25px]">
      <div className="flex flex-col gap-[17px]">
        <>
          <h1>대표 사진</h1>
          <AddImage
            imgSize={70}
            btnHeight={15}
            btnWidth={42}
            img={img}
            setImg={() => setImg}
          />
        </>
        <>
          <h1>채팅방 이름</h1>
          <div className="bg-[#F3F6F6] dark:bg-[#787878] rounded-[20px] w-[253px] h-[32px] mt-[11px]">
            <input
              className="w-full h-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
            />
          </div>
        </>
        <>
          <div className="flex justify-between items-center">
            <h1>{listType == "User" ? "친구 목록" : "차단한 목록"}</h1>
            <p onClick={onCLickList} className="font-semibold text-[14px]">
              {listType == "User" ? "차단한 친구" : "친구 목록"}
            </p>
          </div>
          <ChatUserList userList={list.slice(1)} listType={listType} />
        </>
        <div className="mt-[7px] mb-[14px] flex justify-end">
          <SelectBtn label="수정" onClick={onSubmit} />
        </div>
      </div>
    </div>
  );
};

export default ChatSetting;

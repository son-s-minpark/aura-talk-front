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
import NameInput from "@/components/common/NameInput";
import { useImageUpload } from "@/hooks/useImageUpload";

// 채팅방 정보 수정 모달
const ChatSetting = ({ setModalDown }: setModalDownType) => {
  const currChat = useSelector((state: RootState) => state.currChat);
  const [img, setImg] = useState<string>(currChat.roomImageUrl);
  const [file, setFile] = useState<{ file: File; fileName: string } | null>(
    null
  );
  const [name, setName] = useState<string>(currChat.name);
  const [listType, setListType] = useState<"User" | "Blocked">("User");
  const [list, setList] = useState<chatUserType[]>(currChat.users);
  const { usePutChatRoom } = useChatRoom();
  const { useUploadChatRoomImage } = useImageUpload();
  const { getBlockedChatUserList } = useChatRoomLeader();

  useEffect(() => {
    async function getBlockedList() {
      const res = await getBlockedChatUserList(currChat.id);
      setList(res);
    }

    if (listType === "User") {
      setList(currChat.users);
    } else if (listType === "Blocked") {
      getBlockedList();
    }
  }, [listType, currChat.users]);

  async function onSubmit() {
    if (name == "") {
      return;
    } else {
      if (file) {
        const res = await useUploadChatRoomImage.mutateAsync({
          file: file.file,
          fileName: file.fileName,
        });
        setImg(res.url);
      }
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

  return (
    <div className="modal-content px-[21px] pt-[25px] w-[303px]">
      <div className="flex flex-col gap-[17px]">
        <>
          <h1>대표 사진</h1>
          <AddImage
            imgSize={70}
            btnHeight={20}
            btnWidth={42}
            img={img}
            setImg={({ fileName, file }) => setFile({ file, fileName })}
          />
        </>
        <>
          <h1>채팅방 이름</h1>
          <NameInput>
            <input
              className="w-full h-full mx-[10px]"
              value={name}
              onChange={() => setName}
              type="text"
            />
          </NameInput>
        </>
        <>
          <div className="flex justify-between items-center">
            <h1>{listType == "User" ? "친구 목록" : "차단한 목록"}</h1>
            <p onClick={onCLickList} className="font-semibold text-[14px]">
              {listType == "User" ? "차단한 친구" : "친구 목록"}
            </p>
          </div>
          <ChatUserList
            userList={listType == "User" ? list.slice(1) : list}
            listType={listType}
          />
        </>
        <div className="mt-[7px] mb-[14px] flex justify-end">
          <SelectBtn label="수정" onClick={onSubmit} />
        </div>
      </div>
    </div>
  );
};

export default ChatSetting;

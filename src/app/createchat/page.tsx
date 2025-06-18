"use client";
import Search from "@/components/common/Search";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { IoArrowBackOutline } from "react-icons/io5";
import SelectBtn from "@/components/common/SelectBtn";
import SetChatModal from "@/components/chat/chatroom/modal/SetChatModal";
import FriendComponent from "@/components/friend/FriendComponent";
import { friendType } from "@/type/friend/friendType";

const Page = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [selectedList, setSelectedList] = useState<friendType[]>([]);
  const [searchVal, setSearchVal] = useState<string>("");
  const friendList: friendType[] = [];

  const Back = () => {
    const router = useRouter();
    return (
      <div className="h-[76px] w-full flex items-center justify-between ">
        <button onClick={() => router.back()} className="w-[30px] h-[30px]">
          <IoArrowBackOutline className=" h-[30px] ml-[15px]" />
        </button>
        <SelectBtn label="완료" onClick={() => setModal(true)} />
      </div>
    );
  };
  function onChangVal(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchVal(e.target.value);
  }

  function onFriendClick() {
    // 이미 선택된 상태면 뺴고 아니면 추가하기기
    setSelectedList([]);
  }

  return (
    <div className="h-full w-full">
      {modal ? (
        <div className="modal" onClick={() => setModal(false)}>
          <SetChatModal friendList={selectedList} />
        </div>
      ) : null}
      <Back />
      <div className="w-full h-[33px] flex items-center px-[24px]">
        <Search val={searchVal} onChange={onChangVal} />
      </div>
      <div className="mt-[34px] px-[24px]">
        <div className="flex flex-col gap-[20px]">
          <p> 친구 </p>
          {friendList.map((friend, index) => (
            <div key={index} onClick={onFriendClick}>
              <FriendComponent friend={friend} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;

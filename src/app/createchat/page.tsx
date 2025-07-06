"use client";
import Search from "@/components/common/Search";
import React, { useMemo, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { IoArrowBackOutline } from "react-icons/io5";
import SelectBtn from "@/components/common/SelectBtn";
import SetChatModal from "@/components/chat/chatroom/modal/SetChatModal";
import FriendComponent from "@/components/friend/FriendComponent";
import { friendType } from "@/type/friend/friendType";
import CheckBtn from "@/components/common/CheckBtn";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useFriendList } from "@/hooks/friend/useFriendList";

const Page = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [selectedList, setSelectedList] = useState<friendType[]>([]);
  const [searchVal, setSearchVal] = useState<string>("");
  const router = useRouter();
  const searchParam = useSearchParams();
  const chatType = useMemo(() => searchParam.get("type"), []);
  const { getFriendList } = useFriendList();
  const friendList = useSelector((state: RootState) => state.friendList);

  useEffect(() => {
    getFriendList();
  });

  const Back = () => {
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

  function onFriendClick(friend: friendType) {
    const isSelected = selectedList.some(
      (item) => item.friendUserId === friend.friendUserId
    );

    if (chatType === "group") {
      if (isSelected) {
        setSelectedList(
          selectedList.filter(
            (item) => item.friendUserId !== friend.friendUserId
          )
        );
      } else {
        setSelectedList([...selectedList, friend]);
      }
    } else if (chatType === "one") {
      if (!isSelected) {
        setSelectedList([friend]);
      } else {
        setSelectedList([]);
      }
    }
  }

  return (
    <div className="h-full w-full">
      {modal ? (
        <div className="modal" onClick={() => setModal(false)}>
          <SetChatModal friendList={selectedList} chatType={chatType} />
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
            <div
              key={index}
              onClick={() => onFriendClick(friend)}
              className="flex items-center gap-[18px]"
            >
              <CheckBtn
                isChecked={selectedList.some(
                  (item) => item.friendUserId === friend.friendUserId
                )}
              />
              <FriendComponent friend={friend} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;

"use client";
import Search from "@/components/common/Search";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { IoArrowBackOutline } from "react-icons/io5";
import SelectBtn from "@/components/common/SelectBtn";
import SetChatModal from "@/components/chat/modal/SetGroupChatModal";
import FriendComponent from "@/components/friend/FriendComponent";

const Page = () => {
  const [modal, setModal] = useState<boolean>(false);

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

  return (
    <div className="h-full w-full">
      {modal ? (
        <div className="modal" onClick={() => setModal(false)}>
          <SetChatModal />
        </div>
      ) : null}
      <Back />
      <div className="w-full h-[33px] flex items-center px-[24px]">
        <Search />
      </div>
      <div className="mt-[34px] px-[24px]">
        <div className="flex flex-col gap-[20px]">
          <p> 친구 </p>
          <FriendComponent />
        </div>
      </div>
    </div>
  );
};

export default Page;

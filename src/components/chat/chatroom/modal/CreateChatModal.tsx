"use client";

import React, { useState } from "react";
import SelectBtn from "@/components/common/SelectBtn";
import { IoMdPerson } from "react-icons/io";
import { IoPeople } from "react-icons/io5";
import { FaRandom } from "react-icons/fa";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import useChatRoom from "@/hooks/chatRoom/useChatRoom";

type selectedChatType = "one" | "group" | "random";

const CreateChatModal = () => {
  const [chatType, setChatType] = useState<selectedChatType>("one");
  const { useCreateRandomChatroom } = useChatRoom();
  const router = useRouter();

  function createChatRoom() {
    if (chatType != "random") {
      router.push(`/createchat?type=${chatType}`);
    } else {
      const res = useCreateRandomChatroom.mutateAsync();
      router.push(`chat/${res}`);
    }
  }
  return (
    <div
      className="modal-content w-[360px] h-[215px]"
      onClick={(e) => e.stopPropagation()}
    >
      <p className="font-bold pt-[23px] pl-[18px] text-[18px] leading-[25px]">
        누구와 대화를 시작해볼까요?
      </p>
      <div className="flex items-end justify-center gap-[15px] mt-[9px]">
        <div
          className={clsx("flex flex-col items-center", {
            "text-[var(--color-point)]": chatType == "one",
            "text-[var(--color-gray)]": chatType != "one",
          })}
          onClick={() => setChatType("one")}
        >
          <IoMdPerson className="w-[70px] h-[70px]" />
          <p className="text-[10px]">기존 친구와 대화하기</p>
        </div>
        <div
          className={clsx("flex flex-col items-center", {
            "text-[var(--color-point)]": chatType == "group",
            "text-[var(--color-gray)]": chatType != "group",
          })}
          onClick={() => setChatType("group")}
        >
          <IoPeople className="w-[80px] h-[80px]" />
          <p className="text-[10px]">기존 친구들과 대화하기</p>
        </div>
        <div
          className={clsx("flex flex-col items-center", {
            "text-[var(--color-point)]": chatType == "random",
            "text-[var(--color-gray)]": chatType != "random",
          })}
          onClick={() => setChatType("random")}
        >
          <FaRandom className="w-[70px] h-[70px] " />
          <p className="text-[10px]">모르는 사람과 대화하기</p>
        </div>
      </div>
      <div className="flex justify-end mt-[20px] mr-[17px]">
        <SelectBtn label="완료" onClick={createChatRoom} />
      </div>
    </div>
  );
};

export default CreateChatModal;

"use client";
import React, { useState } from "react";
import SelectBtn from "@/components/common/SelectBtn";
import { IoMdPerson } from "react-icons/io";
import { IoPeople } from "react-icons/io5";

import { FaRandom } from "react-icons/fa";
import clsx from "clsx";
import { redirect } from "next/navigation";

type selectedChatType = "friend" | "group" | "random";

const CreateChatModal = () => {
  const [chatType, setChatType] = useState<selectedChatType>("friend");
  return (
    <div className="bg-[var(--color-background)] w-[375px] h-[215px] rounded-[20px]">
      <p className="font-bold pt-[23px] pl-[18px] text-[18px] leading-[25px]">
        누구와 대화를 시작해볼까요?
      </p>
      <div className="flex items-end justify-center gap-[15px] mt-[9px]">
        <div
          className={clsx("flex flex-col items-center", {
            "text-[var(--color-point)]": chatType == "friend",
            "text-[var(--color-gray)]": chatType != "friend",
          })}
          onClick={() => setChatType("friend")}
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
        <SelectBtn
          label="완료"
          onClick={() => redirect(`createchat/${chatType}`)}
        />
      </div>
    </div>
  );
};

export default CreateChatModal;

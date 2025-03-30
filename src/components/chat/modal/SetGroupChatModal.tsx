import AddImage from "@/components/common/AddImage";
import SelectBtn from "@/components/common/SelectBtn";
import { redirect } from "next/navigation";
import React from "react";

const SetChatModal = () => {
  return (
    <div className="bg-[var(--color-background)] w-[303px]  rounded-[12px] px-[21px] pt-[25px]">
      <div className="flex flex-col gap-[17px]">
        <div>
          <p className="font-semibold">대표 사진</p>
          <AddImage imgSize={70} btnHeight={15} btnWidth={42} />
        </div>
        <div>
          <p className="font-semibold">채팅방 이름</p>
          <div>
            <div className="bg-[#F3F6F6] dark:bg-[#787878] rounded-[20px] w-[253px] h-[32px] mt-[11px]">
              <input />
            </div>
          </div>
        </div>
        <div>
          <p className="font-semibold">초대할 친구</p>
          <div className="h-[69px]"></div>
        </div>
        <div className="mt-[7px] mb-[14px] flex justify-end">
          <SelectBtn label="생성" onClick={() => redirect("/chat/1")} />
        </div>
      </div>
    </div>
  );
};

export default SetChatModal;

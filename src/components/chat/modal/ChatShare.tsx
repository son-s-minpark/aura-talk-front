import React from "react";
import { setModalDownType } from "@/type/chat/setModalDownType";
import SelectBtn from "@/components/common/SelectBtn";
import { IoIosCopy } from "react-icons/io";

const shareCode = "Code19$Code";

const ChatShare = ({ setModalDown }: setModalDownType) => {
  async function copyCode() {
    try {
      await navigator.clipboard.writeText(shareCode);
    } catch {
      alert("복사 실패!");
    }
  }
  return (
    <div className="modal-content w-[303px] h-[146px] pt-[21px] pl-[22px]">
      <h1 className="mb-[15px]"> 공유 링크</h1>
      <div className="flex w-[253px] h-[32px] rounded-[12px] px-[8px] bg-[#F3F6F6] dark:bg-[#4B4B4B] items-center justify-between">
        <p>{shareCode}</p>
        <button onClick={copyCode}>
          <IoIosCopy className="h-[15px] w-[15px]" />
        </button>
      </div>
      <div className="flex justify-end mt-[14px] mr-[21px]">
        <SelectBtn label="확인" onClick={() => setModalDown("none")} />
      </div>
    </div>
  );
};

export default ChatShare;

import React from "react";
import { setModalDownType } from "@/type/chat/setModalDownType";
import SelectBtn from "@/components/common/SelectBtn";
import { IoIosCopy } from "react-icons/io";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import useChatRoom from "@/hooks/chatRoom/useChatRoom";

const ChatShare = ({ setModalDown }: setModalDownType) => {
  const currChat = useSelector((state: RootState) => state.currChat);
  const { useCreateInviteCodeMuatation } = useChatRoom();

  if (currChat.inviteCodeExpiredAt < new Date()) {
    useCreateInviteCodeMuatation.mutateAsync({ id: currChat.id });
  }

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(currChat.inviteCode);
    } catch {
      alert("복사 실패!");
    }
  }

  return (
    <div className="modal-content w-[303px] pt-[21px] pl-[22px]">
      <h1 className="mb-[15px]"> 공유 링크</h1>
      <div className="flex w-[253px] h-[32px] rounded-[12px] px-[8px] bg-[#F3F6F6] dark:bg-[#4B4B4B] items-center justify-between">
        <p>{currChat.inviteCode}</p>
        <button onClick={copyCode}>
          <IoIosCopy className="h-[15px] w-[15px]" />
        </button>
      </div>
      <div className="mt-[10px] mb-[15px]">
        <p className="text-[10px] text-[var(--color-commonGray)]">
          만료: {currChat.inviteCodeExpiredAt.toISOString()}
        </p>
      </div>
      <div className="flex justify-end mt-[14px] mr-[21px]">
        <SelectBtn label="확인" onClick={() => setModalDown("none")} />
      </div>
    </div>
  );
};

export default ChatShare;

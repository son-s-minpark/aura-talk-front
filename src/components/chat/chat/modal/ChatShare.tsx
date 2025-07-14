import React, { useEffect, useState } from "react";
import { setModalDownType } from "@/type/chat/setModalDownType";
import SelectBtn from "@/components/common/SelectBtn";
import { IoIosCopy } from "react-icons/io";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useInvitationChat } from "@/hooks/chatRoom/useInvitationChat";

const ChatShare = ({ setModalDown }: setModalDownType) => {
  const currChat = useSelector((state: RootState) => state.currChat);
  const [code, setCode] = useState<string>(currChat.inviteCode);
  const { useCreateInviteCode } = useInvitationChat();

  useEffect(() => {
    if (currChat.inviteCodeExpiredAt < new Date()) {
      useCreateInviteCode.mutateAsync({ id: currChat.id });
      setCode(currChat.inviteCode);
    }
  }, [currChat.inviteCodeExpiredAt]);

  const inviteCodeExpiredAt = new Date(currChat.inviteCodeExpiredAt);

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(currChat.inviteCode);
    } catch {
      alert("복사 실패!");
    }
  }

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분`;
  };

  const formattedDate = formatDate(inviteCodeExpiredAt);

  return (
    <div className="modal-content w-[303px] pt-[21px] pl-[22px]">
      <h1 className="mb-[15px]"> 공유 링크</h1>
      <div className="flex w-[253px] h-[32px] rounded-[12px] px-[8px] bg-[#F3F6F6] dark:bg-[#4B4B4B] items-center justify-between">
        <p className="text-[14px] overflow-x-scroll whitespace-nowrap">
          {code}
        </p>
        <button onClick={copyCode} className="w-[25px] flex justify-end">
          <IoIosCopy className="h-[15px] w-[15px]" />
        </button>
      </div>
      <div className="mt-[10px] mb-[15px]">
        <p className="text-[12px] text-[var(--color-commonGray)]">
          만료: {formattedDate}
        </p>
      </div>
      <div className="flex justify-end pb-[14px] mr-[21px]">
        <SelectBtn label="확인" onClick={() => setModalDown("none")} />
      </div>
    </div>
  );
};

export default ChatShare;

import SelectBtn from "@/components/common/SelectBtn";
import { redirect } from "next/navigation";
import React from "react";

const ChatExit = () => {
  function onExit() {
    // 대충 나가기 요청 코드
    redirect("/home");
  }
  return (
    <div className="modal-content w-[284px] h-[120px] pl-[22px] pt-[20px]">
      <h1> 채팅방 나가기 </h1>
      <div className="ml-[11px] mt-[10px]">
        <p className="text-[12px]"> 나가면 이전 대화 기록은 볼 수 없어져요.</p>
      </div>
      <div className="flex justify-end mr-[16px] mt-[6px]">
        <SelectBtn label="확인" onClick={onExit} />
      </div>
    </div>
  );
};

export default ChatExit;

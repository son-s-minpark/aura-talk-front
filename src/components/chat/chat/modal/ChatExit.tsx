import SelectBtn from "@/components/common/SelectBtn";
import useChatRoom from "@/hooks/useChatRoom";
import { RootState } from "@/store/store";
import { redirect } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const ChatExit = () => {
  const currId = useSelector((state: RootState) => state.currChat.id);
  const { useChatRoomExitMutation } = useChatRoom();
  async function onExit() {
    const res = await useChatRoomExitMutation.mutateAsync(currId);
    if (res) {
      redirect("/home");
    } else {
      console.error(res);
    }
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

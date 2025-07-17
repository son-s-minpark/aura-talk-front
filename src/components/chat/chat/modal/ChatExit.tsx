import SelectBtn from "@/components/common/SelectBtn";
import useChatRoom from "@/hooks/chatRoom/useChatRoom";
import useChatRoomLeader from "@/hooks/chatRoom/useChatRoomLeader";
import { RootState } from "@/store/store";
import { redirect } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const ChatExit = () => {
  const currChat = useSelector((state: RootState) => state.currChat);
  const user = useSelector((state: RootState) => state.user);
  const { useExitChatRoom } = useChatRoom();
  const { useDeleteChatRoom } = useChatRoomLeader();
  const isLeader = currChat.owner.id === user.id;

  async function onExit() {
    let res;
    console.error(isLeader, currChat.users.length);
    if (isLeader) {
      if (currChat.users.length == 1)
        res = await useDeleteChatRoom.mutateAsync(currChat.id);
    } else {
      res = await useExitChatRoom.mutateAsync(currChat.id);
    }

    if (res) {
      redirect("/home");
    } else {
      console.error(res);
    }
  }
  return (
    <div className="modal-content w-[284px] pl-[22px] pt-[20px]">
      <h1> {isLeader ? "채팅방 삭제하기 " : "채팅방 나가기"}</h1>
      <div className="ml-[11px] mt-[10px]">
        <p className="text-[12px]">
          {isLeader
            ? "모든 방 인원이 나가야 삭제할 수 있어요."
            : "나가면 이전 대화 기록은 볼 수 없어져요."}
        </p>
      </div>
      <div className="flex justify-end mr-[16px] mt-[6px] pb-[14px]">
        <SelectBtn label="확인" onClick={onExit} />
      </div>
    </div>
  );
};

export default ChatExit;

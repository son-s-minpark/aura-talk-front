import { chatUserType } from "@/type/chat/chatUserType";
import ChatSetUser from "./ChatSetUser";
import React, { useState } from "react";
import useChatRoomLeader from "@/hooks/chatRoom/useChatRoomLeader";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const ChatUserList = ({
  userList,
  listType,
}: {
  userList: chatUserType[];
  listType: "User" | "Blocked" | "None";
}) => {
  const [list, setList] = useState<chatUserType[]>(userList);
  const currChat = useSelector((state: RootState) => state.currChat);
  const { useKickUser, useUnbanUser } = useChatRoomLeader();

  function onUserDelete(id: number) {
    let res;
    if (listType == "User") {
      res = useKickUser.mutateAsync({ chatId: currChat.id, userId: id });
    } else if (listType == "Blocked") {
      res = useUnbanUser.mutateAsync({ chatId: currChat.id, userId: id });
    }
    if (res) {
      setList(list.filter((item) => item.id !== id));
    }
  }

  return (
    <div className="flex gap-[11px] mt-[9px]">
      {userList.map((user, index) => (
        <div key={index}>
          <ChatSetUser user={user} />
          <button
            className="rounded-full w-[9px] h-[9px] bg-commonGray"
            onClick={() => onUserDelete(user.id)}
          >
            -
          </button>
        </div>
      ))}
    </div>
  );
};

export default ChatUserList;

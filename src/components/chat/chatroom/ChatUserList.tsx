import { chatUserType } from "@/type/chat/chatUserType";
import ChatSetUser from "./ChatSetUser";
import React from "react";
import useChatRoomLeader from "@/hooks/chatRoom/useChatRoomLeader";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const ChatUserList = ({
  userList,
  listType,
  setListType,
}: {
  userList: chatUserType[];
  listType: "User" | "Blocked" | "None";
  setListType?: React.Dispatch<React.SetStateAction<chatUserType[]>>;
}) => {
  const currChat = useSelector((state: RootState) => state.currChat);
  const { useKickUser, useUnbanUser } = useChatRoomLeader();

  function onUserDelete(id: number) {
    let res;
    if (listType == "User") {
      res = useKickUser.mutateAsync({ chatId: currChat.id, userId: id });
    } else if (listType == "Blocked") {
      res = useUnbanUser.mutateAsync({ chatId: currChat.id, userId: id });
    } else if (listType == "None") {
      if (setListType) {
        setListType(userList.filter((item) => item.id !== id));
      }
    }
    if (res) {
    }
  }

  return (
    <div className="flex gap-[11px] h-[75px]">
      {userList.map((user, index) => (
        <div key={index} className="relative">
          <ChatSetUser user={user} />
          <button
            className="absolute -top-1 -right-1 rounded-full w-[16px] h-[16px] bg-commonGray text-white text-[10px] flex items-center justify-center"
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

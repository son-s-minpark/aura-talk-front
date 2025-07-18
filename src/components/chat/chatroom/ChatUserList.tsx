import { chatUserType } from "@/type/chat/chatUserType";
import ChatSetUser from "./ChatSetUser";
import React from "react";
import useChatRoomLeader from "@/hooks/chatRoom/useChatRoomLeader";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setRemoveUser } from "@/store/chat/setCurrChat";

const ChatUserList = ({
  userList,
  listType,
  setList,
}: {
  userList: chatUserType[];
  listType: "User" | "Blocked" | "None";
  setList: React.Dispatch<React.SetStateAction<chatUserType[]>>;
}) => {
  const dispatch = useDispatch();
  const currChat = useSelector((state: RootState) => state.currChat);
  const { useKickUser, useUnbanUser } = useChatRoomLeader();

  function onUserDelete(id: number) {
    let res;
    if (listType == "User") {
      res = useKickUser.mutateAsync({ chatId: currChat.id, userId: id });
    } else if (listType == "Blocked") {
      res = useUnbanUser.mutateAsync({ chatId: currChat.id, userId: id });
    } else if (listType == "None") {
      setList(userList.filter((item) => item.id !== id));
    }
    if (res) {
      if (listType == "User") {
        dispatch(setRemoveUser({ id }));
      }
    }
  }

  return (
    <div className="flex items-center gap-[11px] h-[90px] overflow-x-scroll whitespace-nowrap">
      {userList.map((user, index) => (
        <div
          key={index}
          className="relative"
          onClick={() => onUserDelete(user.id)}
        >
          <ChatSetUser user={user} />
          <button className="absolute -top-1 -right-1 rounded-full w-[16px] h-[16px] bg-commonGray text-white text-[10px] flex items-center justify-center">
            -
          </button>
        </div>
      ))}
    </div>
  );
};

export default ChatUserList;

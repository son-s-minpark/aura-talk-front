import { setModalDownType } from "@/type/chat/setModalDownType";
import React from "react";
import { IoPersonAdd, IoSettings, IoShareSocial } from "react-icons/io5";
import { BsDoorOpenFill } from "react-icons/bs";
import { IoNotifications, IoNotificationsOff } from "react-icons/io5";
import ChatRoomUser from "../../chatroom/ChatRoomUser";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import useChatRoom from "@/hooks/chatRoom/useChatRoom";
import { useInvitationChat } from "@/hooks/chatRoom/useInvitationChat";
import { setCurrChat } from "@/store/chat/setCurrChat";
import ImageComponent from "@/components/common/ImageComponent";

const ChatSideBar = ({ setModalDown }: setModalDownType) => {
  const dispatch = useDispatch();
  const currChat = useSelector((state: RootState) => state.currChat);
  const user = useSelector((state: RootState) => state.user);
  const { useChatNotification } = useChatRoom();
  const { useCreateInviteCode } = useInvitationChat();

  if (currChat.inviteCodeExpiredAt < new Date()) {
    useCreateInviteCode.mutateAsync({ id: currChat.id });
  }

  return (
    <div
      className="modal-content w-[271px] flex flex-col pb-[15px] gap-[14px]"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="h-[70px] w-full border-b-1 border-commonGray flex justify-between px-[22px] py-[15px]">
        <div className="flex gap-[15px] items-center">
          <ImageComponent size={44} img={currChat.roomImageUrl} />
          <h1>{currChat.name}</h1>
        </div>
      </div>

      <div className="px-[19px] ">
        <p className="text-[15px] font-semibold text-[var(--color-gray)]">
          멤버({currChat.users.length})
        </p>
        <div className="h-[130px] px-[7px] mt-[17px] overflow-scroll flex flex-col gap-[10px]">
          {currChat.users.map((friend, index) => (
            <ChatRoomUser
              user={friend}
              isLeader={currChat.owner.id == friend.id}
              key={index}
            />
          ))}
        </div>
        <button
          className="text-[var(--color-gray)] flex items-center gap-[14px] mt-[14px]"
          onClick={() => setModalDown("invite")}
        >
          <IoPersonAdd className="h-[28px] w-[28px]" />
          <p className="text-[14px] font-bold"> 친구 추가하기</p>
        </button>
      </div>

      <div className="text-[var(--color-gray)] flex gap-[5px] items-center justify-end mr-[22px]">
        <button
          onClick={() =>
            useChatNotification
              .mutateAsync({
                id: currChat.id,
                isActive: !currChat.active,
              })
              .then(() => {
                dispatch(setCurrChat({ active: !currChat.active }));
              })
          }
        >
          {currChat.active ? (
            <IoNotifications className="w-[25px] h-[25px]" />
          ) : (
            <IoNotificationsOff className="w-[25px] h-[25px]" />
          )}
        </button>
        {currChat.owner.id === user.id && (
          <IoSettings
            onClick={() => setModalDown("setting")}
            className="w-[25px] h-[25px]"
          />
        )}
        <IoShareSocial
          className="w-[25px] h-[25px]"
          onClick={() => setModalDown("share")}
        />
        <BsDoorOpenFill
          className="w-[25px] h-[25px]"
          onClick={() => setModalDown("exit")}
        />
      </div>
    </div>
  );
};

export default ChatSideBar;

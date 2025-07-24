import CheckBtn from "@/components/common/CheckBtn";
import { RootState } from "@/store/store";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { friendType } from "@/type/friend/friendType";
import SelectBtn from "@/components/common/SelectBtn";
import { setModalDownType } from "@/type/chat/setModalDownType";
import { useInvitationChat } from "@/hooks/chatRoom/useInvitationChat";
import ModalFriendComponent from "@/components/friend/ModalFriendComponent";

const InviteFriendModal = ({ setModalDown }: setModalDownType) => {
  const [selectedList, setSelectedList] = useState<friendType[]>([]);
  const currChat = useSelector((state: RootState) => state.currChat);
  const friendList = useSelector((state: RootState) => state.friendList);
  const invitedUserIds = currChat.users.map((user) => user.id);
  const unInvitedFriends = friendList.filter(
    (item) => !invitedUserIds.includes(item.friendUserId)
  );
  const { useSendInvite } = useInvitationChat();

  function onFriendCLicked(friend: friendType) {
    const isSelected = selectedList.some(
      (item) => item.friendUserId === friend.friendUserId
    );

    if (isSelected) {
      setSelectedList(
        selectedList.filter((item) => item.friendUserId !== friend.friendUserId)
      );
    } else {
      setSelectedList([...selectedList, friend]);
    }
  }

  async function onSubmit() {
    selectedList.forEach((friend) =>
      useSendInvite.mutateAsync({
        roomId: currChat.id,
        userId: friend.friendUserId,
      })
    );
    // 웹소켓에서 채팅으로 링크 보내기
    setModalDown("none");
  }

  return (
    <div className="modal-content px-[20px] pt-[25px] pb-[14px] w-[303px]">
      <h1>초대할 친구</h1>
      <div className="mt-[20px] flex flex-col gap-[15px] h-[248px] overflow-y-scroll">
        {unInvitedFriends.map((friend, index) => (
          <div
            key={index}
            className="flex gap-[10px] items-center "
            onClick={() => onFriendCLicked(friend)}
          >
            <CheckBtn
              isChecked={selectedList.some(
                (item) => item.friendUserId === friend.friendUserId
              )}
            />
            <ModalFriendComponent friend={friend} />
          </div>
        ))}
      </div>
      <div className="w-full flex justify-end">
        <SelectBtn label="완료" onClick={onSubmit} />
      </div>
    </div>
  );
};

export default InviteFriendModal;

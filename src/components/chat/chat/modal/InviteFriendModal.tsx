import CheckBtn from "@/components/common/CheckBtn";
import { RootState } from "@/store/store";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { friendType } from "@/type/friend/friendType";
import SelectBtn from "@/components/common/SelectBtn";
import { setModalDownType } from "@/type/chat/setModalDownType";
import { useInvitationChat } from "@/hooks/chatRoom/useInvitationChat";
import ImageComponent from "@/components/common/ImageComponent";

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
    selectedList.map((friend) =>
      useSendInvite.mutateAsync({
        roomId: currChat.id,
        userId: friend.friendUserId,
      })
    );
    // 초대 보내기
    setModalDown("none");
  }

  return (
    <div className="modal-content px-[20px] pt-[25px]">
      <h1>초대할 친구</h1>
      <div className="mt-[24px] flex flex-col gap-[15px]">
        {unInvitedFriends.map((friend, index) => (
          <div
            key={index}
            className="flex gap-[15px]"
            onClick={() => onFriendCLicked(friend)}
          >
            <CheckBtn isChecked={false} />
            <div className="h-[50px] ">
              <ImageComponent size={45} img={friend.thumbnailImageUrl} />
              <div className="flex flex-col gap-[4px] ">
                <p className="font-bold">{friend.nickname}</p>
                <p className="text-[12px] text-[var(--color-commonGray)]">
                  @{friend.username}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <SelectBtn label="완료" onClick={onSubmit} />
    </div>
  );
};

export default InviteFriendModal;

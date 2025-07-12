import CheckBtn from "@/components/common/CheckBtn";
import { RootState } from "@/store/store";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import { friendType } from "@/type/friend/friendType";
import SelectBtn from "@/components/common/SelectBtn";
import { setModalDownType } from "@/type/chat/setModalDownType";

const InviteFriendModal = ({ setModalDown }: setModalDownType) => {
  const [selectedList, setSelectedList] = useState<friendType[]>([]);
  const currChat = useSelector((state: RootState) => state.currChat);
  const friendList = useSelector((state: RootState) => state.friendList);
  const invitedUserIds = currChat.users.map((user) => user.id);
  const unInvitedFriends = friendList.filter(
    (item) => !invitedUserIds.includes(item.friendUserId)
  );

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

  function onSubmit() {
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
              <div className="w-[45px] h-[45px] rounded-full relative overflow-hidden">
                <Image
                  src={friend.thumbnailImageUrl}
                  alt="사용자 프로필"
                  fill
                />
              </div>
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

import React, { useState } from "react";
import ModalFriendComponent from "./ModalFriendComponent";
import SelectBtn from "../common/SelectBtn";
import { otherFriendType } from "@/type/friend/otherFriendListType";
import { useFriend } from "@/hooks/friend/useFriend";

const WaitingList = ({ list }: { list: otherFriendType[] }) => {
  const [waitingList, setWaitingList] = useState<otherFriendType[]>(list);
  const { useFriendAcceptMutation, useFriendRejectMutation } = useFriend();

  function onAcceptWaiting(userId: number) {
    useFriendAcceptMutation.mutateAsync(userId).then(() => {
      setWaitingList(waitingList.filter((item) => item.friendUserId == userId));
    });
  }

  function onRejectWaiting(userId: number) {
    useFriendRejectMutation.mutateAsync(userId).then(() => {
      setWaitingList(waitingList.filter((item) => item.friendUserId == userId));
    });
  }

  return (
    <>
      {waitingList.map((friend, index) => (
        <div className="flex justify-between" key={index}>
          <ModalFriendComponent friend={friend} />
          <div className="flex gap-[6px] items-center">
            <SelectBtn
              label="수락"
              onClick={() => onAcceptWaiting(friend.friendUserId)}
            />
            <SelectBtn
              isRejected={true}
              label="거절"
              onClick={() => onRejectWaiting(friend.friendUserId)}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default WaitingList;

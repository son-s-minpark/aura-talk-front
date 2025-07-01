import React, { useState } from "react";
import ModalFriendComponent from "./ModalFriendComponent";
import SelectBtn from "../common/SelectBtn";
import { friendType } from "@/type/friend/friendType";
import { useFriend } from "@/hooks/friend/useFriend";
import { addFriend } from "@/store/friend/setFriendList";
import { useDispatch } from "react-redux";

const WaitingList = ({ list }: { list: friendType[] }) => {
  const [waitingList, setWaitingList] = useState<friendType[]>(list);
  const { useFriendAcceptMutation, useFriendRejectMutation } = useFriend();
  const dispatch = useDispatch();

  function onAcceptWaiting(friend: friendType) {
    useFriendAcceptMutation.mutateAsync(friend.friendUserId).then(() => {
      deleteFriend(friend.friendUserId);
      dispatch(addFriend(friend));
    });
  }

  function onRejectWaiting(userId: number) {
    useFriendRejectMutation.mutateAsync(userId).then(() => {
      deleteFriend(userId);
    });
  }

  function deleteFriend(userId: number) {
    setWaitingList(waitingList.filter((item) => item.friendUserId !== userId));
  }

  return (
    <>
      {waitingList.map((friend, index) => (
        <div className="flex justify-between" key={index}>
          <ModalFriendComponent friend={friend} />
          <div className="flex gap-[6px] items-center">
            <SelectBtn label="수락" onClick={() => onAcceptWaiting(friend)} />
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

import React, { useState } from "react";
import ModalFriendComponent from "./ModalFriendComponent";
import SelectBtn from "../common/SelectBtn";
import { friendType } from "@/type/friend/friendType";
import { useFriend } from "@/hooks/friend/useFriend";
import { addFriend } from "@/store/friend/setFriendList";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

const WaitingList = ({ list }: { list: friendType[] }) => {
  const [waitingList, setWaitingList] = useState<friendType[]>(list);
  const { useAcceptFriendMutation, useRejectFriendMutation } = useFriend();
  const dispatch = useDispatch();
  const router = useRouter();

  function onAcceptWaiting(friend: friendType) {
    useAcceptFriendMutation.mutateAsync(friend.friendUserId).then(() => {
      deleteFriend(friend.friendUserId);
      dispatch(addFriend(friend));
    });
  }

  function onRejectWaiting(userId: number) {
    useRejectFriendMutation.mutateAsync(userId).then(() => {
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
          <div onClick={() => router.push(`profile/${friend.friendUserId}`)}>
            <ModalFriendComponent friend={friend} />
          </div>
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

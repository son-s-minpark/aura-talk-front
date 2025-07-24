import React, { useState, useEffect } from "react";
import ModalFriendComponent from "./ModalFriendComponent";
import SelectBtn from "../common/SelectBtn";
import { friendType } from "@/type/friend/friendType";
import { useFriend } from "@/hooks/friend/useFriend";
import { addFriend } from "@/store/friend/setFriendList";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useFriendList } from "@/hooks/friend/useFriendList";

const WaitingList = () => {
  const [waitingList, setWaitingList] = useState<friendType[]>([]);
  const { useAcceptFriend, useRejectFriend } = useFriend();
  const { getWaitingFriendList } = useFriendList();
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    async function fetchRequestingFriends() {
      try {
        const data = await getWaitingFriendList();
        setWaitingList(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchRequestingFriends();
  }, []);

  function onAcceptWaiting(friend: friendType) {
    useAcceptFriend.mutateAsync(friend.friendUserId).then(() => {
      deleteFriend(friend.friendUserId);
      dispatch(addFriend(friend));
    });
  }

  function onRejectWaiting(userId: number) {
    useRejectFriend.mutateAsync(userId).then(() => {
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

import React, { useState, useEffect } from "react";
import ModalFriendComponent from "./ModalFriendComponent";
import SelectBtn from "../common/SelectBtn";
import { friendType } from "@/type/friend/friendType";
import { useRouter } from "next/navigation";
import { useFriend } from "@/hooks/friend/useFriend";
import { useFriendList } from "@/hooks/friend/useFriendList";

const BlockingList = () => {
  const { useCancelBlockFriend } = useFriend();
  const { getBlockedFriendsList } = useFriendList();
  const [blockingList, setBlockingList] = useState<friendType[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchFriendList() {
      try {
        const blocking = await getBlockedFriendsList();
        setBlockingList(blocking);
      } catch (err) {
        console.error(err);
      }
    }

    fetchFriendList();
  }, []);

  function onCancelBlock(id: number) {
    useCancelBlockFriend.mutateAsync(id);
    setBlockingList(blockingList.filter((item) => item.friendUserId !== id));
  }

  return (
    <>
      {blockingList.map((friend) => (
        <div className="flex justify-between" key={friend.friendUserId}>
          <div onClick={() => router.push(`profile/${friend.friendUserId}`)}>
            <ModalFriendComponent friend={friend} />
          </div>
          <div className="flex gap-[6px] items-center">
            <SelectBtn
              isRejected={true}
              label="취소"
              onClick={() => onCancelBlock(friend.friendUserId)}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default BlockingList;

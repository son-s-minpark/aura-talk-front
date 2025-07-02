import React, { useState } from "react";
import ModalFriendComponent from "./ModalFriendComponent";
import SelectBtn from "../common/SelectBtn";
import { friendType } from "@/type/friend/friendType";
import { useFriend } from "@/hooks/friend/useFriend";
import { useRouter } from "next/navigation";

const RequestingList = ({ list }: { list: friendType[] }) => {
  const { useCancelFriendRequestMuration } = useFriend();
  const [requestList, setRequestList] = useState<friendType[]>(list);
  const router = useRouter();

  async function onCancelFriendRequest(userId: number) {
    await useCancelFriendRequestMuration
      .mutateAsync(userId)
      .then(() => {
        setRequestList((prevList) =>
          prevList.filter((item) => item.friendUserId !== userId)
        );
      })
      .catch((err) => console.error(err));
  }

  return (
    <>
      {requestList.map((friend: friendType) => (
        <div className="flex justify-between" key={friend.friendUserId}>
          <div onClick={() => router.push(`profile/${friend.friendUserId}`)}>
            <ModalFriendComponent friend={friend} />
          </div>
          <div className="flex gap-[6px] items-center">
            <SelectBtn
              isRejected={true}
              label="취소"
              onClick={() => onCancelFriendRequest(friend.friendUserId)}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default RequestingList;

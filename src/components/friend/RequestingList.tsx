import React, { useState } from "react";
import ModalFriendComponent from "./ModalFriendComponent";
import SelectBtn from "../common/SelectBtn";
import { useRequestedFriend } from "@/hooks/friend/useRequestedFriend";
import { otherFriendType } from "@/type/friend/otherFriendListType";
import { useFriend } from "@/hooks/friend/useFriend";

const RequestingList = () => {
  const { useCancelFriendRequestMuration } = useFriend();
  const { useGetRequestingFriendList } = useRequestedFriend();
  const { data, isLoading } = useGetRequestingFriendList();
  const [requestList, setRequestList] = useState<otherFriendType[]>(data);

  async function onCancelFriendRequest(userId: number) {
    await useCancelFriendRequestMuration
      .mutateAsync(userId)
      .then(() => {
        setRequestList(
          requestList.filter((item) => item.friendUserId == userId)
        );
      })
      .catch((err) => console.error(err));
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {requestList.map((friend: otherFriendType) => (
        <div className="flex justify-between" key={friend.friendUserId}>
          <ModalFriendComponent friend={friend} />
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

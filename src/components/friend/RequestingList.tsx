import React from "react";
import ModalFriendComponent from "./ModalFriendComponent";
import SelectBtn from "../common/SelectBtn";
import { useRequestedFriend } from "@/hooks/friend/useRequestedFriend";
import { friendType } from "@/type/friend/friendType";

const RequestingList = () => {
  const { useGetRequestingFriendList } = useRequestedFriend();

  const { data, isLoading } = useGetRequestingFriendList();
  function onCancelFriendRequest() {}

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {data.map((friend: friendType) => (
        <div className="flex justify-between" key={friend.id}>
          <ModalFriendComponent friend={friend} />
          <div className="flex gap-[6px] items-center">
            <SelectBtn
              isRejected={true}
              label="취소"
              onClick={() => onCancelFriendRequest()}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default RequestingList;

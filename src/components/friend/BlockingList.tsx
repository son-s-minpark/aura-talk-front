import React from "react";
import ModalFriendComponent from "./ModalFriendComponent";
import SelectBtn from "../common/SelectBtn";
import { useBlockedFriends } from "@/hooks/friend/useBlockedFriend";
import { friendType } from "@/type/friend/friendType";

const BlockingList = () => {
  const { useGetBlockedFriendsList } = useBlockedFriends();
  const { data, isLoading } = useGetBlockedFriendsList();
  function onCancelBlock() {}

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {data.map((friend: friendType) => (
        <div className="flex justify-between" key={friend.friendUserId}>
          <ModalFriendComponent friend={friend} />
          <div className="flex gap-[6px] items-center">
            <SelectBtn
              isRejected={true}
              label="취소"
              onClick={() => onCancelBlock()}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default BlockingList;

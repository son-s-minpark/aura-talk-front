import AlertCircle from "@/components/common/AlertCircle";
import FriendComponent from "@/components/friend/FriendComponent";
import OtherFriendsModal from "@/components/friend/modal/OtherFriendsModal";
import { useFriend } from "@/hooks/friend/useFriend";
import { useRequestedFriend } from "@/hooks/friend/useRequestedFriend";
import { RootState } from "@/store/store";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const FriendList = () => {
  const [isOtherFriendModalDown, setIsOtherFriendModalDown] =
    useState<boolean>(false);
  const { useGetFriendList } = useFriend();
  const { useGetWaitingFriendList } = useRequestedFriend();
  const { isLoading } = useGetFriendList();
  const { data: waitingList = [] } = useGetWaitingFriendList();
  const friendList = useSelector((state: RootState) => state.friendList);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <>
      {isOtherFriendModalDown && (
        <div className="modal" onClick={() => setIsOtherFriendModalDown(false)}>
          <OtherFriendsModal waitingList={waitingList} />
        </div>
      )}
      <div className="px-[38px] pt-[34px] flex flex-col">
        <p
          className="text-[12px] font-semibold flex justify-end"
          onClick={() => setIsOtherFriendModalDown(true)}
        >
          친구 요청/대기/차단
          {waitingList.length !== 0 && <AlertCircle />}
        </p>
      </div>
      <div className="flex flex-col gap-[30px]">
        {friendList.map((friend, index) => (
          <FriendComponent friend={friend} key={index} />
        ))}
      </div>
    </>
  );
};

export default FriendList;

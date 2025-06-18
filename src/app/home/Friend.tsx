import AlertCircle from "@/components/common/AlertCircle";
import FriendComponent from "@/components/friend/FriendComponent";
import OtherFriendsModal from "@/components/friend/modal/OtherFriendsModal";
import { useFriend } from "@/hooks/useFriend";
import { RootState } from "@/store/store";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const FriendList = () => {
  const [isOtherFriendModalDown, setIsOtherFriendModalDown] =
    useState<boolean>(false);
  const { useGetFriendList } = useFriend();
  const { isLoading } = useGetFriendList();
  const friendList = useSelector((state: RootState) => state.friendList);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <>
      {isOtherFriendModalDown && (
        <div className="modal" onClick={() => setIsOtherFriendModalDown(false)}>
          <OtherFriendsModal />
        </div>
      )}
      <div className="px-[38px] pt-[34px] flex flex-col">
        <p
          className="text-[12px] font-semibold flex justify-end"
          onClick={() => setIsOtherFriendModalDown(true)}
        >
          친구 요청/대기/차단
          <AlertCircle />
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

import AlertCircle from "@/components/common/AlertCircle";
import FriendComponent from "@/components/friend/FriendComponent";
import OtherFriendsModal from "@/components/friend/modal/OtherFriendsModal";
import { useBlockedFriends } from "@/hooks/friend/useBlockedFriend";
import { useFriend } from "@/hooks/friend/useFriend";
import { useRequestedFriend } from "@/hooks/friend/useRequestedFriend";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const FriendList = () => {
  const [isOtherFriendModalDown, setIsOtherFriendModalDown] =
    useState<boolean>(false);
  const { useGetFriendList } = useFriend();
  const { useGetWaitingFriendList, useGetRequestingFriendList } =
    useRequestedFriend();
  const { useGetBlockedFriendsList } = useBlockedFriends();
  const { isLoading: isFriendListLoading } = useGetFriendList();
  const { data: waitingList, isLoading: isWaitingListLoading } =
    useGetWaitingFriendList();
  const { data: requestingList, isLoading: isRequestingListLoading } =
    useGetRequestingFriendList();
  const { data: blockingList, isLoading: isBlockingListLoading } =
    useGetBlockedFriendsList();
  const friendList = useSelector((state: RootState) => state.friendList);
  const router = useRouter();

  if (
    isFriendListLoading ||
    isWaitingListLoading ||
    isRequestingListLoading ||
    isBlockingListLoading
  ) {
    return <div>Loading ...</div>;
  }

  return (
    <>
      {isOtherFriendModalDown && (
        <div className="modal" onClick={() => setIsOtherFriendModalDown(false)}>
          <OtherFriendsModal
            waitingList={waitingList}
            requestingList={requestingList}
            blockingList={blockingList}
          />
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
      <div className="px-[38px]">
        <p className="font-semibold mb-[22px]">친구</p>
        <div className="flex flex-col gap-[20px]">
          {friendList.map((friend, index) => (
            <div
              key={index}
              onClick={() => router.push(`profile/${friend.friendUserId}`)}
            >
              <FriendComponent friend={friend} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FriendList;

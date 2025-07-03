"use client";
import AlertCircle from "@/components/common/AlertCircle";
import FriendComponent from "@/components/friend/FriendComponent";
import OtherFriendsModal from "@/components/friend/modal/OtherFriendsModal";
import { useFriendList } from "@/hooks/friend/useFriendList";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const FriendList = () => {
  const [isOtherFriendModalDown, setIsOtherFriendModalDown] =
    useState<boolean>(false);
  const [isWaiting, setIsWaiting] = useState<boolean>(false);
  const friendList = useSelector((state: RootState) => state.friendList);
  const { getFriendList, getWaitingFriendList } = useFriendList();
  const router = useRouter();

  useEffect(() => {
    async function fetchFriendList() {
      try {
        await getFriendList();
        const waiting = await getWaitingFriendList();
        setIsWaiting(waiting.length !== 0);
      } catch (err) {
        console.error(err);
      }
    }

    fetchFriendList();
  }, []);

  return (
    <>
      {isOtherFriendModalDown && (
        <div className="modal" onClick={() => setIsOtherFriendModalDown(false)}>
          <OtherFriendsModal />
        </div>
      )}
      <div className="px-[38px] pt-[34px] flex flex-col">
        <p
          className="text-[12px] font-semibold flex justify-end cursor-pointer"
          onClick={() => setIsOtherFriendModalDown(true)}
        >
          친구 요청/대기/차단
          {isWaiting && <AlertCircle />}
        </p>
      </div>
      <div className="px-[38px]">
        <p className="font-semibold mb-[22px]">친구</p>
        <div className="flex flex-col gap-[20px]">
          {friendList.map((friend) => (
            <div
              key={friend.friendUserId}
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

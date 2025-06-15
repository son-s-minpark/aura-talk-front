import AlertCircle from "@/components/common/AlertCircle";
import OtherFriendsModal from "@/components/friend/modal/OtherFriendsModal";
import React, { useState } from "react";

const FriendList = () => {
  const [isOtherFriendModalDown, setIsOtherFriendModalDown] =
    useState<boolean>(false);
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
        {/* 친구 목록 */}
      </div>
    </>
  );
};

export default FriendList;

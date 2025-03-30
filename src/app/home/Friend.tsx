import React from "react";

const WaitingFriendList = () => {
  return (
    <div className="text-[18px] font-bold">
      <p> 대기 중 </p>
    </div>
  );
};

const FriendsList = () => {
  return (
    <div className="mt-[35px]">
      <p className="text-[18px] font-bold"> 친구 </p>
    </div>
  );
};

const FriendList = () => {
  return (
    <div className="px-[38px]">
      {/* 대기 중인 친구가 없을 때 */}
      <WaitingFriendList />
      <FriendsList />
    </div>
  );
};

export default FriendList;

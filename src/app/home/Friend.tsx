import React from "react";

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
      <FriendsList />
    </div>
  );
};

export default FriendList;

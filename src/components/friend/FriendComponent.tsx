import React from "react";

const FriendComponent = () => {
  return (
    <div className="w-full h-[52px] flex gap-[14px]">
      <div className="w-[52px] h-[52px] rounded-full border-1 border-[var(--color-gary)]"></div>
      <div className="flex flex-col gap-[8px]">
        <p className="text-[18px] font-bold"> 이름 </p>
        <p className="text-[12px] text-[var(--color-commonGray)]">
          {" "}
          한 줄 소개{" "}
        </p>
      </div>
    </div>
  );
};

export default FriendComponent;

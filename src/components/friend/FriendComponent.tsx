import { friendType } from "@/type/friend/friendType";
import Image from "next/image";
import React from "react";

const FriendComponent = ({ friend }: { friend: friendType }) => {
  return (
    <div className="w-full h-[52px] flex gap-[14px]">
      <div className="w-[52px] h-[52px] rounded-full border-1 border-[var(--color-gary)]  relative overflow-hidden">
        {friend.thumbnailImageUrl && (
          <Image
            src={friend.thumbnailImageUrl}
            alt="Profile"
            fill
            className="rounded-full object-cover"
          />
        )}
      </div>
      <div className="flex flex-col">
        <p className="text-[18px] font-bold"> {friend.nickname} </p>
        <p className="text-[12px] text-[var(--color-commonGray)]">
          {friend.description}
        </p>
      </div>
    </div>
  );
};

export default FriendComponent;

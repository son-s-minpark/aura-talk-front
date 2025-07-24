import { friendType } from "@/type/friend/friendType";
import React from "react";
import ImageComponent from "../common/ImageComponent";

const FriendComponent = ({ friend }: { friend: friendType }) => {
  return (
    <div className="w-full h-[52px] flex gap-[14px]">
      <ImageComponent size={52} img={friend.thumbnailImageUrl} />
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

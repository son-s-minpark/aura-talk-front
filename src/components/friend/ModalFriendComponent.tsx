import React from "react";
import { friendType } from "@/type/friend/friendType";
import ImageComponent from "../common/ImageComponent";

const ModalFriendComponent = ({ friend }: { friend: friendType }) => {
  return (
    <div className="w-full h-[41px] flex justify-between items-center overflow-x-scroll">
      <div className="flex gap-[11px]">
        <ImageComponent size={40} img={friend.thumbnailImageUrl} />
        <div className="flex flex-col gap-[3px]">
          <p className="font-semibold">{friend.nickname}</p>
          <p className="text-[10px] text-commonGray">@{friend.username}</p>
        </div>
      </div>
    </div>
  );
};

export default ModalFriendComponent;

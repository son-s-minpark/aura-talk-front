import React from "react";
import Image from "next/image";
import { friendType } from "@/type/friend/friendType";
import { useRouter } from "next/navigation";

const ModalFriendComponent = ({ friend }: { friend: friendType }) => {
  const router = useRouter();
  return (
    <div
      className="w-full h-[41px] flex justify-between items-center overflow-x-scroll"
      onClick={() => router.push(`profile/${friend.friendUserId}`)}
    >
      <div className="flex gap-[11px]">
        <div className="w-[40px] h-[40px] rounded-full border-1 border-[var(--color-commonGray)] relative overflow-hidden">
          <>
            <Image
              src={friend.thumbnailImageUrl}
              alt="profile"
              fill
              className="rounded-full object-cover"
            />
          </>
        </div>
        <div className="flex flex-col gap-[3px]">
          <p className="font-semibold">{friend.nickname}</p>
          <p className="text-[10px] text-commonGray">@{friend.username}</p>
        </div>
      </div>
    </div>
  );
};

export default ModalFriendComponent;

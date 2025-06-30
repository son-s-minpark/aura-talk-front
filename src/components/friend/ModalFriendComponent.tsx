import { useProfile } from "@/hooks/useProfile";
import React from "react";
import { AxiosError } from "axios";
import ErrorMessage from "../common/ErrorMessage";
import Image from "next/image";
import { friendType } from "@/type/friend/friendType";

const ModalFriendComponent = ({ friend }: { friend: friendType }) => {
  const { useGetUserProfile } = useProfile();

  const { isLoading, isError, error } = useGetUserProfile(friend.friendUserId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (isError) {
    const err = error as AxiosError;
    return (
      <>
        <p>Error!</p>
        <ErrorMessage msg={err.message} />
      </>
    );
  }

  return (
    <div className="w-full h-[41px] flex justify-between items-center overflow-x-scroll">
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

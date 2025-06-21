import { useProfile } from "@/hooks/useProfile";
import React from "react";
import { AxiosError } from "axios";
import ErrorMessage from "../common/ErrorMessage";
import { friendType } from "@/type/friend/friendType";
import Image from "next/image";

const ModalFriendComponent = ({ friend }: { friend: friendType }) => {
  const { useGetUserProfile } = useProfile();

  const { data, isLoading, isError, error } = useGetUserProfile(friend.id);

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
        <div className="w-[40px] h-[40px] rounded-full border-1 border-[var(--color-commonGray)]">
          <Image src={friend.profileImage.thumbnailImageUrl} alt="profile" />
        </div>
        <div className="flex flex-col gap-[5px]">
          <p>{data.nickname}</p>
          <p>{data.username}</p>
        </div>
      </div>
    </div>
  );
};

export default ModalFriendComponent;

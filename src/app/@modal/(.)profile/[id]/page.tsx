"use client";
import { useProfile } from "@/hooks/useProfile";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ImageComponent from "@/components/common/ImageComponent";
import InterestBtnList from "@/components/onboarding/InterestBtnList";
import FriendButtonList from "@/components/profile/FriendButtonList";

const Page = () => {
  const { useGetUserProfile } = useProfile();

  const params = useParams();
  const profileId = Number(params.id);
  const { isLoading, data } = useGetUserProfile(profileId);

  const [friendStatus, setFriendStatus] = useState<string>("");

  useEffect(() => {
    if (data?.data) {
      setFriendStatus(data.data.friendStatus);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="model-content w-[274px]">
      <div>
        <ImageComponent size={70} img={data.profileImage.thumbnailImageUrl} />
        <p>{data.nickname}</p>
        <p>{data.username}</p>
      </div>
      <FriendButtonList
        status={friendStatus}
        setFriendStatus={setFriendStatus}
        id={profileId}
      />
      <div>
        <div>
          <p>한 줄 소개</p>
          <p>{data.description}</p>
        </div>
        <div>
          <p>관심사</p>
          <InterestBtnList isScrollable={false} />
        </div>
      </div>
    </div>
  );
};

export default Page;

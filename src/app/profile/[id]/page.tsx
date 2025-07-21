"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Back from "@/components/common/Back";
import { useProfile } from "@/hooks/useProfile";
import { AxiosError } from "axios";
import ErrorMessage from "@/components/common/ErrorMessage";
import InterestBtn from "@/components/profile/InterestBtn";
import Container from "@/components/common/Container";
import { friendUserType } from "@/type/user/friendUserType";
import FriendButtonList from "@/components/profile/FriendButtonList";
import ImageComponent from "@/components/common/ImageComponent";

const Page = () => {
  const { useGetUserProfile } = useProfile();
  const params = useParams();
  const profileId = Number(params.id);
  const [friendStatus, setFriendStatus] = useState<string>("");

  const { data, isLoading, isError, error } = useGetUserProfile(profileId);

  useEffect(() => {
    if (data?.data) {
      setFriendStatus(data.data.friendStatus);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }
  console.error(data);

  if (isError) {
    const err = error as AxiosError;
    return (
      <>
        <p>Error!</p>
        <ErrorMessage msg={err.message} />
      </>
    );
  }

  const userData: friendUserType = data?.data;

  function getFriendStatusMent() {
    if (friendStatus === "BLOCKED") {
      return "차단한 친구";
    } else if (friendStatus === "BLOCKED_BY") {
      return "나를 차단한 친구";
    } else if (friendStatus === "FRIENDS") {
      return "친구";
    } else if (friendStatus === "REQUEST_RECEIVED") {
      return "내게 친구 신청을 한 친구";
    } else if (friendStatus === "REQUEST_SENT") {
      return "내가 친구를 신청한 친구";
    } else if (friendStatus === "NONE") {
      return "나를 모르는 친구";
    }
    return "";
  }

  return (
    <div className="w-full h-full bg-[var(--color-point)] flex flex-col justify-between">
      <Back />
      <div className="flex flex-col items-center">
        <div className="h-[139px] flex flex-col items-center text-white">
          {userData && (
            <ImageComponent
              size={80}
              img={userData.profileImage.thumbnailImageUrl}
            />
          )}
          <div className="mt-[20px] flex flex-col items-center">
            <p className="text-[20px] font-bold">{userData?.nickname}</p>
            <p className="text-[12px]">@{userData?.username}</p>
          </div>
        </div>
        <FriendButtonList
          status={friendStatus}
          setFriendStatus={setFriendStatus}
          id={userData.id}
        />
      </div>

      <Container height={502}>
        <div className="flex flex-col gap-[26px] pt-[41px] px-[24px]">
          <div className="flex flex-col gap-[9px]">
            <p className="text-[var(--color-commonGray)]">사용자 이름</p>
            <p className="text-[18px] font-semibold">{userData?.nickname}</p>
          </div>
          <div className="flex flex-col gap-[9px]">
            <p className="text-[var(--color-commonGray)]">한 줄 소개</p>
            <p className="text-[18px] font-semibold">
              {userData?.description || "한 줄 소개가 없습니다."}
            </p>
          </div>
          <div className="flex flex-col gap-[9px]">
            <p className="text-[var(--color-commonGray)]">관심사</p>
            <div className="flex w-full gap-[10px] flex-wrap">
              {userData.interests?.map((interest, index) => (
                <InterestBtn label={interest} key={index} />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-[9px]">
            <p className="text-[var(--color-commonGray)]">나와의 관계</p>
            <p className="text-[18px] font-semibold">{getFriendStatusMent()}</p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Page;

"use client";
import React, { useState, useEffect } from "react";
import Chat from "@/app/home/Chat";
import FriendList from "@/app/home/Friend";
import SettingList from "@/app/home/Setting";
import Header from "@/components/home/Header";
import Nav from "@/components/home/Nav";
import Container from "@/components/common/Container";
import useUserStore from "@/state/user/useUserStore";
import useProfileImgStore from "@/state/user/useProfileImgStore";
import { useProfile } from "@/hooks/useProfile";
import { AxiosError } from "axios";
import ErrorMessage from "@/components/common/ErrorMessage";

type ListType = "chat" | "friend" | "setting";

const Page = () => {
  const [list, setList] = useState<ListType>("chat");
  const { userData } = useUserStore();
  const { setProfileImgData } = useProfileImgStore();
  const { useGetProfileImg } = useProfile();

  const { data, isLoading, isError, error } = useGetProfileImg(userData.userId);

  useEffect(() => {
    if (data) {
      console.error(data);
      setProfileImgData({
        originalImgUrl: data.data.data.originalImageUrl,
        thumbnailImgUrl: data.data.data.thumbnailImageUrl,
        isDefaultImg: data.data.data.defaultIamge,
      });
    }
  }, [data, setProfileImgData]);

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
    <div className="w-full h-full bg-[var(--color-point)] flex flex-col justify-between">
      <Header />
      <Container height={543}>
        <div className="h-[543px] w-full pt-[46px]">
          {list === "chat" && <Chat />}
          {list === "friend" && <FriendList />}
          {list === "setting" && <SettingList />}
        </div>
        <Nav setList={setList} list={list} />
      </Container>
    </div>
  );
};

export default Page;

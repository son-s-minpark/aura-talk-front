"use client";
import React, { useState } from "react";
import Chat from "@/app/home/Chat";
import FriendList from "@/app/home/Friend";
import SettingList from "@/app/home/Setting";
import Header from "@/components/home/Header";
import Nav from "@/components/home/Nav";
import Container from "@/components/common/Container";

type ListType = "chat" | "friend" | "setting";

const Page = () => {
  const [list, setList] = useState<ListType>("chat");
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

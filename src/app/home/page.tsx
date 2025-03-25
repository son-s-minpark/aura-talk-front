"use client";
import React, { useState } from "react";
import ChatList from "@/components/chat/ChatList";
import FriendList from "@/components/friend/FriendList";
import SettingList from "@/components/setting/SettingList";
import Header from "@/components/home/Header";
import Nav from "@/components/home/Nav";

type ListType = "chat" | "friend" | "setting";

const Page = () => {
  const [list, setList] = useState<ListType>("chat");
  return (
    <div className="w-full h-full bg-blue-600 flex flex-col justify-between">
      <Header />
      <div className="bg-point rounded-t-[20px] bg-[var(--color-background)]">
        <div className="h-[543px] w-full pt-[46px]">
          {list == "chat" && <ChatList />}
          {list == "friend" && <FriendList />}
          {list == "setting" && <SettingList />}
        </div>
        <Nav setList={setList} list={list} />
      </div>
    </div>
  );
};

export default Page;

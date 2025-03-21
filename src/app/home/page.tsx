"use client";
import React, { useState } from "react";
import {
  IoSearch,
  IoNotifications,
  IoChatbubbles,
  IoPeople,
  IoSettings,
  IoPersonAdd,
} from "react-icons/io5";
import Image from "next/image";
import logo from "../../../public/images/logo-none.png";
import clsx from "clsx";
import ChatList from "@/components/chat/ChatList";
import FriendList from "@/components/friend/FriendList";
import SettingList from "@/components/setting/SettingList";

type ListType = "chat" | "friend" | "setting";

const Page = () => {
  const [list, setList] = useState<ListType>("chat");
  return (
    <div className="w-full h-full bg-black flex flex-col justify-between">
      <div className="h-[76px] w-full items-center flex justify-between">
        <button className="ml-[13px]">
          <Image
            src={logo}
            alt="아우라 톡 로고"
            className="w-[41px] h-[41px]"
          />
        </button>
        <div className="flex text-white mr-[21px] gap-[12px]">
          <button>
            <IoPersonAdd className="w-[22px] h-[22px]" />
          </button>
          <button>
            <IoSearch className="w-[24px] h-[24px]" />
          </button>
          <button>
            <IoNotifications className="w-[24px] h-[24px]" />
          </button>
        </div>
      </div>

      <div className="dark:bg-darkBg bg-white rounded-t-[20px]">
        <div className="h-[543px] w-full">
          {list == "chat" && <ChatList />}
          {list == "friend" && <FriendList />}
          {list == "setting" && <SettingList />}
        </div>

        <div className="w-full h-[48px] border-t-[1px] border-[#999999] flex items-center justify-center">
          <div className="w-[301px] h-[29px] flex items-center justify-between">
            <button
              className={clsx({
                "text-darkGray dark:text-lightGray": list != "chat",
                "text-pointBlue dark:text-pointPurple": list == "chat",
              })}
              onClick={() => setList("chat")}
            >
              <IoChatbubbles className="w-[30px] h-[30px]" />
            </button>
            <button
              className={clsx({
                "text-darkGray dark:text-lightGray": list != "friend",
                "text-pointBlue dark:text-pointPurple": list == "friend",
              })}
              onClick={() => setList("friend")}
            >
              <IoPeople className="w-[30px] h-[30px]" />
            </button>
            <button
              className={clsx({
                "text-darkGray dark:text-lightGray": list != "setting",
                "text-pointBlue dark:text-pointPurple": list == "setting",
              })}
              onClick={() => setList("setting")}
            >
              <IoSettings className="w-[30px] h-[30px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

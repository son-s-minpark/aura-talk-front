"use client";
import React, { useState } from "react";
import {
  IoSearch,
  IoNotifications,
  IoChatbubbles,
  IoPeople,
  IoSettings,
} from "react-icons/io5";
import Image from "next/image";
import logo from "../../../public/images/logo-none.png";
import clsx from "clsx";

type ListType = "chat" | "friend" | "setting";

const Page = () => {
  const [list, setList] = useState<ListType>("chat");
  return (
    <div className="w-full h-full bg-black flex flex-col flex justify-between">
      <div className="h-[76px] w-full items-center flex justify-between">
        <button className="ml-[13px]">
          <Image
            src={logo}
            alt="아우라 톡 로고"
            className="w-[41px] h-[41px]"
          />
        </button>
        <div className="text-white mr-[21px]">
          <button>
            <IoSearch className="w-[24px] h-[24px] mr-[12px]" />
          </button>
          <button>
            <IoNotifications className="w-[24px] h-[24px]" />
          </button>
        </div>
      </div>

      <div className="dark:bg-darkBg bg-white rounded-t-[20px]">
        <div className="h-[543px] w-full"></div>

        <div className="w-full h-[48px] border-t-[1px] border-[#999999] flex items-center justify-center">
          <div className="w-[301px] h-[29px] flex items-center justify-between">
            <button
              className={clsx({
                "text-[#797C7B] dark:text-[#BCBCBC]": list != "chat",
                "text-[#6EABFF] dark:text-[#8045FF]": list == "chat",
              })}
              onClick={() => setList("chat")}
            >
              <IoChatbubbles className="w-[30px] h-[30px]" />
            </button>
            <button
              className={clsx({
                "text-[#797C7B] dark:text-[#BCBCBC]": list != "friend",
                "text-[#6EABFF] dark:text-[#8045FF]": list == "friend",
              })}
              onClick={() => setList("friend")}
            >
              <IoPeople className="w-[30px] h-[30px]" />
            </button>
            <button
              className={clsx({
                "text-[#797C7B] dark:text-[#BCBCBC]": list != "setting",
                "text-[#6EABFF] dark:text-[#8045FF]": list == "setting",
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

import React from "react";
import { IoChatbubbles, IoPeople, IoSettings } from "react-icons/io5";
import clsx from "clsx";

type NavProps = {
  setList: React.Dispatch<React.SetStateAction<"chat" | "friend" | "setting">>;
  list: string;
};

const Nav = ({ setList, list }: NavProps) => {
  return (
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
  );
};

export default Nav;

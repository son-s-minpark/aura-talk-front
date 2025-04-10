import React from "react";
import { IoChatbubbles, IoPeople, IoSettings } from "react-icons/io5";
import clsx from "clsx";

type NavProps = {
  setList: React.Dispatch<React.SetStateAction<"chat" | "friend" | "setting">>;
  list: string;
};

const Nav = ({ setList, list }: NavProps) => {
  return (
    <div className="w-full h-[48px] border-t-[1px] border-[#999999] flex items-center justify-center bg-[var(--color-background)]">
      <div className="w-[301px] h-[29px] flex items-center justify-between">
        <button onClick={() => setList("chat")}>
          <IoChatbubbles
            className={clsx("w-[30px] h-[30px]", {
              "text-[var(--color-gray)]": list != "chat",
              "text-[var(--color-point)]": list == "chat",
            })}
          />
        </button>
        <button onClick={() => setList("friend")}>
          <IoPeople
            className={clsx("w-[30px] h-[30px]", {
              "text-[var(--color-gray)]": list != "friend",
              "text-[var(--color-point)]": list == "friend",
            })}
          />
        </button>
        <button onClick={() => setList("setting")}>
          <IoSettings
            className={clsx("w-[30px] h-[30px]", {
              "text-[var(--color-gray)]": list != "setting",
              "text-[var(--color-point)]": list == "setting",
            })}
          />
        </button>
      </div>
    </div>
  );
};

export default Nav;

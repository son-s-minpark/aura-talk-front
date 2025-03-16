import React from "react";
import { IoChatbubbles, IoPeople, IoSettings } from "react-icons/io5";

const Nav = () => {
  return (
    <div className="w-full h-[48px] border-t-[1px] border-[#999999] dark:bg-darkBg bg-white flex justify-center items-center">
      <div className="w-[301px] h-[29px] text-[#797C7B] dark:text-[#BCBCBC] flex items-center justify-between">
        <button>
          <IoChatbubbles className="w-[30px] h-[30px]" />
        </button>
        <button>
          <IoPeople className="w-[30px] h-[30px]" />
        </button>
        <button>
          <IoSettings className="w-[30px] h-[30px]" />
        </button>
      </div>
    </div>
  );
};

export default Nav;

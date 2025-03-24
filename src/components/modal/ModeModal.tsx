"use client";
import React from "react";
import { IoMdMoon } from "react-icons/io";
import ToggleSwitch from "../common/ToggleSwitch";
import { useTheme } from "next-themes";

const ModeModal = () => {
  const { setTheme } = useTheme();

  return (
    <div className="modal-content w-[281px] h-[139px] py-[28px] px-[22px] bg-white dark:bg-darkBg rounded-[12px]">
      <div className="flex">
        <IoMdMoon className="w-[30px] h-[30px] text-[#787878] dark:text-lightGray" />
        <p className="text-[20px] font-bold ml-[14px]">모드 변경</p>
      </div>
      <div className="flex mt-[28px] w-full">
        <p className="font-semibold"> 다크 모드로 전환하기</p>
        <ToggleSwitch
          handleOn={() => setTheme("dark")}
          handleOff={() => setTheme("light")}
        />
      </div>
    </div>
  );
};

export default ModeModal;

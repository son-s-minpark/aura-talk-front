"use client";
import React from "react";
import { IoMdMoon, IoMdSunny } from "react-icons/io";
import ToggleSwitch from "../../common/ToggleSwitch";
import { useTheme } from "next-themes";

const ModeModal = () => {
  const { theme, setTheme } = useTheme();

  function isThemeDark() {
    return theme == "dark";
  }

  return (
    <div className="modal-content w-[281px] h-[139px] py-[28px] px-[22px]">
      <div className="flex">
        {isThemeDark() ? (
          <IoMdSunny className="w-[30px] h-[30px] text-[#787878] dark:text-[var(--color-gray)]" />
        ) : (
          <IoMdMoon className="w-[30px] h-[30px] text-[#787878] dark:text-[var(--color-gray)]" />
        )}
        <h1 className="ml-[14px]">모드 변경</h1>
      </div>
      <div className="flex mt-[28px] w-full">
        {isThemeDark() ? (
          <p className="font-semibold text-[14px]"> 라이트 모드로 전환하기</p>
        ) : (
          <p className="font-semibold text-[14px]"> 다크 모드로 전환하기</p>
        )}

        <ToggleSwitch
          handleOn={() => setTheme("dark")}
          handleOff={() => setTheme("light")}
          isOn={isThemeDark()}
        />
      </div>
    </div>
  );
};

export default ModeModal;

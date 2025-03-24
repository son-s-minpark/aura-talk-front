"use client";
import React, { useState } from "react";
import { IoMdMoon, IoMdPerson } from "react-icons/io";
import { PiKeyFill } from "react-icons/pi";
import ModeModal from "../modal/ModeModal";
import AccountModal from "../modal/AccountModal";
import ChangePwModal from "../modal/ChangePwModal";
import QuitModal from "../modal/QuitModal";
import LogoutModal from "../modal/LogoutModal";
import RandomModal from "../modal/RandomModal";

type modalType =
  | "modeModal"
  | "accountModal"
  | "changePwModal"
  | "logoutModal"
  | "quitModal"
  | "randomModal"
  | "none";

const SettingList = () => {
  const [modal, setModal] = useState<modalType>("none");
  return (
    <div>
      {modal == "none" ? null : (
        <div className="modal h-screen" onClick={() => setModal("none")}>
          <div onClick={(e) => e.stopPropagation()} className="dark:bg-darkBg">
            {modal == "modeModal" && <ModeModal />}
            {modal == "accountModal" && <AccountModal setModal={setModal} />}
            {modal == "changePwModal" && <ChangePwModal />}
            {modal == "quitModal" && <QuitModal />}
            {modal == "logoutModal" && <LogoutModal />}
            {modal == "randomModal" && <RandomModal />}
          </div>
        </div>
      )}
      <div className="w-full h-[102px] px-[22px] border-b-1 border-[#F3F6F6]">
        {/* 본인 프로필 */}
      </div>
      <div className="w-full px-[25px] mt-[25px] flex flex-col gap-[30px]">
        <div className="flex">
          <div className="rounded-full bg-[#F2F8F7] h-[44px] w-[44px] flex items-center justify-center">
            <IoMdPerson className="w-[25px] h-[25px] text-[#787878] dark:text-lightGray" />
          </div>
          <div className="ml-[12px]">
            <p className="font-semibold text-[18px]"> 프로필 설정 </p>
            <p className="text-[12px] text-darkGray">
              이름, 한 줄 소개 등의 설정이 가능해요.
            </p>
          </div>
        </div>

        <div className="flex" onClick={() => setModal("modeModal")}>
          <div className="rounded-full bg-[#F2F8F7] h-[44px] w-[44px] flex items-center justify-center">
            <IoMdMoon className="w-[25px] h-[25px] text-[#787878] dark:text-lightGray" />
          </div>
          <div className="ml-[12px]">
            <p className="font-semibold text-[18px]"> 모드 변경 </p>
            <p className="text-[12px] text-darkGray">
              라이트모드, 다크모드로 전환할 수 있어요.
            </p>
          </div>
        </div>

        <div className="flex" onClick={() => setModal("accountModal")}>
          <div className="rounded-full bg-[#F2F8F7] h-[44px] w-[44px] flex items-center justify-center">
            <PiKeyFill className="w-[20px] h-[20px] text-[#787878] dark:text-lightGray" />
          </div>
          <div className="ml-[12px]">
            <p className="font-semibold text-[18px]"> 게정 관리 </p>
            <p className="text-[12px] text-darkGray">
              비밀번호 변경 등의 계정 관리가 가능해요.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingList;

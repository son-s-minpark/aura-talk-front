"use client";
import React, { useState } from "react";
import { IoMdMoon, IoMdPerson, IoMdSunny } from "react-icons/io";
import { PiKeyFill } from "react-icons/pi";
import ModeModal from "../../components/setting/modal/ModeModal";
import AccountModal from "../../components/setting/modal/AccountModal";
import ChangePwModal from "../../components/setting/modal/ChangePwModal";
import DeleteAccountModal from "../../components/setting/modal/DeleteAccountModal";
import LogoutModal from "../../components/setting/modal/LogoutModal";
import RandomModal from "../../components/setting/modal/RandomModal";
import { useTheme } from "next-themes";
import useProfileImgStore from "@/state/user/useProfileImgStore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import useProfileStore from "@/state/user/useProfileStore";

type modalType =
  | "modeModal"
  | "accountModal"
  | "changePwModal"
  | "logoutModal"
  | "DeleteAccountModal"
  | "randomModal"
  | "none";

const SettingList = () => {
  const [modal, setModal] = useState<modalType>("none");
  const { theme } = useTheme();
  const { profileImgData } = useProfileImgStore();
  const { profileData } = useProfileStore();
  const router = useRouter();
  return (
    <>
      {modal == "none" ? null : (
        <div
          className="modal h-screen items-center justify-center"
          onClick={() => setModal("none")}
        >
          <div onClick={(e) => e.stopPropagation()}>
            {modal == "modeModal" && <ModeModal />}
            {modal == "accountModal" && <AccountModal setModal={setModal} />}
            {modal == "changePwModal" && <ChangePwModal />}
            {modal == "DeleteAccountModal" && <DeleteAccountModal />}
            {modal == "logoutModal" && <LogoutModal />}
            {modal == "randomModal" && <RandomModal />}
          </div>
        </div>
      )}

      <div
        className="w-full h-[102px] px-[21px] border-b-1 border-commonGray flex gap-[12px] items-center"
        onClick={() => router.push(`/profile/self`)}
      >
        <div className="h-[60px] w-[60px] border-1 border-commonGray rounded-full">
          {profileImgData.thumbnailImgUrl && (
            <Image
              src={profileImgData.thumbnailImgUrl}
              alt="Profile"
              className="rounded-full object-cover"
              width={60}
              height={60}
            />
          )}
        </div>
        <div className="flex flex-col">
          <p className="text-[20px] font-bold leading-[20px]">
            {profileData.nickname}
          </p>
          {profileData.description && (
            <p className="text-[12px] leading-[12px] text-[var(--color-gray)]">
              {profileData.description}
            </p>
          )}
        </div>
      </div>

      <div className="w-full px-[25px] mt-[25px] flex flex-col gap-[30px]">
        <div className="flex">
          <div className="rounded-full bg-[#F2F8F7] h-[44px] w-[44px] flex items-center justify-center">
            <IoMdPerson className="w-[25px] h-[25px] text-[#787878] dark:text-[var(--color-gray)]" />
          </div>
          <div className="ml-[12px]">
            <p className="font-semibold text-[18px]"> 프로필 설정 </p>
            <p className="text-[12px] text-commonGray">
              이름, 한 줄 소개 등의 설정이 가능해요.
            </p>
          </div>
        </div>

        <div className="flex" onClick={() => setModal("modeModal")}>
          <div className="rounded-full bg-[#F2F8F7] h-[44px] w-[44px] flex items-center justify-center">
            {theme == "light" ? (
              <IoMdMoon className="w-[25px] h-[25px] text-[#787878] dark:text-[var(--color-gray)]" />
            ) : (
              <IoMdSunny className="w-[25px] h-[25px] text-[#787878] dark:text-[var(--color-gray)]" />
            )}
          </div>
          <div className="ml-[12px]">
            <p className="font-semibold text-[18px]"> 모드 변경 </p>
            <p className="text-[12px] text-commonGray">
              라이트모드, 다크모드로 전환할 수 있어요.
            </p>
          </div>
        </div>

        <div className="flex" onClick={() => setModal("accountModal")}>
          <div className="rounded-full bg-[#F2F8F7] h-[44px] w-[44px] flex items-center justify-center">
            <PiKeyFill className="w-[20px] h-[20px] text-[#787878] dark:text-[var(--color-gray)]" />
          </div>
          <div className="ml-[12px]">
            <p className="font-semibold text-[18px]"> 계정 관리 </p>
            <p className="text-[12px] text-commonGray">
              비밀번호 변경 등의 계정 관리가 가능해요.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingList;

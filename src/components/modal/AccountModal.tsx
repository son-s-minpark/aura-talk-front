import React from "react";
import { IoMdKey } from "react-icons/io";
import { FaRandom } from "react-icons/fa";
import { MdPersonOff, MdLogout } from "react-icons/md";

type AccountModalProps = {
  setModal: React.Dispatch<
    React.SetStateAction<
      | "modeModal"
      | "accountModal"
      | "changePwModal"
      | "logoutModal"
      | "quitModal"
      | "randomModal"
      | "none"
    >
  >;
};

const AccountModal = ({ setModal }: AccountModalProps) => {
  return (
    <div className="modal-content flex flex-col gap-[25px] w-[281px] py-[25px] pl-[25px]">
      <div
        className="flex gap-[10px] items-center"
        onClick={() => setModal("changePwModal")}
      >
        <IoMdKey className="text-darkGray dark:text-lightGray w-[30px] h-[30px]" />
        <p className="font-bold"> 비밀번호 변경</p>
      </div>
      <div
        className="flex gap-[10px] items-center"
        onClick={() => setModal("randomModal")}
      >
        <FaRandom className="text-darkGray dark:text-lightGray w-[30px] h-[30px]" />
        <p className="font-bold"> 랜덤채팅 설정</p>
      </div>
      <div
        className="flex gap-[10px] items-center"
        onClick={() => setModal("logoutModal")}
      >
        <MdLogout className="text-darkGray dark:text-lightGray w-[30px] h-[30px]" />
        <p className="font-bold"> 로그아웃</p>
      </div>
      <div
        className="flex gap-[10px] items-center"
        onClick={() => setModal("quitModal")}
      >
        <MdPersonOff className="text-darkGray dark:text-lightGray w-[30px] h-[30px]" />
        <p className="font-bold"> 회원탈퇴</p>
      </div>
    </div>
  );
};

export default AccountModal;

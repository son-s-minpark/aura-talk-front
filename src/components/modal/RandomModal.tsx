import React from "react";
import ToggleSwitch from "../common/ToggleSwitch";
import { FaRandom } from "react-icons/fa";

const RandomModal = () => {
  return (
    <div className="modal-content w-[281px] h-[139px] py-[28px] px-[22px] bg-white dark:bg-darkBg rounded-[12px]">
      <div className="flex">
        <FaRandom className="w-[30px] h-[30px] text-[#787878] dark:text-lightGray" />
        <p className="text-[20px] font-bold ml-[14px]">랜덤채팅 설정</p>
      </div>
      <div className="flex mt-[28px] w-full">
        <p className="font-semibold"> 랜덤 연결 허용하기</p>
        <ToggleSwitch />
      </div>
    </div>
  );
};

export default RandomModal;

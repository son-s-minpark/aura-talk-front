import React from "react";
import SelectBtn from "../../common/SelectBtn";
import { MdPersonOff } from "react-icons/md";

const QuitModal = () => {
  return (
    <div className=" w-[281px] h-[139px] py-[28px] px-[22px] modal-content">
      <div className="flex">
        <MdPersonOff className="w-[30px] h-[30px] text-[#787878] dark:text-lightGray" />
        <p className="text-[20px] font-bold ml-[14px]">회원탈퇴하기</p>
      </div>
      <div className="flex mt-[16px] w-full">
        <p className="text-[12px]"> 탈퇴하면 모든 기록이 삭제 돼요.</p>
      </div>
      <div className="flex justify-end">
        <SelectBtn label="확인" onClick={() => console.log("로그아웃")} />
      </div>
    </div>
  );
};

export default QuitModal;

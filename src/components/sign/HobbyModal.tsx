import React from "react";
import { IoIosArrowUp } from "react-icons/io";
import HobbyBtn from "./HobbyBtn";

interface HobbyMaodalProps {
  setIsHobbyDown: React.Dispatch<React.SetStateAction<boolean>>;
}

const hobbyList = ["취미", "자기개발", "일상"];

const hobbyDiv = (name: string) => {
  return (
    <div className="text-white">
      <p>{name}</p>
      <div></div>
    </div>
  );
};

const HobbyModal = ({ setIsHobbyDown }: HobbyMaodalProps) => {
  return (
    <div className="w-full h-full flex flex-col items-center ">
      <div className="flex w-[327px] h-[58px] font-bold mt-[39px] border-b-1 text-[#999999] items-end">
        <div className="h-[38px] w-[300px] mb-[6px] flex-none"></div>
        <button className="mb-[7px]" onClick={() => setIsHobbyDown(false)}>
          <IoIosArrowUp className="w-[20px] h-[20px] " />
        </button>
      </div>
      <div className="flex justify-start mt-[32px] text-[#999999] text-[24px] font-bold gap-[19px] i">
        <p>취미</p>
        <p>자기개발</p>
        <p>일상</p>
      </div>
      <div className="p-[17px] gap-[81px]">
        <HobbyBtn label="hi" isSelected={false} />
      </div>
    </div>
  );
};

export default HobbyModal;

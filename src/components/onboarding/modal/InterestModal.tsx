"use client";
import React from "react";
import { IoIosArrowUp } from "react-icons/io";
import InterestData from "../../../data/interestData.json";
import useProfileState from "@/state/signState/useProfileState";
import InterestBtnList from "../InterestBtnList";
import { InterestBtnBig } from "../InterestBtn";
import SelectBtn from "@/components/common/SelectBtn";

type InterestListProps = {
  [key: string]: string[];
};

type InterestModalProps = {
  setIsInterestDown: React.Dispatch<React.SetStateAction<boolean>>;
};

const InterestModal = ({ setIsInterestDown }: InterestModalProps) => {
  const { profileData } = useProfileState();
  const InterestDataTyped: InterestListProps = InterestData;

  return (
    <div className="w-full h-full flex flex-col items-center overflow-scroll">
      <div className="flex w-[327px] h-[50px] font-bold mt-[39px] border-b-1 text-white items-end">
        <div className="h-[38px] w-[300px] flex-none flex">
          <InterestBtnList isScrollable={true} />
        </div>
        <button
          className="mb-[7px] text-[#999999]"
          onClick={() => setIsInterestDown(false)}
        >
          <IoIosArrowUp className="w-[20px] h-[20px]" />
        </button>
      </div>

      <div className="flex flex-col items-start px-[17px] mt-[38px]">
        {Object.keys(InterestDataTyped).map((category) => (
          <div key={category} className="w-full mb-[81px]">
            <p className="text-[20px] font-bold text-white mt-[24px]">
              {category}
            </p>
            <div className="flex flex-wrap ">
              {InterestDataTyped[category].map((label, index) => (
                <div key={index} className="mt-[15px] mr-[10px]">
                  {profileData.interestList.includes(label) ? (
                    <InterestBtnBig label={label} selected={true} />
                  ) : (
                    <InterestBtnBig label={label} selected={false} />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="w-full flex justify-end mr-[21px] mb-[35px]">
        <SelectBtn label="완료" onClick={() => setIsInterestDown(false)} />
      </div>
    </div>
  );
};

export default InterestModal;

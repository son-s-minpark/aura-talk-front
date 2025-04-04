"use client";
import React from "react";
import { IoIosArrowUp } from "react-icons/io";
import InterestData from "../../data/interestData.json";
import useSignupState from "@/state/signState/useSignupState";
import InterestBtnList from "./InterestBtnList";
import { InterestBtnBig } from "./InterestBtn";

type InterestListProps = {
  [key: string]: string[];
};

type InterestModalProps = {
  setIsInterestDown: React.Dispatch<React.SetStateAction<boolean>>;
};

const InterestModal = ({ setIsInterestDown }: InterestModalProps) => {
  const { signupData } = useSignupState();
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
            <div className="text-white text-[20px] font-bold">{category}</div>

            <div className="flex flex-wrap mt-[24px]">
              {InterestDataTyped[category].map((label, index) => (
                <div key={index} className="mt-[15px] mr-[10px]">
                  {signupData.interestList.includes(label) ? (
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
        <button
          className="h-[38px] w-[65px] rounded-[20px] bg-pointPurple text-white font-bold"
          onClick={() => setIsInterestDown(false)}
        >
          완료
        </button>
      </div>
    </div>
  );
};

export default InterestModal;

"use client";
import { FaCheck, FaPlus } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import clsx from "clsx";
import useSignupState from "@/state/useSignupState";
import { useState } from "react";

type InterestBtnProps = {
  label: string;
  selected: boolean;
};

const InterestBtnBig = ({ label, selected }: InterestBtnProps) => {
  const [isSelected, setIsSelected] = useState<boolean>(selected);
  const { addInterest, removeInterest } = useSignupState();
  function toggleInterest() {
    if (isSelected) {
      removeInterest(label);
    } else {
      addInterest(label);
    }
    setIsSelected(!isSelected);
  }
  return (
    <button
      onClick={toggleInterest}
      className={clsx(
        "flex border-[3.5px] px-[13px] py-[0.5px] items-center rounded-[20px]",
        {
          "border-[#8045FF]": isSelected,
          "border-[#999999]": !isSelected,
        }
      )}
    >
      {isSelected ? (
        <FaCheck className="text-[#8045FF]" />
      ) : (
        <FaPlus className="text-[#999999]" />
      )}
      <span className="text-white ml-[2px] font-semibold"> {label}</span>
    </button>
  );
};

const InterestBtnSml = ({ label }: { label: string }) => {
  return (
    <button className="flex px-[10px] gap-[2px] py-[1px] bg-transparent border-1 rounded-[20px] text-[12px] items-center">
      {label}
      <IoIosClose width={80} className="text-[20px]" />
    </button>
  );
};

const InterestBtn = { InterestBtnBig, InterestBtnSml };

export default InterestBtn;

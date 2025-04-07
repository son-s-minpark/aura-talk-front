"use client";
import { FaCheck, FaPlus } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import clsx from "clsx";
import useProfileState from "@/state/signState/useProfileState";
import { useState } from "react";

type InterestBtnProps = {
  label: string;
  selected: boolean;
};

export const InterestBtnBig = ({ label, selected }: InterestBtnProps) => {
  const [isSelected, setIsSelected] = useState<boolean>(selected);
  const { addInterest, removeInterest } = useProfileState();
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
          "border-[var(--color-point)]": isSelected,
          "border-[#999999]": !isSelected,
        }
      )}
    >
      {isSelected ? (
        <FaCheck className="text-[var(--color-point)]" />
      ) : (
        <FaPlus className="text-[#999999]" />
      )}
      <span className="text-white ml-[2px] font-semibold"> {label}</span>
    </button>
  );
};

export const InterestBtnSml = ({ label }: { label: string }) => {
  return (
    <button className="flex px-[10px] gap-[2px] py-[1px] bg-transparent border-1 rounded-[20px] text-[12px] items-center">
      {label}
      <IoIosClose width={80} className="text-[20px]" />
    </button>
  );
};

"use client";
import { FaCheck, FaPlus } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import clsx from "clsx";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addInterest, removeInterest } from "@/store/user/setUser";

type InterestBtnProps = {
  label: string;
  selected: boolean;
  isOnBoarding: boolean;
};

export const InterestBtnBig = ({
  label,
  selected,
  isOnBoarding,
}: InterestBtnProps) => {
  const [isSelected, setIsSelected] = useState<boolean>(selected);
  const dispatch = useDispatch();

  function toggleInterest() {
    if (isSelected) {
      dispatch(removeInterest(label));
    } else {
      dispatch(addInterest(label));
    }
    setIsSelected(!isSelected);
  }
  return (
    <button
      onClick={toggleInterest}
      className={clsx(
        "flex border-[3.5px] px-[13px] py-[0.5px] items-center rounded-[20px]",
        {
          "border-[var(--color-point)]": isSelected && !isOnBoarding,
          "border-[#8045FF]": isSelected && isOnBoarding,
          "border-[#999999]": !isSelected,
        }
      )}
    >
      {isSelected ? (
        <FaCheck
          className={clsx({
            "text-[var(--color-point)]": !isOnBoarding,
            "text-[#8045FF]": isOnBoarding,
          })}
        />
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

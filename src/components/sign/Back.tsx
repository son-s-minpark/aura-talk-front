import React from "react";
import { IoArrowBackOutline } from "react-icons/io5";

interface BackProps {
  setPage: React.Dispatch<
    React.SetStateAction<"onBoarding" | "signin" | "signup" | "profile">
  >;
  backComponent: "onBoarding" | "signin" | "signup" | "profile";
}

const Back = ({ setPage, backComponent }: BackProps) => {
  return (
    <div className="h-[76px] w-full flex items-center">
      <button
        onClick={() => setPage(backComponent)}
        className="w-[30px] h-[30px]"
      >
        <IoArrowBackOutline className="text-white h-[30px] ml-[15px]" />
      </button>
    </div>
  );
};

export default Back;

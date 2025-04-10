import { useSetPageState } from "@/state/signState/usetSetPageState";
import React from "react";
import { IoArrowBackOutline } from "react-icons/io5";

type BackProps = {
  backComponent: "onBoarding" | "signin" | "signup" | "profile";
};

const Back = ({ backComponent }: BackProps) => {
  const { setPage } = useSetPageState();
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

import useSignupState from "@/state/useSignupState";
import React from "react";
import { InterestBtnSml } from "./InterestBtn";
import clsx from "clsx";

type InterestBtnProp = {
  isScrollable: boolean;
};

const InterestBtnList = ({ isScrollable }: InterestBtnProp) => {
  const { signupData, removeInterest } = useSignupState();
  return (
    <div
      className={clsx("flex gap-[5px] items-center", {
        "no-scrollbar overflow-x-scroll whitespace-nowrap": isScrollable,
        "overflow-auto whitespace-normal": !isScrollable,
      })}
    >
      {signupData.interestList.map((label, index) => (
        <div key={index} onClick={() => removeInterest(label)}>
          <InterestBtnSml label={label} />
        </div>
      ))}
    </div>
  );
};

export default InterestBtnList;

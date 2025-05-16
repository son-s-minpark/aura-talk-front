import React from "react";
import { InterestBtnSml } from "./InterestBtn";
import clsx from "clsx";
import useProfileStore from "@/state/user/useProfileStore";

const InterestBtnList = ({ isScrollable }: { isScrollable: boolean }) => {
  const { profileData, removeInterest } = useProfileStore();

  return (
    <div
      className={clsx("flex gap-[5px] items-center", {
        "no-scrollbar overflow-x-scroll whitespace-nowrap": isScrollable,
        "overflow-auto whitespace-normal": !isScrollable,
      })}
    >
      {profileData.interests.map((label, index) => (
        <div key={index} onClick={() => removeInterest(label)}>
          <InterestBtnSml label={label} />
        </div>
      ))}
    </div>
  );
};

export default InterestBtnList;

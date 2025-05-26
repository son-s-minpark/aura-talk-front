import React from "react";
import { InterestBtnSml } from "./InterestBtn";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { removeInterest } from "@/store/user/setProfile";

const InterestBtnList = ({ isScrollable }: { isScrollable: boolean }) => {
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);

  return (
    <div
      className={clsx("flex gap-[5px] items-center", {
        "no-scrollbar overflow-x-scroll whitespace-nowrap": isScrollable,
        "overflow-auto whitespace-normal": !isScrollable,
      })}
    >
      {profile.interests.map((label, index) => (
        <div key={index} onClick={() => dispatch(removeInterest(label))}>
          <InterestBtnSml label={label} />
        </div>
      ))}
    </div>
  );
};

export default InterestBtnList;

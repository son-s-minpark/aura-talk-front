import React from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { setPage } from "@/store/sign/setPage";
import { pageType } from "@/type/sign/setPageType";

const Back = ({ backComponent }: { backComponent: pageType }) => {
  const dispatch = useDispatch();
  return (
    <div className="h-[76px] w-full flex items-center">
      <button
        onClick={() => dispatch(setPage(backComponent))}
        className="w-[30px] h-[30px]"
      >
        <IoArrowBackOutline className="text-white h-[30px] ml-[15px]" />
      </button>
    </div>
  );
};

export default Back;

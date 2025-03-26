"use client";
import Search from "@/components/common/Search";
import React from "react";
import { useRouter } from "next/navigation";
import { IoArrowBackOutline } from "react-icons/io5";
import SelectBtn from "@/components/common/SelectBtn";

const Back = () => {
  const router = useRouter();
  return (
    <div className="h-[76px] w-full flex items-center justify-between ">
      <button onClick={() => router.back()} className="w-[30px] h-[30px]">
        <IoArrowBackOutline className=" h-[30px] ml-[15px]" />
      </button>
      <SelectBtn label="완료" onClick={() => router.push("/")} />
    </div>
  );
};

const Page = () => {
  return (
    <div className="h-full w-full">
      <Back />
      <div className="w-full h-[33px] flex items-center px-[24px]">
        <Search />
      </div>
      <div></div>
    </div>
  );
};

export default Page;

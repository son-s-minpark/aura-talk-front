"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { IoArrowBackOutline } from "react-icons/io5";

const Back = () => {
  const router = useRouter();
  return (
    <div className="h-[76px] w-full flex items-center">
      <button onClick={() => router.back()} className="w-[30px] h-[30px]">
        <IoArrowBackOutline className="text-white h-[30px] ml-[15px]" />
      </button>
    </div>
  );
};

export default Back;

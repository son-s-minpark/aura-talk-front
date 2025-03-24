"use client";
import { redirect } from "next/navigation";
import React from "react";
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const page = () => {
  return (
    <div>
      <div className="h-[76px] w-full flex items-center justify-center ">
        <div className="bg-[#F3F6F6] dark:bg-[#787878] h-[39px] w-[327px] flex px-[12px] rounded-[12px]">
          <button>
            <FaSearch className="h-[17px] w-[17px]" />
          </button>
          <input type="text" className="flex-1" />
          <button onClick={() => redirect("/home")}>
            <IoClose className="h-[25px] w-[25px]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;

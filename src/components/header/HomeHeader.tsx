import React from "react";
import Image from "next/image";
import { IoSearch, IoNotifications } from "react-icons/io5";
import logo from "../../../public/images/logo-none.png";

const HomeHeader = () => {
  return (
    <div className="h-[76px] w-full flex justify-between items-center">
      <button className="ml-[13px]">
        <Image src={logo} alt="아우라 톡 로고" className="w-[41px] h-[41px]" />
      </button>
      <div className="text-white mr-[21px]">
        <button>
          <IoSearch className="w-[24px] h-[24px] mr-[12px]" />
        </button>
        <button>
          <IoNotifications className="w-[24px] h-[24px]" />
        </button>
      </div>
    </div>
  );
};

export default HomeHeader;

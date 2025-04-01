"use client";
import React from "react";
import Image from "next/image";
import logo from "../../../public/images/logo-none.png";
import { IoSearch, IoNotifications, IoPersonAdd } from "react-icons/io5";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  return (
    <div className="h-[76px] w-full items-center flex justify-between">
      <button className="ml-[13px]">
        <Image src={logo} alt="아우라 톡 로고" className="w-[41px] h-[41px]" />
      </button>
      <div className="flex text-white mr-[21px] gap-[12px]">
        <button>
          <IoPersonAdd className="w-[22px] h-[22px]" />
        </button>
        <button onClick={() => router.push("/search")}>
          <IoSearch className="w-[24px] h-[24px]" />
        </button>
        <button>
          <IoNotifications className="w-[24px] h-[24px]" />
        </button>
      </div>
    </div>
  );
};

export default Header;

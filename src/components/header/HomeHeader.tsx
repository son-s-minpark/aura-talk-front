import React from "react";
import Image from "next/image";
import logo from "../../../public/logo-none.png";
import { IoSearch, IoNotifications } from "react-icons/io5";
// import { useRouter } from "next/router";

const HomeHeader = () => {
  // const router = useRouter();
  return (
    <div className="h-[76px] w-full">
      <button>
        <Image src={logo} alt="아우라 톡 로고" height={41} width={41} />
      </button>
      <div>
        <button>
          <IoSearch />
        </button>
        <button>
          <IoNotifications />
        </button>
      </div>
    </div>
  );
};

export default HomeHeader;

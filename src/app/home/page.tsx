import HomeHeader from "@/components/header/HomeHeader";
import MainBox from "@/components/home/MainBox";
import Nav from "@/components/home/Nav";
import React from "react";

const page = () => {
  return (
    <div className="w-full h-full bg-black flex flex-col justify-between">
      <HomeHeader />
      <div>
        <MainBox />
        <Nav />
      </div>
    </div>
  );
};

export default page;

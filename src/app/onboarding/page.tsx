"use client";
import React from "react";
import { useSetPageStore } from "@/state/sign/usetSetPageStore";
import OnBoarding from "./OnBoarding";
import Signin from "./Signin";
import Signup from "./Signup";
import Profile from "./Profile";
import ProfileImg from "./ProfileImg";

const Page = () => {
  const { page } = useSetPageStore();

  return (
    <div className="bg-[#1A1A1A] w-full h-full">
      {page === "onBoarding" && <OnBoarding />}
      {page === "signin" && <Signin />}
      {page === "signup" && <Signup />}
      {page === "profile" && <Profile />}
      {page === "profileImg" && <ProfileImg />}
    </div>
  );
};

export default Page;

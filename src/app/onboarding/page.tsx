"use client";
import React, { useState } from "react";
import OnBoarding from "./OnBoarding";
import Signin from "./Signin";
import Signup from "./Signup";
import Profile from "./Profile";

type PageType = "onBoarding" | "signin" | "signup" | "profile";

const Page = () => {
  const [page, setPage] = useState<PageType>("onBoarding");

  return (
    <div className="bg-[#1A1A1A] w-full h-full flex flex-col items-center px-[25px]">
      {page === "onBoarding" && <OnBoarding setPage={setPage} />}
      {page === "signin" && <Signin setPage={setPage} />}
      {page === "signup" && <Signup setPage={setPage} />}
      {page === "profile" && <Profile setPage={setPage} />}
    </div>
  );
};

export default Page;

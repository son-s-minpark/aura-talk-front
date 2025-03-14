"use client";
import React, { useState } from "react";
import OnBoarding from "./OnBoarding";
import Signin from "./Signin";
import Signup from "./Signup";
import Profile from "./Profile";
import ProfileImg from "./ProfileImg";

type PageType = "onBoarding" | "signin" | "signup" | "profile" | "profileImg";

const Page = () => {
  const [page, setPage] = useState<PageType>("onBoarding");

  return (
    <div className="bg-[#1A1A1A] w-full h-full flex flex-col items-center">
      {page === "onBoarding" && <OnBoarding setPage={setPage} />}
      {page === "signin" && <Signin setPage={setPage} />}
      {page === "signup" && <Signup setPage={setPage} />}
      {page === "profile" && <Profile setPage={setPage} />}
      {page === "profileImg" && <ProfileImg setPage={setPage} />}
    </div>
  );
};

export default Page;

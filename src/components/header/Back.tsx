import { useRouter } from "next/router";
import React from "react";
import { IoArrowBackOutline } from "react-icons/io5";

const Back = () => {
  const router = useRouter();
  return (
    <header className="h-[76px] w-full">
      <button onClick={() => router.back()}>
        <IoArrowBackOutline width={24} height={24} />
      </button>
    </header>
  );
};

export default Back;

import Back from "@/components/common/Back";
import React from "react";

const Page = () => {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <Back />
      <div className="text-[24px] font-bold flex flex-col mt-[84px]">
        <p> 이런! </p>
        <p> 문제가 생겼나봐요. </p>
      </div>
      <div className="font-semibold mt-[237px]">
        <p>하지만 걱정 말아요!</p>
        <p>잠깐 나갔다가 다시 들어오면</p>
        <p>모든 게 다시 돌아올 거예요.</p>
      </div>
    </div>
  );
};

export default Page;

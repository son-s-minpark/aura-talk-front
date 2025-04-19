import React from "react";

const InterestBtn = ({ label }: { label: string }) => {
  return (
    <button className="flex px-[10px] gap-[2px] py-[1px] bg-transparent border-1 rounded-[20px] text-[12px] items-center">
      #{label}
    </button>
  );
};

export default InterestBtn;

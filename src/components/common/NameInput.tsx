import React from "react";

const NameInput = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-[#F3F6F6] dark:bg-[#787878] rounded-[20px] w-full h-[32px] mt-[11px] px-[5px] flex items-center justify-between">
      {children}
    </div>
  );
};

export default NameInput;

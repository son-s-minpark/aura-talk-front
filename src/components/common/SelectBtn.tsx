import React from "react";

type SelectBtnProp = {
  label: string;
  onClick: () => void;
};

const SelectBtn = ({ label, onClick }: SelectBtnProp) => {
  return (
    <button
      className="flex items-center justify-center rounded-[20px] bg-[var(--color-point)] text-white font-bold text-[14px] h-[24px] w-[54px]"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default SelectBtn;

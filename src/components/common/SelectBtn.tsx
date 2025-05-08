import React from "react";
import clsx from "clsx";

type SelectBtnProp = {
  label: string;
  onClick: () => void;
  isOnBoarding?: boolean;
};

const SelectBtn = ({ label, onClick, isOnBoarding }: SelectBtnProp) => {
  return (
    <button
      className={clsx(
        "flex items-center justify-center rounded-[20px] text-white font-bold text-[14px] h-[24px] w-[54px]",
        {
          "bg-[#712EFB]": isOnBoarding,
          "bg-[var(--color-point)]": !isOnBoarding,
        }
      )}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default SelectBtn;

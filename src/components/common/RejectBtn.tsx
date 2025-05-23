import React from "react";

type rejectBtnProp = {
  label: string;
  onClick: () => void;
};

const RejectBtn = ({ label, onClick }: rejectBtnProp) => {
  return (
    <button
      className="flex items-center justify-center rounded-[20px] text-white font-bold text-[14px] h-[24px] w-[54px] bg-[var(--color-rejectRed)]"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default RejectBtn;

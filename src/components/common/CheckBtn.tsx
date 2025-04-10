import React from "react";

type CheckBtnProps = {
  isChecked: boolean;
};

const CheckBtn = ({ isChecked }: CheckBtnProps) => {
  return (
    <>
      <div className="flex items-center justify-center w-[18px] h-[18px] rounded-full border-2 border-[var(--color-point)]">
        {isChecked && (
          <div className="w-[10px] h-[10px] rounded-full bg-[var(--color-point)]" />
        )}
      </div>
    </>
  );
};

export default CheckBtn;

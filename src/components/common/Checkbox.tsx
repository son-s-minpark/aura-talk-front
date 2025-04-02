import React from "react";

type CheckboxProps = {
  id: string;
  isChecked: boolean;
  onChange: () => void;
};

const Checkbox = ({ id, isChecked, onChange }: CheckboxProps) => {
  return (
    <>
      <input
        type="checkbox"
        id={id}
        checked={isChecked}
        onChange={onChange}
        className="hidden"
      />
      <div className="flex items-center justify-center w-[18px] h-[18px] rounded-full border-2 border-[var(--color-point)]">
        {isChecked && (
          <div className="w-[10px] h-[10px] rounded-full bg-[var(--color-point)]" />
        )}
      </div>
    </>
  );
};

export default Checkbox;

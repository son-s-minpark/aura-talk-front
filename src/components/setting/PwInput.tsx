import React, { useState } from "react";
import clsx from "clsx";
import { IoMdLock, IoMdUnlock } from "react-icons/io";

type pwInputProp = {
  label: string;
  isValid: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const PwInput = ({ isValid, label, value, onChange }: pwInputProp) => {
  const [isLocked, setIsLocked] = useState(false);

  return (
    <div
      className={clsx(" h-[50px] font-bold mt-[15px] border-b-1", {
        "border-[#C81919]": !isValid,
        "": isValid,
      })}
    >
      <p
        className={clsx({
          "text-[#C81919]": !isValid,
          "": isValid,
        })}
      >
        {label}
      </p>
      {isLocked ? (
        <div className="flex w-[200px]">
          <input
            type="text"
            className="h-[31px]  mb-[6px] flex-none"
            value={value}
            onChange={onChange}
          />
          <button onClick={() => setIsLocked(!isLocked)}>
            <IoMdUnlock className="w-[20px] h-[20px] mb-[11px] " />
          </button>
        </div>
      ) : (
        <div className="flex w-[200px]">
          <input
            type="password"
            className="flex-none h-[31px] mb-[6px] "
            value={value}
            onChange={onChange}
          />
          <button onClick={() => setIsLocked(!isLocked)}>
            <IoMdLock className="w-[20px] h-[20px] mb-[11px]" />
          </button>
        </div>
      )}
    </div>
  );
};

export default PwInput;

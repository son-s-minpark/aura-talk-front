"use client";
import React, { useState } from "react";
import { IoMdLock, IoMdUnlock } from "react-icons/io";

type InputProps = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: "text" | "password";
};

const Input: React.FC<InputProps> = ({ label, value, onChange, type }) => {
  const [isLocked, setIsLocked] = useState(false);

  return (
    <div className="w-[327px] h-[58px] font-bold mt-[30px] border-b-1">
      <p>{label}</p>
      {isLocked ? (
        <div className="flex w-full">
          <input
            type="text"
            className="h-[38px] w-[300px] mb-[6px] flex-none"
            value={value}
            onChange={onChange}
          />
          {type == "password" ? (
            <button onClick={() => setIsLocked(!isLocked)}>
              <IoMdUnlock className="w-[20px] h-[20px] mb-[11px]" />
            </button>
          ) : null}
        </div>
      ) : (
        <div className="flex w-full">
          <input
            type={type}
            className="flex-none h-[38px] w-[300px] mb-[6px]"
            value={value}
            onChange={onChange}
          />
          {type == "password" ? (
            <button onClick={() => setIsLocked(!isLocked)}>
              <IoMdLock className="w-[20px] h-[20px] mb-[11px]" />
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Input;

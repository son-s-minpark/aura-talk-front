import React, { useState } from "react";
import clsx from "clsx";
import { IoMdLock, IoMdUnlock } from "react-icons/io";

type InputProp = {
  label: string;
  isValid: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const PwInput = ({ isValid, label, value, onChange }: InputProp) => {
  const [isLocked, setIsLocked] = useState(false);

  return (
    <div
      className={clsx("font-bold mt-[15px] w-full border-b-1", {
        "border-[var(--color-errorRed)]": !isValid,
        "": isValid,
      })}
    >
      <p
        className={clsx({
          "text-[var(--color-errorRed)]": !isValid,
          "": isValid,
        })}
      >
        {label}
      </p>
      {isLocked ? (
        <div className="flex w-full">
          <input
            type="text"
            className="h-[31px] mb-[6px] flex-1"
            value={value}
            onChange={onChange}
          />
          <button onClick={() => setIsLocked(!isLocked)}>
            <IoMdUnlock className="w-[20px] h-[20px] mb-[11px] " />
          </button>
        </div>
      ) : (
        <div className="flex w-full">
          <input
            type="password"
            className="flex-1 h-[31px] mb-[6px] "
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

export const ProfileInput = ({
  isValid,
  label,
  value,
  onChange,
}: InputProp) => {
  return (
    <div
      className={clsx("font-bold mt-[30px] border-b-1", {
        "border-[var(--color-errorRed)]": !isValid,
        "text-white": isValid,
      })}
    >
      <p
        className={clsx({
          "text-[var(--color-errorRed)]": !isValid,
          "text-white": isValid,
        })}
      >
        {label}
      </p>
      <input
        type="text"
        className="flex-none h-[38px] w-[300px] mb-[6px]"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

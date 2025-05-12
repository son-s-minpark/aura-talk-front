import clsx from "clsx";
import React from "react";

type SignBtnProps = {
  value: string;
  isFull: boolean;
  onClick?: () => void;
};

const SignBtn = ({ value, isFull, onClick }: SignBtnProps) => {
  function handleEnter(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (e.key == "enter" && onClick) {
      onClick();
    }
  }

  return (
    <button
      className={clsx("w-[327px] h-[48px] rounded-[16px] border-1 mb-[49px]", {
        "bg-white text-commonGray": isFull,
        "bg-transparent text-white": !isFull,
      })}
      onClick={onClick}
      onKeyDown={handleEnter}
    >
      {value}
    </button>
  );
};

export default SignBtn;

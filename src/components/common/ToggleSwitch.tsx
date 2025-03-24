"use client";
import { useState } from "react";
import clsx from "clsx";

type ToggleSwitchProps = {
  handleOn: () => void;
  handleOff: () => void;
};

const ToggleSwitch = ({ handleOn, handleOff }: ToggleSwitchProps) => {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn(!isOn);
    if (!isOn) {
      handleOn();
    } else {
      handleOff();
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={clsx(
        "relative grid place-items-center w-[46px] h-[29px] rounded-full p-1 transition-colors duration-300 ml-[32px]",
        {
          "bg-darkGray dark:bg-lightGray": isOn,
          "bg-transparent": !isOn,
          "border-4 border-darkGray dark:border-lightGray": true,
        }
      )}
    >
      <div
        className={clsx(
          "w-[15px] h-[15px] rounded-full shadow-md transition-all duration-300 absolute",
          {
            "bg-white": isOn,
            "bg-darkGray": !isOn,
            "left-[calc(100%_-_1.25rem)]": isOn,
            "left-0": !isOn,
          }
        )}
      />
    </button>
  );
};

export default ToggleSwitch;

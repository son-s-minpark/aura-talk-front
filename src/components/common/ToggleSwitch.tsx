"use client";
import { useState } from "react";
import clsx from "clsx";

type ToggleSwitchProps = {
  handleOn: () => void;
  handleOff: () => void;
  isOn: boolean;
};

const ToggleSwitch = ({ handleOn, handleOff, isOn }: ToggleSwitchProps) => {
  const [isToggled, setIsToggled] = useState<boolean>(isOn);

  const handleToggle = () => {
    setIsToggled(!isToggled);
    if (!isToggled) {
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
          "bg-[var(--color-gray)]": isToggled,
          "bg-transparent": !isToggled,
          "border-4 border-[var(--color-gray)] dark:border-lightGray": true,
        }
      )}
    >
      <div
        className={clsx(
          "w-[15px] h-[15px] rounded-full shadow-md transition-all duration-300 absolute",
          {
            "bg-white": isToggled,
            "bg-[var(--color-gray)]": !isToggled,
            "left-[calc(100%_-_1.25rem)]": isToggled,
            "left-0": !isToggled,
          }
        )}
      />
    </button>
  );
};

export default ToggleSwitch;

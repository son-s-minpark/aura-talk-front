"use client";
import { useState } from "react";

const ToggleSwitch = () => {
  const [isOn, setIsOn] = useState(false);

  return (
    <button
      onClick={() => setIsOn(!isOn)}
      className={`relative grid place-items-center w-14 h-7 rounded-full p-1 transition-colors duration-300 ${
        isOn ? "bg-green-500" : "bg-gray-300"
      }`}
    >
      <div
        className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${
          isOn ? "translate-x-7" : "translate-x-0"
        }`}
      />
    </button>
  );
};

export default ToggleSwitch;

import { FaCheck, FaPlus } from "react-icons/fa";
import clsx from "clsx";

interface InterestBtnProps {
  label: string;
  isSelected: boolean;
}

const InterestBtn = ({ label, isSelected }: InterestBtnProps) => {
  return (
    <button
      className={clsx(
        "flex border-[3.5px] px-[13px] py-[0.5px] items-center rounded-[20px]",
        {
          "border-[#8045FF]": isSelected,
          "border-[#999999]": !isSelected,
        }
      )}
    >
      {isSelected ? (
        <FaCheck className="text-[#8045FF]" />
      ) : (
        <FaPlus className="text-[#999999]" />
      )}
      <span className="text-white ml-[2px] font-semibold"> {label}</span>
    </button>
  );
};

export default InterestBtn;

import React from "react";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  return (
    <div className="bg-[#F3F6F6] dark:bg-[#787878] flex px-[12px] rounded-[12px] w-full h-full">
      <button>
        <FaSearch className="h-[17px] w-[17px] mr-[3px]" />
      </button>
      <input type="text" className="flex-1" />
    </div>
  );
};

export default Search;

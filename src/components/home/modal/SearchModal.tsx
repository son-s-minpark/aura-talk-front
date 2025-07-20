import Search from "@/components/common/Search";
import React, { useState } from "react";
import ModalFriendComponent from "../../friend/ModalFriendComponent";
import SelectBtn from "@/components/common/SelectBtn";

const data = [1, 2, 3, 4, 5];

const SearchModal = () => {
  const [searchVal, setSearchVal] = useState<string>("");

  function onChangVal(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchVal(e.target.value);
  }

  function onSendFriendRequest() {}
  return (
    <div
      className="modal-content h-[364px] w-[304px] px-[17px] pt-[29px]"
      onClick={(e) => e.stopPropagation()}
    >
      <h1> 검색하기 </h1>
      <div className="h-[25px] w-[265px] mt-[24px] mb-[21px]">
        <Search val={searchVal} onChange={onChangVal} />
      </div>
      <div className="flex flex-col gap-[20px] h-[217px] overflow-y-scroll">
        {searchVal != "" && (
          <div className="w-full px-[20px] flex items-center">
            <p>초대 코드로 입장하기</p>
          </div>
        )}
        {data.map((friend) => (
          <div className="flex justify-between" key={friend}>
            <ModalFriendComponent friend={friend} />
            <SelectBtn label="추가" onClick={() => onSendFriendRequest()} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchModal;

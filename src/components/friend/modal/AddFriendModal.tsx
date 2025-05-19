import Search from "@/components/common/Search";
import React from "react";
import ModalFriendComponent from "../ModalFriendComponent";
import SelectBtn from "@/components/common/SelectBtn";

const data = [1, 2, 3, 4, 5];

const AddFriendModal = () => {
  function onSendFriendRequest() {}
  return (
    <div
      className="modal-content h-[364px] w-[304px] px-[17px] pt-[29px]"
      onClick={(e) => e.stopPropagation()}
    >
      <h1> 친구 찾기</h1>
      <div className="h-[25px] w-[265px] mt-[24px] mb-[21px]">
        <Search />
      </div>
      <div className="flex flex-col gap-[20px] h-[217px] overflow-y-scroll">
        {data.map((friend) => (
          <div className="flex justify-between" key={friend}>
            <ModalFriendComponent id={friend} />
            <SelectBtn label="추가" onClick={() => onSendFriendRequest()} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddFriendModal;

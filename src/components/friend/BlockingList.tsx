import React from "react";
import ModalFriendComponent from "./ModalFriendComponent";
import RejectBtn from "../common/RejectBtn";

const data = [1, 2, 3, 4, 5];

const BlockingList = () => {
  function onCancelBlock() {}
  return (
    <>
      {data.map((friend) => (
        <div className="flex justify-between" key={friend}>
          <ModalFriendComponent id={friend} />
          <div className="flex gap-[6px] items-center">
            <RejectBtn label="취소" onClick={() => onCancelBlock()} />
          </div>
        </div>
      ))}
    </>
  );
};

export default BlockingList;

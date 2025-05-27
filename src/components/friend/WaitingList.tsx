import React from "react";
import ModalFriendComponent from "./ModalFriendComponent";
import SelectBtn from "../common/SelectBtn";

const data = [1, 2, 3, 4, 5];
const WaitingList = () => {
  function onAcceptWaiting() {}
  function onRejectWaiting() {}
  return (
    <>
      {data.map((friend) => (
        <div className="flex justify-between" key={friend}>
          <ModalFriendComponent id={friend} />
          <div className="flex gap-[6px] items-center">
            <SelectBtn label="수락" onClick={() => onAcceptWaiting()} />
            <SelectBtn
              isRejected={true}
              label="거절"
              onClick={() => onRejectWaiting()}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default WaitingList;

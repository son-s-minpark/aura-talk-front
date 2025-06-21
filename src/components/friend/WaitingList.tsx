import React from "react";
import ModalFriendComponent from "./ModalFriendComponent";
import SelectBtn from "../common/SelectBtn";
import { friendType } from "@/type/friend/friendType";

const WaitingList = ({ waitingList }: { waitingList: friendType[] }) => {
  function onAcceptWaiting() {}
  function onRejectWaiting() {}
  return (
    <>
      {waitingList.map((friend, index) => (
        <div className="flex justify-between" key={index}>
          <ModalFriendComponent friend={friend} />
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

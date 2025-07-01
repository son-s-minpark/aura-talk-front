import React from "react";
import ModalFriendComponent from "./ModalFriendComponent";
import SelectBtn from "../common/SelectBtn";
import { friendType } from "@/type/friend/friendType";

const BlockingList = ({ list }: { list: friendType[] }) => {
  function onCancelBlock() {}

  return (
    <>
      {list.map((friend: friendType) => (
        <div className="flex justify-between" key={friend.friendUserId}>
          <ModalFriendComponent friend={friend} />
          <div className="flex gap-[6px] items-center">
            <SelectBtn
              isRejected={true}
              label="취소"
              onClick={() => onCancelBlock()}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default BlockingList;

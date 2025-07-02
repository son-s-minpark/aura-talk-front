import React from "react";
import ModalFriendComponent from "./ModalFriendComponent";
import SelectBtn from "../common/SelectBtn";
import { friendType } from "@/type/friend/friendType";
import { useRouter } from "next/navigation";

const BlockingList = ({ list }: { list: friendType[] }) => {
  const router = useRouter();
  function onCancelBlock() {}

  return (
    <>
      {list.map((friend: friendType) => (
        <div className="flex justify-between" key={friend.friendUserId}>
          <div onClick={() => router.push(`profile/${friend.friendUserId}`)}>
            <ModalFriendComponent friend={friend} />
          </div>
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

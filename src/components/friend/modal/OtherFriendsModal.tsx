import clsx from "clsx";
import React, { useState } from "react";
import WaitingList from "../WaitingList";
import RequestingList from "../RequestingList";
import BlockingList from "../BlockingList";
import { otherFriendListType } from "@/type/friend/otherFriendListType";

const OtherFriendsModal = () => {
  const [friendList, setFriendList] = useState<otherFriendListType>("waiting");
  return (
    <div
      className="modal-content w-[332px] h-[362px] px-[20px] pt-[29px]"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex gap-[10px] mb-[26px]">
        <h1
          onClick={() => setFriendList("waiting")}
          className={clsx("font-semibold", {
            "text-commonGray": friendList != "waiting",
          })}
        >
          대기 중
        </h1>
        <h1
          onClick={() => setFriendList("requesting")}
          className={clsx("font-semibold", {
            "text-commonGray": friendList != "requesting",
          })}
        >
          요청 중
        </h1>
        <h1
          onClick={() => setFriendList("blocking")}
          className={clsx("font-semibold", {
            "text-commonGray": friendList != "blocking",
          })}
        >
          차단 중
        </h1>
      </div>
      <div className="flex flex-col gap-[20px] h-[251px] overflow-y-scroll">
        {friendList === "waiting" && <WaitingList />}
        {friendList === "requesting" && <RequestingList />}
        {friendList === "blocking" && <BlockingList />}
      </div>
    </div>
  );
};

export default OtherFriendsModal;

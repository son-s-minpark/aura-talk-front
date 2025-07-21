import React from "react";
import { IoChatbubbleEllipses, IoPersonRemove } from "react-icons/io5";
import { IoMdPersonAdd } from "react-icons/io";
import { MdBlock } from "react-icons/md";
import { CgUnblock } from "react-icons/cg";
import { useFriend } from "@/hooks/friend/useFriend";
import useChatRoom from "@/hooks/chatRoom/useChatRoom";
import { useRouter } from "next/navigation";

const FriendButtonList = ({
  status,
  id,
  setFriendStatus,
}: {
  status: string;
  id: number;
  setFriendStatus: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const {
    useRequestFriend,
    useAcceptFriend,
    useRejectFriend,
    useCancelFriendRequest,
    useBlockFriend,
    useCancelBlockFriend,
    useDeleteFriend,
  } = useFriend();
  const { useCreateOnetoOneChatRoom } = useChatRoom();
  const router = useRouter();

  function goOnetoOneChat() {
    useCreateOnetoOneChatRoom.mutateAsync(id).then((res) => {
      if (res.success) {
        router.push(`/chat/${id}`);
      } else {
        console.error(res);
      }
    });
  }

  function addFriend() {
    if (status === "NONE") {
      useRequestFriend.mutateAsync(id);
      setFriendStatus("REQUEST_SENT");
    } else if (status === "REQUEST_RECEIVED") {
      useAcceptFriend.mutateAsync(id);
      setFriendStatus("FRIENDS");
    }
  }

  function removeFriend() {
    if (status === "REQUEST_RECEIVED") {
      useRejectFriend.mutateAsync(id);
    } else if (status === "REQUEST_SENT") {
      useCancelFriendRequest.mutateAsync(id);
    } else if (status === "FRIENDS") {
      useDeleteFriend.mutateAsync(id);
    }
    setFriendStatus("NONE");
  }

  function blockFriend() {
    useBlockFriend.mutateAsync(id);
    setFriendStatus("BLOCKED");
  }

  function unBlockFriend() {
    useCancelBlockFriend.mutateAsync(id);
    setFriendStatus("NONE");
  }

  return (
    <div className="h-[54px] flex gap-[10px] text-white">
      {status !== "BLOCKED" && status !== "BLOCKED_BY" && (
        <button onClick={goOnetoOneChat}>
          <IoChatbubbleEllipses className="w-[30px] h-[30px]" />
        </button>
      )}

      {(status === "NONE" || status === "REQUEST_RECEIVED") && (
        <button onClick={addFriend}>
          <IoMdPersonAdd className="w-[30px] h-[30px]" />
        </button>
      )}

      {(status === "REQUEST_RECEIVED" ||
        status === "REQUEST_SENT" ||
        status === "FRIENDS") && (
        <button onClick={removeFriend}>
          <IoPersonRemove className="w-[30px] h-[30px]" />
        </button>
      )}

      {(status === "NONE" ||
        status === "REQUEST_RECEIVED" ||
        status === "FRIENDS") && (
        <button onClick={blockFriend}>
          <MdBlock className="w-[30px] h-[30px]" />
        </button>
      )}

      {status === "BLOCKED" && (
        <button onClick={unBlockFriend}>
          <CgUnblock className="w-[30px] h-[30px]" />
        </button>
      )}
    </div>
  );
};

export default FriendButtonList;

import React from "react";
import { IoChatbubbleEllipses, IoPersonRemove } from "react-icons/io5";
import { IoMdPersonAdd } from "react-icons/io";
import { MdBlock } from "react-icons/md";
import { CgUnblock } from "react-icons/cg";
import { useFriend } from "@/hooks/friend/useFriend";
import useChatRoom from "@/hooks/useChatRoom";
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
    useRequestFriendMutation,
    useAcceptFriendMutation,
    useRejectFriendMutation,
    useCancelFriendRequestMuration,
    useBlockFriendMutation,
    useCancelBlockFriendMutation,
    useDeleteFriendMutation,
  } = useFriend();
  const { useCreateOnetoOneChatRoomMutation } = useChatRoom();
  const router = useRouter();

  function goOnetoOneChat() {
    useCreateOnetoOneChatRoomMutation.mutateAsync(id).then((res) => {
      router.push(`chat/${res}`);
    });
  }

  function addFriend() {
    if (status === "NONE") {
      useRequestFriendMutation.mutateAsync(id);
      setFriendStatus("REQUEST_SENT");
    } else if (status === "REQUEST_RECEIVED") {
      useAcceptFriendMutation.mutateAsync(id);
      setFriendStatus("FRIENDS");
    }
  }

  function removeFriend() {
    if (status === "REQUEST_RECEIVED") {
      useRejectFriendMutation.mutateAsync(id);
    } else if (status === "REQUEST_SENT") {
      useCancelFriendRequestMuration.mutateAsync(id);
    } else if (status === "FRIENDS") {
      useDeleteFriendMutation.mutateAsync(id);
    }
    setFriendStatus("NONE");
  }

  function blockFriend() {
    useBlockFriendMutation.mutateAsync(id);
    setFriendStatus("BLOCKED");
  }

  function unBlockFriend() {
    useCancelBlockFriendMutation.mutateAsync(id);
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

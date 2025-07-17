import React, { useEffect, useRef, useState } from "react";
import AddImage from "@/components/common/AddImage";
import SelectBtn from "@/components/common/SelectBtn";
import { useRouter } from "next/navigation";
import useChatRoom from "@/hooks/chatRoom/useChatRoom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { friendType } from "@/type/friend/friendType";
import ChatUserList from "../ChatUserList";
import { chatUserType } from "@/type/chat/chatUserType";
import { useImageUpload } from "@/hooks/useImageUpload";

// 채팅방 생성 시 설정 모달
const SetChatModal = ({
  friendList,
  chatType,
}: {
  friendList: friendType[];
  chatType: string | null;
}) => {
  const [file, setFile] = useState<{ file: File | null; fileName: string }>({
    file: null,
    fileName: "",
  });
  const roomNameRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { useCreateChatRoom, useCreateOnetoOneChatRoom } = useChatRoom();
  const { useUploadChatRoomImage } = useImageUpload();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    console.error(file);
  }, [file]);

  const chatUsers: chatUserType[] = friendList.map((friend) => ({
    id: friend.friendUserId,
    thumbnailImageUrl: friend.thumbnailImageUrl,
    nickname: friend.nickname,
  }));

  async function onSubmit() {
    const roomname = roomNameRef.current?.value || "";
    if (roomname !== "") {
      try {
        if (chatType === "group") {
          const res = await useCreateChatRoom.mutateAsync({
            name: roomname,
            userIds: [user.id],
          });
          if (res.success) {
            if (file.file) {
              await useUploadChatRoomImage.mutateAsync({
                file: file.file,
                fileName: file.fileName,
              });
            }
            router.push(`/chat/${res.roomId}`);
          }
        } else if (chatType === "one") {
          const res = await useCreateOnetoOneChatRoom.mutateAsync(
            friendList[0].friendUserId
          );
          router.push(`/chat/${res}`);
        }
      } catch (err) {
        console.error(err);
      }
    }
  }

  return (
    <div
      className="modal-content w-[303px] px-[21px] pt-[25px]"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-col gap-[17px]">
        <div>
          <h1>대표 사진</h1>
          <AddImage
            imgSize={70}
            btnHeight={15}
            btnWidth={42}
            img={file.file ? URL.createObjectURL(file.file) : ""}
            setImg={({ fileName, file }) => setFile({ file, fileName })}
          />
        </div>
        <div>
          <h1>채팅방 이름</h1>
          <div>
            <div className="bg-[#F3F6F6] dark:bg-[#787878] rounded-[20px] w-[253px] h-[32px] mt-[11px]">
              <input className="h-full w-full" ref={roomNameRef} type="text" />
            </div>
          </div>
        </div>
        <div>
          <h1>친구 목록</h1>
          <ChatUserList userList={chatUsers} listType="None" />
        </div>
        <div className="mt-[7px] mb-[14px] flex justify-end">
          <SelectBtn label="생성" onClick={onSubmit} />
        </div>
      </div>
    </div>
  );
};

export default SetChatModal;

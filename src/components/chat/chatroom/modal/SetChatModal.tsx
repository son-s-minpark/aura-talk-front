import React, { useRef, useState } from "react";
import AddImage from "@/components/common/AddImage";
import SelectBtn from "@/components/common/SelectBtn";
import { useRouter } from "next/navigation";
import useChatRoom from "@/hooks/chatRoom/useChatRoom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { friendType } from "@/type/friend/friendType";
import { chatUserType } from "@/type/chat/chatUserType";
import { useImageUpload } from "@/hooks/useImageUpload";
import ChatSetUser from "../ChatSetUser";
import NameInput from "@/components/common/NameInput";

// 채팅방 생성 시 설정 모달
const SetChatModal = ({
  selectedList,
  chatType,
  setSelectedList,
}: {
  selectedList: friendType[];
  chatType: string | null;
  setSelectedList: React.Dispatch<React.SetStateAction<friendType[]>>;
}) => {
  const [file, setFile] = useState<{ file: File; fileName: string } | null>(
    null
  );
  const roomNameRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { useCreateChatRoom, useCreateOnetoOneChatRoom } = useChatRoom();
  const { useUploadChatRoomImage } = useImageUpload();
  const user = useSelector((state: RootState) => state.user);

  const chatUsers: chatUserType[] = selectedList.map((friend) => ({
    id: friend.friendUserId,
    thumbnailImageUrl: friend.thumbnailImageUrl,
    nickname: friend.nickname,
  }));

  async function onSubmit() {
    const roomname = roomNameRef.current?.value || "";
    if (roomname !== "") {
      try {
        let url = "";
        if (file) {
          const res = await useUploadChatRoomImage.mutateAsync({
            file: file.file,
            fileName: file.fileName,
          });
          url = res.url;
        }

        if (chatType === "group") {
          const createRoomRes = await useCreateChatRoom.mutateAsync({
            name: roomname,
            userIds: [user.id],
            roomImageUrl: url,
          });
          if (createRoomRes.success) {
            router.push(`/chat/${createRoomRes.roomId}`);
          }
        } else if (chatType === "one") {
          const createOneToOneRes = await useCreateOnetoOneChatRoom.mutateAsync(
            selectedList[0].friendUserId
          );
          if (createOneToOneRes.success) {
            if (file) {
              await useUploadChatRoomImage.mutateAsync({
                file: file.file,
                fileName: file.fileName,
              });
            }
            router.push(`/chat/${createOneToOneRes}`);
          }
        }
      } catch (err) {
        console.error("Error:", err);
      }
    }
  }

  return (
    <div
      className="modal-content w-[303px] px-[21px] pt-[25px]"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-col gap-[17px]">
        <>
          <h1>대표 사진</h1>
          <AddImage
            imgSize={70}
            btnHeight={15}
            btnWidth={42}
            img=""
            setImg={({ fileName, file }) => setFile({ file, fileName })}
          />
        </>
        <>
          <h1>채팅방 이름</h1>
          <NameInput>
            <input className="h-full w-full" ref={roomNameRef} type="text" />
          </NameInput>
        </>
        <>
          <h1>친구 목록</h1>
          <div className="flex items-center gap-[11px] h-[90px] overflow-x-scroll whitespace-nowrap">
            {chatUsers.map((user, index) => (
              <div
                key={index}
                className="relative"
                onClick={() =>
                  setSelectedList(
                    selectedList.filter((item) => item.friendUserId !== user.id)
                  )
                }
              >
                <ChatSetUser user={user} />
                <button className="absolute -top-1 -right-1 rounded-full w-[16px] h-[16px] bg-commonGray text-white text-[10px] flex items-center justify-center">
                  -
                </button>
              </div>
            ))}
          </div>
        </>
        <div className="mt-[7px] mb-[14px] flex justify-end">
          <SelectBtn label="생성" onClick={onSubmit} />
        </div>
      </div>
    </div>
  );
};

export default SetChatModal;

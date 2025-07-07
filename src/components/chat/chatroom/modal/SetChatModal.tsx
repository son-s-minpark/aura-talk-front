"use client";
import AddImage from "@/components/common/AddImage";
import SelectBtn from "@/components/common/SelectBtn";
import ChatSetUser from "../ChatSetUser";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import useChatRoom from "@/hooks/useChatRoom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { friendType } from "@/type/friend/friendType";

// 채팅방 생성 시 설정 모달
const SetChatModal = ({
  friendList,
  chatType,
}: {
  friendList: friendType[];
  chatType: string | null;
}) => {
  const [img, setImg] = useState<string>("");
  const roomNameRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { useCreateChatRoomMutation, useCreateOnetoOneChatRoomMutation } =
    useChatRoom();
  const user = useSelector((state: RootState) => state.user);

  async function onSubmit() {
    const roomname = roomNameRef.current?.value || "";
    if (roomname != "") {
      if (chatType == "group") {
        try {
          const res = await useCreateChatRoomMutation.mutateAsync({
            name: roomname,
            userIds: [user.id],
          });
          if (res.success) {
            router.push(`/chat/${res.roomId}`);
          }
        } catch {
          console.error("error");
        }
      } else if (chatType == "one") {
        try {
          const res = await useCreateOnetoOneChatRoomMutation.mutateAsync(
            friendList[0].friendUserId
          );
          router.push(`chat/${res}`);
        } catch (err) {
          console.error(err);
        }
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
            img={img}
            setImg={() => setImg}
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
          <>
            <h1>친구 목록</h1>
            <div className="flex gap-[11px] mt-[9px]">
              {friendList.map((friend, index) => (
                <ChatSetUser
                  user={{
                    id: friend.friendUserId,
                    thumbnailImg: friend.thumbnailImageUrl,
                    nickname: friend.nickname,
                  }}
                  key={index}
                />
              ))}
            </div>
          </>
        </div>
        <div className="mt-[7px] mb-[14px] flex justify-end">
          <SelectBtn label="생성" onClick={onSubmit} />
        </div>
      </div>
    </div>
  );
};

export default SetChatModal;

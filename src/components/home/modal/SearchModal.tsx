import React, { useState } from "react";
import NameInput from "@/components/common/NameInput";
import { chatRoomType } from "@/type/chat/chatRoomType";
import useSearchDebounce from "@/hooks/useSearchDebounce";
import useChatRoom from "@/hooks/chatRoom/useChatRoom";
import ChatComponent from "@/components/chat/chatroom/ChatComponent";

const SearchModal = () => {
  const [searchVal, setSearchVal] = useState<string>("");
  const [searchedChatList, setSearchedChatList] = useState<chatRoomType[]>([]);
  const { getSearchedChatRoom } = useChatRoom();

  useSearchDebounce<chatRoomType[]>(searchVal, async (keyword: string) => {
    if (keyword.trim() === "") {
      setSearchedChatList([]);
      return [];
    }
    const result = await getSearchedChatRoom(keyword);
    setSearchedChatList(result || []);
    return result || [];
  });

  function onChangVal(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSearchVal(value);
  }

  return (
    <div
      className="modal-content h-[364px] w-[304px] px-[17px] pt-[29px]"
      onClick={(e) => e.stopPropagation()}
    >
      <h1> 검색하기 </h1>
      <NameInput>
        <input
          type="text"
          value={searchVal}
          onChange={onChangVal}
          className="w-full h-full mx-[10px]"
        />
      </NameInput>

      <div className="w-[265px] mt-[24px] mb-[10px]">
        {searchVal !== "" && (
          <div>
            {searchedChatList.length === 0 ? (
              <p>검색 결과가 없습니다.</p>
            ) : (
              <p>채팅</p>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-[20px] max-h-[217px] overflow-y-auto">
        {searchVal !== "" && searchedChatList.length > 0 && (
          <div className="flex flex-col gap-[10px]">
            <p>채팅</p>
            <div className="flex flex-col gap-[20px] w-full">
              {searchedChatList.map((chat) => (
                <ChatComponent chatroom={chat} key={chat.id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;

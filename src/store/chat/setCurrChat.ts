import { chatRoomType } from "@/type/chat/chatRoomType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: chatRoomType = {
  id: 0,
  name: "",
  chatRoomImg: "",
  owner: {
    id: 0,
    thumbnailImg: "",
    isLeader: true,
    nickname: "",
  },
  users: [],
  active: true,
  lastMessage: new Date(),
};

export const setCurrChatSlice = createSlice({
  name: "currChat",
  initialState,
  reducers: {
    setCurrChat: (state, action: PayloadAction<Partial<chatRoomType>>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { setCurrChat } = setCurrChatSlice.actions;
export default setCurrChatSlice.reducer;

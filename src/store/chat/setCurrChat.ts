import { chatRoomType } from "@/type/chat/chatRoomType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: chatRoomType = {
  id: 0,
  name: "",
  roomImageUrl: "",
  type: "UNDEFINED",
  owner: {
    id: 0,
    thumbnailImg: "",
    nickname: "",
  },
  users: [],
  active: true,
  lastMessageAt: new Date(),
  inviteCode: "",
  inviteCodeExpiredAt: new Date(),
};

export const setCurrChatSlice = createSlice({
  name: "currChat",
  initialState,
  reducers: {
    setCurrChat: (state, action: PayloadAction<Partial<chatRoomType>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setCurrChat } = setCurrChatSlice.actions;
export default setCurrChatSlice.reducer;

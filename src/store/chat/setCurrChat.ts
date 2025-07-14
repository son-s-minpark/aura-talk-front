import { chatRoomType } from "@/type/chat/chatRoomType";
import { chatUserType } from "@/type/chat/chatUserType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: chatRoomType = {
  id: 0,
  name: "",
  roomImageUrl: "",
  type: "UNDEFINED",
  owner: {
    id: 0,
    thumbnailImageUrl: "",
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
    setRemoveUser: (state, action: PayloadAction<Partial<chatUserType>>) => {
      state.users = state.users.filter((user) => user.id !== action.payload.id);
    },
  },
});

export const { setCurrChat, setRemoveUser } = setCurrChatSlice.actions;
export default setCurrChatSlice.reducer;

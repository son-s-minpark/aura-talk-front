import { chatRoomType } from "@/type/chat/chatRoomType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: chatRoomType[] = [];

export const setChatListSlice = createSlice({
  name: "chatList",
  initialState,
  reducers: {
    setChatList: (_state, action: PayloadAction<chatRoomType[]>) => {
      return action.payload;
    },
    addChat: (state, action: PayloadAction<chatRoomType>) => {
      state.push(action.payload);
    },
    removeChat: (state, action: PayloadAction<number>) => {
      return state.filter((chat) => chat.id !== action.payload);
    },
  },
});

export const { setChatList, addChat, removeChat } = setChatListSlice.actions;

export default setChatListSlice.reducer;

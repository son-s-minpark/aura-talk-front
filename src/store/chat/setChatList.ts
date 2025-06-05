import { chatRoomType } from "@/type/chat/chatRoomType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface chatListType {
  pendingList: chatRoomType[];
  chattingList: chatRoomType[];
}

const initialState: chatListType = {
  pendingList: [],
  chattingList: [],
};

export const setChatListSlice = createSlice({
  name: "chatList",
  initialState,
  reducers: {
    setPendingList: (state, action: PayloadAction<chatRoomType[]>) => {
      state.pendingList = action.payload;
    },
    addPending: (state, action: PayloadAction<chatRoomType>) => {
      state.pendingList.push(action.payload);
    },
    removePending: (state, action: PayloadAction<number>) => {
      state.pendingList = state.pendingList.filter(
        (chat) => chat.id !== action.payload
      );
    },
    setChattingList: (state, action: PayloadAction<chatRoomType[]>) => {
      state.chattingList = action.payload;
    },
    addChattingChat: (state, action: PayloadAction<chatRoomType>) => {
      state.chattingList.push(action.payload);
    },
    removeChattingChat: (state, action: PayloadAction<number>) => {
      state.chattingList = state.chattingList.filter(
        (chat) => chat.id !== action.payload
      );
    },
  },
});

export const {
  setPendingList,
  addPending,
  removePending,
  setChattingList,
  addChattingChat,
  removeChattingChat,
} = setChatListSlice.actions;

export default setChatListSlice.reducer;

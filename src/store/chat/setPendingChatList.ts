import { chatRoomType } from "@/type/chat/chatRoomType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: chatRoomType[] = [
  {
    name: "",
    id: 0,
    chatRoomImg: "",
    owner: {
      id: 0,
      nickname: "",
      thumbnailImg: "",
      isLeader: true,
    },
    users: [
      {
        id: 0,
        nickname: "",
        thumbnailImg: "",
        isLeader: false,
      },
    ],
  },
];

export const setPendingChatListSlice = createSlice({
  name: "pendingChatList",
  initialState,
  reducers: {
    setPendingChatList: (
      state,
      action: PayloadAction<Partial<chatRoomType>>
    ) => {
      Object.assign(state, action.payload);
    },
    addChat: (state, action) => {
      state.push(action.payload);
    },
    removeChat: (state, action) => {
      state = state.filter((chatId) => chatId !== action.payload);
    },
  },
});

export const { setPendingChatList, addChat, removeChat } =
  setPendingChatListSlice.actions;
export default setPendingChatListSlice.reducer;

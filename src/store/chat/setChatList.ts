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

export const setChatListSlice = createSlice({
  name: "chatList",
  initialState,
  reducers: {
    setChatList: (state, action: PayloadAction<Partial<chatRoomType>>) => {
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

export const { setChatList, addChat, removeChat } = setChatListSlice.actions;
export default setChatListSlice.reducer;

import { friendType } from "@/type/friend/friendType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: friendType[] = [];

export const setFriendListSlice = createSlice({
  name: "friendList",
  initialState,
  reducers: {
    setFriendList: (_state, action: PayloadAction<friendType[]>) => {
      return action.payload;
    },
    addFriend: (state, action: PayloadAction<friendType>) => {
      state.push(action.payload);
    },
    removeFriend: (state, action: PayloadAction<number>) => {
      return state.filter((friend) => friend.id !== action.payload);
    },
  },
});

export const { setFriendList, addFriend, removeFriend } =
  setFriendListSlice.actions;

export default setFriendListSlice.reducer;

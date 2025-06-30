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
  },
});

export const { setFriendList } = setFriendListSlice.actions;

export default setFriendListSlice.reducer;

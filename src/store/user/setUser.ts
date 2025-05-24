import { userType } from "@/type/user/userType";
import { createSlice } from "@reduxjs/toolkit";

const initialState: userType = {
  userId: 0,
  status: "OFFLINE",
  randomChatEnabled: true,
  createdAt: "",
};

export const setUserSlice = createSlice({
  name: "setUser",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state = action.payload;
    },
  },
});

export const { setUser } = setUserSlice.actions;
export default setUserSlice.reducer;

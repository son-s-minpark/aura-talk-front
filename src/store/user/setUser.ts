import { userType } from "@/type/user/userType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: userType = {
  userId: 0,
  status: "OFFLINE",
  randomChatEnabled: true,
  createdAt: "",
};

export const setUserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<userType>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setUser } = setUserSlice.actions;
export default setUserSlice.reducer;

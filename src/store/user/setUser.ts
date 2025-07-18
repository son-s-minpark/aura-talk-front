import { userType } from "@/type/user/userType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: userType = {
  id: 0,
  status: "OFFLINE",
  randomChatEnabled: true,
  createdAt: "",
  nickname: "",
  username: "",
  description: "",
  interests: [],
  profileImage: {
    userId: 0,
    originalImageUrl: "",
    thumbnailImageUrl: "",
    isDefaultImg: true,
  },
};

export const setUserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<userType>>) => {
      return { ...state, ...action.payload };
    },
    addInterest: (state, action) => {
      state.interests.push(action.payload);
    },
    removeInterest: (state, action) => {
      state.interests = state.interests.filter(
        (interest) => interest !== action.payload
      );
    },
    setResetUser: () => {
      return initialState;
    },
  },
});

export const { setUser, addInterest, removeInterest, setResetUser } =
  setUserSlice.actions;
export default setUserSlice.reducer;

import { profileType } from "@/type/user/profileType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: profileType = {
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

export const setProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<Partial<profileType>>) => {
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
  },
});

export const { setProfile, addInterest, removeInterest } =
  setProfileSlice.actions;
export default setProfileSlice.reducer;

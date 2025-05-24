import { profileType } from "@/type/user/profileType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: profileType = {
  nickname: "",
  username: "",
  description: "",
  interests: [],
};

export const setProfileSlice = createSlice({
  name: "setProfile",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<Partial<profileType>>) => {
      Object.assign(state, action.payload);
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

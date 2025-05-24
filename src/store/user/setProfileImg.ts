import { profileImgType } from "@/type/user/profileType";
import { createSlice } from "@reduxjs/toolkit";

const initialState: profileImgType = {
  originalImgUrl: "",
  thumbnailImgUrl: "",
  isDefaultImg: true,
};

export const setProfileImgSlice = createSlice({
  name: "setProfileImg",
  initialState,
  reducers: {
    setProfileImg: (state, action) => {
      state = action.payload;
    },
  },
});

export const { setProfileImg } = setProfileImgSlice.actions;
export default setProfileImgSlice.reducer;

import { pageType } from "@/type/sign/setPageType";
import { createSlice } from "@reduxjs/toolkit";

type setPageType = {
  page: pageType;
};

const initialState: setPageType = {
  page: "onBoarding",
};

export const setPageSlice = createSlice({
  name: "setPage",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { setPage } = setPageSlice.actions;
export default setPageSlice.reducer;

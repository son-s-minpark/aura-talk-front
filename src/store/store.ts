import { configureStore } from "@reduxjs/toolkit";
import setPageReducer from "./sign/setPage";
import setProfileImgReducer from "./user/setProfileImg";
import setProfileReducer from "./user/setProfile";
import setUserReducer from "./user/setUser";

const store = configureStore({
  reducer: {
    setPage: setPageReducer,
    setProfileImg: setProfileImgReducer,
    setProfile: setProfileReducer,
    setUser: setUserReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

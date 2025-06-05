import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import setPageReducer from "./sign/setPage";
import setProfileImgReducer from "./user/setProfileImg";
import setProfileReducer from "./user/setProfile";
import setUserReducer from "./user/setUser";
import persistReducer from "redux-persist/es/persistReducer";
import setChatListReducer from "./chat/setChatList";
import setCurrChatReducer from "./chat/setCurrChat";

const profileImgPersistConfig = {
  key: "profileImg",
  storage: storage,
};

const profilePersistConfig = {
  key: "profile",
  storage: storage,
};

const userPersistConfig = {
  key: "user",
  storage: storage,
};

const reducers = combineReducers({
  page: setPageReducer,
  profileImg: persistReducer(profileImgPersistConfig, setProfileImgReducer),
  profile: persistReducer(profilePersistConfig, setProfileReducer),
  user: persistReducer(userPersistConfig, setUserReducer),
  chatList: setChatListReducer,
  currChat: setCurrChatReducer,
});

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

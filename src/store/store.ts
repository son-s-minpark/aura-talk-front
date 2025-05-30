import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import setPageReducer from "./sign/setPage";
import setProfileImgReducer from "./user/setProfileImg";
import setProfileReducer from "./user/setProfile";
import setUserReducer from "./user/setUser";
import persistReducer from "redux-persist/es/persistReducer";

const pagePersistConfig = {
  key: "page",
  storage: storage,
};

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
  page: persistReducer(pagePersistConfig, setPageReducer),
  profileImg: persistReducer(profileImgPersistConfig, setProfileImgReducer),
  profile: persistReducer(profilePersistConfig, setProfileReducer),
  user: persistReducer(userPersistConfig, setUserReducer),
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

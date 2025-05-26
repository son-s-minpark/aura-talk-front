import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storageSession from "redux-persist/lib/storage/session";
import setPageReducer from "./sign/setPage";
import setProfileImgReducer from "./user/setProfileImg";
import setProfileReducer from "./user/setProfile";
import setUserReducer from "./user/setUser";
import persistReducer from "redux-persist/es/persistReducer";

const reducers = combineReducers({
  page: setPageReducer,
  profileImg: setProfileImgReducer,
  profile: setProfileReducer,
  user: setUserReducer,
});

const persistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ["user"],
};
const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

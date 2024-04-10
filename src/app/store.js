import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import { thunk } from "redux-thunk";

import storage from "redux-persist/lib/storage";

import userSlice from "./slices/userSlice";
import commentSlice from "./slices/commentSlice";
import postSlice from "./slices/postSlice";
import userDetailSlice from "./slices/userDetailSlice";

const reducers = combineReducers({
  user: userSlice,
  comment: commentSlice,
  post: postSlice,
  userDetail: userDetailSlice,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk),
});

import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    credentials: {},
  },
  reducers: {
    login: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    logout: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    update: (state, action) => {
      return {
        credentials: {
          ...state.credentials,
          ...action.payload,
        },
      };    
    }
  },
});

export const { login, logout, update } = userSlice.actions;

export const userData = (state) => state.user;

export default userSlice.reducer;

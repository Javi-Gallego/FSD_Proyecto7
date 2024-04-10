import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    details: {},
  },
  reducers: {
    savePost: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { savePost } = postSlice.actions;

export const postData = (state) => state.post;

export default postSlice.reducer;

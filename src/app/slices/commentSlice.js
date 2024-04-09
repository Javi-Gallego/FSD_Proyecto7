import { createSlice } from "@reduxjs/toolkit";

export const commentSlice = createSlice({
  name: "comment",
  initialState: {
    postId: "",
  },
  reducers: {
    writeId: (state, action) => {
      state.postId = action.payload;
    },
    deleteId: (state) => {
      state.postId = "";
    },
  },
});

export const { writeId, deleteId } = commentSlice.actions;

export const commentData = (state) => state.comment;

export default commentSlice.reducer;
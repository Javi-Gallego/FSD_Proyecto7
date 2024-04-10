import { createSlice } from "@reduxjs/toolkit";

export const userDetailSlice = createSlice({
  name: "userDetail",
  initialState: {
    userId: "",
  },
  reducers: {
    writeId: (state, action) => {
      state.userId = action.payload;
    },
    deleteId: (state) => {
      state.userId = "";
    },
  },
});

export const { writeId, deleteId } = userDetailSlice.actions;

export const userDetailData = (state) => state.userDetail;

export default userDetailSlice.reducer;
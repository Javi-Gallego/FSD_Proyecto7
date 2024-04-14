import { createSlice } from "@reduxjs/toolkit";

export const photoSlice = createSlice({
  name: "photo",
  initialState: {
    photo: "",
  },
  reducers: {
    writePhoto: (state, action) => {
      state.photo = action.payload;
    },
    deletePhoto: (state) => {
      state.photo = "";
    },
  },
});

export const { writePhoto, deletePhoto } = photoSlice.actions;

export const photoData = (state) => state.photo;

export default photoSlice.reducer;
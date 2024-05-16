import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  isCount: 0,
};

const loadingSlice = createSlice({
  name: "loadingSlice",
  initialState,
  reducers: {
    handleLoadingOff: (state, action) => {
      state.isCount -= 1;
      if (state.isCount == 0) {
        state.isLoading = false;
      }
    },
    handleLoadingOn: (state, action) => {
      if (!state.isLoading) {
        state.isLoading = true;
      }
      state.isCount += 1;
    },
  },
});

export const { handleLoadingOff, handleLoadingOn } = loadingSlice.actions;

export default loadingSlice.reducer;

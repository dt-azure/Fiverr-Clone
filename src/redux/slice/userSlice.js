import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  submit: true,
  update: false,
  selectedUser: {},
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    handleEnableUpdateBtn: (state, action) => {
      state.submit = false;
      state.update = true;
    },
    handleEnableSubmitBtn: (state, action) => {
      state.submit = true;
      state.update = false;
    },
    handleSelectUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
});

export const {
    handleEnableUpdateBtn,
    handleEnableSubmitBtn,
    handleSelectUser,
  } = userSlice.actions;

export default userSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
  isShowCart: false,
  notification: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: defaultState,
  reducers: {
    setShowCart: (prevState) => {
      prevState.isShowCart = !prevState.isShowCart;
    },
    showNotification: (prevState, action) => {
      prevState.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

export const UISliceReducer = uiSlice.reducer;
export const uiActions = uiSlice.actions;

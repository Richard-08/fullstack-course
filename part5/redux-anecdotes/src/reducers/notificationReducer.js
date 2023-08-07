import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    text: "",
    delay: 0,
  },
  reducers: {
    setNotification: {
      reducer: (state, action) => {
        state.text = action.payload.text;
        state.delay = action.payload.delay;
      },
      prepare: (text, delay) => {
        return { payload: { text, delay } };
      },
    },
  },
});

export const { setNotification } = notificationSlice.actions;
export default notificationSlice.reducer;

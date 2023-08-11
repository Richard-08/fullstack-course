import { createSlice } from "@reduxjs/toolkit";
import { createContext, useContext, useReducer } from "react";

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
      prepare: (text, delay = 5000) => {
        return { payload: { text, delay } };
      },
    },
  },
});

export const { setNotification } = notificationSlice.actions;

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationSlice.reducer,
    {
      text: "",
      delay: 0,
    }
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const notifyAndDispatch = useContext(NotificationContext);
  return notifyAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const notifyAndDispatch = useContext(NotificationContext);
  return notifyAndDispatch[1];
};

export default NotificationContext;

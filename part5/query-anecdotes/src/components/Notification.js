import { useEffect } from "react";
import {
  useNotificationValue,
  useNotificationDispatch,
  setNotification,
} from "../NotificationContext";

const Notification = () => {
  const dispatch = useNotificationDispatch();
  const { text, delay } = useNotificationValue();

  useEffect(() => {
    if (text) {
      setTimeout(() => dispatch(setNotification("")), delay);
    }
  }, [text]);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return <div style={style}>{text}</div>;
};

export default Notification;

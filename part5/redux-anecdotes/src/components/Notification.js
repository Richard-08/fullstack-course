import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setNotification } from "../reducers/notificationReducer";

const Notification = () => {
  const dispatch = useDispatch();
  const text = useSelector((state) => state.notification.text);
  const delay = useSelector((state) => state.notification.delay);

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

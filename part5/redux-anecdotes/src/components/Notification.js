import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setNotification } from "../reducers/notificationReducer";

const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);

  useEffect(() => {
    if (notification) {
      setTimeout(() => dispatch(setNotification("")), 5000);
    }
  }, [notification]);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return <div style={style}>{notification}</div>;
};

export default Notification;

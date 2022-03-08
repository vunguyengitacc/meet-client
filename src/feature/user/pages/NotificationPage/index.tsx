import { Box, Divider, Typography } from "@mui/material";
import React, { useEffect } from "react";
import useNotificationPageStyle from "./style";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "app/reduxStore";
import { getMyNotification } from "feature/auth/authSlice";
import { IUser } from "model/User";
import NotificationItem from "feature/user/components/NotificationItem";

const NotificationPage = () => {
  const currentUser = useSelector(
    (state: RootState) => state.auth.currentUser
  ) as IUser;
  const style = useNotificationPageStyle();

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getMyNotification());
  }, []);
  return (
    <Box>
      <Box className={style.header}>
        <Box className={style.headerIcon}>
          <NotificationsIcon />
        </Box>
        <Box>
          <Typography variant="h6">Notification</Typography>
          <Typography>Notification to your account</Typography>
        </Box>
      </Box>
      <Box className={style.content}>
        {currentUser.notifications?.map((i, index) => (
          <React.Fragment key={index}>
            <NotificationItem notification={i} />
            <Divider light />
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};

export default NotificationPage;

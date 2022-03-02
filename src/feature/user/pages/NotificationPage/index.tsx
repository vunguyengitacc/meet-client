import { Box, Typography } from "@mui/material";
import React from "react";
import useNotificationPageStyle from "./style";
import NotificationsIcon from "@mui/icons-material/Notifications";

const NotificationPage = () => {
  const style = useNotificationPageStyle();
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
      <Box className={style.content}></Box>
    </Box>
  );
};

export default NotificationPage;

import { Avatar, Box, Chip, Typography } from "@mui/material";
import { IInvitation } from "model/Invitation";
import { INotification } from "model/Notification";
import React from "react";
import NotificationInvitation from "../NotificationInvitation";
import useNotificationItemStyle from "./style";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

interface IProps {
  notification: INotification<any>;
}

const NotificationItem: React.FC<IProps> = ({ notification }) => {
  const style = useNotificationItemStyle();

  return (
    <Box className={style.surface}>
      <Box className={style.authorField}>
        <Avatar src={notification.from.avatarURI} />
      </Box>
      <Box className={style.contentField}>
        <Box className={style.label}>
          {notification.type === "INVITATION" && (
            <Chip label={<b>Invitation</b>} color="warning" />
          )}
        </Box>
        <Typography variant="subtitle2">{notification.name}</Typography>
        {notification.type === "INVITATION" && (
          <NotificationInvitation
            invitation={notification.content as IInvitation}
          />
        )}
      </Box>
      <Box className={style.dateField}>
        <Box display="flex" alignItems="center" gap="10px">
          <CalendarTodayIcon />
          <Box>
            <Typography>
              {`${new Date(notification.createdAt).getHours()} : ${new Date(
                notification.createdAt
              ).getMinutes()}`}
            </Typography>
            <Typography>
              {new Date(notification.createdAt).toLocaleDateString()}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default NotificationItem;

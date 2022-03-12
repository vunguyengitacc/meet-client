import React from "react";
import { IInvitation } from "model/Invitation";
import useNotificationInvitationStyle from "./style";
import { Box, Typography, Button, Divider } from "@mui/material";
import toast from "react-hot-toast";
import invitationApi from "api/invitationApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "app/reduxStore";
import { setJoinCode } from "feature/meet/meetSlice";
import { removeNotification } from "feature/auth/authSlice";

interface IProps {
  invitation: IInvitation;
  notificationId: string;
}

const NotificationInvitation: React.FC<IProps> = ({
  invitation,
  notificationId,
}) => {
  const style = useNotificationInvitationStyle();
  const navigator = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const acceptHandler = async () => {
    try {
      const res = await invitationApi.answer({
        invitation: { _id: invitation._id, result: "ACCEPT" },
        notificationId,
      });
      if (!res.data.joinCode) throw new Error("Error");
      dispatch(setJoinCode(res.data.joinCode));
      navigator(`/meet/${invitation.room.accessCode}`);
      dispatch(removeNotification(notificationId));
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const denyHandler = async () => {
    try {
      const res = await invitationApi.answer({
        invitation: { _id: invitation._id, result: "DENY" },
        notificationId,
      });
      if (!res.data.message) throw new Error("Error");
      dispatch(removeNotification(notificationId));
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap="20px">
      <Typography>
        Do you want to join meet room: {invitation.room.accessCode}
      </Typography>
      <Divider />
      <Box display="flex" gap="10px">
        <Button
          color="success"
          variant="blur"
          disableElevation
          onClick={acceptHandler}
        >
          Accept
        </Button>
        <Button
          color="error"
          variant="blur"
          disableElevation
          onClick={denyHandler}
        >
          Deny
        </Button>
      </Box>
    </Box>
  );
};

export default NotificationInvitation;

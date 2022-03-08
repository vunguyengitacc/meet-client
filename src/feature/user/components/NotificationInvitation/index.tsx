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

interface IProps {
  invitation: IInvitation;
}

const NotificationInvitation: React.FC<IProps> = ({ invitation }) => {
  const style = useNotificationInvitationStyle();
  const navigator = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const acceptHandler = async () => {
    try {
      const res = await invitationApi.answer({
        _id: invitation._id,
        result: "ACCEPT",
      });
      if (!res.data.joinCode) throw new Error("Error");
      dispatch(setJoinCode(res.data.joinCode));
      navigator(`/meet/${invitation.room.accessCode}`);
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
          variant="fade"
          disableElevation
          onClick={acceptHandler}
        >
          Accept
        </Button>
        <Button color="error" variant="fade" disableElevation>
          Deny
        </Button>
      </Box>
    </Box>
  );
};

export default NotificationInvitation;

import { Box, IconButton, Switch, Typography } from "@mui/material";
import { AppDispatch, RootState } from "app/reduxStore";
import { IRoom } from "model/Room";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useMemberControlFormStyle from "./style";
import CloseIcon from "@mui/icons-material/Close";
import { updateRoom } from "feature/meet/meetSlice";

interface IProps {
  control: (value: boolean) => void;
}

const MemberControlForm: React.FC<IProps> = ({ control }) => {
  const room = useSelector((state: RootState) => state.meet.room) as IRoom;
  const dispatch = useDispatch<AppDispatch>();
  const style = useMemberControlFormStyle();

  const updateHandler = (value: Partial<IRoom>, message: string) => {
    dispatch(
      updateRoom({
        room: { _id: room?._id, ...value },
        notification: message,
      })
    );
  };
  return (
    <Box className={style.surface}>
      <Box
        display="flex"
        justifyContent="space-between"
        padding="10px"
        alignItems="center"
      >
        <Typography variant="h6">Meet Control</Typography>
        <IconButton onClick={() => control(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box padding="10px">
        <Typography variant="subtitle1">Allow member to</Typography>
        <Box className={style.controlItemField}>
          <Typography variant="subtitle1">Share their micro</Typography>
          <Switch
            checked={room.isAllowShareMicro}
            onClick={() =>
              updateHandler(
                { isAllowShareMicro: !room.isAllowShareMicro },
                !room.isAllowShareMicro
                  ? "Admin enable member to share micro"
                  : "Admin block share micro"
              )
            }
          />
        </Box>
        <Box className={style.controlItemField}>
          <Typography variant="subtitle1">Share their webcam</Typography>
          <Switch
            checked={room.isAllowShareWebcam}
            onClick={() =>
              updateHandler(
                { isAllowShareWebcam: !room.isAllowShareWebcam },
                !room.isAllowShareWebcam
                  ? "Admin enable member to share webcam"
                  : "Admin block share webcam"
              )
            }
          />
        </Box>
        <Box className={style.controlItemField}>
          <Typography variant="subtitle1">Share their screen</Typography>
          <Switch
            checked={room.isAllowShareScreen}
            onClick={() =>
              updateHandler(
                { isAllowShareScreen: !room.isAllowShareScreen },
                !room.isAllowShareScreen
                  ? "Admin enable member to share screen"
                  : "Admin block share screen"
              )
            }
          />
        </Box>
      </Box>
    </Box>
  );
};

export default MemberControlForm;

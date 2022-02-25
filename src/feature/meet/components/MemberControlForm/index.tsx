import { Box, Typography } from "@mui/material";
import { AppDispatch, RootState } from "app/reduxStore";
import { IRoom } from "model/Room";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useMemberControlFormStyle from "./style";
import { updateRoom } from "feature/meet/meetSlice";
import { CustomSwitch } from "components/CustomSwitch";

const MemberControlForm = () => {
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
      <Box padding="10px">
        <Typography
          variant="subtitle1"
          style={{
            fontWeight: 500,
          }}
        >
          Allow member to
        </Typography>
        <Box className={style.controlItemField}>
          <Box>
            <Typography>Share their micro</Typography>
            <Typography variant="subtitle1">
              Member's audio data will be not sent to everyone if you turn off
              this feature
            </Typography>
          </Box>
          <CustomSwitch
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
          <Box>
            <Typography>Share their webcam</Typography>
            <Typography variant="subtitle1">
              Member's webcam video data will be not sent to everyone if you
              turn off this feature
            </Typography>
          </Box>
          <CustomSwitch
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
          <Box>
            <Typography>Share their screen</Typography>
            <Typography variant="subtitle1">
              Member's screen video data will be not sent to everyone if you
              turn off this feature
            </Typography>
          </Box>
          <CustomSwitch
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
